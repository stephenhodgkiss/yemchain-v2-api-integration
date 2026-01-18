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

### Get Balances

- **GET** `/api/getBalances.php?uids=123,456&tokenSymbol=YEM`
- Retrieves balances for specified UIDs (max 100 per request).
- Note that the function uses UID's and not Pernum's in the parameters.

### Get Global Stats

- **GET** `/api/getGlobals.php`
- Retrieves global blockchain statistics.

### Get Transaction Volume

- **GET** `/api/getTxnVolume.php?tokenSymbol=YEM`
- Retrieves transaction volume statistics for a token.

### Get Transaction Hash Statuses

- **GET** `/api/getTxnHashes.php?hashes=0xa1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef12345678,0xb2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890,0x243347373ddb571b4794580fbd852622b2d5ac6a7c567683f5a6614fabe04a85`
- Retrieves statuses for multiple transaction hashes (max 100 per request).
- Especially useful after using the createTransactions function to ensure they have been processed from the [Mempool](https://yemscan.com/mempool/1/).

**Status Codes:**
- `0`: Not found
- `1`: Failed
- `2`: Confirmed

### Get Asset Stats

- **GET** `/api/getAssetStats.php?tokenSymbol=YEM`
- Retrieves price and number of wallets holding a balance of that asset.

### Get Public Key

- **GET** `/api/getPublicKey.php?uid=12345`
- Retrieves the Ethereum public key for a specific UID.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| uid       | Yes      | The user ID to retrieve the public key for |

### Get Transaction Hash

- **GET** `/api/getTransactionHash.php?hash=0x278d9e202a17d833f05f744758c5eb423411529e90cc0e5f04aa6825c30aab6e`
- Retrieves transaction details by hash.
- The `value` field is defined as an integer, so 123 for YEM would be 1.23 YEM as it has 2 decimal places.

**Parameters:**
| Parameter | Required | Description |
|-----------|----------|-------------|
| hash      | Yes      | Transaction hash to retrieve details for |

## Rate Limits

- The API has a rate limit of 10 requests per minute per API key.

## Error Responses

The API may return the following error responses:

| Error | Description |
|-------|-------------|
| `"error": "Maximum 100 hashes allowed."` | Too many transaction hashes requested |
| `"error": "Missing hashes."` | No transaction hashes provided |
| `{"success": false, "message": "Invalid uid parameter"}` | Invalid UID parameter |
| `{"success": false, "message": "Public key not found for uid: 12345"}` | Public key not found for the specified UID |
| `null` | Invalid transaction hash |

---
