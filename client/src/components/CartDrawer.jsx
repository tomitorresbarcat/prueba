import { useNavigate } from "react-router-dom";

function CartDrawer({ open, onClose, items, inc, dec, remove, subtotal, shipping = 300 }) {
  const navigate = useNavigate();
  if (!open) return null;

  const go = (id) => {
    onClose?.();
    navigate(`/product/${id}`);
  };
  const handleGoToCart = () => {
    onClose?.();
    navigate("/cart");
  };

  const total = subtotal + shipping;

  return (
    <>
      <div style={styles.backdrop} onClick={onClose} />
      <aside style={styles.panel} aria-label="Carrito">
        <header style={styles.panelHeader}>
          <h3 style={{ margin: 0 }}>Mi Carrito</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </header>

        <div style={styles.items}>
          {items.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} style={styles.itemRow}>
                <img
                  src={it.image}
                  alt={it.title}
                  style={styles.thumb}
                  onClick={() => go(it.id)}
                />
                <div style={{ flex: 1 }}>
                  <div style={styles.itemTitle}>
                    <button onClick={() => go(it.id)} style={styles.linkBtnInline}>
                      {it.title}
                    </button>
                  </div>
                  <div style={{ color: "#64748b", fontSize: 13 }}>
                    {it.qty} x ${it.price.toLocaleString("es-AR")}
                  </div>
                </div>

                <div style={styles.qtyBox}>
                  <button onClick={() => dec(it.id)} style={styles.qtyBtn}>–</button>
                  <span>{it.qty}</span>
                  <button onClick={() => inc(it.id)} style={styles.qtyBtn}>+</button>
                </div>

                <div style={styles.itemTotal}>${(it.price * it.qty).toLocaleString("es-AR")}</div>
                <button onClick={() => remove(it.id)} style={styles.removeBtn} title="Quitar">🗑️</button>
              </div>
            ))
          )}
        </div>

        <footer style={styles.footer}>
          <div style={styles.row}><span>Subtotal</span><strong>${subtotal.toLocaleString("es-AR")}</strong></div>
          <div style={styles.row}><span>Envío</span><strong>${shipping.toLocaleString("es-AR")}</strong></div>
          <hr style={{ border: "none", borderTop: "1px solid #e5e7eb" }} />
          <div style={{ ...styles.row, fontSize: 18 }}>
            <span>Total</span><strong>${total.toLocaleString("es-AR")}</strong>
          </div>
          <button style={styles.checkoutBtn} onClick={handleGoToCart}>
            Finalizar compra →
          </button>
        </footer>
      </aside>
    </>
  );
}

const styles = {
  backdrop: { position: "fixed", inset: 0, background: "rgba(0,0,0,.35)", zIndex: 99 },
  panel: { position: "fixed", top: 0, right: 0, height: "100vh", width: 380, background: "#fff", boxShadow: "-8px 0 24px rgba(0,0,0,.15)", zIndex: 100, display: "flex", flexDirection: "column" },
  panelHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px", borderBottom: "1px solid #e5e7eb" },
  closeBtn: { border: "none", background: "transparent", fontSize: 20, cursor: "pointer" },
  items: { padding: 14, gap: 12, display: "grid", overflowY: "auto", flex: 1 },
  itemRow: { display: "grid", gridTemplateColumns: "56px 1fr auto auto auto", gap: 10, alignItems: "center" },
  thumb: { width: 56, height: 56, objectFit: "cover", borderRadius: 8, border: "1px solid #e5e7eb", cursor: "pointer" },
  itemTitle: { fontWeight: 600, fontSize: 14 },
  linkBtnInline: { border: "none", background: "transparent", color: "#111827", textAlign: "left", padding: 0, cursor: "pointer" },
  qtyBox: { display: "flex", alignItems: "center", gap: 10, border: "1px solid #e5e7eb", borderRadius: 999, padding: "6px 10px", minWidth: 90, justifyContent: "space-between" },
  qtyBtn: { border: "none", background: "transparent", fontSize: 18, cursor: "pointer" },
  itemTotal: { width: 90, textAlign: "right", fontWeight: 600 },
  removeBtn: { border: "none", background: "transparent", cursor: "pointer" },
  footer: { borderTop: "1px solid #e5e7eb", padding: 16, display: "grid", gap: 10 },
  row: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  checkoutBtn: { marginTop: 6, border: "none", background: "#22c55e", color: "#fff", padding: "12px 14px", borderRadius: 10, fontSize: 16, cursor: "pointer" },
};

export default CartDrawer;