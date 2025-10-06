import { useState } from "react";
import { Link } from "react-router-dom";
import kioscofull from "../assets/kioscofull.png";

function Header({ cartCount = 0, onSearch, onCartClick }) {
  const [q, setQ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(q);
  };

  return (
    <header style={styles.wrap}>
      {/* Logo: vuelve a Home sin recargar */}
      <Link to="/" style={styles.logoWrap} aria-label="Ir al inicio">
        <img src={kioscofull} alt="Kiosco" style={styles.logo} />
      </Link>

      {/* Barra de búsqueda */}
      <form onSubmit={handleSubmit} style={styles.searchWrap}>
        <input
          value={q}
          onChange={(e) => {
            const val = e.target.value;
            setQ(val);
            onSearch?.(val);
          }}
          placeholder="¿Qué estás buscando?"
          style={styles.input}
          aria-label="Buscar productos"
        />
        <button type="submit" style={styles.searchBtn}>🔍</button>
      </form>

      {/* Carrito */}
      <button
        type="button"
        onClick={onCartClick}
        style={styles.cartBtn}
        aria-label="Carrito"
      >
        🛒
        {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
      </button>
    </header>
  );
}

const styles = {
  wrap: {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "16px",
  padding: "12px 20px",
  background: "#2a7928ff",
  color: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 100,
  width: "100%",
  margin: 0,
},
  logoWrap: { display: "flex", alignItems: "center" },
  logo: { height: 40, width: "auto", objectFit: "contain" },

  searchWrap: {
    flex: 1,
    display: "flex",
    background: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    border: "none",
    padding: "10px 12px",
    outline: "none",
    fontSize: 16,
  },
  searchBtn: {
    border: "none",
    padding: "0 12px",
    background: "transparent",
    fontSize: 18,
    cursor: "pointer",
  },

  right: { display: "flex", alignItems: "center", gap: 12 },
  linkBtn: {
    border: "none",
    background: "transparent",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
  },
  cartBtn: {
    position: "relative",
    fontSize: 20,
    textDecoration: "none",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -10,
    background: "#000",
    color: "#fff",
    borderRadius: 999,
    fontSize: 12,
    padding: "2px 6px",
    lineHeight: 1,
  },
};
export default Header;