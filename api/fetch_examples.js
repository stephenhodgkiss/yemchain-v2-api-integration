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
    "message": "Global stats retrieved successfully in 5ms",
    "total_accs": 15000,
    "total_txns": 50000
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
    "message": "Transaction volume retrieved successfully in 2ms"
}