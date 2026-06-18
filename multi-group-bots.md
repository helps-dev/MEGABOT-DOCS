# Multi-Group Bots

Jalankan banyak Volume Bot atau Bump Bot bersamaan, masing-masing di wallet group berbeda.

## Apa itu Multi-Group?

**Single-group** (model lama):
- 1 user = 1 volume bot maksimum
- Mau jalan 2 token? Stop dulu yang ada, baru start yang baru
- Tidak bisa parallel

**Multi-group** (model baru):
- 1 user = multiple bots, asal di wallet group berbeda
- Setiap group jadi "container" — punya wallet sendiri, config sendiri
- Bot-bot independent, stop salah satu tidak ganggu yang lain

## Konsep Wallet Groups

Wallet Groups = label untuk organize wallet. Misalnya:
- **Group "Pump Token A"** — 5 wallet untuk push token A
- **Group "Pump Token B"** — 10 wallet untuk push token B
- **Group "Bump Pool"** — 20 wallet untuk bump bot

Setiap wallet punya 1 group. Kalau wallet pertama kali di-generate, default group = `default`.

## Cara Pakai

### 1. Buat Wallet Groups

Sidebar → **Wallet Groups** (atau **Solana → Wallet Groups**).
- Klik **+ Create Group**
- Isi nama (misal: "Token A Group")
- **Generate wallets** atau **Import keys** ke group ini

### 2. Distribute Modal ke Group

**Wallets → Distribute from Master**:
- Source: master wallet
- Target: pilih **specific group** dari dropdown
- Amount per wallet: 0.05 SOL atau 0.5 MON
- Distribute → modal terbagi ke wallet di group itu

### 3. Start Volume Bot Multi-Group

**Solana → Pump.fun → tab Volume Bot**:
- Token address: 0x... atau Solana mint
- Group selection grid akan muncul, dengan 3 status warna:
  - 🟢 Hijau = group ini lagi running bot (disabled, tidak bisa pilih)
  - 🟠 Orange = selected (akan start bot di group ini)
  - ⚪ Abu-abu = available (bisa di-select)
- Centang group yang mau dijalanin (bisa multiple)
- Set min/max amount, interval, duration
- Klik **Start Volume Bot (3 groups)** — start 3 bot bersamaan

### 4. Active Bots Dashboard

Bagian atas halaman tampil semua bot aktif user:

| Group Name | Token | Timer | Stats | Action |
|---|---|---|---|---|
| Token A Group | 0x123...abc | ⏱ 8:45 | 12↑ 3↓ 0 err | Stop |
| Token B Group | 0x456...def | ⏱ 25:10 | 28↑ 5↓ 1 err | Stop |
| Bump Pool | 0x789...ghi | ⏱ 5:00 | 50 bumps | Stop |

- Klik **Stop** per-bot → hentikan satu group
- **Stop All** di kanan atas → hentikan semua bot user

### 5. Bump Bot Multi-Group

Same pattern di tab **Bump Bot**:
- Pilih group(s)
- Set min/max bump amount, interval, duration
- Active dashboard muncul kalau ada bot running

## Backend Logic

### Keying
Volume bot disimpan di Map dengan key `${userId}:${groupId}`.
Bump bot juga sama.
Default group keyed sebagai `${userId}:default`.

### Duplicate Protection
Coba start bot di group yang **sudah running** → reject:
```
"Volume bot already running for this group"
```
Harus stop dulu, baru start lagi.

### Stop Endpoints

**Per-group stop:**
```
POST /pumpfun/volume/stop
Body: { "groupId": "abc-123" }
```

**Stop All untuk user:**
```
POST /pumpfun/volume/stop
Body: {}    (atau body kosong)
```

Response:
- Specific: `{ message: "Volume Bot stopped", groupId: "..." }`
- Stop All: `{ message: "Stopped 3 Volume Bot(s)", stoppedCount: 3 }`

## Reserve Guard

Volume bot dan Bump bot punya **MON/SOL reserve guard**:
- Selalu sisakan minimal 0.001 SOL atau 0.01 MON di wallet
- Kalau wallet hampir kosong, bot **skip wallet itu** (tidak crash)
- Jaminan: wallet selalu ada SOL/MON untuk emergency exit (Mega Sell, Panic)

Tanpa guard, bot bisa habiskan semua native untuk buy → wallet stuck (tidak bisa bayar gas untuk sell).

## Auto-Stop Pada Error

Volume bot punya **consecutive error counter**:
- Default threshold: 5 error berturut-turut
- Adjustable via `maxConsecutiveErrors` (range 1-50)
- Counter reset setiap successful trade

Kalau hit threshold, bot auto-stop dengan log:
```
[VOLUME] ⛔ Auto-stopped — 5 consecutive errors (limit=5)
```

Cegah bot waste gas terus-menerus saat token rugged atau RPC down.

## Best Practices

### 1. Group per Token
Satu group khusus per token launch. Jangan campur 5 token di 1 group.

### 2. Wallet Count
- **Volume Bot**: 5-10 wallets / group cukup. Lebih banyak = volume lebih tinggi tapi gas cost naik.
- **Bump Bot**: 10-30 wallets. Bumps rotate sequential.

### 3. Stop All Sebelum Switch Token
Mau pivot ke token baru? Klik **Stop All** dulu, baru start group baru. Lebih clean.

### 4. Monitor via Dashboard
Sidebar **Dashboard** akan tampil count semua bot aktif cross-chain. Bisa jadi quick health check.

### 5. Don't Mix Bump + Volume di Group Sama
Tecnically bisa (keying beda), tapi confusing. Pakai group terpisah.

## Limitations

- **Maksimum bot per user: tidak ada hard limit** secara teknis, tapi practical limit ~10-20 (rate limit RPC + gas reserve)
- **Tidak bisa modify config bot yang sedang running.** Harus stop, edit, start lagi.
- **Tidak ada cross-group communication.** Bot di group A tidak tahu bot group B sedang ngapain.
- **Persistence:** Bot **TIDAK survive server restart** (Map di memory). Harus re-start manual setelah restart backend.

## Migration dari Single-Group

Kalau pakai versi lama yang single-group, `startVolumeBot({ ...params })` tanpa `groupId` akan default ke `default` group. Backwards compatible — kode lama tetap jalan.

## Troubleshooting

**Q: Wallet di group hampir habis, bot tidak start.**
A: Reserve guard bekerja. Top up wallet via Distribute, atau kurangi `minAmount`.

**Q: Saya start bot di group A, tapi muncul "already running".**
A: Possible bot sebelumnya tidak ke-stop bersih. Klik **Stop All** untuk forced cleanup, lalu start ulang.

**Q: Bot auto-stop terus padahal awal bisa.**
A: Cek log. Possible RPC throttling. Setting → RPC → tambah custom RPC.

## See Also
- [Wallet Management](./wallet-management.md) — group setup
- [Reserve Guard](./reserve-guard.md) — detail mekanisme MON/SOL reserve
- [Pump.fun](./pumpfun.md) — Volume Bot config detail
- [Nad.fun](./nadfun.md) — Volume Bot config detail (Monad)
