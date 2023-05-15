const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    const {cityDetails, weather} = data;

    // update details template
    details.innerHTML = `
    <div class="my-3">Region: ${cityDetails.Region.EnglishName}</div>
    <div class="my-3">Country: ${cityDetails.Country.EnglishName}</div>
    <div class="my-3">City: ${cityDetails.EnglishName}</div>
    <div class="my-3">Condition: ${weather.WeatherText}</div>
    <div class="my-4">
      <span>Temperature</span>
      <br>
      <span>Metric: ${weather.Temperature.Metric.Value}C</span>
      <br>
      <span>Freedom Units: ${weather.Temperature.Imperial.Value}F</span>
    </div>
    `;


    // Update night/day & icon images.
    const iconSource = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSource);

    let timeSource = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
   
    time.setAttribute('src', timeSource);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {

    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);

    return {
        cityDetails,
        weather
    };

};

cityForm.addEventListener('submit', e => {

    e.preventDefault();

    // Get city value and trim white space from both ends of the input
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the UI with the new city
    updateCity(city)
        .then(data =>  updateUI(data))
        .catch(error => console.log(error.message));
});