const API_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json";

const amountInput = document.getElementById("amount");
const currencySelect = document.getElementById("currency");
const resultDiv = document.getElementById("result");
const convertBtn = document.getElementById("convert");

let rates = {};

// Fetch currency data
async function fetchRates() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    rates = data.usd;

    // Populate dropdown
    for (let currency in rates) {
      const option = document.createElement("option");
      option.value = currency;
      option.textContent = currency.toUpperCase();
      currencySelect.appendChild(option);
    }
  } catch (error) {
    resultDiv.textContent = "Failed to load exchange rates";
  }
}

// Convert USD to selected currency
function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  const currency = currencySelect.value;

  if (isNaN(amount)) {
    resultDiv.textContent = "Enter a valid amount";
    return;
  }

  const rate = rates[currency];
  const converted = amount * rate;

  resultDiv.textContent = `${amount} USD = ${converted.toFixed(2)} ${currency.toUpperCase()}`;
}

convertBtn.addEventListener("click", convertCurrency);

fetchRates();
