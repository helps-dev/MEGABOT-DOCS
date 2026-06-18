# Quick Start Guide

5 menit dari install sampai trading pertama.

## 1. Install MegaBot Pro

Download Electron app dari rilis terbaru:
- **Windows**: `MegaBot-Pro-Setup-3.x.x.exe`
- **macOS**: `MegaBot-Pro-3.x.x.dmg`
- **Linux**: `MegaBot-Pro-3.x.x.AppImage`

Run installer, ikuti wizard. Aplikasi akan otomatis create folder data di:
- Windows: `%APPDATA%\megabot-pro`
- macOS: `~/Library/Application Support/megabot-pro`
- Linux: `~/.config/megabot-pro`

## 2. First Login

Buka MegaBot Pro → **Sign Up** kalau pertama kali, atau **Log In** kalau sudah punya akun.

**Username dan password disimpan terenkripsi lokal.** Tidak ada cloud login. Kalau lupa password, harus reset via Telegram support.

## 3. Activate License

MegaBot Pro premium butuh license aktif. Plan tier:
- **Starter** $49/mo — 5 wallets, basic bots
- **Pro** $149/mo — unlimited, smart sell, copy trade
- **Elite** $349/mo — stealth distribute, AI agent, EVM
- **Lifetime** $999 once — semua fitur selamanya

Belanja license: Telegram @megabot_support — kirim SOL/USDT, dapat license key, paste di app.

## 4. Generate Wallets

Buka **Wallets** dari sidebar → **Generate Wallets** → pilih jumlah (5/10/20/50).

⚠️ **Backup mnemonic seed phrase segera.** Sidebar → Wallet Groups → **Export Keys**.

## 5. Fund Master Wallet

Kirim modal awal ke master wallet:
- **Solana**: kirim SOL ke alamat master di header app
- **Monad**: kirim MON ke alamat master Monad
- **MegaETH**: kirim ETH ke master MegaETH

Min ~0.5 SOL atau 5 MON untuk start trading + gas reserve.

## 6. Distribute ke Wallet Group

**Wallets → Distribute from Master**:
- Source: master wallet
- Amount per wallet: 0.05 SOL atau 0.5 MON misalnya
- Click **Distribute**

Tunggu konfirmasi. Saldo akan tersebar ke 5/10/20 wallets sesuai pilihan.

## 7. First Trade

**Pump.fun** (paling mudah):
1. Buka **Solana → Pump.fun**
2. Tab **Trade** → masukkan token address (contoh: token populer dari pump.fun)
3. Pilih **Buy** → 0.01 SOL → klik **Buy from All Wallets**
4. Tunggu konfirmasi (10-30 detik)

✅ Selamat, transaksi pertama selesai.

## 8. Set Smart Sell (Recommended)

Sebelum harga gerak, pasang exit plan:
1. Klik tombol **Smart Sell** di token row
2. Pilih preset **Conservative** (50% at +50%, 50% at +100%, stop loss -30%)
3. **Create Strategy**

Bot akan jual otomatis saat trigger fired. Kamu bisa tinggal tidur.

## 9. Quick Tour Sidebar

| Section | Isi |
|---|---|
| **Dashboard** | Overview semua chain |
| **Solana / Pump.fun** | Trade, launch, volume bot |
| **Solana / Bags.fm** | Trade Bags, claim fees |
| **EVM / Nad.fun** | Trading Monad |
| **Smart Sell** | Strategi exit otomatis |
| **Auto-Sell** | Schedule sell bertahap |
| **Portfolio** | PnL aggregate |
| **Positions** | Posisi aktif real-time |
| **Panic** | Kill switch darurat |
| **Wallet Groups** | Organize wallets |

## 10. Next Steps

- [Wallet Management](./wallet-management.md) — backup, multi-group setup
- [Smart Sell](./smart-sell.md) — pelajari trigger types
- [Multi-Group Bots](./multi-group-bots.md) — scale ke banyak token sekaligus

## ❓ Stuck?

- Cek [Troubleshooting](./troubleshooting.md)
- Telegram: @megabot_support
- Common issue: gas insufficient → top up master wallet
