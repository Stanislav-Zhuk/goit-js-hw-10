export function fetchCountries(name) {
  // defining the base API address and request parameters
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const properties = 'fields=name,capital,population,flags,languages';

  // executing a request to the API and processing the result
  return fetch(`${BASE_URL}${name}?${properties}`).then(response => {
    // checking the status OK, generating an error
    if (!response.ok) {
      throw new Error(response.status);
    }
    
    return response.json();
  });
}