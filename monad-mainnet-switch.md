# Monad Network Configuration

Panduan untuk mengubah network Monad yang digunakan backend.

## Status Network

| Network | Chain ID | Status di Codebase | Default? |
|---|---|---|---|
| `mainnet` | 143 | ✅ Live, Nad.fun deployed, **canonical & production** | ✅ Default |
| `testnet` | 10143 | ⚠️ Placeholder addresses (Nad.fun belum deploy testnet) | ❌ |
| `devnet` | 20143 | 🛠️ Sandbox transient, tidak ada deployment Nad.fun | ❌ |

**MAINNET adalah default dan satu-satunya network yang sudah live.** Nad.fun official launchpad ada di mainnet dan sudah berjalan baik untuk launch + bundler + trading.

Testnet dan devnet ada di code base sebagai opsi infrastruktur kalau suatu saat Nad.fun deploy di sana, tapi saat ini placeholder.

## Verify Network Saat Ini

### Backend health endpoint
```bash
curl http://localhost:4000/health
```

Default response (mainnet):
```json
{
  "status": "ok",
  "monad": {
    "network": "mainnet",
    "chainId": 143,
    "explorerUrl": "https://monadscan.com",
    "nadfunReady": true
  }
}
```

`nadfunReady: true` → contract addresses real, bisa trade. ✅
`nadfunReady: false` → placeholder, trade akan fail. ❌

### Frontend visual indicator

Header app menampilkan badge:
- 🟢 **MONAD MAINNET** (default, real trading)
- 🟡 **MONAD TESTNET** (kalau Nad.fun deploy testnet, dan kamu set MONAD_NETWORK=testnet)
- 🔴 **NADFUN PLACEHOLDER (...)** (kalau pilih network yang Nad.fun belum deploy)

## Default Configuration (Tidak Perlu Diubah)

`apps/server/.env`:
```env
MONAD_RPC_URL=https://rpc.monad.xyz
MONAD_NETWORK=mainnet
```

Ini config yang Anda pakai dari awal. Launch + bundler + trading semua jalan baik di mainnet.

## Switch ke Testnet (Hanya Jika Nad.fun Deploy Testnet)

Kalau suatu saat Nad.fun publish kontrak testnet:

### Step 1: Update contract addresses

File: `packages/engine/src/config/nadfun.ts`

Replace `NADFUN_ADDRESSES.testnet` zeros dengan addresses real dari Nad.fun testnet:

```typescript
testnet: {
  dexFactory: '0xACTUAL_TESTNET_DEX_FACTORY',
  wmon: '0xACTUAL_TESTNET_WMON',
  bondingCurveRouter: '0xACTUAL_TESTNET_ROUTER',
  bondingCurve: '0xACTUAL_TESTNET_CURVE',
  dexRouter: '0xACTUAL_TESTNET_DEX_ROUTER',
  lens: '0xACTUAL_TESTNET_LENS',
},
```

### Step 2: Update `.env`

```env
MONAD_NETWORK=testnet
MONAD_RPC_URL=https://testnet-rpc.monad.xyz
```

### Step 3: Rebuild + restart

```bash
cd packages/engine && npm run build
cd ../../apps/server && npm run build
node dist/main.js
```

### Step 4: Verifikasi

```bash
curl http://localhost:4000/health
# Should show: "network": "testnet", "chainId": 10143, "nadfunReady": true
```

Frontend badge berubah jadi 🟡 **MONAD TESTNET**.

## Wallet Compatibility

✅ **Wallet seed/keys 100% compatible** lintas network. Address EVM kamu sama di:
- Monad mainnet (chainId 143)
- Monad testnet (chainId 10143)
- Monad devnet (chainId 20143)
- Ethereum mainnet, BSC, Polygon, Arbitrum, dll.

Tapi **saldo MON di setiap network terpisah**. MON di testnet ≠ MON di mainnet (testnet MON gratis dari faucet, mainnet MON real value).

Transaksi yang di-sign untuk satu network akan **ditolak di network lain** (post-EIP-155 protection).

## FAQ

### Q: Saya pakai mainnet selama ini, perlu apa-apa?
A: **Tidak perlu apa-apa.** Default tetap mainnet. Config Anda yang lama sudah benar dan tetap berjalan.

### Q: Kapan saya butuh switch ke testnet?
A: Hanya kalau Nad.fun publish kontrak testnet untuk QA, dan kamu mau test fitur baru tanpa risiko dana real. Sampai itu terjadi, **stay di mainnet**.

### Q: Bagaimana saya tahu Nad.fun sudah ada di testnet/devnet?
A: Cek announcement resmi dari https://nad.fun atau Telegram channel mereka. Atau test endpoint testnet RPC dengan call `eth_chainId` untuk konfirmasi.

### Q: Kenapa code support testnet/devnet kalau Nad.fun belum deploy?
A: **Future-proofing.** Kalau nanti Nad.fun deploy testnet, kamu cuma perlu update 6 addresses dan flip 1 env var. Tidak perlu refactor besar.

### Q: Apa default chain ID 143 atau 10143?
A: **143 (mainnet)**. Code lama Anda sudah benar pakai 143.

## Pre-existing Address Reference

Untuk audit/dokumentasi, ini addresses Nad.fun mainnet yang sudah live:

| Contract | Address |
|---|---|
| dexFactory | `0x6B5F564339DbAD6b780249827f2198a841FEB7F3` |
| wmon | `0x3bd359C1119dA7Da1D913D1C4D2B7c461115433A` |
| bondingCurveRouter | `0x6F6B8F1a20703309951a5127c45B49b1CD981A22` |
| bondingCurve | `0xA7283d07812a02AFB7C09B60f8896bCEA3F90aCE` |
| dexRouter | `0x0B79d71AE99528D1dB24A4148b5f4F865cc2b137` |
| lens | `0x7e78A8DE94f21804F7a17F4E8BF9EC2c872187ea` |

Verify di https://monadscan.com.

## Internal Architecture

```
[apps/server/.env: MONAD_NETWORK=mainnet (default)]
       │
       ▼
[packages/engine/src/config/monad.ts]
   • resolveMonadNetwork() — reads env, default 'mainnet'
   • buildMonadChain() — defineChain dengan RPC list
   • monad — default exported chain instance
       │
       ▼
[packages/engine/src/config/nadfun.ts]
   • NADFUN_ADDRESSES.mainnet — real Nad.fun mainnet contracts
   • NADFUN_ADDRESSES.testnet/devnet — placeholder zeros
   • NADFUN_CONFIG — backward-compat single object,
     resolved at module load. Falls back to mainnet addresses
     if active network has placeholders (so existing code paths don't break).
       │
       ▼
[apps/server/src/main.ts]
   • Boot log: "Monad network: mainnet (chainId 143)"
   • /health endpoint exposes network info
   • Warning kalau active network punya placeholder addresses
       │
       ▼
[apps/client → NetworkBadge.tsx]
   • Polls /health setiap 30s
   • Renders badge di header (green=mainnet, amber=testnet, red=placeholder)
```

## See Also
- [Getting Started](./getting-started.md)
- [Settings & RPC](./settings.md)
- [Troubleshooting](./troubleshooting.md)
