import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = useCallback((product, weight, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.selectedWeight === weight);
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.selectedWeight === weight
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [...prev, { ...product, selectedWeight: weight, qty }];
    });
  }, []);

  const removeItem = useCallback((id, weight) =>
    setItems(prev => prev.filter(i => !(i.id === id && i.selectedWeight === weight))), []);

  const updateQty = useCallback((id, weight, delta) =>
    setItems(prev => prev.map(i =>
      i.id === id && i.selectedWeight === weight
        ? { ...i, qty: Math.max(1, i.qty + delta) }
        : i
    )), []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, setItems, addToCart, removeItem, updateQty, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
