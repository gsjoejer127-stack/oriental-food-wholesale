import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Clock,
  Globe,
  ListOrdered,
  MessageCircle,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Truck,
  Wallet,
} from 'lucide-react';
import { CATEGORIES, PRODUCT_COUNT, PRODUCTS } from '../data/products';
import { Language } from '../types';
import { categoryName, productName, whatsappLink } from '../lib/order';
import { navigate } from '../lib/routes';
import { Footer } from './Footer';
import { FloatingWhatsAppButton } from './FloatingWhatsAppButton';
import { DisclaimerModal, PolicyTab } from './DisclaimerModal';
import { HalalStatementModal } from './HalalStatementModal';

interface LandingPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  cartQuantity: number;
  onQuickAdd: (productId: number) => void;
}

const COPY = {
  zh: {
    navPrice: '批发价目表',
    navOrder: '快速下单',
    navOem: 'OEM 代工',
    badge: '马来西亚一站式中式餐饮供应链',
    title1: '东升食品',
    title2: '批发价目表',
    slogan: '让餐饮更简单，让标准化成为增长的力量。',
    intro:
      `冷冻料理包、火锅汤底、串串烧烤、养生汤包、Halal 清真丸子等 ${PRODUCT_COUNT} 款标准化食材，明码实价。支持单包零购与整箱批发，巴生谷冷链直送。`,
    ctaPrice: '查看批发价目表',
    ctaOrder: '一分钟快速下单',
    ctaWhatsapp: 'WhatsApp 直接咨询',
    statsLabel: ['款食材', '大类目', '起订量', '冷链配送'],
    statsValue: [String(PRODUCT_COUNT), '14', '1 包', '巴生谷'],
    howTitle: '下单只需 3 步',
    howSub: '不必注册、不必登录，看价格、填数量、WhatsApp 确认。',
    steps: [
      { t: '看价目表', d: `${PRODUCT_COUNT} 款食材明码实价，单包价与整箱价一目了然。` },
      { t: '填数量', d: '在价目表上直接输入要几包、几箱，系统自动算总额与运费。' },
      { t: 'WhatsApp 确认', d: '一键把订单发到我们 WhatsApp，销售确认现货与送货时间。' },
    ],
    catTitle: '批发类目',
    catSub: '点击任意类目，直接进入该类目的价目表。',
    catAll: `查看全部 ${PRODUCT_COUNT} 款价目表`,
    popTitle: '热销单品',
    popSub: '餐厅、火锅店、Cafe 回购率最高的几款。',
    popAdd: '加入订单',
    popAdded: '已加入',
    perUnit: '单包价',
    perCarton: '整箱价',
    whyTitle: '为什么选择东升食品',
    why: [
      { t: '标准化配方', d: '每一批出品味道一致，后厨不再靠师傅手感。' },
      { t: '开包即用', d: '复热即出餐，缩短出餐时间、提升翻台率。' },
      { t: '冷链直送', d: '全程冷冻配送，巴生谷满 RM500 免运费。' },
      { t: 'Halal 产品线', d: '清真丸子系列等产品线供 Halal 餐饮渠道选用。' },
    ],
    infoTitle: '配送与付款',
    info: [
      { t: '巴生谷 Klang Valley', d: '满 RM500 免运费，未满收取 RM40 冷链运费。' },
      { t: '外坡 Outstation', d: '满 RM800 免运费，未满收取 RM40 冷链运费。' },
      { t: '自取 Self Pickup', d: '可安排到仓自取，免运费。' },
      { t: '付款方式', d: '下单后由销售确认订单与付款方式，转账后 WhatsApp 发送凭证。' },
    ],
    finalTitle: '现在就把这一批货订下来',
    finalSub: '工作时间 周一至周五 10:00 AM - 6:00 PM，WhatsApp 全天接单。',
    cartHint: (n: number) => `订单清单中已有 ${n} 件，继续下单`,
  },
  en: {
    navPrice: 'Price List',
    navOrder: 'Quick Order',
    navOem: 'OEM',
    badge: 'One-Stop Chinese F&B Supply Chain in Malaysia',
    title1: 'ORIENTAL FOOD',
    title2: 'WHOLESALE PRICE LIST',
    slogan: 'Making food service simpler — turning standardization into the power of growth.',
    intro:
      `${PRODUCT_COUNT} standardized products: frozen ready meals, hotpot bases, skewers, herbal soup packs and Halal balls. Transparent pricing, single packet or full carton, cold-chain delivery across Klang Valley.`,
    ctaPrice: 'View Wholesale Price List',
    ctaOrder: 'Quick Order in 1 Minute',
    ctaWhatsapp: 'Chat on WhatsApp',
    statsLabel: ['Products', 'Categories', 'Min. Order', 'Cold Chain'],
    statsValue: [String(PRODUCT_COUNT), '14', '1 pkt', 'Klang Valley'],
    howTitle: 'Order in 3 Steps',
    howSub: 'No sign-up, no login. See the price, enter the quantity, confirm on WhatsApp.',
    steps: [
      { t: 'Open the price list', d: `All ${PRODUCT_COUNT} products with unit price and full carton price side by side.` },
      { t: 'Enter quantities', d: 'Type how many packets or cartons — subtotal and delivery fee are calculated for you.' },
      { t: 'Send on WhatsApp', d: 'One tap sends the order to our WhatsApp; sales confirm stock and delivery time.' },
    ],
    catTitle: 'Wholesale Categories',
    catSub: 'Tap any category to open that section of the price list.',
    catAll: `View all ${PRODUCT_COUNT} products`,
    popTitle: 'Best Sellers',
    popSub: 'The lines restaurants, hotpot outlets and cafés reorder most.',
    popAdd: 'Add to order',
    popAdded: 'Added',
    perUnit: 'Unit price',
    perCarton: 'Carton price',
    whyTitle: 'Why Oriental Food',
    why: [
      { t: 'Standardized recipes', d: 'Same taste in every batch — no reliance on a single chef.' },
      { t: 'Ready to use', d: 'Reheat and serve; shorter ticket times and higher table turnover.' },
      { t: 'Cold-chain delivery', d: 'Frozen end to end. Free delivery above RM500 in Klang Valley.' },
      { t: 'Halal product line', d: 'The Halal ball series and more for Halal F&B channels.' },
    ],
    infoTitle: 'Delivery & Payment',
    info: [
      { t: 'Klang Valley', d: 'Free above RM500, otherwise RM40 cold-chain delivery fee.' },
      { t: 'Outstation', d: 'Free above RM800, otherwise RM40 cold-chain delivery fee.' },
      { t: 'Self Pickup', d: 'Warehouse pickup can be arranged, no delivery fee.' },
      { t: 'Payment', d: 'Sales confirm the order and payment method; send the transfer slip on WhatsApp.' },
    ],
    finalTitle: 'Place this batch today',
    finalSub: 'Office hours Mon–Fri 10:00 AM – 6:00 PM. WhatsApp orders accepted any time.',
    cartHint: (n: number) => `${n} item(s) already in your order list — continue`,
  },
  ms: {
    navPrice: 'Senarai Harga',
    navOrder: 'Pesanan Pantas',
    navOem: 'OEM',
    badge: 'Rangkaian Bekalan Makanan Cina Sehenti di Malaysia',
    title1: 'ORIENTAL FOOD',
    title2: 'SENARAI HARGA BORONG',
    slogan:
      'Mempermudahkan perkhidmatan makanan — menjadikan standardisasi sebagai kuasa pertumbuhan.',
    intro:
      `${PRODUCT_COUNT} produk standard: hidangan sedia dimakan, kuah stimbot, skewer, sup herba dan bebola Halal. Harga telus, beli sepaket atau sekotak penuh, penghantaran rantaian sejuk di Lembah Klang.`,
    ctaPrice: 'Lihat Senarai Harga Borong',
    ctaOrder: 'Pesanan Pantas 1 Minit',
    ctaWhatsapp: 'Hubungi WhatsApp',
    statsLabel: ['Produk', 'Kategori', 'Pesanan Min.', 'Rantaian Sejuk'],
    statsValue: [String(PRODUCT_COUNT), '14', '1 pkt', 'Lembah Klang'],
    howTitle: 'Pesan Dalam 3 Langkah',
    howSub: 'Tanpa pendaftaran. Lihat harga, masukkan kuantiti, sahkan di WhatsApp.',
    steps: [
      { t: 'Buka senarai harga', d: `${PRODUCT_COUNT} produk dengan harga sepaket dan harga sekotak penuh.` },
      { t: 'Masukkan kuantiti', d: 'Taip bilangan paket atau kotak — jumlah dan caj penghantaran dikira automatik.' },
      { t: 'Hantar di WhatsApp', d: 'Satu ketikan menghantar pesanan ke WhatsApp kami untuk pengesahan stok.' },
    ],
    catTitle: 'Kategori Borong',
    catSub: 'Ketik mana-mana kategori untuk membuka bahagian senarai harga itu.',
    catAll: `Lihat kesemua ${PRODUCT_COUNT} produk`,
    popTitle: 'Paling Laris',
    popSub: 'Produk yang paling kerap dipesan semula oleh restoran dan kafe.',
    popAdd: 'Tambah ke pesanan',
    popAdded: 'Ditambah',
    perUnit: 'Harga sepaket',
    perCarton: 'Harga sekotak',
    whyTitle: 'Mengapa Oriental Food',
    why: [
      { t: 'Resipi standard', d: 'Rasa yang sama setiap kali — tidak bergantung pada seorang tukang masak.' },
      { t: 'Sedia diguna', d: 'Panaskan dan hidang; masa penyediaan lebih singkat.' },
      { t: 'Penghantaran sejuk', d: 'Sejuk beku sepenuhnya. Percuma melebihi RM500 di Lembah Klang.' },
      { t: 'Barisan produk Halal', d: 'Siri bebola Halal dan lain-lain untuk saluran F&B Halal.' },
    ],
    infoTitle: 'Penghantaran & Pembayaran',
    info: [
      { t: 'Lembah Klang', d: 'Percuma melebihi RM500, jika tidak caj RM40.' },
      { t: 'Luar Kawasan', d: 'Percuma melebihi RM800, jika tidak caj RM40.' },
      { t: 'Ambil Sendiri', d: 'Boleh diatur di gudang, tanpa caj penghantaran.' },
      { t: 'Pembayaran', d: 'Jualan akan mengesahkan pesanan dan cara bayaran melalui WhatsApp.' },
    ],
    finalTitle: 'Buat pesanan anda hari ini',
    finalSub: 'Waktu pejabat Isnin–Jumaat 10:00 AM – 6:00 PM. WhatsApp dibuka sepanjang masa.',
    cartHint: (n: number) => `${n} item dalam senarai pesanan anda — teruskan`,
  },
};

const STEP_ICONS = [ListOrdered, ClipboardList, MessageCircle];
const WHY_ICONS = [Sparkles, Clock, Snowflake, BadgeCheck];
const INFO_ICONS = [Truck, Truck, Boxes, Wallet];

export const LandingPage: React.FC<LandingPageProps> = ({
  lang,
  setLang,
  cartQuantity,
  onQuickAdd,
}) => {
  const t = COPY[lang];
  const [addedId, setAddedId] = useState<number | null>(null);
  const [policyOpen, setPolicyOpen] = useState(false);
  const [policyTab, setPolicyTab] = useState<PolicyTab>('returns');
  const [halalOpen, setHalalOpen] = useState(false);

  const openPolicy = (tab: PolicyTab = 'returns') => {
    setPolicyTab(tab);
    setPolicyOpen(true);
  };

  // Per-category product count and entry price, straight from the catalog data.
  const categoryStats = useMemo(() => {
    return CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
      const items = PRODUCTS.filter((p) => p.categoryId === cat.id);
      const prices = items.map((p) => p.pricing.unitPrice).filter((n) => n > 0);
      return {
        ...cat,
        count: items.length,
        fromPrice: prices.length ? Math.min(...prices) : null,
      };
    });
  }, []);

  const popular = useMemo(() => PRODUCTS.filter((p) => p.isPopular).slice(0, 6), []);

  const handleQuickAdd = (productId: number) => {
    onQuickAdd(productId);
    setAddedId(productId);
    window.setTimeout(() => setAddedId((cur) => (cur === productId ? null : cur)), 1600);
  };

  const langButton = (code: Language, label: string) => (
    <button
      onClick={() => setLang(code)}
      className={`px-2 py-0.5 rounded-md transition-colors ${
        lang === code ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-amber-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-900 flex flex-col antialiased selection:bg-amber-500 selection:text-white">
      {/* Slim landing header — brand, language, direct route into the price list */}
      <header className="sticky top-0 z-40 bg-stone-950/95 backdrop-blur-md border-b border-stone-800 text-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <a href="#/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white text-sm">
              东
            </div>
            <div className="leading-tight">
              <div className="font-bold text-white text-sm font-serif">东升食品</div>
              <div className="text-[9px] text-amber-500 font-mono tracking-wider font-semibold hidden sm:block">
                ORIENTAL FOOD WHOLESALE
              </div>
            </div>
          </a>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-1 bg-stone-900 border border-stone-800 rounded-lg p-0.5 text-[11px] font-semibold">
              <Globe className="w-3.5 h-3.5 text-stone-500 ml-1" />
              {langButton('zh', '中文')}
              {langButton('en', 'EN')}
              {langButton('ms', 'BM')}
            </div>

            <a
              href="tel:0108822608"
              className="hidden sm:flex items-center gap-1.5 text-xs font-mono font-bold text-stone-200 hover:text-amber-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              010-882 2608
            </a>

            <button
              onClick={() => navigate('catalog')}
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold px-3.5 py-1.5 rounded-full text-xs transition-colors active:scale-95"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.navPrice}</span>
              {cartQuantity > 0 && (
                <span className="bg-white text-amber-700 rounded-full min-w-[18px] h-[18px] px-1 text-[10px] font-bold flex items-center justify-center">
                  {cartQuantity}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-stone-100 overflow-hidden border-b border-stone-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
            <span>{t.badge}</span>
          </div>

          <h1 className="font-serif font-black tracking-tight text-white leading-[1.1] mb-4">
            <span className="block text-4xl sm:text-5xl lg:text-6xl">{t.title1}</span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl text-amber-400 mt-1">
              {t.title2}
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-amber-200/90 font-serif italic mb-5">“ {t.slogan} ”</p>

          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {t.intro}
          </p>

          {/* Primary route into the price list, secondary route into quick order */}
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 mb-4">
            <button
              onClick={() => navigate('catalog')}
              className="group flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-7 py-3.5 rounded-full text-sm shadow-lg shadow-amber-900/30 transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.ctaPrice}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => navigate('order')}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white border border-white/25 font-semibold px-6 py-3.5 rounded-full text-sm transition-all active:scale-95"
            >
              <ListOrdered className="w-4 h-4 text-amber-400" />
              <span>{t.ctaOrder}</span>
            </button>
          </div>

          <a
            href={whatsappLink(
              lang === 'zh'
                ? '你好，我想咨询东升食品的批发价目表与下单流程。'
                : lang === 'ms'
                ? 'Salam, saya ingin bertanya tentang senarai harga borong Oriental Food.'
                : 'Hello, I would like to ask about the Oriental Food wholesale price list.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-emerald-400 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {t.ctaWhatsapp}
          </a>

          {cartQuantity > 0 && (
            <div className="mt-6">
              <button
                onClick={() => navigate('order')}
                className="inline-flex items-center gap-2 bg-emerald-600/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-4 py-2 rounded-full hover:bg-emerald-600/25 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.cartHint(cartQuantity)}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Trust stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-8 border-t border-stone-800/80">
            {t.statsValue.map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xl sm:text-2xl font-black text-amber-400 font-serif">{value}</div>
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-stone-400 mt-0.5">
                  {t.statsLabel[idx]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to order in 3 steps */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-stone-900">{t.howTitle}</h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">{t.howSub}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {t.steps.map((step, idx) => {
            const Icon = STEP_ICONS[idx];
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-5 border border-stone-200 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-3xl font-black text-stone-200 font-serif leading-none">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="font-bold text-stone-900 text-sm mb-1">{step.t}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{step.d}</p>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <button
            onClick={() => navigate('order')}
            className="flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold px-6 py-3 rounded-full text-sm transition-colors active:scale-95"
          >
            <ListOrdered className="w-4 h-4 text-amber-400" />
            {t.ctaOrder}
          </button>
        </div>
      </section>

      {/* Category entry points into the price list */}
      <section className="bg-white border-y border-stone-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-stone-900">{t.catTitle}</h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">{t.catSub}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categoryStats.map((cat) => (
              <button
                key={cat.id}
                onClick={() => navigate('catalog', cat.id)}
                className="group text-left bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-2xl p-4 transition-all active:scale-[0.98]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-sm flex items-center justify-center font-serif">
                    {cat.codeZh}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 group-hover:text-amber-700">
                    NO. {cat.noRange}
                  </span>
                </div>
                <div className="font-bold text-sm text-stone-900 leading-snug">
                  {categoryName(cat, lang)}
                </div>
                <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-1.5">
                  <span>
                    {cat.count} {lang === 'zh' ? '款' : lang === 'ms' ? 'produk' : 'items'}
                  </span>
                  {cat.fromPrice !== null && (
                    <>
                      <span className="text-stone-300">·</span>
                      <span className="font-mono font-bold text-amber-700">
                        {lang === 'zh' ? 'RM' : 'from RM'} {cat.fromPrice.toFixed(2)}
                        {lang === 'zh' ? ' 起' : ''}
                      </span>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-7">
            <button
              onClick={() => navigate('catalog')}
              className="inline-flex items-center gap-2 text-sm font-bold text-amber-700 hover:text-amber-800 transition-colors"
            >
              {t.catAll}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Best sellers with a one-tap add */}
      {popular.length > 0 && (
        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-stone-900">{t.popTitle}</h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">{t.popSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popular.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col"
              >
                <div className="relative h-40 bg-stone-200">
                  <img
                    src={p.image}
                    alt={productName(p, lang)}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-stone-900/85 text-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                    {p.code}
                  </span>
                  {p.cert === 'HALAL' && (
                    <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      HALAL
                    </span>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-bold text-sm text-stone-900 leading-snug">
                    {productName(p, lang)}
                  </h3>
                  <p className="text-[11px] text-stone-500 mt-0.5">{p.pricing.unitLabel}</p>

                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div>
                      <div className="text-[10px] uppercase tracking-wide text-stone-400">
                        {t.perUnit}
                      </div>
                      <div className="text-lg font-black text-amber-700 font-mono">
                        RM {p.pricing.unitPrice.toFixed(2)}
                      </div>
                    </div>
                    {p.pricing.cartonPrice !== null && (
                      <div className="text-right">
                        <div className="text-[10px] uppercase tracking-wide text-stone-400">
                          {t.perCarton}
                        </div>
                        <div className="text-sm font-bold text-stone-700 font-mono">
                          RM {p.pricing.cartonPrice.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleQuickAdd(p.id)}
                    className={`mt-4 w-full flex items-center justify-center gap-2 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors active:scale-95 ${
                      addedId === p.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-900 hover:bg-stone-800 text-white'
                    }`}
                  >
                    {addedId === p.id ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        {t.popAdded}
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        {t.popAdd}
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Value props + delivery and payment terms */}
      <section className="bg-stone-900 text-stone-100 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white mb-6">
              {t.whyTitle}
            </h2>
            <div className="space-y-3">
              {t.why.map((item, idx) => {
                const Icon = WHY_ICONS[idx];
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-stone-800/50 border border-stone-700/60 rounded-2xl p-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{item.t}</h3>
                      <p className="text-xs text-stone-400 leading-relaxed mt-0.5">{item.d}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white mb-6">
              {t.infoTitle}
            </h2>
            <div className="space-y-3">
              {t.info.map((item, idx) => {
                const Icon = INFO_ICONS[idx];
                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-stone-800/50 border border-stone-700/60 rounded-2xl p-4"
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{item.t}</h3>
                      <p className="text-xs text-stone-400 leading-relaxed mt-0.5">{item.d}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section className="bg-amber-600 text-white py-12 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-black font-serif mb-2">{t.finalTitle}</h2>
          <p className="text-xs sm:text-sm text-amber-50/90 mb-7">{t.finalSub}</p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={() => navigate('catalog')}
              className="flex items-center justify-center gap-2 bg-white text-amber-800 font-bold px-6 py-3.5 rounded-full text-sm shadow-lg transition-transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              {t.navPrice}
            </button>
            <button
              onClick={() => navigate('order')}
              className="flex items-center justify-center gap-2 bg-stone-900 text-white font-bold px-6 py-3.5 rounded-full text-sm shadow-lg transition-transform active:scale-95"
            >
              <ListOrdered className="w-4 h-4 text-amber-400" />
              {t.ctaOrder}
            </button>
          </div>
        </div>
      </section>

      <Footer
        lang={lang}
        onCategorySelect={(catId) => navigate('catalog', catId)}
        onOpenPolicy={openPolicy}
        onOpenHalalStatement={() => setHalalOpen(true)}
      />

      <DisclaimerModal
        isOpen={policyOpen}
        initialTab={policyTab}
        onClose={() => setPolicyOpen(false)}
        lang={lang}
        onOpenHalalStatement={() => setHalalOpen(true)}
      />

      <HalalStatementModal isOpen={halalOpen} onClose={() => setHalalOpen(false)} lang={lang} />

      <FloatingWhatsAppButton lang={lang} />
    </div>
  );
};
