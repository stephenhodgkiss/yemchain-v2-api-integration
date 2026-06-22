# YEM Blockchain API Integration

This repository provides documentation and example code for integrating with the YEM blockchain API. The API supports balance queries, batched transaction creation, global stats, volume statistics, asset statistics, public key retrieval, and transaction details.

See the GITHUB REPOSITORY at YEM Blockchain API Integration for more information.

If you need access or to request a higher rate limit, please contact us at [YEM Foundation Support](https://yem-foundation.org) by submitting a ticket. Make sure you specify that you want it for the YEMChain V2.0.

## Authentication

All endpoints require authentication via HTTP headers.

| Header          | Description                | Example                                 |
|-----------------|---------------------------|------------------------------------------|
| Apikey          | Your API key              | pk_live_d7fbe6aea9a2b61c8c0cbd18225ec126 |
| Customdomain    | Your domain               | yourdomain.com                           |
| Pernum          | UID + 1000000000          | 1234 + 1000000000 = 1000001234           |

## Endpoints

### Create Transactions

- **POST** `/api/createTransactions.php`
- Create multiple transactions in a batch (max 100 per request).
- Note that the function uses UID's and not Pernum's in the parameters.
- The `value` is the amount of the ASSET including decimals and always expressed as an integer. Example for asset YEM: 1234 is actually 12.34 YEM
- Optional fields: `from_curr` and `to_curr` (default to 'CHF' if not provided)
- API key level 2 restricts transactions to the authorized Pernum (from_uid or to_uid must match)
- Asset-restricted API keys will reject batches containing non-matching assets

### Get Balances

- **GET** `/api/getBalances.php?uids=123,456&tokenSymbol=YEM`
- Retrieves balances for specified UIDs (max 100 per request).
- Note that the function uses UID's and not Pernum's in the parameters.

### Get Global Stats

- **GET** `/api/getGlobals.php`
- Retrieves global blockchain statistics including total accounts, total transactions, and YEM price.

**Response Fields:**
- `success`: Boolean indicating success
- `total_accs`: Total number of accounts
- `total_txns`: Total number of transactions
- `price`: Current YEM price
- `message`: Error message if failed

### Get Transaction Volume

- **GET** `/api/getTxnVolume.php?tokenSymbol=YEM`
- Retrieves transaction volume statistics including 1d/7d volumes, number of addresses, balances, transaction count, and cache status.
- Uses dual-cache (APCu + Redis) with 300s TTL.

**Response Fields:**
- `success`: Boolean indicating success
- `volume_1d`: 24-hour volume
- `volume_7d`: 7-day volume
- `num_addresses`: Number of unique addresses
- `balances`: Balance data
- `transaction_count`: Total transaction count
- `cacheHit`: Boolean indicating if result came from cache

### Get Transaction Hash Statuses

- **GET** `/api/getTxnHashes.php?hashes=0xa1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678,0xb2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890`
- Retrieves statuses for multiple transaction hashes (max 100 per request).
- Especially useful after using the createTransactions function to ensure they have been processed from the [Mempool](https://yemscan.com/mempool/1/).

**Status Codes:**
- `0`: Not found
- `1`: Failed
- `2`: Confirmed

**Response Format:**
```json
{
  "statuses": {
    "a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678": "2",
    "b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890": "1"
  }
}
```

Note: Response keys are lowercase hashes without the 0x prefix.

### Get Asset Stats

- **GET** `/api/getAssetStats.php?tokenSymbol=YEM`
- Retrieves price and number of wallets holding a balance of that asset.
- Uses dual-cache (APCu + Redis) with 45s TTL.

**Response Fields:**
- `price`: Current asset price
- `wallets`: Number of wallets holding the asset

### Get Public Key

- **GET** `/api/getPublicKey.php?uid=12345`
- Retrieves the Ethereum address for a specific UID.
- Note: Requires API level 3 access.
- **Requires API level 3 or higher.**

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| uid       | Yes      | The user ID to retrieve the public key for |

**Response Fields:**
- `success`: Boolean indicating success
- `address`: The Ethereum public key address

**Error Responses:**
```json
{"success": false, "message": "Invalid uid parameter"}
```
```json
{"success": false, "message": "Public key not found for uid: 12345"}
```

### Get Transaction Hash

- **GET** `/api/getTransactionHash.php?hash=0x278d9e202a17d833f05f744758c5eb423411529e90cc0e5f04aa6825c30aab6e`
- Retrieves transaction details by hash.
- Uses dual-cache (APCu + Redis) with 30s TTL.
- The `value` field is defined as an integer, so 123 for YEM would be 1.23 YEM as it has 2 decimal places.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| hash      | Yes      | Transaction hash to retrieve details for |

**Response Fields:**
- `hash`: Transaction hash
- `blockNumber`: Block number
- `gas`: Gas used
- `gasPrice`: Gas price
- `gasLimit`: Gas limit
- `burntFees`: Burnt fees
- `from`: Sender address
- `to`: Recipient address
- `from_uid`: Sender UID
- `to_uid`: Recipient UID
- `reason`: Transaction reason text
- `reasonCode`: Reason code
- `value`: Transaction value (integer with asset decimals)
- `onchaindata`: Additional on-chain data
- `asset`: Asset symbol
- `timestamp`: Unix timestamp
- `status`: Transaction status (true/false)
- `failedText`: Failure text if failed
- `cacheHit`: Boolean indicating if result came from cache

**Error Response for invalid hash:**
```
null
```

### Get Transactions

- **GET** `/api/getUserTransactionsExternal.php?uid=12345&limit=10&offset=0`
- Retrieves transactions for a specific UID with pagination support.
- Uses dual-cache (APCu + Redis) with 3600s TTL for individual transactions.
- Returns transactions where the UID is either the sender or receiver.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| uid       | Yes      | The user ID to retrieve transactions for |
| limit     | No       | Number of transactions to return (default: 20) |
| offset    | No       | Pagination offset (default: 0) |

**Response Fields:**
- `hash`: Transaction hash
- `blockNumber`: Block number
- `gas`: Gas used
- `gasPrice`: Gas price
- `gasLimit`: Gas limit
- `burntFees`: Burnt fees
- `from_uid`: Sender UID
- `to_uid`: Recipient UID
- `reason`: Transaction reason text
- `reasonCode`: Reason code
- `value`: Transaction value (integer with asset decimals)
- `asset`: Asset symbol
- `timestamp`: Unix timestamp
- `status`: Transaction status (true/false)
- `failedText`: Failure text if failed

**Notes:**
- The response excludes the `from`, `to`, and `onchaindata` fields from each transaction
- Transactions are ordered by ID in descending order (newest first)

## Rate Limits

- The API has a rate limit of 10 requests per minute per API key.

## Error Responses

The API may return the following error responses:

| Error | Description |
|-------|-------------|
| `"error": "Maximum 100 hashes allowed."` | Too many transaction hashes requested |
| `"error": "Missing hashes."` | No transaction hashes provided |
| `"error": "Maximum 100 UIDs allowed."` | Too many UIDs requested |
| `"error": "Missing UIDs or tokenSymbol."` | Required parameters missing |
| `{"success": false, "message": "Invalid uid parameter"}` | Invalid UID parameter |
| `{"success": false, "message": "Public key not found for uid: 12345"}` | Public key not found for the specified UID |
| `null` | Invalid transaction hash |
| HTTP 400 | Access denied: API level too low for function |
| HTTP 403 | Access denied: asset restricted |

---
