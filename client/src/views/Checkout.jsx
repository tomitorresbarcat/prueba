import { useLocation, useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};

  // Fallbacks si entran directo sin state
  const items     = state?.items ?? [];
  const delivery  = state?.delivery ?? "home";
  const coupon    = state?.coupon ?? "";
  const subtotal  = state?.subtotal ?? 0;
  const shipping  = state?.shipping ?? (delivery === "home" ? 300 : 0);
  const discount  = state?.discount ?? 0;
  const total     = state?.total ?? Math.max(0, subtotal + shipping - discount);

  return (
    <main className="container" style={{ padding: "32px 0 40px" }}>
      <h1>¡Gracias por tu compra! 🛍️</h1>

      <section style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, background: "#fff", marginTop: 16 }}>
        <h3>Resumen del pedido</h3>
        <ul style={{ marginTop: 12 }}>
          <li><strong>Artículos:</strong> {items.length}</li>
          <li><strong>Entrega:</strong> {delivery === "home" ? "A domicilio" : "Retiro en tienda"}</li>
          {coupon && <li><strong>Cupón:</strong> {coupon}</li>}
          <li><strong>Subtotal:</strong> ${subtotal.toLocaleString("es-AR")}</li>
          <li><strong>Envío:</strong> ${shipping.toLocaleString("es-AR")}</li>
          <li><strong>Descuento:</strong> -${discount.toLocaleString("es-AR")}</li>
          <li style={{ marginTop: 8, fontSize: 18 }}>
            <strong>Total:</strong> ${total.toLocaleString("es-AR")}
          </li>
        </ul>
      </section>

      <button
        onClick={() => navigate("/")}
        style={{ border: "none", background: "#22c55e", color: "#fff", padding: "12px 18px", borderRadius: 10, marginTop: 16, cursor: "pointer" }}
      >
        Volver al inicio
      </button>
    </main>
  );
}

export default Checkout;