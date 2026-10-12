// Pure functions: no page, no internet. Easy to test.

// Convert an amount from one currency to another using the rates.
// Works with any base currency: go to the base, then to the target.
export function convertAmount(amount, from, to, rates) {
  if (!rates || !rates[from] || !rates[to]) return 0;
  return (amount / rates[from]) * rates[to];
}

// Add up all expenses, converted into the home currency.
export function calculateTotal(expenses, home, rates) {
  return expenses.reduce(
    (sum, expense) =>
      sum + convertAmount(expense.amount, expense.currency, home, rates),
    0
  );
}

// An empty value ("") or "All" means: do not filter.
export function filterByCategory(expenses, category) {
  if (!category || category === "All") return expenses;
  return expenses.filter((expense) => expense.category === category);
}

export function filterByCurrency(expenses, currency) {
  if (!currency || currency === "All") return expenses;
  return expenses.filter((expense) => expense.currency === currency);
}