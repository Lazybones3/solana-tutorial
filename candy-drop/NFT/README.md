## Install the Metaplex CLI:

```
git clone https://github.com/metaplex-foundation/metaplex.git ~/metaplex-foundation/metaplex
yarn install --cmd ~/metaplex-foundation/metaplex/js/

sudo npm install -g ts-node
ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts --version
```

## Deploy your NFTs to the devnet

```
solana-keygen new --outfile ~/.config/solana/devnet.json
solana config set --keypair ~/.config/solana/devnet.json

solana airdrop 2 --url devnet
solana balance --url devnet

ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts upload -e devnet -k ~/.config/solana/devnet.json -cp config.json ./assets

ts-node ~/metaplex-foundation/metaplex/js/packages/cli/src/candy-machine-v2-cli.ts verify_upload -e devnet -k ~/.config/solana/devnet.json
```