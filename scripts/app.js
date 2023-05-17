const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const errorMessage = document.querySelector('.error-message');
const modal = document.getElementById("myModal");
const closeButton = document.getElementsByClassName("close")[0];

const displayErrorMessage = (city) => {

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', e => {
        if (e.target == modal) {
            modal.style.display = 'none';
        }
    });

    errorMessage.innerHTML =
        `Could not fetch the data for the city [${city}]. Are you sure you spelled the city correctly?`;
    modal.style.display = "block";
};


const updateUI = (data) => {

    const { cityDetails, weather } = data;

    // update details template
    details.innerHTML = `
    <div class="my-3"><ul>Region: ${cityDetails.Region.EnglishName}</ul></div>
    <div class="my-3"><ul>Country: ${cityDetails.Country.EnglishName}</ul></div>
    <div class="my-3"><ul>City: ${cityDetails.EnglishName}</ul></div>
    <div class="my-3"><ul>Condition: ${weather.WeatherText}</ul></div>
    <div class="my-3"><ul>
      Temperature: ${weather.Temperature.Metric.Value}° C / ${weather.Temperature.Imperial.Value}° F 
      </ul></div>
    `;

    // Update night/day & icon images.
    const iconSource = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSource);

    let timeSource = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSource);

    if (card.classList.contains('d-none')) {
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
        .then(data => updateUI(data))
        .catch(() => {
            displayErrorMessage(city);
        });
});


