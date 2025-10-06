import { useEffect, useState } from "react";

/** Barra superior con mensajes rotativos (sin libs) */
function PromoBar({ items = [], intervalMs = 3000 }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!items.length) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), intervalMs);
    return () => clearInterval(id);
  }, [items, intervalMs]);

  if (!items.length) return null;

  return (
    <div style={styles.bar}>
      <div style={styles.inner}>
        {/* transición simple: crossfade */}
        <span key={i} style={styles.msg}>{items[i]}</span>
      </div>
    </div>
  );
}

const styles = {
  bar: {
    background: "#0b3d0b", color: "#fff",
    fontSize: 14, padding: "6px 12px",
  },
  inner: { maxWidth: 1200, margin: "0 auto", textAlign: "center" },
  msg: { display: "inline-block", transition: "opacity .3s ease" },
};

export default PromoBar;