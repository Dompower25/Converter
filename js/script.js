/*
 * https://www.nbrb.by/apihelp/exrates
 */
const buttonAdd = document.querySelector('.add-convertor__box');
const AddConvertorBox = document.querySelector('.convertor__box');
var inputUsb = document.querySelector('#calc-usd');
var inputByn = document.querySelector('#calc-byn');
const url = "https://www.nbrb.by/api/exrates/rates?periodicity=0";


async function getCours() {
   try {
      const response = await fetch(url);
      const data = await response.json();
		
		const currMap = {} // список объектов

		for (var i = 0; i < data.length; i++) {
			const Elem = data[i];		
			const name = Elem.Cur_Abbreviation;
			currMap[name] = Elem;			
		}
		
		let currUSB = currMap?.USD.Cur_OfficialRate;
		inputUsb.value = currUSB;
			
		inputByn.oninput = function () {
			document.querySelector('#calc-usd').value = (inputByn.value * currUSB).toFixed(2);
		};
		

   } catch (error) {
   	console.log(error)
   };
    
};

getCours();




