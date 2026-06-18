# Positions Management

Real-time PnL untuk semua token yang masih di-hold.

## Apa itu Positions?

Positions = snapshot **posisi terbuka saat ini**. Berbeda dari Portfolio (semua history), Positions hanya menampilkan token yang masih di wallet kamu, dengan PnL real-time.

## Summary Cards

5 kartu utama:

| Kartu | Arti |
|---|---|
| **Active** | Jumlah token yang masih dipegang |
| **Total Value** | Total value semua holding (MON/SOL) |
| **Wallets Scanned** | Berapa wallet di-scan untuk hitung positions |
| **Profitable** | Berapa token yang lagi untung |
| **Losing** | Berapa token yang lagi rugi |

Plus 2 kartu PnL kalau ada launches sendiri:
- **Total PnL** (MON/SOL absolute)
- **Total PnL %**

## Position Cards

Setiap posisi tampil card:

### Header
- Token image (kalau ada di DexScreener)
- Nama + symbol
- Badge status:
  - 🟢 **Smart Sell** = sudah ada strategi aktif untuk token ini
  - 🟠 **Bonding Curve** = token belum graduate dari curve

### Stats Grid
- **Holdings** = berapa token + di berapa wallet
- **Price (MON/SOL)** = harga per token
- **Value** = total value holding (MON/SOL)
- **24h Change** = % perubahan 24 jam (dari DexScreener)
- **PnL** = profit/loss MON + percentage

### Quick Actions (4 ikon kanan)
- 📊 **Monitor** — buka analisis detail
- 🧠 **Smart Sell** — set strategi exit
- ⚡ **Auto-Sell** — pasang DCA schedule
- 🛡️ **Panic** — emergency sell (preselect token ini)

## Auto-refresh

Halaman polling **setiap 15 detik** untuk update:
- Price
- 24h change
- Value MON/SOL
- PnL

Indikator polling tidak block UI; tampak smooth.

## Sort Order

Default sort: **highest USD value first**, posisi tanpa price feed di paling bawah.

## Data Source

### Cross-chain compatible
Reuses `PanicService.scan()` untuk find tokens (efficient, cached). Lalu enriches dengan:
1. Live price dari `NadfunPriceService` / SOL pricer
2. PnL dari `LaunchHistory` (kalau token kamu launch sendiri)
3. Smart Sell flag dari DB
4. Token metadata dari DexScreener

## "PnL Tidak Muncul"

PnL hanya hitung kalau ada **launch history** untuk token tersebut (kamu yang launch).

Kalau cuma buy doang dari pasar, PnL ditampilkan `null` karena server tidak tahu entry price kamu. Solusinya:
1. Pakai **Portfolio** page untuk PnL berdasarkan tx_history (lebih akurat untuk buyer biasa)
2. Atau pakai **Monitor** page → di-fetch entry price snapshot kalau bisa

## Pricing Missing Indikator

Banner kuning kalau ada token tanpa price feed:
> "5 tokens have no live price yet (likely fresh launches still on bonding curve)."

Reason umum:
- Token baru, belum di-index DexScreener
- Liquidity terlalu kecil untuk DexScreener parse
- DexScreener API down/slow

Token tetap muncul di list, hanya kolom price/value-nya `—`.

## Empty State

Kalau tidak ada posisi aktif:
> 🎯 No tokens currently held across your wallets.

Itu artinya semua token sudah dijual atau ditransfer keluar. Lihat **Portfolio** untuk historical view.

## Use Cases

### "Cek profit dari Smart Sell yang fired"
Smart Sell jual partial (e.g., 50%). Sisa 50% masih di wallet. Lihat di Positions:
- Holdings: half dari yang awal
- PnL: positive (sudah ambil profit di trigger 1, masih hold)

### "Audit setelah test launch"
Habis test launch, mau pastikan token sudah keluar dari semua wallet:
- Buka Positions
- Token yang baru launch tidak boleh muncul (sudah sell habis)
- Kalau muncul, klik Panic untuk kosongkan

### "Quick exit dari panic state"
- Buka Positions
- Klik 🛡️ Panic di salah satu token
- Halaman Panic auto-select token tersebut
- Klik Panic Sell Selected → selesai

## Performance Notes

- Wallet scan menggunakan `tx_history` sebagai hint (token addresses yang pernah disentuh user)
- Tidak scan setiap ERC20 di setiap wallet — itu mahal banget
- Scan cache 60 detik di backend

Kalau punya token yang dapat dari airdrop / transfer dari luar (bukan dari trading lewat MegaBot), token itu **tidak akan muncul** karena tidak ada di tx_history.

Workaround: do 1 manual buy small amount → token masuk history → Positions akan detect.

## See Also
- [Portfolio](./portfolio.md) — historical view + sold tokens
- [Smart Sell](./smart-sell.md) — pasang strategi exit
- [Panic](./panic.md) — emergency exit
- [Monitor](./monitor.md) — deep dive per token
