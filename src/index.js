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
  // convert the value to lowercase and use trim. checking for an empty string
  const name = countrySearchBox.value.toLowerCase().trim();
  if (name === '') {
    clearCountryListAndInfo();
  }

  fetchCountries(name).then(country => {
    clearCountryListAndInfo();

    // logic of country search
    if (country.length === 1) {
      countryInfo.insertAdjacentHTML('beforeend', markupCountryInfo(country));
    } else if (country.length > 10) {
      ifTooManyMatchesAlert();
    } else {
      countryList.insertAdjacentHTML('beforeend', markupCountryList(country));
    }
  }).catch(ifWrongNameAlert);
}

// function of marking the info of country
function markupCountryInfo(country) {
  return country.map(({ name, flags, capital, population, languages }) => `
    <ul class="country-info__list">
      <li class="country-info__item">
        <img class="country-info__item--flag" src="${flags.svg}" alt="Flag of ${name.official}">
        <h2 class="country-info__item--name">${name.official}</h2>
      </li>
      <li class="country-info__item">
        <span class="country-info__item--categories">Capital: </span>${capital}
      </li>
      <li class="country-info__item">
        <span class="country-info__item--categories">Population: </span>${population}
      </li>
      <li class="country-info__item">
        <span class="country-info__item--categories">Languages: </span>${Object.values(languages).join(', ')}
      </li>
    </ul>
  `).join('');
}

// function of marking the list of countries
function markupCountryList(country) {
  return country.map(({ name, flags}) => `
    <li class="country-list__item">
      <img class="country-list__item--flag" src="${flags.svg}" alt="Flag of ${name.official}">
      <h2 class="country-list__item--name">${name.official}</h2>
    </li>
  `).join('');
}

// function of clearing the list of countries and information
function clearCountryListAndInfo() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

// function for displaying warnings
function ifTooManyMatchesAlert() {
  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.', {
            borderRadius: '10px',
            timeout: 4000,
            clickToClose: true,
            cssAnimationStyle: 'zoom',
        });
}

function ifWrongNameAlert() {
  Notiflix.Notify.failure('Oops, there is no country with that name', {
            borderRadius: '10px',
            timeout: 4000,
            clickToClose: true,
            cssAnimationStyle: 'zoom',
        });
}