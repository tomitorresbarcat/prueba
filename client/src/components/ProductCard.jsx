import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, onAdd }) {
  const [qty, setQty] = useState(1);

  const dec = () => setQty((n) => Math.max(1, n - 1));
  const inc = () => setQty((n) => n + 1);

  return (
    <article style={styles.card}>
    <div style={styles.mediaWrap}>
      {product.badge && <span style={styles.badge}>{product.badge}</span>}
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} style={styles.media} />
      </Link>
    </div>

    <div style={styles.body}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <h3 style={styles.title}>{product.title}</h3>
      </Link>
      <div style={styles.price}>${product.price.toLocaleString("es-AR")}</div>
        <div style={styles.qtyRow}>
          <span>Cantidad:</span>
          <div style={styles.qtyBox}>
            <button onClick={dec} style={styles.qtyBtn} type="button">–</button>
            <span>{qty}</span>
            <button onClick={inc} style={styles.qtyBtn} type="button">+</button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onAdd(product, qty)}
          style={styles.addBtn}
        >
          🛒 Agregar
        </button>
      </div>
    </article>
  );
}

const styles = {
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
    boxShadow: "0 1px 2px rgba(0,0,0,.04)",
    display: "flex",
    flexDirection: "column",
  },
  mediaWrap: { position: "relative" },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    background: "#ef4444",
    color: "#fff",
    padding: "4px 8px",
    borderRadius: 8,
    fontSize: 12,
  },
  media: {
    width: "100%",
    height: 170,
    objectFit: "cover",
    display: "block",
  },
  body: { padding: 14, display: "grid", gap: 10 },
  title: { margin: 0, fontSize: 16 },
  price: { color: "#16a34a", fontWeight: 700 },
  qtyRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    fontSize: 14,
  },
  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    border: "1px solid #e5e7eb",
    borderRadius: 999,
    padding: "6px 10px",
    background: "#fff",
    minWidth: 90,
    justifyContent: "space-between",
  },
  qtyBtn: {
    background: "transparent",
    border: "none",
    fontSize: 18,
    cursor: "pointer",
  },
  addBtn: {
    border: "none",
    background: "#22c55e",
    color: "#fff",
    fontSize: 16,
    padding: "10px 14px",
    borderRadius: 10,
    cursor: "pointer",
  },
};
export default ProductCard;