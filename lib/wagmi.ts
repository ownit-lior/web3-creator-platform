import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { base, baseSepolia } from 'wagmi/chains'

/** WalletConnect Cloud project id — https://cloud.walletconnect.com */
export const walletConnectProjectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''

if (!walletConnectProjectId && typeof window !== 'undefined') {
  console.warn(
    '[wagmi] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is missing. WalletConnect wallets may not work.',
  )
}

/** Base Sepolia first = default chain during development. */
export const supportedChains = [baseSepolia, base] as const

export const defaultChain = baseSepolia

export const wagmiConfig = getDefaultConfig({
  appName: 'VIBE',
  projectId:
    walletConnectProjectId ||
    '00000000000000000000000000000000',
  chains: [...supportedChains],
  ssr: true,
})

export { base, baseSepolia }
