# Initial testnet contract deployment

Scripts to deploy and verify bootstrap contracts for Reef Chain.

## Usage

Create `.env` file from example file and add deployer account mnemonic.

```bash
cp .env.example .env
```

### Deploy

```bash
yarn deploy-all
```

By default, contracts will be verified. To skip verification, set `SKIP_VERIFICATION=true` in `.env` file.


### Verify

```bash
yarn verify-all
```

