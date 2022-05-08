//https://api.exchangerate.host/latest?base=USD&symbols=RUB,EUR,GBP&amount=150
const BASE_URL = `https://api.exchangerate.host/latest?`
const arrOfRatesFrom = [];
const arrOfRatesTo = [];
let selectedRateFrom = `RUB`;
let selectedRateTo = `USD`;
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