import { useMemo, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import PromoBar from "./components/PromoBar";
import Footer from "./components/Footer";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";
import Checkout from "./views/Checkout";


import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import Navigation from "./views/Navigation";     // si ya lo tenés
import Home from "./views/Home";                 // 🆕 landing
import Products from "./views/Products";         // 🆕 productos (antes Home)
import Auth from "./views/Auth";                 // tu login/registro

import { categories, products } from "./data/mock";

function App() {
  // carrito
  const [items, setItems] = useState([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const totalQty = useMemo(() => items.reduce((a, it) => a + it.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((a, it) => a + it.price * it.qty, 0), [items]);
  const promos = [
    "Envío gratis desde $20.000",
    "3x2 en golosinas seleccionadas",
    "15% OFF con débito",
  ];

  const handleAdd = (product, qty) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.id === product.id);
      if (i >= 0) {
        const copy = [...prev];
        copy[i] = { ...copy[i], qty: copy[i].qty + qty };
        return copy;
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image, qty }];
    });
    setCartOpen(true);
  };
  const inc = (id) => setItems((p) => p.map((it) => it.id === id ? { ...it, qty: it.qty + 1 } : it));
  const dec = (id) => setItems((p) => p.map((it) => it.id === id ? { ...it, qty: Math.max(1, it.qty - 1) } : it));
  const remove = (id) => setItems((p) => p.filter((it) => it.id !== id));

  // búsqueda + categorías
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all"); // para que Products arranque mostrando todo
  const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const filtered = useMemo(() => {
    const base = cat === "all" ? products : products.filter((p) => p.categoryId === cat);
    const t = norm(q.trim());
    if (!t) return base;
    return base.filter((p) => norm(p.title).includes(t));
  }, [cat, q]);

  // navegación controlada (login)
  const navigate = useNavigate();
  const location = useLocation();
  const goToLogin = () => navigate("/auth", { state: { from: location.pathname } });

  return (
    <>
      <PromoBar items={promos} />
      <Header cartCount={totalQty} onSearch={setQ} onCartClick={() => setCartOpen(true)} />
      <Navigation onLoginClick={goToLogin} />

      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route
          path="/cart"
          element={
            <Cart
              items={items}
              inc={inc}
              dec={dec}
              remove={remove}
              subtotal={subtotal}
              onCheckout={(info) => console.log("checkout info", info)}
            />
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/products"
          element={
            <Products
              categories={categories}
              cat={cat}
              setCat={setCat}
              filtered={filtered}
              onAdd={handleAdd}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetail
              products={products}
              categories={categories}
              onAdd={handleAdd}
            />
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<div className="container"><h1>Contacto</h1></div>} />
      </Routes>
      
      <Footer /> {}
      <CartDrawer
        open={isCartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        inc={inc}
        dec={dec}
        remove={remove}
        subtotal={subtotal}
      />
    </>
  );
}

export default App;