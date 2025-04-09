export default function ProductSelector() {
  return (
    <div className="mb-6">
      <input
        className="border p-2 rounded w-full mb-2"
        placeholder="Search product..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="border rounded max-h-64 overflow-y-auto">
        {filtered.map((product, index) => (
          <div
            key={index}
            className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-3"
            onClick={() => onSelect(product)}
          >
            <span>{product.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
