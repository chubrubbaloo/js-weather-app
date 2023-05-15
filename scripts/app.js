const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');

const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>temp</span>
      <span>${weather.Temperature.Metric.UnitType}C</span>
    </div>
    `;

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        // cityDetails: cityDetails,
        // weather: weather
        cityDetails,
        weather
    };

};

cityForm.addEventListener('submit', e => {

    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the UI with the new city
    updateCity(city)
        .then(data =>  updateUI(data))
        .catch(error => console.log(error.message));

});