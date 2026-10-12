import { convertAmount } from "./utils.js";

const statusEl = document.getElementById("status");
const listEl = document.getElementById("expense-list");
const totalEl = document.getElementById("total-amount");
const totalCurrencyEl = document.getElementById("total-currency");

// Shows "Loading..." or an error message. Empty text hides it.
export function showStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.classList.toggle("error", isError);
}

// Draws one <li> per expense. onDelete(id) is called by the delete button.
export function renderExpenses(expenses, homeCurrency, rates, onDelete) {
  listEl.replaceChildren();

  if (expenses.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "No expenses to show.";
    listEl.appendChild(empty);
    return;
  }

  expenses.forEach((expense) => {
    const item = document.createElement("li");

    const info = document.createElement("span");
    info.textContent = `${expense.description} (${expense.category})`;

    const amounts = document.createElement("span");
    const converted = rates
      ? convertAmount(expense.amount, expense.currency, homeCurrency, rates).toFixed(2)
      : "--";
    amounts.textContent = `${expense.amount.toFixed(2)} ${expense.currency} = ${converted} ${homeCurrency}`;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => onDelete(expense.id));
    amounts.appendChild(deleteButton);

    item.append(info, amounts);
    listEl.appendChild(item);
  });
}

export function renderTotal(total, currency) {
  totalEl.textContent = `: ${total.toFixed(2)}`;
  totalCurrencyEl.textContent = currency;
}