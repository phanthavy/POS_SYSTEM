"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
};

export type OrderStatus = "pending" | "served" | "paid";

export type PaymentMethod = "cash" | "transfer";

export type Payment = {
  method: PaymentMethod;
  received: number;
  change: number;
  paidAt: string;
};

export type Order = {
  id: number;
  table: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: OrderStatus;
  payment?: Payment;
};

type CartContextType = {
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: { id: number; name: string; price: number }) => void;
  addByOne: (id: number) => void;
  removeByOne: (id: number) => void;
  removeAll: (id: number) => void;
  placeOrder: (table: string) => void;
  updateOrderStatus: (id: number, status: OrderStatus) => void;
  payOrder: (id: number, method: PaymentMethod, received: number) => void;
};

const CART_KEY = "pos-cart";
const ORDERS_KEY = "pos-orders";

const CartContext = createContext<CartContextType | null>(null);

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loaded, setLoaded] = useState(false);

  // localStorage is only available in the browser, so it must be read after mount.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(loadFromStorage<CartItem[]>(CART_KEY, []));
    setOrders(loadFromStorage<Order[]>(ORDERS_KEY, []));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders, loaded]);

  const addToCart = (product: { id: number; name: string; price: number }) => {
    setCart((prev) => {
      const existing = prev.some((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [
        ...prev,
        { id: product.id, name: product.name, price: product.price, qty: 1 },
      ];
    });
  };

  const addByOne = (id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item,
      ),
    );
  };

  const removeByOne = (id: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty - 1 } : item))
        .filter((item) => item.qty > 0),
    );
  };

  const removeAll = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const placeOrder = (table: string) => {
    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    setOrders((prev) => [
      ...prev,
      {
        id: prev.reduce((max, o) => Math.max(max, o.id), 0) + 1,
        table: table.trim(),
        items: cart,
        total,
        createdAt: new Date().toISOString(),
        status: "pending",
      },
    ]);
    setCart([]);
  };

  const updateOrderStatus = (id: number, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order)),
    );
  };

  const payOrder = (id: number, method: PaymentMethod, received: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? {
              ...order,
              status: "paid",
              payment: {
                method,
                received,
                change: Math.max(received - order.total, 0),
                paidAt: new Date().toISOString(),
              },
            }
          : order,
      ),
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        addByOne,
        removeByOne,
        removeAll,
        placeOrder,
        updateOrderStatus,
        payOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
