import { useCallback, useEffect, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'oriental_food_cart';

const readCart = (): CartItem[] => {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    const items: CartItem[] = saved ? JSON.parse(saved) : [];
    // A saved cart holds a full copy of each product, so drop anything that
    // has since been delisted rather than let it be ordered again.
    return items.filter((i) => PRODUCTS.some((p) => p.id === i.product?.id));
  } catch {
    return [];
  }
};

/**
 * Wholesale cart shared by the full catalog and the quick-order price list.
 * Both read and write the same localStorage key, so a list started on one
 * page carries over to the other.
 */
export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(readCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = useCallback(
    (product: Product, packOption: 'unit' | 'carton', quantity: number) => {
      const pricePerUnit =
        packOption === 'carton' && product.pricing.cartonPrice !== null
          ? product.pricing.cartonPrice
          : product.pricing.unitPrice;

      setCartItems((prev) => {
        const existingIdx = prev.findIndex(
          (i) => i.product.id === product.id && i.packOption === packOption
        );

        if (existingIdx > -1) {
          return prev.map((item, idx) =>
            idx === existingIdx ? { ...item, quantity: item.quantity + quantity } : item
          );
        }

        return [...prev, { product, packOption, quantity, pricePerUnit }];
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: number, packOption: 'unit' | 'carton', delta: number) => {
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
    },
    []
  );

  const setQuantity = useCallback(
    (product: Product, packOption: 'unit' | 'carton', quantity: number) => {
      const pricePerUnit =
        packOption === 'carton' && product.pricing.cartonPrice !== null
          ? product.pricing.cartonPrice
          : product.pricing.unitPrice;

      setCartItems((prev) => {
        const withoutItem = prev.filter(
          (i) => !(i.product.id === product.id && i.packOption === packOption)
        );
        if (quantity <= 0) return withoutItem;

        const existingIdx = prev.findIndex(
          (i) => i.product.id === product.id && i.packOption === packOption
        );
        if (existingIdx > -1) {
          return prev.map((item, idx) =>
            idx === existingIdx ? { ...item, quantity, pricePerUnit } : item
          );
        }
        return [...prev, { product, packOption, quantity, pricePerUnit }];
      });
    },
    []
  );

  const removeItem = useCallback((productId: number, packOption: 'unit' | 'carton') => {
    setCartItems((prev) =>
      prev.filter((i) => !(i.product.id === productId && i.packOption === packOption))
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const subtotal = cartItems.reduce((acc, i) => acc + i.pricePerUnit * i.quantity, 0);
  const totalQuantity = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const quantityOf = useCallback(
    (productId: number, packOption: 'unit' | 'carton') =>
      cartItems.find((i) => i.product.id === productId && i.packOption === packOption)?.quantity ?? 0,
    [cartItems]
  );

  return {
    cartItems,
    setCartItems,
    addToCart,
    updateQuantity,
    setQuantity,
    removeItem,
    clearCart,
    subtotal,
    totalQuantity,
    quantityOf,
  };
};
