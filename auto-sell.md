# Auto-Sell Triggers

DCA-out scheduler. Jual bertahap tanpa pantau pasar.

## Apa itu Auto-Sell?

Berbeda dengan Smart Sell (kondisi-based), Auto-Sell jadwal berbasis waktu:
- Jual 50% dari holding
- Dipecah jadi 5 step (10% per step)
- Setiap 10 menit
- Total durasi: 50 menit

Bot akan auto-execute setiap step di interval, tanpa peduli harga.

**Optional**: bisa pasang **price trigger** — bot tunggu sampai harga naik X% baru mulai DCA.

## 2 Mode

### Mode 1: Time-Based (default)

Sell langsung mulai, terjadwal interval.

**Use case:**
- Token sudah profit, mau DCA out perlahan biar nggak crash harga
- Distribusi tekanan jual ke beberapa block

**Contoh:**
```json
{
  "tokenAddress": "0x123...",
  "totalPercentage": 50,
  "steps": 5,
  "intervalSec": 600
}
```
→ Sell 10% setiap 10 menit selama 50 menit total.

### Mode 2: Price-Trigger

Tunggu harga naik X% dari entry, baru mulai DCA.

**Use case:**
- "Kalau token nanti naik 50%, baru mulai keluar"
- Combine dengan Smart Sell: SS untuk panic + take profit, AS untuk DCA standar

**Contoh:**
```json
{
  "tokenAddress": "0x123...",
  "totalPercentage": 100,
  "steps": 10,
  "intervalSec": 300,
  "priceTriggerPct": 50
}
```
→ Tunggu harga naik 50% dari entry. Kemudian sell 10% setiap 5 menit, total 100% dalam 50 menit.

## Cara Pakai

### Step 1: Buka Halaman

Sidebar → **Auto-Sell** (di EVM Tools atau Solana Tools)

### Step 2: New Schedule

Klik **+ New Schedule** di kanan atas.

### Step 3: Isi Form

| Field | Description |
|---|---|
| Token Address | 0x... untuk EVM, Mxxx... untuk Solana |
| Wallet Group | Optional. Default = semua wallet user |
| Total Sell % | 1-100. Berapa total yang mau dijual |
| Steps | 1-50. Dipecah jadi berapa step |
| Interval (sec) | 5-86400. Jeda antar step (5 detik - 24 jam) |
| Price Trigger | Optional. Aktifkan + isi % untuk Mode 2 |

### Step 4: Quick Presets

Tombol cepat di bawah form:
- **50% over 5 steps × 10min** — DCA standard
- **100% over 10 steps × 5min** — exit cepat (50 min total)
- **25% over 5 steps × 30min** — partial exit pelan (2.5 jam)
- **Wait +50%, then 50% over 3 steps** — price-trigger mode

Klik preset → form auto-fill → bisa di-tweak sebelum create.

### Step 5: Create

Klik **Create Schedule** → bot mulai (atau tunggu trigger kalau price-mode).

## Active Schedules Dashboard

Halaman utama Auto-Sell tampil:
- Status badge: 🟡 Waiting trigger / 🟢 Active 3/5
- Total %, steps, interval, price trigger
- Progress bar visual
- Total MON/SOL received so far
- Tombol **Cancel**

Polling 10 detik untuk auto-update.

## Cancel Schedule

Klik **Cancel** → tidak bisa di-undo.

Step yang sudah complete tetap final. Step yang belum jalan dihentikan.

## History Persistence

✅ Setiap schedule yang complete/cancelled disimpan di DB:
- Token address
- Total %, steps, steps completed
- Total MON/SOL received
- Status: `completed` / `cancelled`

Lihat di tab **History** halaman Auto-Sell.

⚠️ **Schedule active TIDAK survive server restart.** Kalau backend mati di tengah jalan, schedule hilang dari memory. Re-create manual setelah restart.

(Smart Sell beda — itu strategi-nya persistent.)

## Best Practices

### Use Case 1: Pelan-pelan exit dari token besar
```
Total: 100%
Steps: 20
Interval: 1800 (30 menit)
→ Total durasi: 10 jam
```

### Use Case 2: Quick scalp exit
```
Total: 100%
Steps: 5
Interval: 60
→ Total durasi: 5 menit
```

### Use Case 3: Wait then DCA
```
Total: 75%
Steps: 5
Interval: 600 (10 menit)
Price Trigger: +75%
→ Tunggu profit 75%, lalu DCA out 75% dalam 50 menit
```

## Combine dengan Smart Sell

Bisa pakai **dua-duanya bersamaan** untuk satu token:

| Smart Sell | Auto-Sell |
|---|---|
| Trigger: harga / curve / panic | Trigger: time / price-once |
| Conditional logic | Predictable schedule |
| Stop loss otomatis | Steady DCA |
| Bisa fire kapan saja | Linear waktu |

**Combo bagus:**
- **Smart Sell** untuk panic exit + stop loss + take-profit di +200%
- **Auto-Sell** untuk steady DCA 50% dalam 1 jam

Keduanya jalan paralel. Smart Sell handle emergency, Auto-Sell handle distribusi.

## Validasi

- `totalPercentage`: 1-100
- `steps`: 1-50
- `intervalSec`: 5-86400 (5 sec - 24 jam)
- `priceTriggerPct`: optional, must be > 0
- Token address valid format chain (0x... atau base58 SOL)

## Sell Mechanism

Auto-Sell pakai endpoint `bundleSell()` (sama yang dipakai tab Trade). Dari semua wallet user, jual sesuai `percentPerStep` per step.

Kalau satu step gagal (e.g., gas insufficient), step berikutnya tetap jalan. Tidak abort schedule.

## Troubleshooting

**Q: Schedule jalan tapi step pertama gagal.**
A: Cek MON/SOL balance di wallet untuk gas. Top up master, redistribusi.

**Q: Price trigger tidak fire padahal harga sudah naik 50%+.**
A: Pastikan token traded di DexScreener. Token baru kadang nggak ada price feed dalam 5-10 menit pertama.

**Q: Schedule hilang setelah server restart.**
A: Yes, sengaja. Auto-Sell adalah ephemeral schedule. Untuk persistence, pakai Smart Sell.

**Q: Bisa edit schedule yang sudah running?**
A: Tidak. Cancel dan create baru. Step yang sudah complete tidak akan diulang.

## See Also
- [Smart Sell](./smart-sell.md) — kondisi-based, persistent
- [Mega Sell](./mega-sell.md) — sekali tembak, semua sekaligus
- [Panic](./panic.md) — exit darurat manual
