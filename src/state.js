// The app's memory. Nothing is mutated: every change makes a new array/object.
let expenses = [];

export function getExpenses() {
  return expenses;
}

// Spread #1: copy the old array and add the new expense at the end
export function addExpense(newExpense) {
  expenses = [...expenses, newExpense];
}

export function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);
}

// Spread #2: copy one expense and change only its category
export function updateExpenseCategory(id, newCategory) {
  expenses = expenses.map((expense) =>
    expense.id === id ? { ...expense, category: newCategory } : expense
  );
}