function Forecast(response) {
    let temperatureElement = document.querySelector("#current-temperature");
    let temperature = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#current-city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeed = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    iconElement.innerHTML = `<img src="
    http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png">`;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeed.innerHTML = `${response.data.wind.speed}km/h`;
    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = temperature;

    getForecast(response.data.city);
  }
  
  function searchCity(city) {
    let apiKey = "77e54fc3f3o315bb21050ac08t45b6af";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(Forecast);
  }
  
function handleButton(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    searchCity(searchInput.value);
  }
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}
  
function getForecast(city) {
  let apiKey = "77e54fc3f3o315bb21050ac08t45b6af";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  
  axios(apiUrl).then(displayForecast);
}

  function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index){
    if (index < 5) {
      forecastHTML = forecastHTML +
        `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div class="weather-forecast-icon">
            <img src="${day.condition.icon_url}" />
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temp">
            <strong>${Math.round(day.temperature.maximum)}&deg;</strong>
          </div>
          <div class="weather-forecast-temp">${Math.round(day.temperature.minimum)}&deg;</div>
        </div>
    </div>
        `;
    }
  });
let forecastElemennt = document.querySelector("#forecast");
forecastElemennt.innerHTML = forecastHTML;    
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleButton);

searchCity("Paris");

