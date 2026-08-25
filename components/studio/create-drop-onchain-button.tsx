'use client'

import { useEffect, useMemo, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseEther, parseEventLogs } from 'viem'
import {
  useAccount,
  useChainId,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { Loader2, Rocket, Wallet } from 'lucide-react'
import {
  DEMO_ETH_USD,
  dropFactoryAbi,
  getFactoryAddress,
  pctToBps,
} from '@/lib/contracts'
import { defaultChain } from '@/lib/wagmi'
import { cn } from '@/lib/utils'

export type CreateDropOnchainParams = {
  title: string
  tokenSymbol: string
  royaltyEquityPct: number
  raiseAmountUsd: number
  includeLiquidityPool: boolean
  platformFeePct: number
  vestingMonths: number
  priceEth?: string
}

type CreateDropOnchainButtonProps = {
  params: CreateDropOnchainParams
  disabled?: boolean
}

type CreatedDropAddresses = {
  dropId: string
  shareToken: string
  sale: string
  royaltyVault: string
}

export function CreateDropOnchainButton({ params, disabled }: CreateDropOnchainButtonProps) {
  const { address, isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain, isPending: isSwitching } = useSwitchChain()
  const factoryAddress = getFactoryAddress(chainId) ?? getFactoryAddress(defaultChain.id)

  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()
  const { data: receipt, isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })
  const [created, setCreated] = useState<CreatedDropAddresses | null>(null)

  const { data: creatorRole } = useReadContract({
    address: factoryAddress,
    abi: dropFactoryAbi,
    functionName: 'CREATOR_ROLE',
    query: { enabled: Boolean(factoryAddress) },
  })

  const { data: hasCreatorRole } = useReadContract({
    address: factoryAddress,
    abi: dropFactoryAbi,
    functionName: 'hasRole',
    args:
      creatorRole && address
        ? [creatorRole, address]
        : undefined,
    query: { enabled: Boolean(factoryAddress && creatorRole && address) },
  })

  const onchainArgs = useMemo(() => {
    const priceEth = params.priceEth || '0.01'
    const priceWei = parseEther(priceEth)
    const raiseGoalEth = params.raiseAmountUsd / DEMO_ETH_USD
    const raiseGoalWei = parseEther(raiseGoalEth.toFixed(6))
    const tokensForSale = priceWei > 0n ? raiseGoalWei / priceWei : 0n
    const symbol = params.tokenSymbol.replace(/^\$/, '').slice(0, 8).toUpperCase() || 'VIBE'

    return {
      name: params.title.slice(0, 64),
      symbol,
      royaltyEquityBps: pctToBps(params.royaltyEquityPct),
      platformFeeBps: pctToBps(params.platformFeePct),
      includeLiquidityPool: params.includeLiquidityPool,
      vestingMonths: BigInt(params.vestingMonths),
      priceWei,
      raiseGoalWei,
      tokensForSale: tokensForSale > 0n ? tokensForSale : 1n,
      saleDurationSeconds: BigInt(7 * 24 * 60 * 60),
    }
  }, [params])

  useEffect(() => {
    if (!receipt) return
    try {
      const logs = parseEventLogs({
        abi: dropFactoryAbi,
        eventName: 'DropCreated',
        logs: receipt.logs,
      })
      const log = logs[0]
      if (log) {
        setCreated({
          dropId: log.args.dropId?.toString() ?? '',
          shareToken: log.args.shareToken ?? '',
          sale: log.args.sale ?? '',
          royaltyVault: log.args.royaltyVault ?? '',
        })
      }
    } catch {
      // ignore parse errors
    }
  }, [receipt])

  const wrongChain = isConnected && chainId !== defaultChain.id
  const busy = isPending || isConfirming || isSwitching
  const canSubmit =
    !disabled &&
    Boolean(params.title.trim()) &&
    Boolean(factoryAddress) &&
    isConnected &&
    !wrongChain

  function handleCreate() {
    if (!factoryAddress || !canSubmit) return
    setCreated(null)
    reset()
    writeContract({
      address: factoryAddress,
      abi: dropFactoryAbi,
      functionName: 'createDrop',
      args: [onchainArgs],
      chainId: defaultChain.id,
    })
  }

  if (!factoryAddress) {
    return (
      <div className="space-y-2">
        <button
          type="button"
          disabled
          title="חיבור לרשת הבלוקצ'יין בטעינה..."
          className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-[#1e2a44] bg-[#0f172a]/40 px-5 py-3 text-sm font-bold text-slate-500 opacity-40"
        >
          <Rocket className="h-4 w-4" aria-hidden />
          השק on-chain
        </button>
        <p className="text-xs text-slate-500">חיבור לרשת הבלוקצ׳יין בטעינה…</p>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="flex flex-col items-start gap-3">
        <ConnectButton label="חבר ארנק להשקה" showBalance={false} chainStatus="icon" />
        <p className="text-xs text-slate-500">נדרש ארנק עם CREATOR_ROLE ב-DropFactory</p>
      </div>
    )
  }

  if (wrongChain) {
    return (
      <button
        type="button"
        disabled={busy}
        onClick={() => switchChain({ chainId: defaultChain.id })}
        className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-5 py-3 text-sm font-bold text-amber-300"
      >
        {isSwitching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
        עבור ל-Base Sepolia
      </button>
    )
  }

  return (
    <div className="space-y-3">
      {hasCreatorRole === false && (
        <p className="text-xs text-amber-400">
          הארנק שלך עדיין ללא CREATOR_ROLE — בקשו מה-admin להעניק הרשאה ב-DropFactory.
        </p>
      )}

      <button
        type="button"
        disabled={!canSubmit || busy || hasCreatorRole === false}
        onClick={handleCreate}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border border-[#3bc1ca] bg-[#3bc1ca] px-5 py-3 text-sm font-bold text-[#070b14] transition-all hover:bg-[#5fd4db]',
          'disabled:cursor-not-allowed disabled:opacity-40',
        )}
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            {isConfirming ? 'מאשר בשרשרת…' : 'שולח createDrop…'}
          </>
        ) : (
          <>
            <Rocket className="h-4 w-4" aria-hidden />
            השק on-chain
          </>
        )}
      </button>

      <p className="text-[11px] text-slate-500" dir="ltr">
        goal ≈ {(params.raiseAmountUsd / DEMO_ETH_USD).toFixed(4)} ETH · price{' '}
        {params.priceEth || '0.01'} ETH · {onchainArgs.tokensForSale.toString()} tokens
      </p>

      {isSuccess && created && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300">
          <p className="font-bold">ה-drop נוצר on-chain! (#{created.dropId})</p>
          <ul className="mt-2 space-y-1 font-mono text-[10px] text-slate-300" dir="ltr">
            <li>sale: {created.sale}</li>
            <li>token: {created.shareToken}</li>
            <li>vault: {created.royaltyVault}</li>
          </ul>
          <p className="mt-2 text-[10px] text-slate-400">
            הוסיפו את כתובת ה-sale ל-<code>NEXT_PUBLIC_DROP_SALE_ADDRESSES</code> כדי לאפשר השקעה
            בעמוד הציבורי.
          </p>
          {hash && (
            <a
              href={`https://sepolia.basescan.org/tx/${hash}`}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-block text-[#3bc1ca] underline"
              dir="ltr"
            >
              Basescan ↗
            </a>
          )}
        </div>
      )}

      {error && (
        <p className="text-xs text-rose-400">{error.message.split('\n')[0].slice(0, 200)}</p>
      )}
    </div>
  )
}
