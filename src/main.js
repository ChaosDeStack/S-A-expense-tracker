import { fetchRates } from "./api.js";
import { addExpense, deleteExpense, getExpenses } from "./state.js";
import { calculateTotal, filterByCategory, filterByCurrency } from "./utils.js";
import { renderExpenses, renderTotal, showStatus } from "./ui.js";

const form = document.getElementById("expense-form");
const homeCurrencySelect = document.getElementById("home-currency");
const filterCategorySelect = document.getElementById("filter-category");
const filterCurrencySelect = document.getElementById("filter-currency");
const filterButton = document.getElementById("filter-button");

let rates = null; // filled in once the API responds

// Redraw the list and the total from the current data
function refresh() {
  const homeCurrency = homeCurrencySelect.value;

  const visible = filterByCurrency(
    filterByCategory(getExpenses(), filterCategorySelect.value),
    filterCurrencySelect.value
  );

  renderExpenses(visible, homeCurrency, rates, handleDelete);

  const total = rates ? calculateTotal(visible, homeCurrency, rates) : 0;
  renderTotal(total, homeCurrency);
}

function handleDelete(id) {
  deleteExpense(id);
  refresh();
}

// Fetch live rates for the home currency, with loading and error messages
async function loadRates() {
  showStatus("Loading exchange rates...");
  try {
    rates = await fetchRates(homeCurrencySelect.value);
    showStatus("");
  } catch (error) {
    rates = null;
    showStatus("Could not load exchange rates. Check your connection and try again.", true);
  }
  refresh();
}

form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page from reloading

  const newExpense = {
    id: Date.now(),
    description: document.getElementById("description").value.trim(),
    amount: Number(document.getElementById("amount").value),
    currency: document.getElementById("currency").value,
    category: document.getElementById("category").value,
  };

  addExpense(newExpense);
  form.reset();
  refresh();
});

homeCurrencySelect.addEventListener("change", loadRates);
filterButton.addEventListener("click", refresh);

loadRates();