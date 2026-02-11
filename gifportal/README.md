# DAPP PROJECT - Deploy a Web3 version of GIPHY

```
anchor init gifportal --javascript
# use localnet
solana-test-validator
anchor test --skip-local-validator
# use devnet
anchor test --provider.cluster https://devnet.helius-rpc.com/?api-key=<YOUR_API_KEY>
```

## Deploy your dapp to the devnet

1. Run following commands:

```
solana config set --url devnet
solana config get
solana airdrop 2 --url devnet
solana balance --url devnet
```

2. Change localnet to devnet in Anchor.tmol

```
# [programs.localnet]
[programs.devnet]

[provider]
# cluster = "localnet"
cluster = "devnet"
```

3. Run following commands:

```
anchor build
solana address -k target/deploy/gifportal-keypair.json
# Change the declare_id in lib.rs to this id.
# Change the gifportal in Anchor.tmol to this id.

# build again
anchor build
anchor deploy --provider.cluster https://devnet.helius-rpc.com/?api-key=<YOUR_API_KEY>
```

4. Search Idl account address in [Solana Explorer](https://explorer.solana.com/).