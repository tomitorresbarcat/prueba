import { Link } from "react-router-dom";

/**
 * Footer global del sitio
 * - Si querés, podés pasarle props para categories/nav/contacts; acá dejo defaults útiles.
 */
function Footer({
  categories = [
    { to: "/", label: "Inicio" },
    { to: "/products?tag=ofertas", label: "Ofertas" },
    { to: "/products?tag=fiestas", label: "Fiestas" },
    { to: "/products?cat=alfajores", label: "Alfajores" },
    { to: "/products?cat=golosinas", label: "Golosinas" },
    { to: "/products?cat=almacen", label: "Almacén" },
    { to: "/products?cat=infusiones", label: "Infusiones" },
    { to: "/products", label: "Varios" },
  ],
  navLinks = [
    { to: "/contact", label: "Contacto" },
    { to: "/legal/privacy", label: "Políticas de Privacidad de Datos" },
  ],
  contact = {
    phones: ["+54 9 11 3454 1004", "+54 9 11 3454 1004"],
    email: "ecommerce@kioscoya.com.ar",
    address: "Florida 537, CABA, Bs As",
  },
  payLogos = [
    "/img/pay-visa.png",
    "/img/pay-master.png",
    "/img/pay-amex.png",
    "/img/pay-naranja.png",
    "/img/pay-cabal.png",
    "/img/pay-mercadopago.png",
  ],
  shipLogos = [
    "/img/ship-correo-argentino.png",
    "/img/ship-andreani.png",
    "/img/ship-oca.png",
  ],
}) {
  return (
    <footer style={S.wrap}>

      {/* franja superior con redes (opcionales, podés borrar) */}
      <div style={S.topStrip}>
        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={S.circleIcon}>📷</a>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" style={S.circleIcon}>f</a>
      </div>

      {/* contenido principal */}
      <div style={S.container}>
        <div style={S.grid}>
          {/* Categorías */}
          <div>
            <h4 style={S.h4}>Categorías</h4>
            <ul style={S.ul}>
              {categories.map((c) => (
                <li key={c.label}><Link to={c.to} style={S.link}>{c.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <h4 style={S.h4}>Navegación</h4>
            <ul style={S.ul}>
              {navLinks.map((n) => (
                <li key={n.label}><Link to={n.to} style={S.link}>{n.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 style={S.h4}>Contactános</h4>
            <ul style={S.ul}>
              {contact.phones.map((p, i) => (<li key={i} style={S.text}>{p}</li>))}
              <li style={S.text}>{contact.email}</li>
              <li style={S.text}>{contact.address}</li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <hr style={S.hr} />

        {/* Medios de pago / envío */}
        <div style={S.strips}>
          <div>
            <div style={S.stripTitle}>Medios de pago</div>
            <div style={S.logoRow}>
              {payLogos.map((src, i) => (
                <img key={i} src={src} alt={`pay-${i}`} style={S.logo}
                     onError={(e) => (e.currentTarget.style.display = "none")} />
              ))}
            </div>
          </div>

          <div>
            <div style={S.stripTitle}>Medios de envío</div>
            <div style={S.logoRow}>
              {shipLogos.map((src, i) => (
                <img key={i} src={src} alt={`ship-${i}`} style={S.logo}
                     onError={(e) => (e.currentTarget.style.display = "none")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

const green = "#2a7928";      // header
const greenDark = "#1f5f1f";  // footer base

const S = {
  wrap: { background: greenDark, color: "#fff", marginTop: 40 },
  topStrip: {
    background: "#955a5a00",
    display: "flex", justifyContent: "center", gap: 16, padding: "18px 0",
  },
  circleIcon: {
    width: 46, height: 46, borderRadius: 999, display: "inline-flex",
    alignItems: "center", justifyContent: "center",
    background: "#ffffff22", color: "#fff", textDecoration: "none", fontWeight: 700
  },

  container: { maxWidth: 1200, margin: "0 auto", padding: "28px 20px 34px" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 24,
  },
  h4: { margin: "10px 0 16px", textTransform: "uppercase", letterSpacing: .5 },
  ul: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 },
  link: { color: "#fff", textDecoration: "none", opacity: .95 },
  text: { opacity: .95 },

  hr: { border: "none", borderTop: "1px solid #ffffff33", margin: "24px 0" },

  strips: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 24,
  },
  stripTitle: { marginBottom: 10, fontWeight: 600 },
  logoRow: { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" },
  logo: { height: 26, objectFit: "contain"}, 
};

export default Footer;