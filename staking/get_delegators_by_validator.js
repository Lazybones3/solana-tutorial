require('dotenv').config();
const fs = require('fs');
const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL, StakeProgram, Authorized, Lockup, sendAndConfirmTransaction, PublicKey } = require("@solana/web3.js");

const main = async () => {
    // const connection = new Connection(clusterApiUrl('devnet'), 'processed');
    const api_key = process.env.HELIUS_API_KEY;
    const connection = new Connection('https://devnet.helius-rpc.com/?api-key=' + api_key, 'processed');

    // https://solana.com/docs/core/programs
    const STAKE_PROGRAM_ID = new PublicKey(
        "Stake11111111111111111111111111111111111111"
    );
    // selectedValidatorPubkey in delegate_stake.js
    const VOTE_PUB_KEY = "2u83Dx5qPV4QnujjJQv8v2SoqG1ixuAxPK5Jwhtkovd1";

    const accounts = await connection.getParsedProgramAccounts(
        STAKE_PROGRAM_ID,
        {
            filters: [
                { dataSize: 200 },
                {
                    memcmp: {
                        offset: 124,
                        bytes: VOTE_PUB_KEY,
                    }
                }
            ]
        }
    );

    console.log(`Total number of delegators found for ${VOTE_PUB_KEY} is: ${accounts.length}`);
    if (accounts.length) {
        console.log(`Sample delegator: ${JSON.stringify(accounts[0])}`);
    }
};

const runMain = async () => {
    try {
        await main();
    } catch (error) {
        console.error(error);
    }
};

runMain();