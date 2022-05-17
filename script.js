//https://api.exchangerate.host/latest?base=USD&symbols=RUB,EUR,GBP
const BASE_URL = `https://api.exchangerate.host/latest?`
const arrOfRatesFrom = [];
const arrOfRatesTo = [];
let selectedRateFrom = `RUB`;
let selectedRateTo = `USD`;
let error = document.querySelector(`.error`);
let inputFrom = document.querySelector(`.convert-from`);
let inputTo = document.querySelector(`.convert-to`);
document.querySelector(`.convert-from`).addEventListener(`keyup`, setValueTo);
document.querySelector(`.convert-to`).addEventListener(`keyup`, setValueFrom);
const RUB = {};
const EUR = {};
const USD = {};
const GBP = {};
let errorLever = false;

getValuesRub();
setInterval(getValuesRub, 5000);



function setValueFrom () {
    if (errorLever === true) {
        inputFrom.value = inputTo.value;
    } else if (inputTo.value == 0 ) {
        inputFrom.value = 0;
    } else if (selectedRateFrom === selectedRateTo) {
        inputFrom.value = inputTo.value
    } else {
        if (selectedRateTo === `RUB`) {
            inputFrom.value = (inputTo.value * RUB[(selectedRateFrom).toLowerCase()]).toFixed(3)
        } else if (selectedRateTo === `USD`) {
            inputFrom.value = (inputTo.value * USD[(selectedRateFrom).toLowerCase()]).toFixed(3)
        } else if (selectedRateTo === `EUR`) {
            inputFrom.value = (inputTo.value * EUR[(selectedRateFrom).toLowerCase()]).toFixed(3)
        } else if (selectedRateTo === `GBP`) {
            inputFrom.value = (inputTo.value * GBP[(selectedRateFrom).toLowerCase()]).toFixed(3)
        }
    }
}

function setValueTo () {
    if (errorLever === true) {
        inputTo.value = inputFrom.value;
    }else if (inputFrom.value == 0 ) {
        inputTo.value = 0;
    } else if (selectedRateTo === selectedRateFrom) {
        inputTo.value = inputFrom.value
    } else {
        if (selectedRateFrom === `RUB`) {
            inputTo.value = (inputFrom.value * RUB[(selectedRateTo).toLowerCase()]).toFixed(3)
        } else if (selectedRateFrom === `USD`) {
            inputTo.value = (inputFrom.value * USD[(selectedRateTo).toLowerCase()]).toFixed(3)
        } else if (selectedRateFrom === `EUR`) {
            inputTo.value = (inputFrom.value * EUR[(selectedRateTo).toLowerCase()]).toFixed(3)
        } else if (selectedRateFrom === `GBP`) {
            inputTo.value = (inputFrom.value * GBP[(selectedRateTo).toLowerCase()]).toFixed(3)
        }
    }
}

async function getValuesRub () {
    let data;
    try {
    let resp = await fetch(BASE_URL + `base=RUB&symbols=USD,EUR,GBP`);
        errorLever = false;
        data = await resp.json();
        RUB.usd = data.rates.USD;
        RUB.eur = data.rates.EUR;
        RUB.gbp = data.rates.GBP;
        getValuesEur();
    } catch(err) {
        errorLever = true;
    }      
    if (errorLever === true) {
        error.style.display = `block`;
    } else {
        error.style.display = `none`;
    }
}
async function getValuesEur () {
    let resp = await fetch(BASE_URL + `base=EUR&symbols=USD,RUB,GBP`);
    let data = await resp.json();
    EUR.usd = data.rates.USD;
    EUR.rub = data.rates.RUB;
    EUR.gbp = data.rates.GBP;
    getValuesGbp();
}
async function getValuesUsd () {
    let resp = await fetch(BASE_URL + `base=USD&symbols=EUR,RUB,GBP`);
    let data = await resp.json();
    USD.eur = data.rates.EUR;
    USD.rub = data.rates.RUB;
    USD.gbp = data.rates.GBP;
    setValueTo();
}
async function getValuesGbp () {
    let resp = await fetch(BASE_URL + `base=GBP&symbols=USD,RUB,EUR`);
    let data = await resp.json();
    GBP.usd = data.rates.USD;
    GBP.rub = data.rates.RUB;
    GBP.eur = data.rates.EUR;
    getValuesUsd();
}


document.querySelectorAll(`.exch-rate-to`).forEach(el =>{
    el.addEventListener(`click`, selectRateTo);
    arrOfRatesTo.push(el);
})
document.querySelectorAll(`.exch-rate`).forEach(el => {
    el.addEventListener(`click`, selectRateFrom);
    arrOfRatesFrom.push(el);
});
function selectRateFrom (e) {
    refreshBackgroundsFrom();
    if (e.path[0].localName === `p`) {
        e.path[0].style.color = `white`;
        e.path[1].style.background = `#833AE0`;
        selectedRateFrom = e.path[0].innerText;
    } else {
        e.target.children[0].style.color = `white`;
        e.target.style.background = `#833AE0`;
        selectedRateFrom = e.target.children[0].innerText;
    };  
    setValueTo(); 
}
function selectRateTo (e) {
    refreshBackgroundsTo();
    if (e.path[0].localName === `p`) {
        e.path[0].style.color = `white`;
        e.path[1].style.background = `#833AE0`;
        selectedRateTo = e.path[0].innerText;
    } else {
        e.target.children[0].style.color = `white`;
        e.target.style.background = `#833AE0`;
        selectedRateTo = e.target.children[0].innerText;
    };
    setValueTo();
}
function refreshBackgroundsFrom() {
    arrOfRatesFrom.forEach(el =>{
        el.style.background =`none`;
        el.querySelector(`p`).style.color = `#C6C6C6`
    })
}
function refreshBackgroundsTo () {
    arrOfRatesTo.forEach(el =>{
        el.style.background =`none`;
        el.querySelector(`p`).style.color = `#C6C6C6`
    })
}


