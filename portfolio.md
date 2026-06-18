# Portfolio Tracking

PnL agregat untuk semua token yang pernah ditradekan.

## Apa itu Portfolio?

Portfolio adalah view sejarah lengkap trading kamu di satu chain (Solana atau Monad). Berbeda dari Positions (hanya posisi aktif yang masih di-hold), Portfolio menampilkan **semua token yang pernah disentuh**, termasuk yang sudah di-sell habis.

## Halaman Portfolio

Sidebar:
- **Solana → Portfolio** untuk Solana data
- **EVM → Portfolio** untuk Monad/Nad.fun data

## Summary Cards

4 kartu di atas:

| Kartu | Arti |
|---|---|
| **Total Invested** | Total MON/SOL yang pernah di-spend untuk buy/launch |
| **Realized + Current** | Total MON/SOL diterima dari sell + value sekarang dari holding |
| **PnL (absolute)** | Realized + Current minus Invested |
| **PnL %** | Persentase PnL terhadap Invested |

Hijau = profit, Merah = rugi.

## Token Table

Daftar semua token, sort by last activity (terbaru di atas).

| Kolom | Arti |
|---|---|
| Token | Nama + symbol + clickable address ke explorer |
| Invested | Total MON/SOL spent untuk token ini |
| Realized | MON/SOL yang sudah di-recover dari sell |
| Current Value | Estimasi value MON/SOL untuk holding sekarang (live price) |
| PnL | (Realized + Current) - Invested |
| PnL % | PnL / Invested × 100 |
| Wallets | Berapa wallet kamu masih hold token ini |
| Actions | Quick links: Monitor, Smart Sell |

### Kolom "Wallets"
- 0 = sudah jual habis dari semua wallet
- 1+ = masih ada di wallet, kemungkinan belum exit penuh

### Quick Actions Per Token
- 🎯 **Monitor** → buka analisis detail token (price, curve, recent trades)
- 🧠 **Smart Sell** → set strategi exit untuk token ini

## Data Source

### Solana Portfolio
- Reads dari `sol_tx_history` (Postgres)
- Live price dari Bags API quote (1 token → SOL output)
- Update setiap user buka halaman + click Refresh

### Monad/EVM Portfolio
- Reads dari `tx_history` (Postgres)
- Live price dari `NadfunPriceService` — DexScreener primary, bonding curve fallback
- Token balance per wallet dari `NadFunProvider.getTokenBalance` (RPC call)
- Cache price 10 detik

## Performance

⚠️ EVM Portfolio bisa lambat untuk user dengan banyak wallet × banyak token. Reason:
- Per wallet × per token = 1 RPC call balance
- 50 wallets × 5 tokens = 250 RPC calls

Optimasi yang sudah dilakukan:
- Concurrency limit 8 paralel
- Skip wallet dengan zero balance dari history hint
- Cache price antara token

Kalau tetap lambat, lihat **Settings → RPC** dan tambahkan custom RPC.

## Lightweight Summary Mode

Endpoint `/portfolio/summary` adalah **DB-only** (tidak hit RPC). Cocok untuk dashboard widget. Cuma kasih total invested, realized, count tokens — tanpa current value live.

Endpoint `/portfolio/tokens` adalah **full** (hit RPC). Cocok untuk halaman dedicated.

## Limitations

- **Tidak track NFT.** Cuma fungible tokens (SPL token, ERC20).
- **Tidak track LP positions.** Kalau kamu staking token di farm, itu nggak muncul.
- **Price akurasinya sekitar 1-2%.** Quote 1 token to native, slippage di pool gede mungkin nggak akurat untuk holding besar.
- **Cross-chain bukan satu view.** Solana vs EVM = 2 halaman terpisah. Lihat Dashboard untuk overview gabungan.

## Tombol Refresh

Klik 🔄 di kanan atas. Akan re-fetch:
- Tx history (DB)
- Live prices (DexScreener / quote)
- Token balances per wallet (RPC)

Kalau token punya banyak holdings, bisa 5-15 detik untuk full refresh. Loading spinner indikator.

## See Also
- [Positions](./positions.md) — hanya posisi aktif, real-time PnL
- [Monitor](./monitor.md) — deep dive per token
- [History](./history.md) — raw transaction list
