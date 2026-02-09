# Stake your SOL with JavaScript

1. 创建项目

```
mkdir staking
cd staking
npm init -y
npm install --save @solana/web3.js
```

2. 运行代码

```
# View current and delinquent validators
node get_validators.js

# Create a new stake account
solana-keygen new --outfile ./my-wallet.json
node create_stake_account.js

# Delegate your stake to a validator
node delegate_stake.js

# Check out the delegators for a specific validator
node get_delegators_by_validator.js

# Deactivate your stake account
node deactivate_stake.js

# Withdraw SOL from your stake account
node withdraw_stake.js
```
