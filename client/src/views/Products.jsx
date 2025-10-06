import CategoryChips from "../components/CategoryChips";
import ProductsSection from "../components/ProductsSection";

function Products({ categories, cat, setCat, filtered, onAdd }) {
  return (
    <main className="container">
      <h2>Categorías</h2>
      <CategoryChips
        items={[{ id: "all", name: "Todos" }, ...categories]}
        activeId={cat}
        onChange={setCat}
      />

      <ProductsSection title="Productos Destacados" products={filtered} onAdd={onAdd} />
    </main>
  );
}
export default Products;