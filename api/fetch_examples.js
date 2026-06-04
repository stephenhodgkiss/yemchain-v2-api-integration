// Example: Create Transactions
const createTransactions = async () => {
    fetch('https://yemscan.com/api/createTransactions.php', {
        method: 'POST',
        headers: {
            'Apikey': 'YOUR_API_KEY',
            'Customdomain': 'yourdomain.com',
            'Pernum': '1000001234',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify([
            {
                from_uid: 123,
                to_uid: 456,
                value: 1234,
                reason: "Payment for order #12345",
                asset: "YEM",
                from_curr: "EUR",
                to_curr: "USD"
            }
        ])
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

// Example response
const createTransactionsResponse = {
    "success": true,
    "message": "1 transactions inserted successfully.",
    "inserted_count": 1,
    "transaction_hashes": [
        "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678"
    ]
}

// Example: Get Balances
const getBalances = async () => {
    fetch('https://yemscan.com/api/getBalances.php?uids=123,456&tokenSymbol=YEM', {
        headers: {
            'Apikey': 'YOUR_API_KEY',
            'Customdomain': 'yourdomain.com',
            'Pernum': '1000001234'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

// Example response
const getBalancesResponse = {
    "balances": {
        "123": "1000.00",
        "456": "2000.00"
    }
}

// Example: Get Global Stats
const getGlobals = async () => {
    fetch('https://yemscan.com/api/getGlobals.php', {
        headers: {
            'Apikey': 'YOUR_API_KEY',
            'Customdomain': 'yourdomain.com',
            'Pernum': '1000001234'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

// Example response
const getGlobalsResponse = {
    "success": true,
    "total_accs": 15000,
    "total_txns": 50000,
    "price": "1.00"
}

// Example: Get Transaction Volume
const getTxnVolume = async () => {
    fetch('https://yemscan.com/api/getTxnVolume.php?tokenSymbol=YEM', {
        headers: {
            'Apikey': 'YOUR_API_KEY',
            'Customdomain': 'yourdomain.com',
            'Pernum': '1000001234'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

// Example response
const getTxnVolumeResponse = {
    "success": true,
    "volume_1d": 15000.25,
    "volume_7d": 105000.75,
    "num_addresses": 1234,
    "balances": {},
    "transaction_count": 50000,
    "cacheHit": false
}

// Example: Get Transaction Hash Statuses
const getTxnHashes = async () => {
    fetch('https://yemscan.com/api/getTxnHashes.php?hashes=0xa1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678,0xb2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890,0x243347373ddb571b4794580fbd852622b2d5ac6a7c567683f5a6614fabe04a85', {
        headers: {
            'Apikey': 'YOUR_API_KEY',
            'Customdomain': 'yourdomain.com',
            'Pernum': '1000001234'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

// Example response (note: keys are lowercase without 0x prefix)
const getTxnHashesResponse = {
    "statuses": {
        "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678": "1",
        "b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890": "2",
        "243347373ddb571b4794580fbd852622b2d5ac6a7c567683f5a6614fabe04a85": "0"
    }
}

// Example: Get Asset Stats
const getAssetStats = async () => {
    fetch('https://yemscan.com/api/getAssetStats.php?tokenSymbol=YEM', {
        headers: {
            'Apikey': 'YOUR_API_KEY',
            'Customdomain': 'yourdomain.com',
            'Pernum': '1000001234'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

// Example response
const getAssetStatsResponse = {
    "price": "1.00",
    "wallets": 1257632
}

// Example: Get Public Key (requires API level 3+)
const getPublicKey = async () => {
    fetch('https://yemscan.com/api/getPublicKey.php?uid=12345', {
        headers: {
            'Apikey': 'YOUR_API_KEY',
            'Customdomain': 'yourdomain.com',
            'Pernum': '1000001234'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

// Example response
const getPublicKeyResponse = {
    "success": true,
    "address": "0x742d35cc6634c0532925a3b844b91678f8c8f3a0"
}

// Example error response
const getPublicKeyErrorResponse = {
    "success": false,
    "message": "Invalid uid parameter"
}

// Example: Get Transaction Hash
const getTransactionHash = async () => {
    fetch('https://yemscan.com/api/getTransactionHash.php?hash=0x278d9e202a17d833f05f744758c5eb423411529e90cc0e5f04aa6825c30aab6e', {
        headers: {
            'Apikey': 'YOUR_API_KEY',
            'Customdomain': 'yourdomain.com',
            'Pernum': '1000001234'
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

// Example response
const getTransactionHashResponse = {
    "hash": "0x278d9e202a17d833f05f744758c5eb423411529e90cc0e5f04aa6825c30aab6e",
    "blockNumber": 476232,
    "gas": 29437,
    "gasPrice": 0,
    "gasLimit": 29437,
    "burntFees": 0,
    "from": "0xfa592403b9c52b6f61f7e2334b5c7c4feb847ded",
    "to": "0xcc60ede05e871b0c19d6bdd9aa012d75948ebbc9",
    "from_uid": 999999,
    "to_uid": 789,
    "reason": "",
    "reasonCode": 18,
    "value": 73,
    "onchaindata": "|0.73|CHF|0.91|USD",
    "asset": "YEM",
    "timestamp": 1765650241,
    "status": true,
    "failedText": "",
    "cacheHit": false
}
