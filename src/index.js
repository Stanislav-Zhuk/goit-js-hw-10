import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;

// get access to elements of DOM
const countrySearchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

// add event listener
countrySearchBox.addEventListener('input', debounce(handlerSearchOfCountry, DEBOUNCE_DELAY));

// function to handler search of the entered country
function handlerSearchOfCountry() {
  fetchCountries(name).then(country => {
    // logic of country search
    if (country.length === 1) {
      countryInfo.insertAdjacentHTML('beforeend', markupCountryInfo(country));
    } else if (country.length >= 10) {
      ifTooManyMatchesAlert();
    } else {
      countryList.insertAdjacentHTML('beforeend', markupCountryList(country));
    }
  }).catch()
}