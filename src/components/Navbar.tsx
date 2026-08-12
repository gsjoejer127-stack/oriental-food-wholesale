import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Boxes, 
  Globe,
  Truck,
  Sparkles,
  ChevronRight,
  History
} from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { CartItem, Language } from '../types';

interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (catId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenOEM: () => void;
  onOpenOrderHistory?: () => void;
  onOpenHalalStatement?: () => void;
  orderHistoryCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeCategory,
  setActiveCategory,
  searchQuery,
  setSearchQuery,
  lang,
  setLang,
  cartItems,
  onOpenCart,
  onOpenOEM,
  onOpenOrderHistory,
  onOpenHalalStatement,
  orderHistoryCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-500 text-stone-950 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wide uppercase">
              冷链配送
            </span>
            <span className="text-stone-300">
              {lang === 'zh'
                ? '巴生谷 Klang Valley 满 RM500 免运费 | 外坡 Outstation 满 RM800 免运费'
                : lang === 'ms'
                ? 'Penghantaran Percuma: Lembah Klang (Min RM500) | Luar Kawasan (Min RM800)'
                : 'Free Delivery: Klang Valley (Min RM500) | Outstation (Min RM800)'}
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 text-stone-400 text-[11px] shrink-0">
            <a href="tel:0108822608" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
              <Phone className="w-3 py-0.5 text-amber-500" />
              <span>010-882 2608</span>
              <span className="text-[10px] text-amber-300/80 font-mono hidden lg:inline">
                ({lang === 'zh' ? '周一至周五 10am-6pm' : lang === 'ms' ? 'Isnin-Jumaat 10am-6pm' : 'Mon-Fri 10am-6pm'})
              </span>
            </a>
            <span className="hidden md:inline text-stone-600">|</span>
            <div className="hidden md:flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-500" />
              <span>Kuala Lumpur, Malaysia</span>
            </div>

            {/* Trilingual Switcher Pill */}
            <div className="flex items-center gap-0.5 bg-stone-800 border border-stone-700 p-0.5 rounded-full text-[11px]">
              <Globe className="w-3 h-3 text-amber-400 ml-1.5 mr-0.5 shrink-0" />
              <button 
                onClick={() => setLang('zh')}
                className={`px-2 py-0.5 rounded-full font-medium transition-all ${
                  lang === 'zh' ? 'bg-amber-500 text-stone-950 font-bold shadow-xs' : 'text-stone-300 hover:text-white'
                }`}
              >
                中文
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-full font-medium transition-all ${
                  lang === 'en' ? 'bg-amber-500 text-stone-950 font-bold shadow-xs' : 'text-stone-300 hover:text-white'
                }`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('ms')}
                className={`px-2 py-0.5 rounded-full font-medium transition-all ${
                  lang === 'ms' ? 'bg-amber-500 text-stone-950 font-bold shadow-xs' : 'text-stone-300 hover:text-white'
                }`}
              >
                BM
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => setActiveCategory('all')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center border border-amber-400/40">
                <span className="text-amber-400 font-black text-lg tracking-tighter">东</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight leading-none font-serif">
                  {lang === 'zh' ? '东升食品' : 'Oriental Food'}
                </h1>
                <span className="hidden sm:inline-block text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded border border-amber-200">
                  批发供应
                </span>
              </div>
              <p className="text-[10px] text-stone-500 tracking-widest uppercase mt-0.5 font-medium">
                ORIENTAL FOOD WHOLESALE
              </p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder={lang === 'zh' ? '搜索 74 款批发食材 (如: 糍粑、肥牛、小龙虾...)' : 'Search 74 wholesale products (e.g. Rice cake, Beef, Lobster...)'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 border border-stone-300 rounded-full py-2 pl-10 pr-10 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all shadow-inner"
              />
              <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-stone-400" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-600 text-xs bg-stone-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Order History Button */}
            {onOpenOrderHistory && (
              <button
                onClick={onOpenOrderHistory}
                className="relative hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 transition-colors"
                title={lang === 'zh' ? '查看历史采购订单并一键再来一单' : 'View Order History & Reorder'}
              >
                <History className="w-3.5 h-3.5 text-amber-700" />
                <span>{lang === 'zh' ? '历史订单' : 'Orders'}</span>
                {orderHistoryCount > 0 && (
                  <span className="bg-amber-100 text-amber-900 font-mono text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-amber-300">
                    {orderHistoryCount}
                  </span>
                )}
              </button>
            )}

            {/* OEM Customization Link */}
            <button
              onClick={onOpenOEM}
              className="hidden lg:flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 rounded-full border border-amber-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{lang === 'zh' ? '餐饮OEM/定制' : 'OEM Service'}</span>
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-3.5 py-2 rounded-full font-medium text-xs sm:text-sm shadow-sm transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-bold">{lang === 'zh' ? '购物车' : 'Cart'}</span>
              <span className="hidden sm:inline font-mono border-l border-amber-500/50 pl-2 text-amber-100">
                RM {totalAmount.toFixed(2)}
              </span>
              {totalQuantity > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                  {totalQuantity}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="mt-2.5 md:hidden">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={lang === 'zh' ? '搜索74款食材 (糍粑/肥牛/小龙虾...)' : 'Search products...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-100 border border-stone-300 rounded-full py-1.5 pl-9 pr-8 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-stone-400" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-stone-400 text-xs bg-stone-200 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Categories Bar Horizontal Scroll */}
      <div className="bg-stone-50 border-t border-stone-200 shadow-inner overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-1.5 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-700 text-white shadow-sm font-semibold'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive ? 'bg-amber-900 text-amber-200' : 'bg-amber-100 text-amber-800'
                }`}>
                  {cat.codeZh}
                </span>
                <span>{lang === 'zh' ? cat.nameZh : lang === 'ms' ? (cat.nameMs || cat.nameEn) : cat.nameEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              {lang === 'zh' ? '快捷服务' : 'Quick Services'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                onOpenOEM();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-2.5 bg-amber-50 text-amber-900 rounded-lg text-xs font-medium border border-amber-200"
            >
              <span>{lang === 'zh' ? '餐饮OEM/品牌定制' : 'OEM Supply Chain'}</span>
              <ChevronRight className="w-3.5 h-3.5 text-amber-600" />
            </button>
            <a
              href="tel:0108822608"
              className="flex items-center justify-between p-2.5 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium"
            >
              <span>{lang === 'zh' ? '电话批发咨询' : 'Call Sales'}</span>
              <Phone className="w-3.5 h-3.5 text-amber-600" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
