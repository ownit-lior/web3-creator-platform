# web3-creator-platform

VIBE — decentralized creator economy on **Base**.

## Apps

- `/explore` — investments, clubs, upcoming drops
- `/drop/[id]` — public fundraise + tokenomics transparency
- `/club/[id]` — token-gated creator community

## Smart contracts (`/contracts`)

Foundry suite for creator drops:

```bash
# requires Foundry: https://book.getfoundry.sh
cd contracts
forge install
forge test -vv
```

See [`contracts/README.md`](./contracts/README.md) for architecture and Base Sepolia deploy.
