Authors: Andy and Solomon
# Expense Tracker with Live Currency Conversion

People who travel, freelance internationally, or shop from foreign stores often lose track of their spending because every purchase is in a different currency. This app lets you log each expense in the currency you actually paid in, and instantly see everything converted into one home currency you understand, using live exchange rates from a REST API.

## Live Demo

https://chaosdestack.github.io/S-A-expense-tracker/

## Features

- Add an expense with a description, amount, currency (KES, USD, EUR, GBP) and category (Food, Transport, Entertainment, Utilities)
- Each expense shows its original amount and its converted value in your home currency
- Running total in the home currency that updates when you add or delete expenses
- Delete any expense from the list
- Filter expenses by category and by currency
- Change the home currency; the live rates are fetched again and everything is recalculated
- Loading and error messages, so the page never fails silently if the API is unreachable

## Tech Used

- **REST API:** [open.er-api.com](https://www.exchangerate-api.com/docs/free) (free, no API key), called with `fetch()` and `async/await`
- **JavaScript ES modules:** the code is split into `api.js`, `state.js`, `utils.js`, `ui.js` and `main.js`
- **Immutable state:** the spread operator is used to add and update expenses without mutating the array
- **Testing:** [Jest](https://jestjs.io/) unit tests for the utility functions
- **Static analysis:** [ESLint](https://eslint.org/)
- **HTML and CSS:** responsive dark theme, no frameworks
- **Deployment:** GitHub Pages

## Project Structure

```
S-A-expense-tracker/
  index.html
  style.css
  src/
    api.js       fetches live exchange rates
    state.js     holds the expenses array
    utils.js     conversion, total and filter functions
    ui.js        draws the list, total and messages
    main.js      connects everything
  test/
    utils.test.js
  eslint.config.js
  package.json
  README.md
```

## Run It Locally

1. Clone the repository and open the folder:
   ```bash
   git clone https://github.com/ChaosDeStack/S-A-expense-tracker.git
   cd S-A-expense-tracker
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start a local server (ES modules do not work when you double-click `index.html`):
   ```bash
   python3 -m http.server 8000
   ```
   Then open http://localhost:8000 in your browser. (Or use the Live Server extension in VS Code.)

### Run the tests

```bash
npm test
```

### Run the linter

```bash
npm run lint
```

## What I'd Improve With More Time

- Save expenses in `localStorage` so they are still there after a page refresh
- Support more currencies, with a searchable currency list
- Let the user edit an existing expense (the category update function already exists in `state.js`)
- Add a chart showing spending by category
- Cache the exchange rates so the app still converts when the user is offline
