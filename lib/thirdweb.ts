import { createThirdwebClient } from 'thirdweb'
import { baseSepolia } from 'thirdweb/chains'
import { createWallet } from 'thirdweb/wallets'

export const client = createThirdwebClient({
  clientId: 'YOUR_CLIENT_ID_HERE',
})

/** Active chain for wallet connections and transactions. */
export const activeChain = baseSepolia

export const wallets = [createWallet('io.metamask')]
