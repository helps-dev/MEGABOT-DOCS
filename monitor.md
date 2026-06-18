# Monitor Dashboard

Real-time analytics untuk satu token. Pre-launch, during pump, post-graduation.

## Apa itu Monitor?

Halaman dedicated untuk deep-dive satu token. Berbeda dari Portfolio (semua token historic) atau Positions (semua holding aktif), Monitor fokus ke **single token analysis**:
- Live price (USD + native MON/SOL)
- Market cap, liquidity, 24h volume
- Bonding curve progress (pre-graduation)
- Per-wallet PnL breakdown
- Recent buy/sell activity

## Halaman Monitor (EVM)

Sidebar → **EVM → Monitor**

Auto-poll setiap **10 detik** untuk freshness.

## Token Selector

Form di atas:
1. **Token Address** — input manual (0x...)
2. **My Launches** — quick-pick chip dari token yang kamu launch sendiri
3. **Load** button untuk fetch snapshot

Cara cepat: klik chip salah satu launch → otomatis load snapshot.

## Token Header Card

Info dasar token:
- Image (kalau ada di DexScreener)
- Name + symbol
- Status badges:
  - 🟠 **Bonding Curve · 45.2%** (kalau masih on curve)
  - ✅ **Graduated** (kalau sudah ke DEX)
  - ⚠️ **big_24h_drop** (insight flag)
  - ⚠️ **whale_activity_recent**
  - ⚠️ **near_graduation** (curve > 90%)
- Clickable address ke Monadscan
- Quick action button: 🧠 Smart Sell · ⚡ Auto-Sell

## Market Data (4 Cards)

| Metric | Description |
|---|---|
| **Price (MON)** | Harga per token dalam native chain |
| **Price (USD)** | Harga USD via DexScreener |
| **Market Cap** | FDV atau circulating MC dari DexScreener |
| **24h Change** | % perubahan 24 jam |

Lalu 3 cards tambahan:
- **Liquidity (USD)** — pool liquidity
- **24h Volume (USD)** — trading volume
- **Momentum** — UP / DOWN / FLAT (computed dari 30 sample harga terakhir)

## Bonding Curve Progress

Section khusus muncul kalau token **on curve**:
- Progress bar visual 0% → 100%
- Berdasarkan saldo bonding curve contract vs `targetTokenAmount` Nadfun

Ketika progress > 90%, badge "near_graduation" auto-active.

## PnL Section

Personal trading data untuk token ini:

| Stat | Description |
|---|---|
| **Invested** | Total MON spent (buys + launch) |
| **Realized** | Total MON received (sells) |
| **Current Holdings** | Value MON dari sisa token (live price) |
| **PnL** | Realized + Holdings - Invested |
| **Buy TXs / Sell TXs** | Transaction count breakdown |
| **Platform Fees** | ~1% Nadfun fee estimate |
| **Gas** | ~0.0005 MON × success TXs |

PnL mengkonsiderasi unrealized (sisa hold) + realized (sudah dijual). Realistic profit number.

## Recent Trades Table

30 transaksi terakhir, semua chain (buy/sell):

| Kolom | Description |
|---|---|
| When | Timestamp local time |
| Type | BUY / SELL badge |
| Wallet | Address pendek + (you) marker kalau wallet kamu |
| Amount (MON) | Native amount |
| TX | Link ke explorer |

Sort by timestamp DESC. Auto-update setiap 10 detik.

## Per-Wallet Breakdown

Tabel showing all your wallets yang punya token ini:

| Kolom | Description |
|---|---|
| Wallet | Address pendek |
| Token Balance | Berapa token di-hold |
| Value (MON) | balance × current price |
| PnL | Per-wallet split (proportional dari total invested) |

Berguna untuk identify wallet mana yang paling profit, atau wallet mana yang masih ada residual untuk panic-clean.

## Insights & Flags

System auto-detect kondisi-kondisi berikut:

### `big_24h_drop`
24h change < -25%. Possible dump in progress.

### `big_24h_pump`
24h change > +50%. Possible pump phase.

### `whale_activity_recent`
Trade > 5 MON dalam 60 detik terakhir. Whales moving.

### `near_graduation`
Bonding curve progress ≥ 90%. Token akan graduate, prepare exit strategy.

### `priceMomentum`
- `up` = harga naik > 2% dalam 30 sample window
- `down` = turun > 2%
- `flat` = stuck

Insights muncul sebagai badge di header card.

## Quick Actions

Dari halaman Monitor, langsung navigate ke:
- **Smart Sell** — set strategi dengan token pre-filled
- **Auto-Sell** — set DCA schedule
- **Panic** (kalau muncul rug flag)

## Performance

### Polling
- Snapshot fetch via `/monitor/:tokenAddress/snapshot`
- Interval: 10 detik
- Per fetch: ~1-2 detik (paralelisasi internal)

### Rate Limits
- DexScreener: 300 req/min global. In-memory cache 10s membantu.
- Bonding curve fallback: RPC read, 3 retries dengan backoff
- Per-wallet balance: 8 paralel max

### Cache
Price data cached **10 detik** di backend `NadfunPriceService`. Buka Monitor 5x dalam 10s = 1x DexScreener call.

## Smart Sell Integration

Saat halaman Monitor open, Smart Sell engine **menggunakan snapshot yang sama** untuk evaluasi trigger. Tidak ada double-fetching:

1. User pasang Smart Sell strategi
2. Engine poll setiap 10s → call `MonitorService.getSnapshot()`
3. Snapshot hit cache (kalau Monitor page sedang open) atau fetch fresh
4. Engine baca `priceMon` + `bondingCurve.progressPercent` → evaluate triggers

## Limitations

- **Monitor hanya untuk EVM (Nad.fun) saat ini.** Solana pakai page lain (Solana Monitor butuh setup terpisah).
- **Bonding curve calculation approximate.** Untuk exact MON raised, butuh event scan (deferred).
- **Recent trades dari `tx_history` user sendiri.** Tidak include trades dari user lain.
- **Token metadata cache.** Kalau DexScreener update info, butuh sampai 10 detik untuk reflect di UI.

## Use Cases

### Use Case 1: Pre-Launch Recon
Lihat token kompetitor / temen sebelum launch:
- Check liquidity, holders, momentum
- Detect whale activity
- Anticipate pump/dump pattern

### Use Case 2: Live Monitoring Saat Launch
Habis launch token sendiri:
- Pantau curve progress
- Lihat trade volume dari semua wallet kamu
- Detect ada whale buy/sell external
- Set Smart Sell strategi based on real-time data

### Use Case 3: Post-Mortem Analysis
Setelah token sold habis:
- Review per-wallet performance
- Identify wallet mana yang break-even vs profit
- Analyze market behavior (24h change, volume) untuk learnings

## Troubleshooting

**Q: Snapshot loading > 30 detik.**
A: DexScreener slow atau RPC throttled. Cek **Settings → RPC** dan tambahkan custom RPC.

**Q: Price USD selalu null.**
A: Token belum di-index DexScreener. Setelah graduate ke DEX biasanya muncul dalam 5-10 menit.

**Q: Bonding curve progress 0% padahal token sudah trading aktif.**
A: Possible kalau token sudah graduate. Cek badge "Graduated".

**Q: Recent trades cuma 5, tidak 30.**
A: Limit dari `tx_history` query (per user). Berapa banyak yang ditampilin tergantung user activity dengan token tersebut.

## See Also
- [Smart Sell](./smart-sell.md) — pasang strategi setelah analisis
- [Positions](./positions.md) — multi-token overview
- [Portfolio](./portfolio.md) — historical PnL across all tokens
