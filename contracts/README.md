# VIBE Smart Contracts

Foundry contracts for the VIBE creator-economy platform on **Base** / **Base Sepolia**.

## Architecture

| Contract | Role |
|----------|------|
| `DropFactory` | Creates a full drop stack for a creator |
| `CreatorShareToken` | ERC-20 share of sold royalty equity + vesting lock |
| `DropSale` | Primary raise — splits ETH to creator / platform / liquidity |
| `RoyaltyVault` | Pro-rata royalty claims for share holders |
| `SecondaryMarket` | Escrow listings with 5% fee (2.5% creator + 2.5% platform) |
| `Tokenomics` | Shared BPS constants matching the product model |

### Tokenomics (on-chain)

- **Primary raise**: platform fee 5–10%, optional 5% liquidity pool, rest to creator
- **Royalty equity**: 5–50% sold to fans (creator always keeps majority)
- **Secondary fee**: 5% total → 2.5% creator + 2.5% platform
- **Vesting**: 0 / 1 / 3 / 6 months transfer lock (sale + market exempt)

## Setup

```bash
# Install Foundry: https://book.getfoundry.sh/getting-started/installation
cd contracts
forge install   # if libs missing
forge build
forge test -vv
```

## Deploy (Base Sepolia)

```bash
cp .env.example .env
# fill PRIVATE_KEY, PLATFORM_TREASURY, BASE_SEPOLIA_RPC_URL

forge script script/Deploy.s.sol:DeployScript \
  --rpc-url $BASE_SEPOLIA_RPC_URL \
  --broadcast \
  --verify
```

After deploy, copy the printed `DropFactory` address into `lib/contracts.ts`.

## Frontend integration

See `/lib/contracts.ts` for ABIs + address placeholders used by the Next.js app.
