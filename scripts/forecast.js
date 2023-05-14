// API key
const key = 'g13GYf3QSsMnVe7lm1w5ZHS5FCeuHt7e';

const getCity = async (city) => {

    // Base URL & the required query parameters for the API key and the city to search for.
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    // Concatenate the base and query variables and fetch data.
    const response = await fetch(base + query);
    
    const data = await response.json();

    return data[0];

};

getCity('Växjö')
.then(data => console.log(data))
.catch(error => console.log(error.message));

