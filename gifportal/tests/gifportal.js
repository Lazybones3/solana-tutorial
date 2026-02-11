const anchor = require("@coral-xyz/anchor");

const main = async () => {
  console.log("Starting tests...");
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.gifportal;

  const baseAccount = anchor.web3.Keypair.generate();
  const tx = await program.methods.startStuffOff()
  .accounts({
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
  })
  .signers([baseAccount]).rpc();
  console.log("Your transaction signature", tx);

  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("GIF Count:", account.totalGifs.toString());

  await program.methods.addGif("https://www.gif5.net/data/upload/2022-04-07/624e92052561c.gif").accounts({
    baseAccount: baseAccount.publicKey,
    user: provider.wallet.publicKey
  }).rpc();

  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("GIF Count:", account.totalGifs.toString());
  console.log("GIF List:", account.gifList);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
