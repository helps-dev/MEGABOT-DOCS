// MegaBot Docs — EN/ID i18n (default English). Only pure-text elements are
// swapped; elements with inline markup (code/links) stay as-is.
(function () {
  const ID = {
    // Topbar
    'Website': 'Situs', 'Telegram': 'Telegram',
    'Telegram Support': 'Dukungan Telegram',
    // Sidebar groups
    'Getting Started': 'Mulai', 'Chains': 'Jaringan', 'Trading Tools': 'Alat Trading', 'Reference': 'Referensi',
    // Sidebar links (generic only; product names kept)
    'Introduction': 'Pengantar', 'Install & Login': 'Instal & Login', 'Wallets & Groups': 'Wallet & Grup',
    'RPC Configuration': 'Konfigurasi RPC', 'Supported Chains': 'Jaringan Didukung',
    'Security': 'Keamanan', 'Support': 'Dukungan',
    // Kickers
    'Overview': 'Ikhtisar',
    // Headings
    'MegaBot Pro Documentation': 'Dokumentasi MegaBot Pro',
    'What you can do': 'Yang bisa Anda lakukan',
    'Adding wallets': 'Menambah wallet', 'Groups': 'Grup', 'How it works': 'Cara kerja',
    // Lead + paragraphs (pure text)
    'MegaBot Pro is a desktop trading suite for memecoins across six chains — Solana, Monad, BSC, MegaETH, HyperEVM, and TON. Launch tokens, run bots, automate exits, and manage everything from one app, with your keys staying on your machine.':
      'MegaBot Pro adalah suite trading desktop untuk memecoin di enam jaringan — Solana, Monad, BSC, MegaETH, HyperEVM, dan TON. Luncurkan token, jalankan bot, otomatiskan exit, dan kelola semuanya dari satu aplikasi, dengan kunci yang tetap di perangkat Anda.',
    'MegaBot Pro runs as a desktop application on Windows and macOS. After purchasing a license, you receive a download link and an access key.':
      'MegaBot Pro berjalan sebagai aplikasi desktop di Windows dan macOS. Setelah membeli lisensi, Anda menerima tautan unduhan dan access key.',
    'Wallets hold your funds and sign transactions. You can import existing wallets or generate new ones. Group wallets together to run bundles, volume, and bulk sells against a set of wallets at once.':
      'Wallet menyimpan dana Anda dan menandatangani transaksi. Anda bisa mengimpor wallet yang ada atau membuat yang baru. Kelompokkan wallet untuk menjalankan bundle, volume, dan penjualan massal sekaligus.',
    'A group is a named set of wallets. Most tools accept a group so you can act on 5, 20, or 50 wallets in one click. EVM wallets are shared across Monad, BSC, MegaETH, and HyperEVM (same address works on all EVM chains).':
      'Grup adalah kumpulan wallet bernama. Sebagian besar alat menerima grup sehingga Anda bisa memproses 5, 20, atau 50 wallet sekali klik. Wallet EVM dipakai bersama di Monad, BSC, MegaETH, dan HyperEVM (alamat sama berlaku di semua jaringan EVM).',
    'MegaBot trades natively on six chains. Each shows its native balance and live USD value on the dashboard, and the portfolio card sums everything into one total.':
      'MegaBot trading secara native di enam jaringan. Masing-masing menampilkan saldo native dan nilai USD langsung di dashboard, dan kartu portofolio menjumlahkan semuanya menjadi satu total.',
    'Solana is the flagship chain. It supports Pump.fun and Bags.fm launches, Raydium/Meteora/Jupiter routing, Jito bundles for same-slot execution, and the full tool set including the AI Trading Agent and GPU vanity mining.':
      'Solana adalah jaringan unggulan. Mendukung launch Pump.fun dan Bags.fm, routing Raydium/Meteora/Jupiter, Jito bundle untuk eksekusi satu-slot, dan seluruh perangkat termasuk AI Trading Agent dan GPU vanity mining.',
    'The four EVM chains share one wallet set (an address works on all of them) and a unified trading engine with fast-mode execution and automatic RPC failover.':
      'Empat jaringan EVM berbagi satu set wallet (satu alamat berlaku di semuanya) dan mesin trading terpadu dengan eksekusi mode cepat serta failover RPC otomatis.',
    'TON trading runs through StonFi and DeDust with launch, swap, sniper, mega/panic sell, and liquidity tooling. TON uses a separate authentication session inside the app; connect once and your balance appears on the dashboard.':
      'Trading TON berjalan lewat StonFi dan DeDust dengan launch, swap, sniper, mega/panic sell, dan alat likuiditas. TON memakai sesi autentikasi terpisah di dalam aplikasi; hubungkan sekali dan saldo Anda muncul di dashboard.',
    'Bundle a token launch and buys from many wallets into a single atomic transaction so everything lands in the same slot/block — no front-runners between your launch and your buys.':
      'Gabungkan launch token dan pembelian dari banyak wallet ke dalam satu transaksi atomik sehingga semuanya masuk di slot/blok yang sama — tanpa front-runner antara launch dan pembelian Anda.',
    'Keeps a token active by making small, well-timed buys that adapt to the bonding-curve phase. Stealth patterns vary amount and timing to avoid simple bot-detection. Supports multiple wallet groups running in parallel.':
      'Menjaga token tetap aktif dengan pembelian kecil berwaktu tepat yang menyesuaikan fase bonding-curve. Pola siluman memvariasikan jumlah dan waktu untuk menghindari deteksi bot sederhana. Mendukung banyak grup wallet berjalan paralel.',
    'Generates organic-looking trading volume using cross-wallet sequences and randomized patterns that avoid wash-trade fingerprints. Configure min/max amounts, interval, duration, and buy/sell ratio per group.':
      'Menghasilkan volume trading yang terlihat organik memakai urutan lintas-wallet dan pola acak yang menghindari jejak wash-trade. Atur jumlah min/maks, interval, durasi, dan rasio beli/jual per grup.',
    'Automated exit strategy that watches your position 24/7 and sells on your rules. Combine multiple triggers on one position.':
      'Strategi exit otomatis yang memantau posisi Anda 24/7 dan menjual sesuai aturan Anda. Gabungkan beberapa pemicu pada satu posisi.',
    "Mirror any wallet's trades automatically. Set size ratios and filters, discover smart-money wallets, and auto-follow entries and exits.":
      'Tiru transaksi wallet mana pun secara otomatis. Atur rasio ukuran dan filter, temukan wallet smart-money, dan ikuti entry & exit otomatis.',
    'Auto-buy a token the moment it launches or hits your conditions. Set the target, amount, and slippage; the sniper fires as soon as liquidity appears.':
      'Beli token otomatis saat ia launch atau memenuhi kondisi Anda. Atur target, jumlah, dan slippage; sniper menembak begitu likuiditas muncul.',
    'Sell holdings across many wallets, then sweep the proceeds (native coin) into a single destination wallet. A two-phase design maximizes reliability: sell first, then consolidate.':
      'Jual kepemilikan di banyak wallet, lalu sapu hasilnya (koin native) ke satu wallet tujuan. Desain dua fase memaksimalkan keandalan: jual dulu, baru konsolidasi.',
    "Distribute native funds to many wallets with anti-detection in mind — randomized amounts, timing, and routing so the spread doesn't look like a single automated batch.":
      'Distribusikan dana native ke banyak wallet dengan anti-deteksi — jumlah, waktu, dan rute acak agar penyebarannya tidak tampak seperti satu batch otomatis.',
    'Generate custom mint addresses (for example a "pump" suffix on Solana) using CPU or GPU cloud mining. Mined keys are stored encrypted and ready to use at launch.':
      'Buat alamat mint kustom (misalnya akhiran "pump" di Solana) memakai CPU atau GPU cloud mining. Kunci hasil mining disimpan terenkripsi dan siap dipakai saat launch.',
    'An autonomous AI agent (Solana) that scores a live feed of tokens and auto-enters and exits based on your configuration. Review its trades and performance from the agent dashboard.':
      'Agen AI otonom (Solana) yang menilai feed token langsung dan masuk/keluar otomatis sesuai konfigurasi Anda. Tinjau transaksi dan performanya dari dashboard agen.',
    'Need help? Reach the team directly:': 'Butuh bantuan? Hubungi tim langsung:',
    // Feature bullets (pure text ones)
    'Launch and bundle tokens in a single transaction': 'Luncurkan & bundle token dalam satu transaksi',
    'Run volume and bump bots with anti-detection patterns': 'Jalankan volume & bump bot dengan pola anti-deteksi',
    'Automate exits with Smart Sell, Panic Sell, and Mega Sell': 'Otomatiskan exit dengan Smart Sell, Panic Sell, dan Mega Sell',
    'Copy trade, snipe launches, and detect rugs with AI scoring': 'Copy trade, snipe launch, dan deteksi rug dengan penilaian AI',
    'Track a unified USD portfolio across all six chains': 'Lacak portofolio USD terpadu di semua enam jaringan',
    // Table headers
    'Chain': 'Jaringan', 'Native': 'Native',
    // FAQ
    'Questions, answered.': 'Pertanyaan, terjawab.',
    'What is MegaBot Pro?': 'Apa itu MegaBot Pro?',
    'A desktop trading terminal for memecoins across six chains — bundlers, bots, smart exits, copy trading, AI rug detection, and more in one app built for speed and self-custody.':
      'Terminal trading desktop untuk memecoin di enam jaringan — bundler, bot, exit pintar, copy trading, deteksi rug AI, dan banyak lagi dalam satu aplikasi yang dibangun untuk kecepatan dan self-custody.',
    'Is my private key safe?': 'Apakah private key saya aman?',
    'Yes. Keys are AES-256 encrypted and stored locally on your device. They never leave your machine.':
      'Ya. Kunci dienkripsi AES-256 dan disimpan lokal di perangkat Anda. Tidak pernah keluar dari perangkat.',
    'Which platforms are supported?': 'Platform apa saja yang didukung?',
    'Solana (Pump.fun, Bags.fm, Raydium, Meteora, Jupiter), Monad (Nad.fun), BSC (four.meme), MegaETH (Kumbaya), HyperEVM (HyperSwap), and TON (StonFi, DeDust).':
      'Solana (Pump.fun, Bags.fm, Raydium, Meteora, Jupiter), Monad (Nad.fun), BSC (four.meme), MegaETH (Kumbaya), HyperEVM (HyperSwap), dan TON (StonFi, DeDust).',
    'Do I need a paid RPC?': 'Apakah saya butuh RPC berbayar?',
    'No. Free RPCs work. Add several per chain for better speed and failover.':
      'Tidak. RPC gratis bisa dipakai. Tambahkan beberapa per jaringan untuk kecepatan & failover lebih baik.',
    'How is the USD total calculated?': 'Bagaimana total USD dihitung?',
    'Native balances per chain are multiplied by live market prices and summed. Coins without a public price are excluded so the total stays accurate.':
      'Saldo native tiap jaringan dikalikan harga pasar terkini lalu dijumlahkan. Koin tanpa harga publik dikecualikan agar total tetap akurat.',
    'What payment methods are accepted?': 'Metode pembayaran apa yang diterima?',
    'SOL, USDT/USDC. Contact us on Telegram after choosing a plan for details.':
      'SOL, USDT/USDC. Hubungi kami di Telegram setelah memilih paket untuk detailnya.',
    // Footer
    '© 2024–2026 MegaBot Pro. All rights reserved.': '© 2024–2026 MegaBot Pro. Semua hak dilindungi.',
    // Captions
    'The MegaBot dashboard — unified balances, USD value, and activity across all six chains.':
      'Dashboard MegaBot — saldo terpadu, nilai USD, dan aktivitas di semua enam jaringan.',
    'Manage wallets — import or generate, view balances, and organize into groups.':
      'Kelola wallet — impor atau buat, lihat saldo, dan susun ke dalam grup.',
    'Settings → RPC Nodes — add ordered endpoints per chain with live validation and health.':
      'Settings → RPC Nodes — tambah endpoint berurutan per jaringan dengan validasi & kesehatan langsung.',
    'Solana trading on Pump.fun — launch, bundle, and trade with Jito bundles.':
      'Trading Solana di Pump.fun — launch, bundle, dan trading dengan Jito bundle.',
    'EVM trading (Monad / Nad.fun shown) — BSC, MegaETH, and HyperEVM share the same workflow.':
      'Trading EVM (ditampilkan Monad / Nad.fun) — BSC, MegaETH, dan HyperEVM memakai alur yang sama.',
    'TON tooling — launch, swap on StonFi/DeDust, snipe, and manage liquidity.':
      'Alat TON — launch, swap di StonFi/DeDust, snipe, dan kelola likuiditas.',
    'Atomic Bundler — launch and buy from many wallets in a single block.':
      'Atomic Bundler — launch dan beli dari banyak wallet dalam satu blok.',
    'Volume Bot — organic cross-wallet patterns with configurable interval and ratio.':
      'Volume Bot — pola lintas-wallet organik dengan interval & rasio yang bisa diatur.',
    'Smart Sell — take-profit ladders, trailing stop, stop loss, and graduation triggers.':
      'Smart Sell — tangga take-profit, trailing stop, stop loss, dan pemicu graduation.',
    'Copy Trading — mirror smart-money wallets with custom size ratios.':
      'Copy Trading — tiru wallet smart-money dengan rasio ukuran kustom.',
    'Sniper — auto-buy the moment liquidity lands on your targets.':
      'Sniper — beli otomatis begitu likuiditas muncul di target Anda.',
    'Panic Sell — one-click emergency exit from every wallet.':
      'Panic Sell — exit darurat satu klik dari setiap wallet.',
    "Stealth Distribute — randomized amounts, timing, and routes to stay undetected.":
      'Stealth Distribute — jumlah, waktu, dan rute acak agar tak terdeteksi.',
    'Analytics — PnL, win rate, charts, and CSV export across your trades.':
      'Analytics — PnL, win rate, grafik, dan ekspor CSV dari transaksi Anda.',
    'Trading Agent — autonomous AI scoring a live feed with auto entry & exit.':
      'Trading Agent — AI otonom menilai feed langsung dengan entry & exit otomatis.',
  };

  const SEL = [
    '.topbar-links a', '.nav-group-title', '.nav-link', '.kicker',
    '.content h1', '.content h2', '.content h3', '.lead', '.doc-section > p',
    '.feature-bullets li', '.doc-table th', '.faq summary', '.faq > p',
    'figcaption', '.foot-note', '.support-btn'
  ].join(',');

  let cache = null;
  function collect() {
    cache = Array.from(document.querySelectorAll(SEL))
      .filter(el => el.children.length === 0) // pure-text only → preserves inline markup elsewhere
      .map(el => ({ el, en: el.textContent }));
  }
  function apply(lang) {
    if (!cache) collect();
    cache.forEach(({ el, en }) => {
      const key = en.trim();
      el.textContent = (lang === 'id' && ID[key] != null) ? ID[key] : en;
    });
    document.documentElement.lang = lang;
    document.querySelectorAll('#langMenu button').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === lang));
    const cur = document.getElementById('langCurrent');
    if (cur) cur.textContent = lang.toUpperCase();
    try { localStorage.setItem('mb_lang', lang); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', () => {
    collect();
    let lang = 'en';
    try { lang = localStorage.getItem('mb_lang') || 'en'; } catch (e) {}
    apply(lang);
    const dd = document.getElementById('langSwitch');
    const toggle = document.getElementById('langToggle');
    const menu = document.getElementById('langMenu');
    toggle?.addEventListener('click', e => {
      e.stopPropagation();
      const open = dd.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu?.addEventListener('click', e => {
      const b = e.target.closest('button[data-lang]');
      if (b) { apply(b.dataset.lang); dd.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('click', e => {
      if (dd && !dd.contains(e.target)) { dd.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { dd?.classList.remove('open'); toggle?.setAttribute('aria-expanded', 'false'); }
    });
  });
})();
