/*
 * https://www.nbrb.by/apihelp/exrates
 */
const buttonAdd = document.querySelector('.add-convertor__box');

const inputUsb = document.querySelector('#USD');
const inputByn = document.querySelector('#BYN');
const inputEur = document.querySelector('#EUR');

const url = "https://www.nbrb.by/api/exrates/rates?periodicity=0";

const inputAll = document.querySelector('.void__box');
const inputCollection = document.querySelector('.convertor__box');

async function getCours() {
   try {
      const response = await fetch(url);
      const data = await response.json();
		
		const currMap = {} // список объектов
		
			
		const convertionMapBynVal = {}				
		for (let i = 0; i < data.length; i++) {	
			
			const e = {};		
			
			const Elem = data[i];
			const num = Elem.Cur_OfficialRate;
			const nameVal = Elem.Cur_Abbreviation;			
			const curSc = Elem.Cur_Scale;
			let urlIdText = '#' + `${nameVal}`;
			const urlInput = document.querySelector(urlIdText)					
			convertionMapBynVal[nameVal] = e;

			e.NameRate = nameVal;
			e.Rate = num;			
			e.CurScale = curSc;
			e.UrlInpuDocument = urlInput;							
			
			
		}	
		calculateUsbVal();
		inputAll.addEventListener('input', targetClick);
		
		function targetClick(e) {
			let inc = e.target.id;
			switch(inc) {
				case 'BYN':
					calculateBynVal()
					break;		
				case 'USD':
					calculateUsbVal()
					break;
				case 'EUR':
					calculateEurVal()
					break;
			}			
					
		};
		
		function calculateBynVal() {
			inputUsb.value = (inputByn.value / (convertionMapBynVal.USD.Rate*convertionMapBynVal.USD.CurScale)).toFixed(2);
			inputEur.value = (inputByn.value / (convertionMapBynVal.EUR.Rate*convertionMapBynVal.EUR.CurScale)).toFixed(2);		
		
		};

		function calculateUsbVal() {
			inputByn.value = (inputUsb.value * (convertionMapBynVal.USD.Rate * convertionMapBynVal.USD.CurScale)).toFixed(2);
			
			function calculateBynVal() {			
			inputEur.value = (inputByn.value / (convertionMapBynVal.EUR.Rate*convertionMapBynVal.EUR.CurScale)).toFixed(2);
				
		}
			calculateBynVal()
		};

		function calculateEurVal() {
			inputByn.value = (inputEur.value * (convertionMapBynVal.EUR.Rate * convertionMapBynVal.EUR.CurScale)).toFixed(2);

			function calculateBynVal() {
			inputUsb.value = (inputByn.value / (convertionMapBynVal.USD.Rate*convertionMapBynVal.USD.CurScale)).toFixed(2);
		
		}
			calculateBynVal()
		};	
		

   } catch (error) {
   	console.log(error)
   };
    
};

getCours();
