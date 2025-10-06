import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";

function Auth() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const [nameR, setNameR] = useState("");
  const [emailR, setEmailR] = useState("");
  const [passR, setPassR] = useState("");
  const [pass2R, setPass2R] = useState("");

  const navigate = useNavigate();
  const location = useLocation(); // 👈 para volver a donde estaba
  const from = location.state?.from || "/";

  const submitLogin = (e) => {
    e.preventDefault();
    // acá iría tu llamada al back
    navigate(from, { replace: true }); // volver a la ruta previa
  };

  const submitRegister = (e) => {
    e.preventDefault();
    if (passR !== pass2R) return alert("Las contraseñas no coinciden");
    // registro al back
    navigate(from, { replace: true });
  };

  return (
    <main className="container" style={{ padding: 24 }}>
      <h1>Bienvenido</h1>

      <div style={{ display: "flex", gap: 12, borderBottom: "1px solid #e5e7eb" }}>
        <button onClick={() => setTab("login")} style={{ border: "none", background: "transparent", padding: 10, borderBottom: tab==="login"?"2px solid #22c55e":"none" }}>Iniciar sesión</button>
        <button onClick={() => setTab("register")} style={{ border: "none", background: "transparent", padding: 10, borderBottom: tab==="register"?"2px solid #22c55e":"none" }}>Registrarse</button>
      </div>

      {tab === "login" ? (
        <form onSubmit={submitLogin} style={{ maxWidth: 520, display: "grid", gap: 12, marginTop: 16 }}>
          <label>Email / Usuario</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="tu@email.com" />

          <label>Contraseña</label>
          <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="••••••" />
          <button type="submit" style={btn}>Ingresar</button>
        </form>
      ) : (
        <form onSubmit={submitRegister} style={{ maxWidth: 520, display: "grid", gap: 12, marginTop: 16 }}>
          <label>Nombre</label>
          <input value={nameR} onChange={(e)=>setNameR(e.target.value)} />
          <label>Email</label>
          <input value={emailR} onChange={(e)=>setEmailR(e.target.value)} />
          <label>Contraseña</label>
          <input type="password" value={passR} onChange={(e)=>setPassR(e.target.value)} />
          <label>Repetir contraseña</label>
          <input type="password" value={pass2R} onChange={(e)=>setPass2R(e.target.value)} />
          <button type="submit" style={btn}>Crear cuenta</button>
        </form>
      )}
    </main>
  );
}

const btn = { border: "none", background: "#22c55e", color: "#fff", padding: "12px 14px", borderRadius: 10, fontSize: 16, cursor: "pointer" };
export default Auth;