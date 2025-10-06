import ProductCard from "./ProductCard";

function ProductsSection({ title, products, onAdd }) {
  return (
    <section style={{ margin: "26px 0" }}>
      <h2 style={{ margin: "0 0 14px" }}>{title}</h2>

      <div style={grid}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}

const grid = {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
};
export default ProductsSection;