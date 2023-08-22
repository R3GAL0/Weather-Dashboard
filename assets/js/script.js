// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// can use city name, state code, or country code

var cityEl = document.querySelector('#city');
var btnEl = document.querySelector('.btn');
var cityListEl = document.querySelector('#city-list');
var todayEl = document.querySelector('#weather-today')
// API Key
var keyAPI = '000d26729d4f39b6f39ce11ee8904c9b';
var cityStor = JSON.parse(localStorage.getItem('cityStor')) || [];


//  http://api.openweathermap.org/geo/1.0/direct?q=Toronto&limit=1&appid=000d26729d4f39b6f39ce11ee8904c9b
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
// var apiURL = 'api.openweathermap.org/data/2.5/forecast?q=';


// structure
cityStor[0] = {
    city: 0, // contains city name
    day1: {
        clouds: 0, 
        temp: 0,
        wind: 0,
        humidity: 0,
    },
    day2: {
        clouds: 0, 
        temp: 0,
        wind: 0,
        humidity: 0,
    },
    day3: {
        clouds: 0, 
        temp: 0,
        wind: 0,
        humidity: 0,
    },
    day4: {
        clouds: 0, 
        temp: 0,
        wind: 0,
        humidity: 0,
    },
    day5: {
        clouds: 0, 
        temp: 0,
        wind: 0,
        humidity: 0,
    },
    day6: {
        clouds: 0, 
        temp: 0,
        wind: 0,
        humidity: 0,
    },
};


function makeList(cityStor) {
    if (cityStor.length == 0) {
        return;
    }
    for (var i = 0; i < cityStor.length; i++) {
        var li = document.createElement("li");
        li.textContent = cityStor[i].city;
        li.setAttribute('data-cityIndex', cityStor[i].city);
        cityListEl.appendChild(li);
    }
}
makeList(cityStor);


// search function
// api call
// display api info

btnEl.addEventListener("click", function () {
    var searchFor = cityEl.value;
    searchFor = 'Toronto'; // for ease of use in development
    // make api request
    var queryURL = apiURL + searchFor + '&appid=' + keyAPI;
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // display results
            console.log(data);
            var today = dayjs().format(' (MM/DD/YYYY)');
            console.log(today);
            // todayEl.children.eq(0).textContent = searchFor + today;
            $(todayEl).children().eq(0).text(searchFor + today);
            $(todayEl).children().eq(1).append('<li>Cloud Cover: ' + data.weather[0].description + '</li>');
            $(todayEl).children().eq(1).append('<li>Temp: ' + data.main.temp + ' °F</li>');
            $(todayEl).children().eq(1).append('<li>Wind: ' + data.wind.speed + ' MPH</li>');
            $(todayEl).children().eq(1).append('<li>Humidity: ' + data.main.humidity + ' %</li>');
            // store results

        });


    // update prev searched cities list
    // makeList(cityStor);
});

// if user performs a search refresh the page