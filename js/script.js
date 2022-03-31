/*
 * https://www.nbrb.by/apihelp/exrates
 */
const buttonAdd = document.querySelector(".add-convertor__box");

const availableInputs = [
  "USD",
  "EUR",
  "BYN",
  "AMD",
  "AUD",
  "BGN",
  "BYN",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "IRR",
  "ISK",
  "JPY",
  "KGS",
  "KWD",
  "KZT",
  "MDL",
  "NOK",
  "NZD",
  "PLN",
  "RUB",
  "SEK",
  "SGD",
  "TRY",
  "UAH",
  "USD",
  "XDR",
].map((id) => {
  document.querySelector("id");
  return id;
});

const url = "https://www.nbrb.by/api/exrates/rates?periodicity=0";
const inputAll = document.querySelector(".void__box");
const inputCollection = document.querySelector(".convertor__box");
const containerToAdd = document.querySelector(".add__container");

function toByn(currency, { rate, scale }) {
  return (currency * (rate * scale)).toFixed(2);
}

function fromByn(byn, { rate, scale }) {
  return (byn / (rate * scale)).toFixed(2);
}

function recalcAll(byn, availableInputs, convertionMapBynVal) {
  availableInputs.forEach((input) => {
    const currencyName = input?.id;
    const currencyToByn = convertionMapBynVal[currencyName];
    input.value = fromByn(byn, currencyToByn);
  });
}

async function getCours() {
  try {
    const response = await fetch(url);
    const officialCurrencies = await response.json();
    const convertionMapBynVal = {};

    officialCurrencies.forEach(
      ({ Cur_OfficialRate, Cur_Abbreviation, Cur_Scale }) => {
        convertionMapBynVal[Cur_Abbreviation] = {
          rate: Cur_OfficialRate,
          scale: Cur_Scale,
        };
      }
    );

    convertionMapBynVal.BYN = {
      rate: 1,
      scale: 1,
    };

    inputAll.addEventListener("input", (e) => {
      const targetInput = e.target;
      const currencyName = targetInput.id;
      const currencyValue = targetInput.value;
      const currencyInByn = toByn(
        currencyValue,
        convertionMapBynVal[currencyName]
      );
      const allInputsExceptCurrent = availableInputs.filter(
        (input) => input !== targetInput
      );
      recalcAll(currencyInByn, allInputsExceptCurrent, convertionMapBynVal);
    });

    function creaateElement(tagName, options = {}) {
      const el = document.createElement(tagName);
      Object.entries(options).forEach(([optionName, optionValue]) => {
        el[optionName] = optionValue;
      });
      return el;
    }
    officialCurrencies.forEach((item) => {
      const createDivConvertorBox = creaateElement("div", {
        className: "convertor__box row",
      });
      const createInput = creaateElement("input", {
        type: "number",
        id: item.Cur_Abbreviation,
        className: "form-control",
        value: "",
      });
      const createDivCurrency = creaateElement("div", {
        className: "currency row",
      });
      const createSpanCountryFlag = creaateElement("span", {
        className: "country-flag flag-usd",
      });
      const createSpanValName = creaateElement("span", {
        className: "val-name",
        innerText: item.Cur_Abbreviation,
      });

      containerToAdd.appendChild(createDivConvertorBox);
      createDivConvertorBox.appendChild(createInput);
      createDivConvertorBox.appendChild(createDivCurrency);
      createDivCurrency.appendChild(createSpanCountryFlag);
      createDivCurrency.appendChild(createSpanValName);
    });
  } catch (error) {
    console.log(error);
  }
}
getCours();
