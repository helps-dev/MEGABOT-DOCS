# Panic Module

Emergency kill switch. Sell semua/sebagian token dan stop semua bot dalam satu klik.

## Kapan Pakai Panic?

- Token kamu **suddenly tank**, harga turun cepat
- Detect rug pull pattern
- Anti-protocol attack incoming
- Server kamu butuh shutdown segera, harus exit dulu
- Lupa berapa banyak posisi terbuka, mau bersih semuanya

## 2 Mode

### Mode 1: Specific
Sell **selected tokens only**. User checklist beberapa token yang mau di-keluarin, sisanya tetap di wallet.

**Use case:** ada 5 token, cuma 1 yang panik. Jual yang 1 doang.

### Mode 2: Nuclear ☢️
Sell **SEMUA token** dari **SEMUA wallet** + stop **SEMUA bot** (volume + bump).

**Use case:** 
- Total exit dari market
- Mau shutdown server, perlu kosongin posisi dulu
- Detect coordinated rug

⚠️ **Mode Nuclear minta double confirmation** sebelum execute. Tidak bisa di-undo.

## Halaman Panic

Sidebar:
- **Solana → tidak ada (pakai PanicButton di header)**  
- **EVM → Panic** (di bawah Tools)

## Pre-Execution Scan

Buka halaman Panic → otomatis scan:
- Berapa token user hold di wallet (cross-reference dengan tx_history)
- Berapa volume bot active
- Berapa bump bot active
- Berapa wallet di-scan total

Hasil cached **60 detik** untuk avoid hammering RPC kalau user spam refresh.

## Panic Specific Flow

1. Halaman buka → scan auto-jalan
2. List token muncul, masing-masing dengan checkbox
3. Pilih checkbox token yang mau di-keluar (atau klik "Select All")
4. Klik **Panic Sell Selected (N)**
5. Confirm dialog: "Sell N token(s) from ALL wallets and stop ALL bots? This is irreversible."
6. Click OK → execute

Backend akan:
1. **Stop semua bot dulu** (parallel, fire-and-forget)
2. **Sell setiap token** dari semua wallet (parallel via `Promise.allSettled`)
3. Wait sampai semua selesai
4. Log audit trail ke DB
5. Return result + invalidate scan cache

## Panic Nuclear Flow

1. Klik **NUCLEAR — Sell ALL + Stop ALL bots**
2. Confirm dialog 1: "☢ NUCLEAR PANIC: sell ALL X tokens from EVERY wallet AND stop EVERY bot. Are you absolutely sure?"
3. Confirm dialog 2: "This is your last chance. Type confirm intent or cancel."
4. Klik OK → execute

Sama dengan Specific tapi:
- Token list = semua dari scan result
- Tidak bisa cherry-pick

## Result Card

Setelah execute, card hijau muncul dengan:
- **Wallets ✓ / Total** — berapa sukses dari berapa total
- **Failed** — yang gagal
- **Recovered MON/SOL** — total balikan
- **Duration** — durasi execution dalam detik
- Bots stopped breakdown (volume + bump)

Kalau ada wallet failed, expandable details di bawah.

## History Audit

Setiap panic event di-log ke `evm_panic_history` (atau `sol_panic_history` untuk Solana):

| Field | Arti |
|---|---|
| When | Timestamp event |
| Mode | specific / nuclear |
| Tokens | Berapa token di-target |
| Wallets ✓/Total | Sukses ratio |
| Recovered MON | Total recovery |
| Bots Stopped | Volume + bump count |
| Duration | ms |

Lihat di tab **Recent Panic Events** halaman Panic.

## Performance & Reliability

### Speed
- Bot stop = fire-and-forget (tidak wait)
- Token sells = parallel `Promise.allSettled`
- Mega Sell mechanism (dengan retry, confirmation polling 45s, cross-RPC) untuk EVM

Total durasi typical: 30-90 detik untuk 5-10 token × 25 wallet.

### Failure Handling
- Kalau 1 wallet gagal, tidak abort batch
- Failed wallets di-log dengan error message untuk re-attempt manual
- Even if some wallets fail, panic execution dianggap sukses partial

### Token Detection
Panic scan **hanya cek token dari `tx_history`** (token yang pernah disentuh user lewat MegaBot). Token airdrop dari luar tidak ke-detect.

Workaround sama dengan Positions: do 1 small buy supaya token masuk history.

## Combine dengan Bot Lain

| Skenario | Action |
|---|---|
| Smart Sell sedang jalan, mau force exit | Panic akan stop monitoring engine + sell. Strategy auto-marked complete. |
| Auto-Sell schedule running, mau abort | Panic stop bot termasuk auto-sell tick. Sisa step tidak jalan. |
| Volume bot lagi pump, mau kabur | Panic Nuclear stop bot dan sell hasil bump |

## Confirmation Best Practices

- **Selalu baca jumlah token + wallet di confirm dialog.** Pastikan number match expectation.
- **Untuk Nuclear, pastikan kamu memang mau total exit.** Tidak ada partial backout.
- **Kalau testing, gunakan Specific mode dengan 1 token doang.**

## Limitations

- Panic **tidak track non-MegaBot tokens** (lihat di atas)
- Panic **tidak handle staked tokens / LP** — itu harus di-unstake manual dulu
- Panic Nuclear **tidak stop external bots** — kalau pakai bot pihak ketiga di wallet yang sama, mereka tetap jalan
- **No undo button.** Sekali execute, sell terjadi on-chain.

## Troubleshooting

**Q: Panic jalan tapi 5 wallet failed dengan "insufficient gas".**
A: Distribute MON/SOL untuk gas: Wallets → Distribute from Master → small amount (0.001 SOL atau 0.01 MON per wallet) → re-run panic.

**Q: Beberapa token menunjukkan 0 amount tapi tetap muncul di scan.**
A: Token sudah dijual habis tapi masih ada history. Backend akan skip (tidak ada nothing to sell). Aman.

**Q: Bot tidak ke-stop habis panic.**
A: Cek di halaman bot (Volume Bot / Bump Bot). Klik manual Stop All. Report bug ke support kalau persisten.

**Q: Berapa lama maksimum panic execution?**
A: Tidak ada hard timeout. Tapi `Mega Sell` per-token max 5 menit (dari operationLock). 10 token max ~50 menit theoretical worst case. Realistic: 1-3 menit.

## See Also
- [Mega Sell](./mega-sell.md) — sekali tembak per token, more granular
- [Smart Sell](./smart-sell.md) — exit otomatis sebelum perlu panic
- [Auto-Sell](./auto-sell.md) — exit terjadwal, pelan-pelan
