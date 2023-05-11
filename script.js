var searchBtn = document.querySelector(".btn")
var searchInputEl = document.querySelector('#search')
var cityContainerEl = document.querySelector('#cityContainer')
var currentWeather = document.querySelector('#currentWeather')
var cityBtn = document.querySelector('.cityBtn')


// API api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=56315fabf30e0df518942accfd04300c

// {lat} $ {lon} needed for geographical coordinates 

//Geo API to call from first? http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// Function to load to previous searchs to screen from the array dombuttons. Currently only loads one button...
dombuttons = []

onLoad()
function onLoad() {
  getPastCities()
}

function getPastCities() {
  var storageCity = localStorage.getItem('cityName')
  localStorage.setItem('cities', storageCity)

  var cityEl = document.createElement('button');
  cityEl.classList = 'list-item flex-row justify-space-between align-center cityBtn';

  var titleEl = document.createElement('span')
  titleEl.textContent = storageCity;

  cityEl.appendChild(titleEl)


  var statusEl = document.createElement('span')
  statusEl.classList = 'flex-row align-center';

  cityContainerEl.appendChild(cityEl)

}


// Function that collects value from search bar to be used in Fetch request later. Search value is trimmed

var submitHandler = function (event) {
  event.preventDefault()

  var citySearch = searchInputEl.value.trim();

  if (citySearch) {
    getCityWeather(citySearch);
  } else {
    alert('please enter valid city name')
  };
};


// Function that renders weather data on screen for the current day by appending fetch data to Div.

function renderCurrentWeather(data) {
  var date = dayjs().format('M/D/YYYY')
  var temp = data.main.temp
  var wind = data.wind.speed
  var humidity = data.main.humidity
  var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`


  var card = document.createElement('div');
  var cardBody = document.createElement('div');
  var heading = document.createElement('h2');
  var weatherIcon = document.createElement('img');
  var tempEl = document.createElement('p');
  var windEl = document.createElement('p');
  var humidityEl = document.createElement('p');

  card.setAttribute('class', 'card')
  cardBody.setAttribute('class', 'cardBody')
  card.append(cardBody);
  heading.setAttribute('class', 'cardHeading');
  tempEl.setAttribute('class', 'cardText');
  windEl.setAttribute('class', 'cardText');
  humidityEl.setAttribute('class', 'cardText');
  weatherIcon.setAttribute('class', 'weatherIcon');
  weatherIcon.setAttribute('src', iconUrl);

  heading.textContent = `${data.name} ${date}`
  heading.append(weatherIcon);
  tempEl.textContent = `Temp: ${temp}C`
  windEl.textContent = `Wind: ${wind}kmh`
  humidityEl.textContent = `Humidity: ${humidity}%`

  cardBody.append(heading, tempEl, windEl, humidityEl);
  currentWeather.innerHTML = ""
  currentWeather.append(card);

  localStorage.setItem('cityName', heading.textContent);

};

//Function to load the next 5 day forecast from the OpenWeathers API and append the selected data to the div
function renderFivDayForecast(data) {

  var city = data.city.name
  var date = data.list[8].dt_txt

  var temp = data.list[8].main.temp

  var humidity = data.list[8].main.humidity
  var iconUrl = `https://openweathermap.org/img/w/${data.list[8].weather[0].icon}.png`
  var weather = data.list[8].weather[0].main

  //Note: Not currently working as intended. The loop has not been implemented correctly. The idea was to collect the data from every 8th array 
  //and append that data using the for loop with a 8 % 0 type equation
  for (let i = 0; i < 5; i++) {

    var card = document.createElement('div');
    var cardBody = document.createElement('div');
    var heading = document.createElement('h2');
    var weatherIcon = document.createElement('img');
    var tempEl = document.createElement('p');
    var weatherEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var dateEl = document.createElement('p')

    card.setAttribute('class', 'card')
    cardBody.setAttribute('class', 'cardBody')
    card.append(cardBody);
    heading.setAttribute('class', 'cardHeading');
    tempEl.setAttribute('class', 'cardText');
    dateEl.setAttribute('class', 'cardText')
    weatherEl.setAttribute('class', 'cardText');
    humidityEl.setAttribute('class', 'cardText');
    weatherIcon.setAttribute('class', 'weatherIcon');
    weatherIcon.setAttribute('src', iconUrl);

    heading.textContent = `${city} ${date}`
    heading.append(weatherIcon);
    // dateEl.textContent = ${date}
    tempEl.textContent = `Temp: ${temp}C`
    weatherEl.textContent = `Sky: ${weather}`
    humidityEl.textContent = `Humidity: ${humidity}%`

    cardBody.append(heading, tempEl, weatherEl, humidityEl);
    forecastedWeather.innerHTML = ""
    forecastedWeather.append(card);


  }
}
 

// Function that use search to fetch data from the OpenWeather Api. The first fetch grabs the lat and lon from the location and uses those to make
// the 2nd fetch request to collect the current forecast

var getCityWeather = function (cityName) {
  var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=56315fabf30e0df518942accfd04300c'


  // lat: 40.7127281, lon: -74.0060152
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data)
          var lat = data[0].lat
          var lon = data[0].lon
          displayCity(data, cityName)
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=56315fabf30e0df518942accfd04300c`)
            .then(function (response) {
              console.log(data)
              return response.json()

            })
            .then(function (data) {
              let users = localStorage.setItem("search-history", data.name)

              dombuttons.push(data.name)

              renderCurrentWeather(data)
              let showCities = (users) => {
                dombuttons.forEach(user => {
                  console.log(data.name)
                  localStorage.setItem('user', JSON.stringify(user));

                });
              };


              let cities = localStorage.getItem('citySearch', data.name)
              var cityEl = document.createElement('button');
              cityEl.classList = 'list-item flex-row justify-space-between align-center cityBtn';

              var titleEl = document.createElement('span')
              titleEl.textContent = data.name;

              cityEl.appendChild(titleEl)


              var statusEl = document.createElement('span')
              statusEl.classList = 'flex-row align-center';

              cityContainerEl.appendChild(cityEl)

              showCities


            })
          fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=56315fabf30e0df518942accfd04300c`)
            .then(function (response) {
              return response.json()
            })
            .then(function (data) {
              console.log(data)
              renderFivDayForecast(data)

            })
        })
      } else {
        alert('Error' + response.statusText)
      }
    })
}


var displayCity = function (cities, searchTerm) {


  if (cities.length === 0) {
    cityContainerEl.textContent = 'No cities found'
    return;
  }






}

// cityBtn.addEventListener('click', function (

searchBtn.addEventListener('click', submitHandler)


function saveSearch(place) {
  const limit = 5;
  const savedSearch = JSON.parse(localStorage.getItem("search-history")) || [];

  if (savedSearch.includes(place)) {
    const newSearchHistory = [
      place,
      ...savedSearch.filter((location) => location !== place),
    ].slice(0, limit);
    localStorage.setItem("search-history", JSON.stringify(newSearchHistory));
  } else {
    const newSearchHistory = [place, ...savedSearch].slice(0, limit);
    localStorage.setItem("search-history", JSON.stringify(newSearchHistory));
  }
}

