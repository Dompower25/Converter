/*
 * https://www.nbrb.by/apihelp/exrates
 */
const buttonAdd = document.querySelector(".add-convertor__box");
const inputByn = document.querySelector("#BYN");
const inputUsd = document.querySelector("#USD");
const inputEur = document.querySelector("#EUR");
const inputAmd = document.querySelector("#AMD");
const inputAud = document.querySelector("#AUD");
const inputBgn = document.querySelector("#BGN");
const inputCad = document.querySelector("#CAD");
const inputChf = document.querySelector("#CHF");
const inputCny = document.querySelector("#CNY");
const inputCzk = document.querySelector("#CZK");
const inputDkk = document.querySelector("#DKK");
const inputGbp = document.querySelector("#GBP");
const inputIrr = document.querySelector("#IRR");
const inputIsk = document.querySelector("#ISK");
const inputJpy = document.querySelector("#JPY");
const inputKgs = document.querySelector("#KGS");
const inputKwd = document.querySelector("#KWD");
const inputKzt = document.querySelector("#KZT");
const inputMdl = document.querySelector("#MDL");
const inputNok = document.querySelector("#NOK");
const inputNzd = document.querySelector("#NZD");
const inputPln = document.querySelector("#PLN");
const inputRub = document.querySelector("#RUB");
const inputSek = document.querySelector("#SEK");
const inputSgd = document.querySelector("#SGD");
const inputTry = document.querySelector("#TRY");
const inputUah = document.querySelector("#UAH");
const inputXdr = document.querySelector("#XDR");

const availableInputs = [
  inputUsd,
  inputByn,
  inputEur,
  inputAmd,
  inputAud,
  inputBgn,
  inputCad,
  inputChf,
  inputCny,
  inputCzk,
  inputDkk,
  inputGbp,
  inputIrr,
  inputIsk,
  inputJpy,
  inputKgs,
  inputKwd,
  inputKzt,
  inputMdl,
  inputNok,
  inputNzd,
  inputPln,
  inputRub,
  inputSek,
  inputSgd,
  inputTry,
  inputUah,
  inputXdr,
];

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
    console.log(convertionMapBynVal)
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

    buttonAdd.addEventListener("click", addToInput);
	  function addToInput() {
		 
	 }



	  officialCurrencies.forEach(item =>  {

      const createDivConvertorBox = document.createElement("div");
		  const createInput = document.createElement("input");
		  const createDivCurrency = document.createElement("div");
		  const createSpanCountryFlag = document.createElement("span");
		  const createSpanValName = document.createElement("span");

		  createDivConvertorBox.className = "convertor__box row";
		  createInput.type = "number";
		  createInput.id = item.Cur_Abbreviation;
		  createInput.className = "form-control";
		  createDivCurrency.className = "currency row";
		  createSpanCountryFlag.className = "country-flag flag-usd";
		  createSpanValName.className = "val-name";
		  createSpanValName.innerText = item.Cur_Abbreviation;

		  containerToAdd.appendChild(createDivConvertorBox);
		  createDivConvertorBox.appendChild(createInput);
		  createDivConvertorBox.appendChild(createDivCurrency);
		  createDivCurrency.appendChild(createSpanCountryFlag);
		  createDivCurrency.appendChild(createSpanValName);
	  	}
	  );
		  
  } catch (error) {
    console.log(error);
  }
}
getCours();
