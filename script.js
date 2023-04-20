var searchBtn = document.querySelector(".btn")
var searchInputEl = document.querySelector('#search')
var cityContainerEl = document.querySelector('#cityContainer')

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

var getCityWeather = function (cityName) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=56315fabf30e0df518942accfd04300c'
    


    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log("locations hopefully")
                    console.log(data)
                    displayCity(data, cityName);
                    
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


for (var i = 0; i < cities.length; i++){
    var cityLat = cities[i].lat
    var cityLong = cities[i].lon
    console.log(cityLat)
    console.log(cityLong)


    
    
    
    var citiesName = cities[i].name + "  (" + cities[i].country +", " + cities[i].state + ")"
    console.log(citiesName);
    
    var cityEl = document.createElement('button');
    cityEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span')
    titleEl.textContent = citiesName;

    cityEl.appendChild(titleEl)

    var statusEl = document.createElement('span')
    statusEl.classList = 'flex-row align-center';

    cityContainerEl.appendChild(cityEl)

    
}
}


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