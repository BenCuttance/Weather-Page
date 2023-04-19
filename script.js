var searchBtn = document.querySelector(".btn")
var searchInputEl = document.querySelector('#search')

// searchBtn.addEventListener()

// API api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=56315fabf30e0df518942accfd04300c

// {lat} $ {lon} needed for geographical coordinates 

//Geo API to call from first? http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// State code only for US

// var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=56315fabf30e0df518942accfd04300c'

var submitHandler = function (event) {
    event.preventDefault()

var citySearch = searchInputEl.ariaValueMax.trim();

if (citySearch) {
    getCityWeather(citySearch);
} else {
    alert('please enter valid city name')
};
};

var getCityWeather = function (citySearch) {
    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=56315fabf30e0df518942accfd04300c'

    
fetch(apiUrl)
.then(function(response){
    if (response.ok) {
        console.log(response);
        response.json().then(function (date){
            
        })
    }
})
}
