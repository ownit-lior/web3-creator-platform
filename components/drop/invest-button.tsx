'use client'

import { useEffect, useMemo, useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { parseEther, formatEther } from 'viem'
import {
  useAccount,
  useChainId,
  useReadContract,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from 'wagmi'
import { Loader2, Wallet } from 'lucide-react'
import { dropSaleAbi, getDropSaleAddress } from '@/lib/contracts'
import { defaultChain } from '@/lib/wagmi'
import { cn } from '@/lib/utils'

type InvestButtonProps = {
  dropId: string
  /** Optional override — otherwise read from NEXT_PUBLIC_DROP_SALE_ADDRESSES */
  saleAddress?: `0x${string}`
  isPresale?: boolean
}

export function InvestButton({ dropId, saleAddress: saleAddressProp, isPresale = true }: InvestButtonProps) {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain, isPending: isSwitching } = useSwitchChain()
  const saleAddress = saleAddressProp ?? getDropSaleAddress(dropId)

  const [ethAmount, setEthAmount] = useState('0.05')
  const { writeContract, data: hash, isPending, error, reset } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({ hash })

  const { data: priceWei } = useReadContract({
    address: saleAddress,
    abi: dropSaleAbi,
    functionName: 'priceWei',
    query: { enabled: Boolean(saleAddress) },
  })

  const estimatedTokens = useMemo(() => {
    if (!priceWei || !ethAmount) return 0n
    try {
      const value = parseEther(ethAmount)
      if (priceWei === 0n) return 0n
      return value / priceWei
    } catch {
      return 0n
    }
  }, [ethAmount, priceWei])

  useEffect(() => {
    if (isSuccess) {
      const t = setTimeout(() => reset(), 8000)
      return () => clearTimeout(t)
    }
  }, [isSuccess, reset])

  const wrongChain = isConnected && chainId !== defaultChain.id
  const busy = isPending || isConfirming || isSwitching

  function handleInvest() {
    if (!saleAddress) return
    let value: bigint
    try {
      value = parseEther(ethAmount)
    } catch {
      return
    }
    if (value === 0n) return

    writeContract({
      address: saleAddress,
      abi: dropSaleAbi,
      functionName: 'buy',
      args: [estimatedTokens > 0n ? estimatedTokens : 0n],
      value,
      chainId: defaultChain.id,
    })
  }

  if (!saleAddress) {
    return (
      <div className="mt-6 space-y-3">
        <button
          type="button"
          disabled
          className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-[#1e2a44] bg-[#0f172a]/60 py-3.5 text-sm font-bold text-slate-500"
        >
          {isPresale ? 'השקע עכשיו' : 'רכוש אסימונים'}
        </button>
        <p className="text-center text-[11px] leading-relaxed text-slate-500">
          חיבור לרשת הבלוקצ׳יין בטעינה…
        </p>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="mt-6 flex flex-col items-center gap-3">
        <ConnectButton label="חבר ארנק להשקעה" showBalance={false} chainStatus="none" />
        <p className="text-center text-[10px] text-slate-500">
          Base Sepolia · DropSale <span dir="ltr" className="font-mono text-[9px]">{saleAddress.slice(0, 10)}…</span>
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 space-y-3">
      {wrongChain ? (
        <button
          type="button"
          disabled={busy}
          onClick={() => switchChain({ chainId: defaultChain.id })}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 py-3.5 text-sm font-bold text-amber-300"
        >
          {isSwitching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Wallet className="h-4 w-4" />}
          עבור ל-Base Sepolia
        </button>
      ) : (
        <>
          <label className="block space-y-1.5">
            <span className="text-xs text-slate-500">סכום השקעה (ETH)</span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={ethAmount}
              onChange={(e) => setEthAmount(e.target.value)}
              className="h-11 w-full rounded-xl border border-[#1e2a44] bg-[#0f172a]/80 px-3 text-sm text-white outline-none focus-visible:border-[#3bc1ca]/50 focus-visible:ring-2 focus-visible:ring-[#3bc1ca]/20"
              dir="ltr"
            />
          </label>
          {priceWei != null && (
            <p className="text-[11px] text-slate-500" dir="ltr">
              ~{estimatedTokens.toString()} tokens · {formatEther(priceWei)} ETH / token
            </p>
          )}
          <button
            type="button"
            disabled={busy || !ethAmount || Number(ethAmount) <= 0}
            onClick={handleInvest}
            className={cn(
              'flex w-full items-center justify-center gap-2 rounded-xl border border-[#3bc1ca] bg-[#3bc1ca] py-3.5 text-sm font-bold text-[#070b14] transition-all hover:bg-[#5fd4db]',
              'disabled:cursor-not-allowed disabled:opacity-40',
            )}
          >
            {busy ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                {isConfirming ? 'מאשר בשרשרת…' : 'שולח עסקה…'}
              </>
            ) : (
              <>{isPresale ? 'השקע עכשיו' : 'רכוש אסימונים'}</>
            )}
          </button>
        </>
      )}

      {isSuccess && (
        <p className="text-center text-xs font-semibold text-emerald-400">
          ההשקעה אושרה on-chain!
          {hash && (
            <a
              href={`https://sepolia.basescan.org/tx/${hash}`}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block font-mono text-[10px] text-[#3bc1ca] underline"
              dir="ltr"
            >
              {hash.slice(0, 18)}…
            </a>
          )}
        </p>
      )}
      {error && (
        <p className="text-center text-[11px] text-rose-400">
          {error.message.split('\n')[0].slice(0, 160)}
        </p>
      )}
    </div>
  )
}
