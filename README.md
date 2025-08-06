# YEM Blockchain API Integration

This repository provides documentation and example code for integrating with the YEM blockchain API. The API supports balance queries, batched transaction creation, global stats, and volume statistics.

If you need access or to request a higher rate limit, please contact us at [YEM Foundation Support](https://yem-foundation.org) by submitting a ticket.

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

### Get Asset Stats
- **GET** `/api/getAssetStats?tokenSymbol=YEM
- Retrieves price and number of wallets holding a balance of that asset

## Rate Limits

- The API has a rate limit of 10 requests per minute per API key.

---
