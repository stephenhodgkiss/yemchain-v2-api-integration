<?php // Example: Create Transactions 

$data = json_encode([['from_uid' => 123, 'to_uid' => 456, 'value' => 1234, 'reason' => 'Payment for order #12345', 'asset' => 'YEM', 'from_curr' => 'EUR', 'to_curr' => 'USD']]);
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://yemscan.com/api/createTransactions.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Apikey: YOUR_API_KEY', 'Customdomain: yourdomain.com', 'Pernum: 1000001234', 'Content-Type: application/json']);
$response = curl_exec($ch);
curl_close($ch);

// Example response
$response = '
{
  "success": true,
  "message": "1 transactions inserted successfully.",
  "inserted_count": 1,
  "transaction_hashes": [
    "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678"
  ]
}
';


// Example: Get Balances 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://yemscan.com/api/getBalances.php?uids=123,456&tokenSymbol=YEM');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Apikey: YOUR_API_KEY', 'Customdomain: yourdomain.com', 'Pernum: 1000001234']);
$response = curl_exec($ch);
curl_close($ch);

// Example response
$response = '
{
  "balances": {
    "123": "1000.00",
    "456": "2000.00"
  }
}
';


// Example: Get Global Stats 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://yemscan.com/api/getGlobals.php');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Apikey: YOUR_API_KEY', 'Customdomain: yourdomain.com', 'Pernum: 1000001234']);
$response = curl_exec($ch);
curl_close($ch);

// Example response
$response = '
{
  "success": true,
  "message": "Global stats retrieved successfully in 5ms",
  "total_accs": 15000,
  "total_txns": 50000
}
';


// Example: Get Transaction Volume 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://yemscan.com/api/getTxnVolume.php?tokenSymbol=YEM');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Apikey: YOUR_API_KEY', 'Customdomain: yourdomain.com', 'Pernum: 1000001234']);
$response = curl_exec($ch);
curl_close($ch);

// Example response
$response = '
{
  "success": true,
  "volume_1d": 15000.25,
  "volume_7d": 105000.75,
  "message": "Transaction volume retrieved successfully in 2ms"
}
';


// Example: Get Transaction Hash Statuses 
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://yemscan.com/api/getTxnHashes.php?hashes=0xa1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678,0xb2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890,0x243347373ddb571b4794580fbd852622b2d5ac6a7c567683f5a6614fabe04a85');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Apikey: YOUR_API_KEY', 'Customdomain: yourdomain.com', 'Pernum: 1000001234']);
$response = curl_exec($ch);
curl_close($ch);

// Example response
$response = '
{
  "statuses": {
    "0xa1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678": "1",
    "0xb2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890": "2",
    "0xc3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890ab": "0"
  }
}
';


// Example: Get Asset Stats
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://yemscan.com/api/getAssetStats.php?tokenSymbol=YEM');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Apikey: YOUR_API_KEY', 'Customdomain: yourdomain.com', 'Pernum: 1000001234']);
$response = curl_exec($ch);
curl_close($ch);

// Example response
$response = '
{
    "price": "1.00",
    "wallets": 1257632
}
';
