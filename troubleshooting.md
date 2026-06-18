# Troubleshooting

Solusi error yang sering muncul.

## Login & Auth

### "Invalid credentials"
Username atau password salah. Reset via Telegram support kalau lupa.

### Login berhasil tapi dashboard kosong
Cek dev console (View → Toggle Dev Tools). Kemungkinan:
- Backend tidak running
- CORS error → backend `.env` set `CORS_ORIGIN=http://localhost:3000`

### "License expired"
Lihat **Subscription** page. Beli license baru via Telegram support.

## Wallet Management

### "No wallets found"
Belum generate wallet. **Wallets → Generate Wallets**.

### "Insufficient SOL/MON" saat distribute
Master wallet kosong. Top up master:
- Solana: kirim SOL ke master address
- Monad: kirim MON ke master Monad address

### "Failed to fetch group wallets: invalid input syntax for type uuid"
Group ID tidak valid. Pastikan pakai UUID dari Wallet Groups page, bukan random string.

### Wallet balance nggak update
RPC throttling atau cache. Refresh halaman (F5) atau klik tombol Refresh manual.

## Trading

### "Insufficient liquidity"
Token belum punya cukup pool untuk swap. Token baru / curve hampir habis. Coba kecilkan amount.

### "Slippage exceeded"
Harga gerak terlalu cepat. Naikkan tolerance:
- Pump.fun: parameter `slippage` di backend (default 15%)
- Untuk fast launch: 30-50% mungkin perlu

### TX confirm timeout
RPC slow atau congested. Pakai custom RPC paid (Helius, QuickNode) di **Settings → RPC**.

### "Transaction simulation failed"
Possible reasons:
- Gas insufficient (most common)
- Token bonding curve sudah habis tapi masih beli via curve endpoint
- Token blacklisted user

Solusi: increase gas, atau beli langsung dari DEX kalau sudah graduate.

## Volume Bot / Bump Bot

### Bot start tapi langsung error 5x → auto-stop
Cek log untuk error message:
- "RPC error" → ganti RPC
- "Insufficient balance" → distribute lebih banyak modal
- "Slippage exceeded" → naikkan slippage tolerance

### "Volume bot already running for this group"
Group ini sudah ada bot. Klik **Stop** di Active Bots dashboard, baru start ulang.

### Bot jalan tapi tidak ada transaksi
Reserve guard skip wallet kalau native balance terlalu rendah. Cek:
- Min amount > reserve threshold (0.001 SOL / 0.01 MON)
- Wallet memang ada saldo
- Lihat log message "skipped — insufficient SOL"

### Bot consume terlalu banyak SOL/MON
Adjust min/max amount ke lower range. Reserve guard maksimum 0.001 SOL / 0.01 MON cadangan, sisanya available.

## Mega Sell / Panic

### "consolidate-only" outcome
Destination address bukan wallet kamu (tidak ada private key). Mega Sell hanya consolidate, tidak sell. Set destination = wallet sendiri untuk full mega sell.

### "consolidate-done-sell-failed"
Consolidate sukses, tapi sell gagal. Reason umum:
- Slippage exceeded di sisa balance final
- Token rugged saat proses (price drop drastis)
- RPC throttle saat sell

Solusi: re-run mega sell, atau switch ke Panic specific mode.

### "nothing-to-sell"
Tidak ada token di semua wallet. Mega Sell tidak ada yang dijual. Aman.

### Panic tidak detect token saya
Token didapat dari airdrop / transfer luar (bukan via MegaBot trading). Tidak masuk `tx_history`. Workaround: do 1 manual buy small amount → token masuk history → Panic akan detect.

## Smart Sell / Auto-Sell

### Trigger nggak fire padahal harga sudah lewat target
- Cek apakah token punya price feed di DexScreener (token baru kadang nggak ada).
- Polling 10 detik, jadi delay bisa sampai 10s.
- Cek log: backend pasti emit log saat trigger fire.

### Strategi auto-disable sendiri
Lihat `completionReason`:
- `all_triggers_fired` = semua trigger sudah eksekusi (sukses)
- `manual_cancel` = kamu cancel
- `replaced_by_new` = bikin strategi baru untuk token sama, lama replaced
- `stop_loss` / `trailing_stop` / `panic_exit` = salah satu protective trigger fire (terminate strategi)

### Auto-Sell schedule hilang setelah restart
Yes, sengaja. Schedule ephemeral di memory. Smart Sell yang persistent. Re-create manual.

### Smart Sell hit timeout (60s sell timeout)
Kemungkinan RPC sangat slow atau token rugged. Cek log strategy events untuk detail.

## Server / Backend

### "Connection refused" port 4000/4001
Backend tidak running. Start:
```bash
# EVM
cd apps/server && node dist/main.js

# Solana
cd solana-bot/server && node dist/main.js
```

### "ENOTFOUND" RPC error
Internet down atau RPC URL salah. Cek `.env`:
- `MONAD_RPC_URL`
- `MEGAETH_RPC_URL`
- Solana di Settings page (per-user)

### Database connection error
Neon/Postgres down. Cek `.env` `DATABASE_URL`. Test koneksi dengan `psql` atau Neon dashboard.

### "relation does not exist"
Migrasi belum dijalankan. Run SQL files di `database/`:
- `migration-new-instance.sql` (master)
- `transaction-history-schema.sql`
- `evm-advanced-features-schema.sql` (untuk Tier 1+2 EVM)
- dll.

## Performance

### Halaman lambat / lag
1. Cek dev console untuk error
2. Cek polling interval (banyak bot active = banyak fetch)
3. Refresh hard (Ctrl+Shift+R)
4. Backend logs: cari "throttle" atau "rate limit"

### RPC throttling
Free public RPC limit ketat. Solusi:
- Solana: Helius free tier 10 req/s → upgrade ke paid
- Monad: tidak ada limit untuk satu RPC official, tapi gunakan multiple

Settings → RPC → tambahkan beberapa custom RPC. Failover otomatis.

### Many wallets, scan lambat
Per wallet × per token = 1 RPC call. 50 wallets × 5 tokens = 250 calls. 

Solusi:
- Pakai paid RPC dengan rate tinggi
- Concurrency limit di code: 8 paralel
- Throttle 300ms antar batch (Solana panic scan)

## Build / Development

### `npm run build` failed di EVM
Cek error spesifik. Common:
- TypeScript error baru → run `npx tsc --noEmit -p tsconfig.build.json`
- Missing dependency → `npm install` di `apps/server/`

### `next build` failed dengan "useSearchParams should be wrapped in suspense"
Page baru pakai `useSearchParams` tapi belum wrap di `<Suspense>`. Fix:
```tsx
function PageInner() {
  const sp = useSearchParams();
  // ...
}
export default function Page() {
  return <Suspense fallback={...}><PageInner /></Suspense>;
}
```

### Electron build gagal
Cek `electron-builder.config.js`. Run:
```bash
npm run electron:build
```

Error umum:
- Native module rebuild → `npm rebuild`
- Code signing certificate issue → skip signing untuk dev build

## Common Diagnostic Commands

### Cek server running
```bash
curl http://localhost:4000/health   # EVM
curl http://localhost:4001/health   # Solana
```

### Cek port listening
```bash
netstat -ano | findstr "4000 4001" | findstr LISTENING
```

### Run live test suite
```bash
powershell -ExecutionPolicy Bypass -File scripts/evm-live-tests.ps1
```

Akan test 36 endpoint EVM + Solana + cross-feature.

### Lihat database tables
Connect ke Neon dashboard, lihat:
- `users`, `bot_wallets` — auth + wallet
- `tx_history` — semua transaksi
- `launch_history` — token launches
- `evm_smart_sell_strategies` — Smart Sell EVM
- `evm_auto_sell_history` — Auto-Sell EVM history
- `evm_panic_history` — Panic events EVM

## Still Stuck?

1. Reproduce dengan minimal steps
2. Capture: error message, console logs, backend logs, network tab
3. Telegram @megabot_support dengan detail di atas

## See Also
- [Settings & RPC](./settings.md) — RPC tuning
- [Performance](./performance.md) — optimasi
