import { useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ProductsSection from "../components/ProductsSection";

function ProductDetail({ products = [], categories = [], onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [products, id]
  );

  const [qty, setQty] = useState(1);
  const dec = () => setQty((n) => Math.max(1, n - 1));
  const inc = () => setQty((n) => n + 1);

  if (!product) {
    return (
      <main className="container" style={{ padding: "24px 0" }}>
        <p>Producto no encontrado.</p>
        <button onClick={() => navigate(-1)}>Volver</button>
      </main>
    );
  }

  const category = categories.find((c) => c.id === product.categoryId);
  const related = useMemo(
    () =>
      products
        .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
        .slice(0, 4),
    [products, product]
  );

  return (
    <main className="container" style={{ padding: "18px 0 36px" }}>
      <nav style={{ fontSize: 14, marginBottom: 12, color: "#64748b" }}>
        <Link to="/products">Productos</Link> {">"}{" "}
        <Link to={`/products?cat=${product.categoryId}`}>{category?.name || "Categoría"}</Link>{" "}
        {">"} <span style={{ color: "#111827" }}>{product.title}</span>
      </nav>

      <h1 style={{ margin: "6px 0 8px" }}>{product.title}</h1>
      <p style={{ color: "#64748b" }}>{product.description || "Descripción del producto."}</p>

      <section style={layout}>
        <div>
          <img
            src={product.image}
            alt={product.title}
            style={{
                width: "100%",
                maxWidth: 600, 
                display: "block",
                margin: "0 auto",
                borderRadius: 12,
                border: "1px solid #e5e7eb",}}
          />
        </div>

        <aside style={side}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#15803d" }}>
            ${product.price.toLocaleString("es-AR")}
          </div>

          {product.badge && <span style={badge}>{product.badge}</span>}

          <div style={{ marginTop: 12, marginBottom: 8, fontWeight: 600 }}>Cantidad</div>
          <div style={qtyBox}>
            <button onClick={dec} style={qtyBtn}>–</button>
            <span>{qty}</span>
            <button onClick={inc} style={qtyBtn}>+</button>
          </div>

          <button onClick={() => onAdd(product, qty)} style={addBtn}>
            🛒 Agregar al carrito
          </button>
        </aside>
      </section>

      <section style={{ marginTop: 28 }}>
        <h3>Reseñas de clientes</h3>
        <p style={{ color: "#64748b" }}>4.5 ★ · 120 reseñas (demo)</p>
      </section>

      {related.length > 0 && (
        <section style={{ marginTop: 28 }}>
          <ProductsSection title="Productos relacionados" products={related} onAdd={onAdd} />
        </section>
      )}
    </main>
  );
}

const layout = {
  display: "grid",
  gridTemplateColumns: "1fr 320px",
  gap: 24,
  alignItems: "start",
};
const side = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
  background: "#fff",
  position: "sticky",
  top: 110,
};
const badge = {
  display: "inline-block",
  background: "#ef4444",
  color: "#fff",
  borderRadius: 8,
  padding: "4px 8px",
  marginTop: 8,
  fontSize: 12,
};
const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  border: "1px solid #e5e7eb",
  borderRadius: 999, // forma de píldora suave
  padding: "6px 10px",
  minWidth: 90,
  justifyContent: "space-between",
};

const qtyBtn = {
  border: "none",
  background: "transparent",
  fontSize: 18,
  cursor: "pointer",
  color: "#111827",
};
const addBtn = {
  marginTop: 12,
  width: "100%",
  border: "none",
  background: "#22c55e",
  color: "#fff",
  padding: "12px 14px",
  borderRadius: 10,
  fontSize: 16,
  cursor: "pointer",
};

export default ProductDetail;