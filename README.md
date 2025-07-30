# YEM Blockchain API Integration

This repository provides documentation and example code for integrating with the YEM blockchain API. The API supports balance queries, batched transaction creation, global stats, and volume statistics.

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

## Rate Limits

- The API has a rate limit of 10 requests per minute per API key. If you need a higher rate limit, please contact us.

---
