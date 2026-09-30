import React, { useEffect, useState } from 'react';
import App from './App';
import { LandingPage } from './components/LandingPage';
import { QuickOrderPage } from './components/QuickOrderPage';
import { useCart } from './hooks/useCart';
import { PRODUCTS } from './data/products';
import { Language } from './types';
import { RouteState, parseHash } from './lib/routes';

const LANG_STORAGE_KEY = 'oriental_food_lang';

const readLang = (): Language => {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'zh' || saved === 'en' || saved === 'ms') return saved;
  } catch {
    /* ignore */
  }
  return 'zh';
};

/**
 * Hash router for the three pages of the site:
 *   #/         landing page
 *   #/catalog  full illustrated price list (with cart + checkout)
 *   #/order    one-page quick order sheet
 * Hash routing keeps the site a static build, so it works on GitHub Pages
 * without any server-side rewrite rules.
 */
export default function Root() {
  const [routeState, setRouteState] = useState<RouteState>(() => parseHash(window.location.hash));
  const [lang, setLangState] = useState<Language>(readLang);
  const cart = useCart();

  useEffect(() => {
    const onHashChange = () => setRouteState(parseHash(window.location.hash));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const setLang = (next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  };

  // One-tap add from the landing page: a single unit of the given product.
  const handleQuickAdd = (productId: number) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (product) cart.addToCart(product, 'unit', 1);
  };

  if (routeState.route === 'catalog') {
    return (
      <App lang={lang} setLang={setLang} cart={cart} initialCategory={routeState.category} />
    );
  }

  if (routeState.route === 'order') {
    return (
      <QuickOrderPage
        lang={lang}
        setLang={setLang}
        cartItems={cart.cartItems}
        subtotal={cart.subtotal}
        totalQuantity={cart.totalQuantity}
        quantityOf={cart.quantityOf}
        onSetQuantity={cart.setQuantity}
        onClearCart={cart.clearCart}
        initialCategory={routeState.category}
      />
    );
  }

  return (
    <LandingPage
      lang={lang}
      setLang={setLang}
      cartQuantity={cart.totalQuantity}
      onQuickAdd={handleQuickAdd}
    />
  );
}
