/*
 * https://www.nbrb.by/apihelp/exrates
 */
const buttonAdd = document.querySelector(".add-convertor__box");

const inputByn = document.querySelector("#BYN");
const inputUsd = document.querySelector("#USD");
const inputEur = document.querySelector("#EUR");

const availableInputs = ["USD", "BYN", "EUR"].map((idItem) => {
	document.createElement('input', { type: 'number', id: idItem, className: 'form-control', value: '' });
});

const url = "https://www.nbrb.by/api/exrates/rates?periodicity=0";
const inputAll = document.querySelector(".void__box");
const inputCollection = document.querySelector(".convertor__box");
const containerToAdd = document.querySelector(".add__container");

function toByn(currency, { rate, scale }) {
  return (currency * (rate * scale)).toFixed(2);
};

function fromByn(byn, { rate, scale }) {
  return (byn / (rate * scale)).toFixed(2);
};

function recalcAll(byn, availableInputs, convertionMapBynVal) {
  availableInputs.forEach((input) => {
    const currencyName = input?.id;
    const currencyToByn = convertionMapBynVal[currencyName];
    input.value = fromByn(byn, currencyToByn);
  })
};

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
	  
	  officialCurrencies.forEach((item) => {
		  const createDivConvertorBox = document.createElement("div");
		  const createInput = document.createElement("input");
		  const createDivCurrency = document.createElement("div");
		  const createSpanCountryFlag = document.createElement("span");
		  const createSpanValName = document.createElement("span");

		  createDivConvertorBox.className = "convertor__box row";
		  createInput.type = "number";
		  createInput.id = item.Cur_Abbreviation;
		  createInput.className = "form-control";
		  createInput.value = "";
		  createDivCurrency.className = "currency row";
		  createSpanCountryFlag.className = "country-flag flag-usd";
		  createSpanValName.className = "val-name";
		  createSpanValName.innerText = item.Cur_Abbreviation;

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
