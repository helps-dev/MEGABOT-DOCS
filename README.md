# MegaBot Pro — User Documentation

Welcome. This folder contains the full user guide for **MegaBot Pro** — multi-chain memecoin trading suite supporting Solana (Pump.fun, Bags.fm) and EVM (Monad/Nad.fun, MegaETH/Kumbaya).

## 📚 Table of Contents

### Getting Started
- [Quick Start Guide](./getting-started.md) — installation, login, first trade
- [Wallet Management](./wallet-management.md) — generate, group, distribute, drain

### Core Features (Trading)
- [Pump.fun (Solana)](./pumpfun.md) — bundle launch, volume bot, bump bot, vanity mining
- [Bags.fm (Solana)](./bags.md) — trade, launch, claim creator fees
- [Nad.fun (Monad EVM)](./nadfun.md) — bonding curve trading, bundle launch
- [Kumbaya (MegaETH)](./kumbaya.md) — DEX trading on MegaETH

### Advanced Features (Tier 1 — Wajib untuk launch aman)
- [Smart Sell Strategy](./smart-sell.md) — autopilot exit dengan trailing stop, take-profit ladder
- [Auto-Sell Triggers](./auto-sell.md) — DCA exit terjadwal, time-based atau price-trigger
- [Portfolio Tracking](./portfolio.md) — semua aset dan PnL agregat

### Advanced Features (Tier 2 — Nilai tambah besar)
- [Monitor Dashboard](./monitor.md) — analisis token real-time, bonding curve progress
- [Positions Management](./positions.md) — PnL real-time per posisi aktif
- [Panic Module](./panic.md) — kill switch global, exit darurat satu klik

### Specialized Tools
- [Mega Sell](./mega-sell.md) — consolidate + sell premium dengan retry logic
- [Stealth Distribute](./stealth-distribute.md) — anti-detect multi-wallet distribution
- [Copy Trade](./copy-trade.md) — auto-follow whale wallets
- [Sniper](./sniper.md) — auto-snipe new launches
- [Vanity Mining](./vanity-mining.md) — generate addresses berakhiran tertentu
- [GPU Vanity Mining](./gpu-vanity-mining.md) — mining vanity address dengan GPU cloud

### AI & Trading Agent (Solana only)
- [AI Trading Agent](./trading-agent.md) — bot trading otomatis berbasis AI
- [Rug Detection](./rug-detection.md) — AI risk scoring untuk token

### Operations
- [Multi-Group Bots](./multi-group-bots.md) — jalankan banyak bot bersamaan
- [Wallet Reserve Guard](./reserve-guard.md) — proteksi MON/SOL untuk emergency exit
- [Settings & RPC](./settings.md) — konfigurasi server, RPC custom
- [Switch Monad Network](./monad-mainnet-switch.md) — testnet ↔ mainnet ↔ devnet

### Troubleshooting
- [Common Errors](./troubleshooting.md) — solusi error yang sering muncul
- [Performance Tuning](./performance.md) — optimasi RPC, rate limit, gas

## 🎯 Quick Reference

| Saya mau... | Lihat halaman |
|---|---|
| Pertama kali install | [Quick Start](./getting-started.md) |
| Launch token Pump.fun | [Pump.fun → Bundle Launch](./pumpfun.md#bundle-launch) |
| Launch token Nad.fun (Monad) | [Nad.fun → Bundle Launch](./nadfun.md#bundle-launch) |
| Set exit otomatis pakai trailing stop | [Smart Sell](./smart-sell.md) |
| Jual bertahap dalam 5 step | [Auto-Sell](./auto-sell.md) |
| Lihat PnL dari semua trade | [Portfolio](./portfolio.md) |
| Cek status token saya sekarang | [Monitor](./monitor.md) |
| Exit darurat dari semua position | [Panic](./panic.md) |
| Jalan bot di banyak group sekaligus | [Multi-Group Bots](./multi-group-bots.md) |

## 🔐 Keamanan

**MegaBot Pro 100% self-custody.** Private key di-encrypt lokal dengan AES-256, tidak pernah dikirim ke server. Semua transaksi ditandatangani di mesin kamu.

⚠️ **Backup wallet wajib.** Lihat [Wallet Management → Backup](./wallet-management.md#backup) sebelum trading dengan modal besar.

## 📞 Support

- Telegram: https://t.me/megabot_support
- Discord: https://discord.gg/megabot
- Twitter: https://twitter.com/megabot_pro

## 📝 Version

Documentation v3.0 · Last updated 2026-05-16
