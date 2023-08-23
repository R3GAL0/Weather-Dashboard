// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// can use city name, state code, or country code

var cityEl = document.querySelector('#city');
var btnEl = document.querySelector('.btn');
var cityListEl = document.querySelector('#city-list');
var todayEl = document.querySelector('#weather-today')
var multidayEl = document.querySelector('#multiday-forecast');
// var today = dayjs().format('MM/DD/YYYY');
// API Key
var keyAPI = '000d26729d4f39b6f39ce11ee8904c9b';
var cityStorage = JSON.parse(localStorage.getItem('cityStorage')) || [];


//  http://api.openweathermap.org/geo/1.0/direct?q=Toronto&limit=1&appid=000d26729d4f39b6f39ce11ee8904c9b
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q='; // one day request
var apiURLmulti = 'https://api.openweathermap.org/data/2.5/forecast?lat='; // multiday request
// var geoURL = 'http://api.openweathermap.org/geo/1.0/direct?limit=1&q='; // for coords

// makes the side bar of prev searched items
function makeList(cityStorage) {
    if (cityStorage.length == 0) {
        return;
    }
    for (var i = 0; i < cityStorage.length; i++) {
        var li = document.createElement("li");
        li.textContent = cityStorage[i].city;
        li.setAttribute('data-index', i);
        cityListEl.appendChild(li);
    }
}
makeList(cityStorage);

// the search button
btnEl.addEventListener("click", function () {
    var searchFor = cityEl.value;
    // searchFor = 'Toronto'; // for ease of use in development
    var queryURL = apiURL + searchFor + '&appid=' + keyAPI; // use for one day request
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // obtain coords
            var cords = [data.coord.lon, data.coord.lat, data.name];
            // localStorage.setItem('coordinates', JSON.stringify(cords));
            var queryURLmulti = apiURLmulti + cords[1] + '&lon=' + cords[0] + '&appid=' + keyAPI;
            getValues(queryURLmulti, cords);

        });

    // update prev searched cities list
    // makeList(cityStorage);
});

// if user performs a search refresh the page

// populate list from storage

// gets the weather data from supplied url and coordinates, clears the html elements, then populates the elemetns
function getValues(queryURLmulti, cords) {
    fetch(queryURLmulti)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // display results
            // ------------------------------------------------------------------
            // Day 0
            today = dayjs().format(' (MM/DD/YYYY)');
            // todayEl.children.eq(0).textContent = searchFor + today;

            // empty old elements
            $(todayEl).children().eq(1).html('');
            $('#day2-forecast').html('');
            $('#day3-forecast').html('');
            $('#day4-forecast').html('');
            $('#day5-forecast').html('');
            $('#day6-forecast').html('');

            $(todayEl).children().eq(0).text(cords[2] + today);
            $(todayEl).children().eq(1).append('<li>Cloud Cover: ' + data.list[0].weather[0].description + '</li>');
            $(todayEl).children().eq(1).append('<li>Temp: ' + data.list[0].main.temp + ' °K</li>');
            $(todayEl).children().eq(1).append('<li>Wind: ' + data.list[0].wind.speed + ' m/s</li>');
            $(todayEl).children().eq(1).append('<li>Humidity: ' + data.list[0].main.humidity + ' %</li>');

            // ----------------------------------------------------------------
            var date = dayjs().add(1, 'day').format('MM/DD/YYYY');
            $('#day2-forecast').append('<li>' + dayjs.unix(data.list[4].dt).format('MM/DD/YYYY') + '</li>');
            $('#day2-forecast').append('<li>Cloud Cover: ' + data.list[4].weather[0].description + '</li>');
            $('#day2-forecast').append('<li>Temp: ' + data.list[4].main.temp + ' °K</li>');
            $('#day2-forecast').append('<li>Wind: ' + data.list[4].wind.speed + ' m/s</li>');
            $('#day2-forecast').append('<li>Humidity: ' + data.list[4].main.humidity + ' %</li>');


            var date = dayjs().add(1, 'day').format('MM/DD/YYYY');
            $('#day3-forecast').append('<li>' + dayjs.unix(data.list[12].dt).format('MM/DD/YYYY') + '</li>');
            $('#day3-forecast').append('<li>Cloud Cover: ' + data.list[12].weather[0].description + '</li>');
            $('#day3-forecast').append('<li>Temp: ' + data.list[12].main.temp + ' °K</li>');
            $('#day3-forecast').append('<li>Wind: ' + data.list[12].wind.speed + ' m/s</li>');
            $('#day3-forecast').append('<li>Humidity: ' + data.list[12].main.humidity + ' %</li>');

            var date = dayjs().add(1, 'day').format('MM/DD/YYYY');
            $('#day4-forecast').append('<li>' + dayjs.unix(data.list[20].dt).format('MM/DD/YYYY') + '</li>');
            $('#day4-forecast').append('<li>Cloud Cover: ' + data.list[20].weather[0].description + '</li>');
            $('#day4-forecast').append('<li>Temp: ' + data.list[20].main.temp + ' °K</li>');
            $('#day4-forecast').append('<li>Wind: ' + data.list[20].wind.speed + ' m/s</li>');
            $('#day4-forecast').append('<li>Humidity: ' + data.list[20].main.humidity + ' %</li>');

            var date = dayjs().add(1, 'day').format('MM/DD/YYYY');
            $('#day5-forecast').append('<li>' + dayjs.unix(data.list[28].dt).format('MM/DD/YYYY') + '</li>');
            $('#day5-forecast').append('<li>Cloud Cover: ' + data.list[28].weather[0].description + '</li>');
            $('#day5-forecast').append('<li>Temp: ' + data.list[28].main.temp + ' °K</li>');
            $('#day5-forecast').append('<li>Wind: ' + data.list[28].wind.speed + ' m/s</li>');
            $('#day5-forecast').append('<li>Humidity: ' + data.list[28].main.humidity + ' %</li>');

            var date = dayjs().add(1, 'day').format('MM/DD/YYYY');
            $('#day6-forecast').append('<li>' + dayjs.unix(data.list[36].dt).format('MM/DD/YYYY') + '</li>');
            $('#day6-forecast').append('<li>Cloud Cover: ' + data.list[36].weather[0].description + '</li>');
            $('#day6-forecast').append('<li>Temp: ' + data.list[36].main.temp + ' °K</li>');
            $('#day6-forecast').append('<li>Wind: ' + data.list[36].wind.speed + ' m/s</li>');
            $('#day6-forecast').append('<li>Humidity: ' + data.list[36].main.humidity + ' %</li>');
            // -----------------------------------------------------------------------------------------------------

            // store results
            var cityStorageTemp = {
                city: cords[2],
                cords: cords,
                day1: {
                    clouds: data.list[0].weather[0].description,
                    temp: data.list[0].main.temp,
                    wind: data.list[0].wind.speed,
                    humidity: data.list[0].main.humidity,
                },
                day2: {
                    clouds: data.list[4].weather[0].description,
                    temp: data.list[4].main.temp,
                    wind: data.list[4].wind.speed,
                    humidity: data.list[4].main.humidity,
                },
                day3: {
                    clouds: data.list[12].weather[0].description,
                    temp: data.list[12].main.temp,
                    wind: data.list[12].wind.speed,
                    humidity: data.list[12].main.humidity,
                },
                day4: {
                    clouds: data.list[20].weather[0].description,
                    temp: data.list[20].main.temp,
                    wind: data.list[20].wind.speed,
                    humidity: data.list[20].main.humidity,
                },
                day5: {
                    clouds: data.list[28].weather[0].description,
                    temp: data.list[28].main.temp,
                    wind: data.list[28].wind.speed,
                    humidity: data.list[28].main.humidity,
                },
                day6: {
                    clouds: data.list[36].weather[0].description,
                    temp: data.list[36].main.temp,
                    wind: data.list[36].wind.speed,
                    humidity: data.list[36].main.humidity,
                },
            }
            cityStorage.push(cityStorageTemp);
            localStorage.setItem('cityStorage', JSON.stringify(cityStorage));

        });

}

// recalls old weather data
cityListEl.addEventListener('click', function (event) {
    var elIndex = event.target.getAttribute('data-index');
    var cords = cityStorage[elIndex].cords;
    var queryURLmulti = apiURLmulti + cords[1] + '&lon=' + cords[0] + '&appid=' + keyAPI;
    getValues(queryURLmulti, cords);
    // need to clear old values as new ones are printed.
})

