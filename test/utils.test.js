import {
  convertAmount,
  calculateTotal,
  filterByCategory,
  filterByCurrency,
} from "../src/utils.js";

const rates = { USD: 1, EUR: 0.5, KES: 100 };

describe("convertAmount", () => {
  test("converts EUR to KES", () => {
    expect(convertAmount(10, "EUR", "KES", rates)).toBe(2000);
  });

  test("returns the same amount for the same currency", () => {
    expect(convertAmount(50, "USD", "USD", rates)).toBe(50);
  });

  test("returns 0 when a rate is missing", () => {
    expect(convertAmount(10, "XYZ", "KES", rates)).toBe(0);
  });

  test("returns 0 for a zero amount", () => {
    expect(convertAmount(0, "EUR", "KES", rates)).toBe(0);
  });
});

describe("calculateTotal", () => {
  test("adds up expenses in the home currency", () => {
    const expenses = [
      { amount: 10, currency: "EUR" },
      { amount: 5, currency: "USD" },
    ];
    expect(calculateTotal(expenses, "KES", rates)).toBe(2500);
  });

  test("returns 0 for an empty list", () => {
    expect(calculateTotal([], "KES", rates)).toBe(0);
  });
});

describe("filterByCategory", () => {
  const expenses = [
    { id: 1, category: "Food" },
    { id: 2, category: "Transport" },
  ];

  test("returns only the matching category", () => {
    expect(filterByCategory(expenses, "Food")).toEqual([{ id: 1, category: "Food" }]);
  });

  test("returns everything when the category is empty", () => {
    expect(filterByCategory(expenses, "")).toHaveLength(2);
  });
});

describe("filterByCurrency", () => {
  const expenses = [
    { id: 1, currency: "USD" },
    { id: 2, currency: "KES" },
  ];

  test("returns only the matching currency", () => {
    expect(filterByCurrency(expenses, "KES")).toEqual([{ id: 2, currency: "KES" }]);
  });
});