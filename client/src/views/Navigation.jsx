import { NavLink } from "react-router-dom";

function Navigation({ onLoginClick }) {
  return (
    <nav style={styles.nav}> {/* 👈 antes styles.wrap */}
      <ul style={styles.list}> {/* 👈 antes styles.ul */}
        <li>
          <NavLink to="/" style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.active : {}) })}>
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.active : {}) })}>
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" style={({ isActive }) => ({ ...styles.link, ...(isActive ? styles.active : {}) })}>
            Contacto
          </NavLink>
        </li>
      </ul>

      <button type="button" onClick={onLoginClick} style={styles.loginBtn}>
        Iniciar sesión
      </button>
    </nav>
  );
}

const styles = {
  // --- Sticky nav ---
  nav: {
    position: "sticky",
    top: "75px",
    zIndex: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#f5f7f5",
    borderBottom: "1px solid #e5e7eb",
  },

  list: { display: "flex", gap: 18, listStyle: "none", margin: 0, padding: 0 },

  link: { textDecoration: "none", color: "#334155", padding: "6px 8px", borderRadius: 8 },
  active: { background: "#e6f6ea", color: "#166534" },

  loginBtn: {
    border: "1px solid #22c55e",
    background: "#22c55e",
    color: "#fff",
    borderRadius: 10,
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default Navigation;