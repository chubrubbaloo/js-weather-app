const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const {cityDetails, weather} = data;

    // update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>temp</span>
      <span>${weather.Temperature.Metric.Value}C</span>
    </div>
    `;


    // Update night/day & icon images.
    const iconSource = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSource);

    let timeSource = null;

    if(weather.IsDayTime){
        timeSource = 'img/day.svg';
    } else {
        timeSource = 'img/night.svg';
    }
    
    time.setAttribute('src', timeSource);

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