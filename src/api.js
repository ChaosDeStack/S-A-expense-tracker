const API_URL = "https://open.er-api.com/v6/latest/";

// Gets the live exchange rates for one base currency.
// Returns an object like { KES: 1, USD: 0.0077, EUR: 0.0071, ... }
// Throws an error if anything goes wrong, so main.js can show a message.
export async function fetchRates(baseCurrency = "USD") {
  const response = await fetch(`${API_URL}${baseCurrency}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (data.result !== "success") {
    throw new Error("The exchange rate API returned an error");
  }

  return data.rates;
}