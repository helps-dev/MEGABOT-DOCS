# Smart Sell Strategy

Strategi exit otomatis. Set sekali, bot jual sendiri saat kondisi terpenuhi.

## Apa itu Smart Sell?

Bayangkan kamu beli token X dengan harga 1 MON per token. Tanpa Smart Sell:
- Kamu harus pantau harga 24/7
- Kalau mata lengah saat harga turun 50%, rugi besar
- Kalau harga naik 200% tapi kamu tidur, profit hilang saat turun lagi

Dengan Smart Sell:
- Pasang aturan **"jual 50% saat naik 50%, jual 50% saat naik 100%, stop loss -30%"**
- Bot pantau harga setiap 10 detik
- Saat trigger fired, bot jual otomatis dari semua wallet kamu

## 6 Trigger Types

### 1. Price Target (jual saat untung X%)
**Kapan pakai:** ambil profit di harga target
- Sell 50% di +50% → kunci modal awal
- Sell 50% di +100% → ambil profit double
- Sisanya hold untuk moonshot

**Contoh:**
```
type: "price_target"
sellPct: 50
triggerPct: 50    // jual 50% holding saat harga naik 50%
```

### 2. Stop Loss (jual saat rugi X%)
**Kapan pakai:** batasi kerugian saat harga jeblok
- Stop loss -30% → maksimum rugi 30%
- Wajib di setiap strategi

**Contoh:**
```
type: "stop_loss"
sellPct: 100
triggerPct: -30   // jual 100% saat harga turun 30%
```

⚠️ `triggerPct` harus **negatif** untuk stop loss.

### 3. Graduation (jual saat curve hampir penuh)
**Kapan pakai:** Pump.fun / Nad.fun token, sebelum token graduate ke DEX
- Saat curve 80% atau market cap 50 SOL → jual 50%
- Setelah graduate, harga sering turun karena LP locked

**Contoh:**
```
type: "graduation"
sellPct: 50
graduationPct: 80    // jual saat bonding curve 80% (Nad.fun)
```

Untuk Solana Pump.fun pakai `graduationMcSol: 50` (market cap 50 SOL).

### 4. Time Decay (jual kalau sideways terlalu lama)
**Kapan pakai:** kalau harga flat 15+ menit, kemungkinan trend habis
- Cocok untuk scalper

**Contoh:**
```
type: "time_decay"
sellPct: 50
flatMinutes: 15    // jual 50% kalau harga flat (<2% change) selama 15 menit
```

### 5. Trailing Stop (jual saat drop dari peak)
**Kapan pakai:** ride pump tanpa kehilangan profit di pullback
- Aktivasi setelah profit +50% misalnya
- Lalu kalau harga turun 30% dari peak, jual semua

**Contoh:**
```
type: "trailing_stop"
sellPct: 100
trailPct: 30              // jual saat harga turun 30% dari peak
trailActivateAtPct: 50    // armed setelah profit +50%
```

**Cara kerja:**
1. Beli di harga 1 MON
2. Harga naik ke 1.5 MON (+50%) → trailing armed
3. Harga lanjut naik ke 3 MON → peak update
4. Harga turun ke 2.1 MON (drop 30% dari peak 3) → bot jual semua

### 6. Panic Exit (jual saat dump cepat)
**Kapan pakai:** deteksi rug atau dump cepat
- Drop 35% dalam 60 detik = panic, jual semua

**Contoh:**
```
type: "panic_exit"
sellPct: 100
panicDropPct: 35
panicWindowSec: 60    // drop 35% dalam 60s = panic
```

## 6 Built-in Presets

### Conservative
**Aman, kunci profit cepat**
- 50% sell at +50%
- 50% sell at +100%
- Stop loss -30%

### Balanced
**DCA out, simpan 25% buat moon**
- 25% at +50%, +100%, +200% (75% total)
- Stop loss -40%
- Sisa 25% dipertahankan

### Aggressive
**Ride sampai graduation**
- 30% at +200%
- 50% at curve 80%
- Stop loss -50%

### Scalper
**Quick flip**
- 50% at +25%
- 50% at +50%
- Time decay flat 15min → jual 50%
- Stop loss -20%

### Pro Trader
**Ladder + trailing stop**
- 25% at +50%, +100%
- Trailing 30% setelah +75% profit
- Panic exit -35% dalam 60s
- Stop loss -40%

### Diamond Hands
**Hold for moonshot**
- 10% at +100%, 20% at +300%, 20% at +500%
- Trailing 40% setelah +200% profit
- Panic exit -50% dalam 120s

## Cara Pakai Smart Sell

### Method 1: Lewat Halaman Smart Sell

1. Sidebar → **Smart Sell** (di EVM Tools atau Solana Tools)
2. Klik salah satu **preset** → otomatis isi nama, deskripsi, triggers
3. Masukkan **token address**
4. Pilih **wallet group** (opsional, default semua wallet)
5. Klik **Create Strategy**

Bot mulai monitor. Bisa lihat status di list "Active Strategies".

### Method 2: Lewat Quick Action di Positions

1. Sidebar → **Positions**
2. Token row → klik icon Brain (🧠)
3. Halaman Smart Sell auto-isi token address

### Method 3: Custom Trigger

1. Smart Sell page → **New Strategy**
2. Masukkan name + token
3. Klik **+ Add** untuk add trigger
4. Pilih type → isi parameter
5. Tambahkan sebanyak yang mau (max 10 triggers per strategi)
6. Validasi otomatis: total non-protective sellPct tidak boleh > 100%

## Aturan Validasi

- `sellPct`: 1-100
- `price_target.triggerPct`: positive (>0)
- `stop_loss.triggerPct`: negative (<0)
- `graduation.graduationPct`: 1-100
- `time_decay.flatMinutes`: > 0
- `trailing_stop.trailPct`: 1-99
- `panic_exit.panicDropPct`: 1-99, `panicWindowSec`: 5-600
- Total sellPct dari `price_target` + `graduation` + `time_decay` ≤ 100%
- Stop loss / trailing / panic boleh 100% (mereka protective triggers)

## Polling & Performance

- Bot baca harga **setiap 10 detik** dari DexScreener (USD + native)
- Fallback ke bonding curve quote kalau DexScreener belum punya data
- In-memory price cache 10s — tidak hammering API
- Polling tidak block UI

## Persistence

✅ **Strategi survive server restart.** Saat backend boot ulang, semua strategi `is_active=true` dimuat ulang dari DB dan monitoring resume.

⚠️ Tapi **price history dan peak prices reset.** Trailing stop dan panic exit perlu beberapa siklus polling untuk warm up lagi setelah restart.

## Cancel Strategi

- Klik **Cancel** di list active
- Atau dari Quick Action di Positions → trash icon
- DB record tetap (untuk audit) tapi `is_active=false`, monitoring stop

## Lihat Audit History

Setiap kali trigger fire, event di-log:
- Trigger type, index, time fired
- Price MON saat firing
- PnL %
- Wallets attempted vs success
- Total MON received
- TX hashes

Lihat di **Smart Sell → klik strategi → tab Events**.

## Best Practices

1. **Selalu pasang stop loss.** Bahkan kalau pakai trailing/panic, stop loss adalah safety net.
2. **Test dengan jumlah kecil dulu.** Pakai 1 wallet dengan modal kecil untuk validate strategi.
3. **Conservative untuk pemula.** Jangan langsung Diamond Hands kalau belum paham trailing stop.
4. **Pro Trader untuk launch sendiri.** Ladder + trailing kombinasi bagus untuk token yang kamu launch.
5. **Tidak bisa edit strategi.** Mau ganti? Cancel dulu, create baru. (DB design ini intentional untuk audit clarity.)

## Kombinasi Bagus

### "I'm AFK All Day"
```
Balanced preset + automatic Auto-Sell trigger fallback
```

### "I Just Launched a Token"
```
Pro Trader preset → ladder lock profit awal + trailing untuk pump
```

### "Token Looks Risky"
```
Conservative preset + lower stop loss (-20%) + pasang Panic Exit -25%/30s
```

## Limitations

- Maksimum **10 triggers per strategi**
- Maksimum **1 strategi aktif per (user, token)** — strategi baru replace yang lama
- Stop loss hanya 1 yang aktif (yang fire pertama menutup strategi)
- Time decay reset window setelah trigger fire — tidak loop

## Troubleshooting

**Q: Trigger nggak fire padahal harga sudah lewat target.**
A: Cek apakah price polling jalan. Kemungkinan DexScreener belum punya data untuk token baru. Tunggu 5-10 menit setelah graduate.

**Q: Bot keluar terlalu cepat di trailing stop.**
A: Naikkan `trailActivateAtPct` (misalnya 100% bukannya 50%). Trailing baru armed setelah profit lewati threshold.

**Q: Strategi disable sendiri.**
A: Lihat `completionReason` di DB. Kemungkinan `all_triggers_fired` (selesai), `manual_cancel`, `replaced_by_new`, atau salah satu `stop_loss`/`trailing_stop`/`panic_exit` fire (terminate strategi).

## See Also
- [Auto-Sell](./auto-sell.md) — DCA exit terjadwal (lebih simple)
- [Panic](./panic.md) — exit darurat manual
- [Monitor](./monitor.md) — pantau token sebelum/sesudah pasang Smart Sell
