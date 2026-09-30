import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { CartItem, DeliveryZone, Language, Product } from '../types';
import {
  DELIVERY_RULES,
  buildQuickOrderText,
  categoryName,
  getDeliveryFee,
  packLabel,
  productName,
  whatsappLink,
  zoneLabel,
} from '../lib/order';
import { navigate } from '../lib/routes';

interface QuickOrderPageProps {
  lang: Language;
  setLang: (lang: Language) => void;
  cartItems: CartItem[];
  subtotal: number;
  totalQuantity: number;
  quantityOf: (productId: number, packOption: 'unit' | 'carton') => number;
  onSetQuantity: (product: Product, packOption: 'unit' | 'carton', quantity: number) => void;
  onClearCart: () => void;
  initialCategory?: string;
}

const CONTACT_STORAGE_KEY = 'oriental_food_quick_contact';

const COPY = {
  zh: {
    title: '快速下单',
    subtitle: '填数量 → 发 WhatsApp，无需注册',
    back: '返回首页',
    fullCatalog: '完整图文价目表',
    search: '搜索食材名称或编号…',
    all: '全部',
    unit: '单包',
    carton: '整箱',
    inquire: '询价',
    empty: '没有符合条件的食材',
    reset: '清除搜索',
    selected: '已选',
    items: '项',
    subtotal: '小计',
    delivery: '运费',
    total: '总额',
    zone: '配送方式',
    zones: { klang_valley: '巴生谷', outstation: '外坡', self_pickup: '自取' },
    freeHint: (amount: string) => `再加 RM ${amount} 即免运费`,
    freeNow: '已达免运费',
    sendOrder: '发送订单到 WhatsApp',
    clear: '清空',
    formTitle: '留下联系方式即可下单',
    formSub: '只需姓名与电话，销售会在工作时间内回复确认现货与送货时间。',
    name: '联系人 / 店名',
    namePh: '例：陈先生 / 好味火锅店',
    phone: '联系电话',
    phonePh: '例：012-345 6789',
    address: '送货地址（选填）',
    addressPh: '街道、城市、邮编',
    notes: '备注（选填）',
    notesPh: '例：希望星期五上午送货',
    required: '请填写联系人与电话',
    confirm: '确认并发送',
    cancel: '返回修改',
    orderPreview: '订单预览',
    emptyCart: '先在下方价目表选择数量',
    note: '价格以本价目表为准，最终总额由销售在 WhatsApp 确认。',
  },
  en: {
    title: 'Quick Order',
    subtitle: 'Enter quantities → send on WhatsApp. No sign-up.',
    back: 'Back to home',
    fullCatalog: 'Full catalog with photos',
    search: 'Search product name or code…',
    all: 'All',
    unit: 'Unit',
    carton: 'Carton',
    inquire: 'Inquire',
    empty: 'No matching products',
    reset: 'Clear search',
    selected: 'Selected',
    items: 'items',
    subtotal: 'Subtotal',
    delivery: 'Delivery',
    total: 'Total',
    zone: 'Delivery',
    zones: { klang_valley: 'Klang Valley', outstation: 'Outstation', self_pickup: 'Pickup' },
    freeHint: (amount: string) => `Add RM ${amount} more for free delivery`,
    freeNow: 'Free delivery unlocked',
    sendOrder: 'Send order on WhatsApp',
    clear: 'Clear',
    formTitle: 'Leave your contact to place the order',
    formSub: 'Name and phone are enough. Sales will confirm stock and delivery within office hours.',
    name: 'Contact / Outlet name',
    namePh: 'e.g. Mr. Tan / Hao Wei Hotpot',
    phone: 'Phone number',
    phonePh: 'e.g. 012-345 6789',
    address: 'Delivery address (optional)',
    addressPh: 'Street, city, postcode',
    notes: 'Notes (optional)',
    notesPh: 'e.g. deliver Friday morning',
    required: 'Please fill in name and phone',
    confirm: 'Confirm & send',
    cancel: 'Back to edit',
    orderPreview: 'Order summary',
    emptyCart: 'Pick quantities from the price list below',
    note: 'Prices follow this list; the final total is confirmed by sales on WhatsApp.',
  },
  ms: {
    title: 'Pesanan Pantas',
    subtitle: 'Masukkan kuantiti → hantar di WhatsApp. Tanpa pendaftaran.',
    back: 'Kembali ke laman utama',
    fullCatalog: 'Katalog penuh bergambar',
    search: 'Cari nama produk atau kod…',
    all: 'Semua',
    unit: 'Paket',
    carton: 'Kotak',
    inquire: 'Tanya',
    empty: 'Tiada produk yang sepadan',
    reset: 'Kosongkan carian',
    selected: 'Dipilih',
    items: 'item',
    subtotal: 'Jumlah kecil',
    delivery: 'Penghantaran',
    total: 'Jumlah',
    zone: 'Penghantaran',
    zones: { klang_valley: 'Lembah Klang', outstation: 'Luar Kawasan', self_pickup: 'Ambil Sendiri' },
    freeHint: (amount: string) => `Tambah RM ${amount} untuk penghantaran percuma`,
    freeNow: 'Penghantaran percuma',
    sendOrder: 'Hantar pesanan di WhatsApp',
    clear: 'Kosongkan',
    formTitle: 'Tinggalkan maklumat untuk membuat pesanan',
    formSub: 'Nama dan telefon sudah cukup. Jualan akan mengesahkan stok dan penghantaran.',
    name: 'Nama / Nama kedai',
    namePh: 'cth. Encik Tan / Kedai Stimbot',
    phone: 'No. telefon',
    phonePh: 'cth. 012-345 6789',
    address: 'Alamat penghantaran (pilihan)',
    addressPh: 'Jalan, bandar, kod pos',
    notes: 'Nota (pilihan)',
    notesPh: 'cth. hantar Jumaat pagi',
    required: 'Sila isi nama dan nombor telefon',
    confirm: 'Sahkan & hantar',
    cancel: 'Kembali',
    orderPreview: 'Ringkasan pesanan',
    emptyCart: 'Pilih kuantiti dari senarai harga di bawah',
    note: 'Harga mengikut senarai ini; jumlah akhir disahkan oleh jualan di WhatsApp.',
  },
} as const;

const ZONES: DeliveryZone[] = ['klang_valley', 'outstation', 'self_pickup'];

interface StepperProps {
  label: string;
  spec: string;
  price: number | null;
  quantity: number;
  inquireLabel: string;
  onChange: (quantity: number) => void;
}

const Stepper: React.FC<StepperProps> = ({
  label,
  spec,
  price,
  quantity,
  inquireLabel,
  onChange,
}) => {
  if (price === null) {
    return (
      <div className="flex-1 min-w-0 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-3 py-2">
        <div className="text-[10px] uppercase tracking-wide text-stone-400">{label}</div>
        <div className="text-[11px] text-stone-500 truncate">{spec}</div>
        <div className="text-xs font-bold text-stone-400 mt-0.5">{inquireLabel}</div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 min-w-0 rounded-xl border px-3 py-2 transition-colors ${
        quantity > 0 ? 'border-amber-400 bg-amber-50' : 'border-stone-200 bg-stone-50'
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[10px] uppercase tracking-wide text-stone-400">{label}</span>
        <span className="text-sm font-black font-mono text-amber-700">RM {price.toFixed(2)}</span>
      </div>
      <div className="text-[11px] text-stone-500 truncate mb-1.5">{spec}</div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label="decrease"
          onClick={() => onChange(Math.max(0, quantity - 1))}
          disabled={quantity === 0}
          className="w-7 h-7 rounded-lg bg-white border border-stone-300 text-stone-700 flex items-center justify-center disabled:opacity-40 hover:border-amber-400 transition-colors active:scale-95"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <input
          type="number"
          inputMode="numeric"
          min={0}
          value={quantity === 0 ? '' : quantity}
          placeholder="0"
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            onChange(Number.isNaN(parsed) || parsed < 0 ? 0 : Math.min(parsed, 9999));
          }}
          className="w-12 h-7 text-center text-sm font-bold text-stone-900 bg-white border border-stone-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          aria-label="increase"
          onClick={() => onChange(quantity + 1)}
          className="w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center hover:bg-amber-700 transition-colors active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export const QuickOrderPage: React.FC<QuickOrderPageProps> = ({
  lang,
  setLang,
  cartItems,
  subtotal,
  totalQuantity,
  quantityOf,
  onSetQuantity,
  onClearCart,
  initialCategory,
}) => {
  const t = COPY[lang];
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [zone, setZone] = useState<DeliveryZone>('klang_valley');
  const [error, setError] = useState('');

  const [contact, setContact] = useState(() => {
    try {
      const saved = localStorage.getItem(CONTACT_STORAGE_KEY);
      return saved
        ? { name: '', phone: '', address: '', notes: '', ...JSON.parse(saved) }
        : { name: '', phone: '', address: '', notes: '' };
    } catch {
      return { name: '', phone: '', address: '', notes: '' };
    }
  });

  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
  }, [initialCategory]);

  const deliveryFee = getDeliveryFee(zone, subtotal);
  const total = subtotal + deliveryFee;
  const { freeThreshold } = DELIVERY_RULES[zone];
  const amountToFree = Math.max(0, freeThreshold - subtotal);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (activeCategory !== 'all' && p.categoryId !== activeCategory) return false;
      if (!q) return true;
      return [p.code, p.nameZh, p.nameEn, p.nameMs, p.categoryZh, p.categoryEn, p.categoryMs]
        .filter(Boolean)
        .some((field) => (field as string).toLowerCase().includes(q));
    });
  }, [activeCategory, searchQuery]);

  const handleSend = () => {
    if (!contact.name.trim() || !contact.phone.trim()) {
      setError(t.required);
      return;
    }
    setError('');
    try {
      localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(contact));
    } catch (e) {
      console.error(e);
    }
    const text = buildQuickOrderText(cartItems, zone, contact, lang);
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
    setFormOpen(false);
  };

  const langButton = (code: Language, label: string) => (
    <button
      onClick={() => setLang(code)}
      className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-colors ${
        lang === code ? 'bg-amber-500 text-stone-950' : 'text-stone-500 hover:text-amber-700'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-900 antialiased selection:bg-amber-500 selection:text-white pb-44 sm:pb-36">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => navigate('landing')}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-amber-700 transition-colors shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t.back}</span>
            </button>

            <div className="text-center min-w-0">
              <h1 className="font-serif font-bold text-base sm:text-lg text-stone-900 leading-tight">
                {t.title}
              </h1>
              <p className="text-[10px] sm:text-[11px] text-stone-500 truncate">{t.subtitle}</p>
            </div>

            <div className="flex items-center gap-1 bg-stone-100 border border-stone-200 rounded-lg p-0.5 shrink-0">
              {langButton('zh', '中')}
              {langButton('en', 'EN')}
              {langButton('ms', 'BM')}
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search}
              className="w-full pl-9 pr-9 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex gap-1.5 overflow-x-auto mt-2.5 pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white text-stone-600 border-stone-300 hover:border-amber-400'
                }`}
              >
                {cat.id === 'all' ? t.all : categoryName(cat, lang)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Price list with inline quantity entry */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-5">
        <p className="text-[11px] text-stone-500 mb-3 flex items-start gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
          {t.note}
        </p>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center">
            <p className="text-sm font-bold text-stone-800">{t.empty}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-3 px-4 py-2 bg-amber-700 text-white text-xs font-bold rounded-full"
            >
              {t.reset}
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredProducts.map((p) => {
              const unitQty = quantityOf(p.id, 'unit');
              const cartonQty = quantityOf(p.id, 'carton');
              const lineTotal =
                unitQty * p.pricing.unitPrice + cartonQty * (p.pricing.cartonPrice ?? 0);

              return (
                <div
                  key={p.id}
                  className={`bg-white rounded-2xl border p-3 sm:p-4 transition-colors ${
                    lineTotal > 0 ? 'border-amber-300 shadow-sm' : 'border-stone-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono font-bold text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded">
                          {p.code}
                        </span>
                        {p.cert === 'HALAL' && (
                          <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                            HALAL
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-sm text-stone-900 leading-snug mt-1">
                        {productName(p, lang)}
                      </h3>
                      {lang === 'zh' && (
                        <p className="text-[11px] text-stone-500 leading-snug">{p.nameEn}</p>
                      )}
                    </div>

                    {lineTotal > 0 && (
                      <div className="text-right shrink-0">
                        <div className="text-[10px] uppercase tracking-wide text-stone-400">
                          {t.subtotal}
                        </div>
                        <div className="text-sm font-black font-mono text-emerald-700">
                          RM {lineTotal.toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Stepper
                      label={t.unit}
                      spec={p.pricing.unitLabel}
                      price={p.pricing.unitPrice}
                      quantity={unitQty}
                      inquireLabel={t.inquire}
                      onChange={(q) => onSetQuantity(p, 'unit', q)}
                    />
                    <Stepper
                      label={t.carton}
                      spec={p.pricing.cartonLabel}
                      price={p.pricing.cartonPrice}
                      quantity={cartonQty}
                      inquireLabel={t.inquire}
                      onChange={(q) => onSetQuantity(p, 'carton', q)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-6">
          <button
            onClick={() => navigate('catalog')}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 underline underline-offset-2"
          >
            {t.fullCatalog}
          </button>
        </div>
      </main>

      {/* Sticky order summary bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-stone-950/97 backdrop-blur-md border-t border-stone-800 text-stone-100 shadow-2xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          {/* Delivery zone picker */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1 bg-stone-900 border border-stone-800 rounded-lg p-0.5">
              <Truck className="w-3.5 h-3.5 text-amber-500 ml-1.5" />
              {ZONES.map((z) => (
                <button
                  key={z}
                  onClick={() => setZone(z)}
                  className={`px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-bold transition-colors ${
                    zone === z ? 'bg-amber-500 text-stone-950' : 'text-stone-400 hover:text-amber-300'
                  }`}
                >
                  {t.zones[z]}
                </button>
              ))}
            </div>

            {totalQuantity > 0 && (
              <button
                onClick={onClearCart}
                className="flex items-center gap-1 text-[11px] text-stone-500 hover:text-red-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                {t.clear}
              </button>
            )}
          </div>

          {/* Free-delivery progress */}
          {zone !== 'self_pickup' && totalQuantity > 0 && (
            <div className="mb-2">
              <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all"
                  style={{
                    width: `${Math.min(100, freeThreshold > 0 ? (subtotal / freeThreshold) * 100 : 100)}%`,
                  }}
                />
              </div>
              <div className="text-[10px] mt-1 text-amber-400 font-semibold">
                {amountToFree > 0 ? t.freeHint(amountToFree.toFixed(2)) : `✓ ${t.freeNow}`}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              {totalQuantity > 0 ? (
                <>
                  <div className="text-[11px] text-stone-400">
                    {t.selected} {totalQuantity} {t.items} · {t.delivery} RM {deliveryFee.toFixed(2)}
                  </div>
                  <div className="text-lg sm:text-xl font-black font-mono text-amber-400 leading-tight">
                    RM {total.toFixed(2)}
                  </div>
                </>
              ) : (
                <div className="text-[11px] sm:text-xs text-stone-400 flex items-center gap-1.5">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {t.emptyCart}
                </div>
              )}
            </div>

            <button
              onClick={() => setFormOpen(true)}
              disabled={totalQuantity === 0}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-800 disabled:text-stone-600 text-white font-bold px-4 sm:px-6 py-3 rounded-full text-xs sm:text-sm transition-colors active:scale-95 shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.sendOrder}</span>
              <span className="sm:hidden">WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact sheet — the only form in the flow */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0" onClick={() => setFormOpen(false)} />

          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col">
            <div className="flex items-start justify-between gap-3 p-5 border-b border-stone-200">
              <div>
                <h2 className="font-serif font-bold text-base text-stone-900">{t.formTitle}</h2>
                <p className="text-[11px] text-stone-500 mt-0.5 leading-relaxed">{t.formSub}</p>
              </div>
              <button
                onClick={() => setFormOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-3 overflow-y-auto">
              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  {t.name} <span className="text-red-500">*</span>
                </label>
                <input
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  placeholder={t.namePh}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">
                  {t.phone} <span className="text-red-500">*</span>
                </label>
                <input
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder={t.phonePh}
                  inputMode="tel"
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {zone !== 'self_pickup' && (
                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    {t.address}
                  </label>
                  <textarea
                    value={contact.address}
                    onChange={(e) => setContact({ ...contact, address: e.target.value })}
                    placeholder={t.addressPh}
                    rows={2}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold text-stone-700 mb-1">{t.notes}</label>
                <input
                  value={contact.notes}
                  onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                  placeholder={t.notesPh}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* Order summary */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5">
                <div className="text-[11px] font-bold text-stone-700 mb-2">{t.orderPreview}</div>
                <div className="space-y-1 max-h-32 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={`${item.product.id}-${item.packOption}`}
                      className="flex items-start justify-between gap-2 text-[11px] text-stone-600"
                    >
                      <span className="min-w-0">
                        {item.product.code} {productName(item.product, lang)}
                        <span className="text-stone-400"> ({packLabel(item)})</span> ×{item.quantity}
                      </span>
                      <span className="font-mono font-bold text-stone-800 shrink-0">
                        {(item.pricePerUnit * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-stone-200 mt-2 pt-2 space-y-0.5 text-[11px]">
                  <div className="flex justify-between text-stone-600">
                    <span>{t.subtotal}</span>
                    <span className="font-mono">RM {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>
                      {t.delivery} · {zoneLabel(zone, lang)}
                    </span>
                    <span className="font-mono">RM {deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-black text-stone-900 text-sm pt-1">
                    <span>{t.total}</span>
                    <span className="font-mono text-amber-700">RM {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {error && <p className="text-[11px] font-semibold text-red-600">{error}</p>}
            </div>

            <div className="p-5 border-t border-stone-200 flex gap-2">
              <button
                onClick={() => setFormOpen(false)}
                className="px-4 py-3 rounded-full text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleSend}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-full text-sm transition-colors active:scale-95"
              >
                <Check className="w-4 h-4" />
                {t.confirm}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
