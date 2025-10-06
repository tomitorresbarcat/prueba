function CategoryChips({ items, activeId, onChange }) {
  return (
    <div style={styles.wrap}>
      {items.map((c) => {
        const active = c.id === activeId;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            style={{
              ...styles.chip,
              ...(active ? styles.chipActive : null),
            }}
          >
            {c.name}
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    margin: "8px 0 24px",
  },
  chip: {
    border: "1px solid #e5e7eb",
    background: "#eef2f1",
    padding: "8px 14px",
    borderRadius: 999,
    cursor: "pointer",
    fontSize: 14,
  },
  chipActive: {
    background: "#d7f0df",
    borderColor: "#86d39b",
  },

};
export default CategoryChips;