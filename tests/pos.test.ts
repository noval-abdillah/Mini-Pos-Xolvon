const checkoutLogic = (items: { name: string; price: number; stock: number; quantity: number }[]) => {
  let total = 0;
  for (const item of items) {
    if (item.quantity <= 0) {
      throw new Error("Kuantitas harus positif");
    }
    if (item.quantity > item.stock) {
      throw new Error(`Stok produk "${item.name}" tidak mencukupi`);
    }
    total += item.price * item.quantity;
  }
  return { total };
};

describe("Mini POS Unit Tests", () => {
  test("menghitung total checkout dengan benar", () => {
    const items = [
      { name: "Kopi", price: 15000, stock: 10, quantity: 2 },
      { name: "Roti", price: 10000, stock: 5, quantity: 3 },
    ];
    const result = checkoutLogic(items);
    expect(result.total).toBe(60000);
  });

  test("gagal jika kuantitas melebihi stok yang tersedia", () => {
    const items = [
      { name: "Kopi", price: 15000, stock: 5, quantity: 6 },
    ];
    expect(() => checkoutLogic(items)).toThrow('Stok produk "Kopi" tidak mencukupi');
  });

  test("gagal jika kuantitas bernilai negatif atau nol", () => {
    const items = [
      { name: "Kopi", price: 15000, stock: 5, quantity: -2 },
    ];
    expect(() => checkoutLogic(items)).toThrow("Kuantitas harus positif");
  });
});
