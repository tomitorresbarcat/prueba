import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({
  items = [],           // [{id,title,price,image,qty}]
  inc, dec, remove,     // handlers del padre (App)
  subtotal = 0,         // número
  onCheckout,           // callback al finalizar
}) {
  const navigate = useNavigate();

  // entrega: "home" (a domicilio) o "pickup" (retira)
  const [delivery, setDelivery] = useState("home");
  // cupón local
  const [coupon, setCoupon] = useState("");
  const [address, setAddress] = useState("");
  const [postal, setPostal]   = useState("");
  const [phone, setPhone]     = useState("");

  // reglas simples de demo
  const shipping = delivery === "home" ? 300 : 0;
  const discount = useMemo(() => {
    if (!coupon.trim()) return 0;
    if (coupon.trim().toUpperCase() === "OFF10") return Math.round(subtotal * 0.1);
    return 0;
  }, [coupon, subtotal]);

  const total = Math.max(0, subtotal + shipping - discount);

  const handleCheckout = () => {
    if (delivery === "home") {
      if (!address.trim() || !postal.trim() || !phone.trim()) {
        alert("Por favor completá dirección, código postal y teléfono.");
        return;
      }
    }

    onCheckout?.({
      delivery,
      coupon,
      total,
      address: delivery === "home" ? address : null,
      postal:  delivery === "home" ? postal  : null,
      phone:   delivery === "home" ? phone   : null,
    });

    navigate("/checkout", {
      state: {
        items,
        delivery,
        coupon,
        subtotal,
        shipping,
        discount,
        total,
        address: delivery === "home" ? address : null,
        postal:  delivery === "home" ? postal  : null,
        phone:   delivery === "home" ? phone   : null,
      },
    });
  };

  return (
    <main className="container" style={{ padding: "24px 0 40px" }}>
      <h1 style={{ marginBottom: 18 }}>Carrito de Compras</h1>

      {/* listado de items */}
      <section style={{ display: "grid", gap: 16, marginBottom: 24 }}>
        {items.length === 0 ? (
          <div style={{ color: "#64748b" }}>Tu carrito está vacío.</div>
        ) : (
          items.map((it) => (
            <div key={it.id} style={row}>
              <img src={it.image} alt={it.title} style={thumb} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{it.title}</div>
                <div style={{ color: "#16a34a", fontWeight: 700 }}>
                  ${it.price.toLocaleString("es-AR")}
                </div>
                <div style={{ color: "#64748b", fontSize: 13 }}>
                  {it.qty} {it.qty === 1 ? "unidad" : "unidades"}
                </div>
              </div>

              <div style={qtyBox}>
                <button onClick={() => dec(it.id)} style={qtyBtn}>–</button>
                <span>{it.qty}</span>
                <button onClick={() => inc(it.id)} style={qtyBtn}>+</button>
              </div>

              <div style={{ width: 90, textAlign: "right", fontWeight: 600 }}>
                ${(it.price * it.qty).toLocaleString("es-AR")}
              </div>

              <button onClick={() => remove(it.id)} style={removeBtn} title="Quitar">🗑️</button>
            </div>
          ))
        )}
      </section>

      {/* opciones de entrega */}
      <section style={{ display: "grid", gap: 12, marginBottom: 16 }}>
        <h3 style={{ margin: 0 }}>Opciones de Entrega</h3>

        <label style={opt}>
          <input
            type="radio"
            name="delivery"
            checked={delivery === "home"}
            onChange={() => setDelivery("home")}
          />
          <span>Entrega a domicilio</span>
        </label>

        <label style={opt}>
          <input
            type="radio"
            name="delivery"
            checked={delivery === "pickup"}
            onChange={() => setDelivery("pickup")}
          />
          <span>Retirar en tienda</span>
        </label>
      </section>
      {delivery === "home" && (
        <section style={{ marginTop: 18,marginBottom:24, display: "grid", gap: 14, maxWidth: 620 }}>
          <div>
            <div style={label}>Dirección de envío</div>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ingresa tu dirección"
              style={inputLg}
            />
          </div>

          <div>
            <div style={label}>Código Postal</div>
            <input
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
              placeholder="Ingresa tu código postal"
              style={inputLg}
            />
          </div>

          <div>
            <div style={label}>Teléfono de contacto</div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ingresa tu teléfono"
              style={inputLg}
            />
          </div>
        </section>
      )}
      {/* cupón */}
      <section style={{ marginBottom: 22 }}>
        <input
          placeholder="Código de cupón"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          style={input}
        />
      </section>

      {/* resumen */}
      <section style={{ display: "grid", gap: 10, maxWidth: 420 }}>
        <h3 style={{ margin: 0 }}>Resumen del Pedido</h3>
        <Row label="Subtotal" value={subtotal} />
        <Row label="Envío" value={shipping} />
        <Row label="Descuento" value={-discount} />
        <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", margin: "8px 0" }} />
        <Row label="Total" value={total} bold />
      </section>

      <button
        onClick={handleCheckout}
        disabled={items.length === 0}
        style={{ ...checkoutBtn, opacity: items.length === 0 ? .6 : 1, cursor: items.length === 0 ? "not-allowed" : "pointer" }}
      >
        Finalizar Compra
      </button>
    </main>
  );
}

/* ---- subcomponentes / estilos ---- */

function Row({ label, value, bold }) {
  return (
    <div style={sumRow}>
      <span>{label}</span>
      <strong style={{ fontSize: bold ? 18 : 14 }}>
        {value < 0 ? "-" : ""}${Math.abs(value).toLocaleString("es-AR")}
      </strong>
    </div>
  );
}

/* estilos inline */
const row = {
  display: "grid",
  gridTemplateColumns: "56px 1fr auto auto auto",
  gap: 12,
  alignItems: "center",
  padding: 10,
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  background: "#fff",
};

const thumb = {
  width: 56, height: 56, objectFit: "cover",
  borderRadius: 10, border: "1px solid #e5e7eb",
};

const qtyBox = {
  display: "flex", alignItems: "center", gap: 10,
  border: "1px solid #e5e7eb", borderRadius: 999,
  padding: "6px 10px", minWidth: 90, justifyContent: "space-between",
};

const qtyBtn = { border: "none", background: "transparent", fontSize: 18, cursor: "pointer" };
const removeBtn = { border: "none", background: "transparent", cursor: "pointer" };

const opt = {
  display: "flex", alignItems: "center", gap: 10,
  border: "1px solid #e5e7eb", borderRadius: 12,
  padding: "12px 14px", background: "#fff",
};

const input = {
  width: "100%", maxWidth: 420,
  border: "1px solid #e5e7eb", borderRadius: 12,
  padding: "12px 14px", outline: "none",
};

const sumRow = {
  display: "flex", alignItems: "center", justifyContent: "space-between",
};

const checkoutBtn = {
  marginTop: 18, border: "none",
  background: "#22c55e", color: "#fff",
  padding: "14px 18px", borderRadius: 12,
  fontSize: 16,
};
const label = { marginBottom: 6, fontWeight: 600, color: "#1f2937" };

const inputLg = {
  width: "100%",
  border: "1px solid #d1e7d3",     // verdoso suave
  background: "#f8fff8",
  borderRadius: 12,
  padding: "14px 16px",
  outline: "none",
  fontSize: 16,
};

export default Cart;