function BrandsStrip({ title = "Nuestras marcas", items = [] }) {
  if (!items.length) return null;
  return (
    <section style={{ margin: "30px 0" }}>
      <h2 style={{ margin: "0 0 18px" }}>{title}</h2>
      <div style={grid}>
        {items.map((b, i) => (
          <div key={i} style={cell}>
            <img src={b.src} alt={b.alt || `brand-${i}`} style={logo} />
          </div>
        ))}
      </div>
    </section>
  );
}

const grid = {
  display: "grid",
  gap: 24,
  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
  alignItems: "center",
};
const cell = { display: "flex", justifyContent: "center", padding: 10, borderRadius: 12, background: "#fff" };
const logo = { maxWidth: 140, maxHeight: 60, objectFit: "contain" };

export default BrandsStrip;