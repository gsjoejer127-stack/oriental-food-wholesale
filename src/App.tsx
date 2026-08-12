import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  Sparkles, 
  Grid, 
  List, 
  ArrowUpDown, 
  ShoppingBag, 
  CheckCircle2,
  Package,
  Layers,
  UtensilsCrossed
} from 'lucide-react';
import { Navbar } from './components/Navbar';
import { MovingPromoBanner } from './components/MovingPromoBanner';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderReceiptModal } from './components/OrderReceiptModal';
import { DisclaimerModal } from './components/DisclaimerModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { HalalStatementModal } from './components/HalalStatementModal';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { OEMInquirySection } from './components/OEMInquirySection';
import { Footer } from './components/Footer';
import { CATEGORIES, PRODUCTS } from './data/products';
import { CartItem, DeliveryZone, Language, Order, Product } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('zh');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price_low' | 'price_high' | 'code'>('default');

  // Shopping Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('oriental_food_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState<boolean>(false);
  const [disclaimerModalOpen, setDisclaimerModalOpen] = useState<boolean>(false);
  const [checkoutZone, setCheckoutZone] = useState<DeliveryZone>('klang_valley');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [halalStatementModalOpen, setHalalStatementModalOpen] = useState<boolean>(false);

  // Order history state with localStorage persistence
  const [orderHistory, setOrderHistory] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('oriental_food_order_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [orderHistoryModalOpen, setOrderHistoryModalOpen] = useState<boolean>(false);

  // Sync order history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('oriental_food_order_history', JSON.stringify(orderHistory));
    } catch (e) {
      console.error(e);
    }
  }, [orderHistory]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('oriental_food_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  // Add to cart handler
  const handleAddToCart = (product: Product, packOption: 'unit' | 'carton', quantity: number) => {
    const pricePerUnit =
      packOption === 'carton' && product.pricing.cartonPrice !== null
        ? product.pricing.cartonPrice
        : product.pricing.unitPrice;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.product.id === product.id && i.packOption === packOption
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            packOption,
            quantity,
            pricePerUnit,
          },
        ];
      }
    });
  };

  // Update quantity in cart
  const handleUpdateQuantity = (productId: number, packOption: 'unit' | 'carton', delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.packOption === packOption) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item from cart
  const handleRemoveItem = (productId: number, packOption: 'unit' | 'carton') => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.packOption === packOption))
    );
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Open checkout modal
  const handleProceedToCheckout = (zone: DeliveryZone) => {
    setCheckoutZone(zone);
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  // Handle completed order
  const handleOrderComplete = (order: Order) => {
    setCompletedOrder(order);
    setOrderHistory((prev) => [order, ...prev]);
    setCheckoutModalOpen(false);
    setCartItems([]);
  };

  // Automatically add all items from a previous order into current shopping cart
  const handleReorderOrder = (order: Order) => {
    setCartItems((prev) => {
      const updated = [...prev];
      order.items.forEach((orderItem) => {
        const existingIdx = updated.findIndex(
          (i) => i.product.id === orderItem.product.id && i.packOption === orderItem.packOption
        );

        if (existingIdx > -1) {
          updated[existingIdx].quantity += orderItem.quantity;
        } else {
          updated.push({
            product: orderItem.product,
            packOption: orderItem.packOption,
            quantity: orderItem.quantity,
            pricePerUnit: orderItem.pricePerUnit,
          });
        }
      });
      return updated;
    });

    setCompletedOrder(null);
    setOrderHistoryModalOpen(false);
    setCartDrawerOpen(true);
  };

  // Scroll to catalog section
  const scrollToCatalog = () => {
    const el = document.getElementById('catalog-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to OEM section
  const scrollToOEM = () => {
    const el = document.getElementById('oem-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filtered & Sorted Products calculation
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (activeCategory !== 'all' && p.categoryId !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const matchesCode = p.code.toLowerCase().includes(q);
        const matchesNameZh = p.nameZh.toLowerCase().includes(q);
        const matchesNameEn = p.nameEn.toLowerCase().includes(q);
        const matchesNameMs = (p.nameMs || '').toLowerCase().includes(q);
        const matchesCatZh = p.categoryZh.toLowerCase().includes(q);
        const matchesCatEn = p.categoryEn.toLowerCase().includes(q);
        const matchesCatMs = (p.categoryMs || '').toLowerCase().includes(q);
        const matchesDesc = (p.descriptionZh || '').toLowerCase().includes(q);
        const matchesDescMs = (p.descriptionMs || '').toLowerCase().includes(q);

        return (
          matchesCode ||
          matchesNameZh ||
          matchesNameEn ||
          matchesNameMs ||
          matchesCatZh ||
          matchesCatEn ||
          matchesCatMs ||
          matchesDesc ||
          matchesDescMs
        );
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') {
        return a.pricing.unitPrice - b.pricing.unitPrice;
      }
      if (sortBy === 'price_high') {
        return b.pricing.unitPrice - a.pricing.unitPrice;
      }
      if (sortBy === 'code') {
        return a.id - b.id;
      }
      return 0; // default order from catalog
    });
  }, [activeCategory, searchQuery, sortBy]);

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-900 flex flex-col antialiased selection:bg-amber-500 selection:text-white">
      {/* Top Responsive Navigation Bar */}
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        lang={lang}
        setLang={setLang}
        cartItems={cartItems}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenOEM={scrollToOEM}
        onOpenOrderHistory={() => setOrderHistoryModalOpen(true)}
        onOpenHalalStatement={() => setHalalStatementModalOpen(true)}
        orderHistoryCount={orderHistory.length}
      />

      {/* Moving B2B Promo Marquee Banner */}
      <MovingPromoBanner
        lang={lang}
        onOpenOEM={scrollToOEM}
      />

      {/* Corporate Hero Banner */}
      <HeroBanner
        lang={lang}
        onExploreCatalog={scrollToCatalog}
        onOpenOEM={scrollToOEM}
      />

      {/* Main Catalog Content */}
      <main id="catalog-grid" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Catalog Control Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-600" />
              <h2 className="text-lg font-bold text-stone-900 font-serif">
                {lang === 'zh'
                  ? activeCategoryObj?.nameZh || '全部批发食材'
                  : lang === 'ms'
                  ? activeCategoryObj?.nameMs || activeCategoryObj?.nameEn || 'Semua Produk'
                  : activeCategoryObj?.nameEn || 'All Products'}
              </h2>
              <span className="bg-amber-100 text-amber-900 text-xs font-mono font-bold px-2 py-0.5 rounded-full">
                {filteredProducts.length} {lang === 'zh' ? '款' : lang === 'ms' ? 'produk' : 'items'}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1">
              {lang === 'zh'
                ? '支持小包/单盒零购，与整箱批发批量下单，全马冷链物流配送。'
                : lang === 'ms'
                ? 'Menyokong pembelian paket runcit dan pesanan borong kotak penuh.'
                : 'Supports both retail packet purchase and full carton wholesale.'}
            </p>
          </div>

          {/* Filter Bar Right Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Sort Select */}
            <div className="flex items-center gap-1 bg-stone-50 border border-stone-300 rounded-xl px-2 py-1 text-xs text-stone-700">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none font-medium text-xs text-stone-800"
              >
                <option value="default">{lang === 'zh' ? '目录默认排序' : lang === 'ms' ? 'Susunan Katalog' : 'Catalog Order'}</option>
                <option value="price_low">{lang === 'zh' ? '价格: 从低到高' : lang === 'ms' ? 'Harga: Rendah ke Tinggi' : 'Price: Low to High'}</option>
                <option value="price_high">{lang === 'zh' ? '价格: 从高到低' : lang === 'ms' ? 'Harga: Tinggi ke Rendah' : 'Price: High to Low'}</option>
                <option value="code">{lang === 'zh' ? '按编号 (NO.01-76)' : lang === 'ms' ? 'Ikut Kod Produk' : 'By Item Code'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-lg mx-auto my-8">
            <UtensilsCrossed className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-stone-800">
              {lang === 'zh' ? '未找到匹配的批发食材' : 'No matching products found'}
            </h3>
            <p className="text-xs text-stone-500 mt-1 mb-4">
              {lang === 'zh'
                ? '请尝试清除搜索关键词或切换分类。'
                : 'Try clearing your search terms or selecting another category.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="py-2 px-4 bg-amber-700 text-white font-bold rounded-full text-xs shadow-sm hover:bg-amber-800 transition-colors"
            >
              {lang === 'zh' ? '重置搜索与分类' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                lang={lang}
                onAddToCart={handleAddToCart}
                onQuickView={setQuickViewProduct}
              />
            ))}
          </div>
        )}


        {/* Product Differentiation Notice under All Products (Trilingual: Chinese, English, Malay) */}
        <div className="mt-8 bg-amber-50/90 border border-amber-200/80 rounded-2xl p-4 sm:p-5 text-stone-800 text-xs sm:text-sm leading-relaxed space-y-2 shadow-sm">
          <p className="font-medium text-amber-950">
            本平台同时供应传统中式特色食材（未标示 HALAL 者）。请各采购主管在下单前详细核对菜单用料需求后再行采购。
          </p>
          <p className="text-stone-700 text-xs pt-2 border-t border-amber-200/70">
            Our platform also supplies traditional Chinese specialty ingredients (unmarked with HALAL). Purchasing managers are advised to carefully verify menu requirements before placing orders.
          </p>
          <p className="text-stone-700 text-xs pt-2 border-t border-amber-200/70">
            Platform kami juga membekalkan bahan makanan keistimewaan tradisional Cina (yang tidak ditandakan dengan HALAL). Pengurus pembelian dinasihatkan untuk menyemak keperluan menu sebelum membuat pesanan.
          </p>
        </div>
      </main>

      {/* B2B OEM & Supply Chain Inquiry Section */}
      <OEMInquirySection lang={lang} />

      {/* Footer */}
      <Footer 
        lang={lang} 
        onCategorySelect={setActiveCategory} 
        onOpenDisclaimer={() => setDisclaimerModalOpen(true)}
        onOpenHalalStatement={() => setHalalStatementModalOpen(true)}
      />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
        onOpenOrderHistory={() => setOrderHistoryModalOpen(true)}
        lang={lang}
      />

      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        lang={lang}
        onAddToCart={handleAddToCart}
        onOpenHalalStatement={() => setHalalStatementModalOpen(true)}
      />

      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cartItems}
        defaultZone={checkoutZone}
        lang={lang}
        onOrderComplete={handleOrderComplete}
      />

      <OrderReceiptModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onReorder={handleReorderOrder}
        lang={lang}
      />

      <OrderHistoryModal
        isOpen={orderHistoryModalOpen}
        onClose={() => setOrderHistoryModalOpen(false)}
        orders={orderHistory}
        onReorder={handleReorderOrder}
        onViewReceipt={(ord) => {
          setOrderHistoryModalOpen(false);
          setCompletedOrder(ord);
        }}
        lang={lang}
      />

      <DisclaimerModal
        isOpen={disclaimerModalOpen}
        onClose={() => setDisclaimerModalOpen(false)}
        lang={lang}
        onOpenHalalStatement={() => setHalalStatementModalOpen(true)}
      />

      <HalalStatementModal
        isOpen={halalStatementModalOpen}
        onClose={() => setHalalStatementModalOpen(false)}
        lang={lang}
      />

      {/* Floating Customer Support WhatsApp Button */}
      <FloatingWhatsAppButton lang={lang} />
    </div>
  );
}
