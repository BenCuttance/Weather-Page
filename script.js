var searchBtn = document.querySelector(".btn")
var searchInputEl = document.querySelector('#search')
var cityContainerEl = document.querySelector('#cityContainer')
var currentWeather = document.querySelector('#currentWeather')
var cityBtn = document.querySelector('.cityBtn')
// searchBtn.addEventListener()

// API api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=56315fabf30e0df518942accfd04300c

// {lat} $ {lon} needed for geographical coordinates 

//Geo API to call from first? http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// State code only for US

// var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=56315fabf30e0df518942accfd04300c'

var submitHandler = function (event) {
    event.preventDefault()

    var citySearch = searchInputEl.value.trim();

    if (citySearch) {
        getCityWeather(citySearch);
    } else {
        alert('please enter valid city name')
    };
};

function renderCurrentWeather (data) {
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

};

function renderFivDayForecast (data){

    var city = data.city.name
    var date = data.list[0].dt_txt
    console.log(date)
    var temp = data.list[0].main.temp
    
    var humidity = data.list[0].main.humidity
    var iconUrl = `https://openweathermap.org/img/w/${data.list[0].weather[0].icon}.png`
    var weather = data.list[0].weather.main
    


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
    dateEl.setAttribute('class', 'cardText' )
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

var getCityWeather = function (cityName) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=56315fabf30e0df518942accfd04300c'
    

    // lat: 40.7127281, lon: -74.0060152
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log("locations hopefully")
                    console.log(data)
                   var lat = data[0].lat
                   var lon = data[0].lon
                   displayCity(data, cityName)
                   fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=56315fabf30e0df518942accfd04300c`)
                   .then(function (response){
                    return response.json()
                })
                .then(function(data){
                    console.log(data)
                    renderCurrentWeather(data)
                    
                })
                    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=56315fabf30e0df518942accfd04300c`)
                    .then(function (response){
                        return response.json()
                    })
                    .then(function(data){
                        console.log(data)
                        renderFivDayForecast(data)
                    })
                })
            } else { 
                alert ('Error' + response.statusText)
            }
        })
}


var displayCity = function (cities, searchTerm) {
    

    if (cities.length === 0){
cityContainerEl.textContent = 'No cities found'
return;
    }


for (var i = 0; i < 1; i++){
    var cityLat = cities[i].lat
    var cityLong = cities[i].lon
    console.log(cityLat)
    console.log(cityLong)
    
    var citiesName = cities[i].name + "  (" + cities[i].country +", " + cities[i].state + ")"
    console.log(citiesName);
    
    var cityEl = document.createElement('button');
    cityEl.classList = 'list-item flex-row justify-space-between align-center cityBtn';
    

    var titleEl = document.createElement('span')
    titleEl.textContent = citiesName;

    cityEl.appendChild(titleEl)

    var statusEl = document.createElement('span')
    statusEl.classList = 'flex-row align-center';

    cityContainerEl.appendChild(cityEl)

    localStorage.setItem('cityBtn', cityBtn)
    
}
}

// cityBtn.addEventListener('click', function (

// ))

searchBtn.addEventListener('click', submitHandler)


// var collectWeather = function(cityLat, cityLong) {
    
//     var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + cityLat + '&lon='+ cityLong +'&appid=56315fabf30e0df518942accfd04300c'
   
//     var cityLat = cities[i].lat
//        var cityLong = cities[i].lon
//        console.log(cityLat)
//        console.log(cityLong)
   
//    fetch(weatherUrl)
//        .then(function (response){
//            if (response.ok)
//            console.log(response);
//            response.json().then(function(data){
//                console.log("display city weather?")
//                console.log(data)
//            })
//        })
       
       
//    }