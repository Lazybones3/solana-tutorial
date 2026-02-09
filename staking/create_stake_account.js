require('dotenv').config();
const fs = require('fs');
const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, StakeProgram, Authorized, Lockup, sendAndConfirmTransaction } = require("@solana/web3.js");

const main = async () => {
    // const connection = new Connection(clusterApiUrl('devnet'), 'processed');
    const api_key = process.env.HELIUS_API_KEY;
    const connection = new Connection('https://devnet.helius-rpc.com/?api-key=' + api_key, 'processed');

    // 问题：避免每次生成钱包领水
    // const wallet = Keypair.generate();
    // const airdropSignature = await connection.requestAirdrop(
    //     wallet.publicKey,
    //     1 * LAMPORTS_PER_SOL
    // );
    // await connection.confirmTransaction(airdropSignature);

    // 从本地加载私钥
    // solana-keygen new --outfile ./my-wallet.json
    const secretKeyString = fs.readFileSync("./my-wallet.json", "utf8");
    const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
    const wallet = Keypair.fromSecretKey(secretKey);

    // const balance = await connection.getBalance(wallet.publicKey);
    // console.log(balance);

    const stakeAccount = Keypair.generate();
    const minimumRent = await connection.getMinimumBalanceForRentExemption(StakeProgram.space);
    const amountUserWantsToStake = 0.5 * LAMPORTS_PER_SOL;
    const amountToStake = minimumRent + amountUserWantsToStake;
    const createStakeAccountTx = StakeProgram.createAccount({
        authorized: new Authorized(wallet.publicKey, wallet.publicKey),
        fromPubkey: wallet.publicKey,
        lamports: amountToStake,
        lockup: new Lockup(0, 0, wallet.publicKey),
        stakePubkey: stakeAccount.publicKey
    });
    const createStakeAccountTxId = await sendAndConfirmTransaction(connection, createStakeAccountTx, [wallet, stakeAccount]);

    console.log(`Stake account created, Tx Id: ${createStakeAccountTxId}`);
    let stakeBalance = await connection.getBalance(stakeAccount.publicKey);
    console.log(`Stake account balance: ${stakeBalance / LAMPORTS_PER_SOL} SOL`);

    // deprecated
    // const stakeStatus = await connection.getStakeActivation(stakeAccount.publicKey);
    // console.log(`Stake account status: ${stakeStatus.state}`);


};

const runMain = async () => {
    try {
        await main();
    } catch (error) {
        console.error(error);
    }
};

runMain();