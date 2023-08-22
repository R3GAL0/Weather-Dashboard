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
var apiURLmulti = 'http://api.openweathermap.org/data/2.5/forecast?lat='; // multiday request
// var geoURL = 'http://api.openweathermap.org/geo/1.0/direct?limit=1&q='; // for coords

function makeList(cityStorage) {
    if (cityStorage.length == 0) {
        return;
    }
    for (var i = 0; i < cityStorage.length; i++) {
        var li = document.createElement("li");
        li.textContent = cityStorage[i].city;
        li.setAttribute('data-cityIndex', cityStorage[i].city);
        cityListEl.appendChild(li);
    }
}
makeList(cityStorage);


// search function
// api call
// display api info

btnEl.addEventListener("click", function () {
    var searchFor = cityEl.value;
    searchFor = 'Toronto'; // for ease of use in development
    // make api request
    // var queryURLGeo = geoURL + searchFor + '&appid=' + keyAPI;
    // console.log('GeoURL= ' + queryURLGeo);
    // var lat = 40;
    // var lon = -40;
    // // get coords from fetch
    // var cords = [];
    // fetch(queryURLGeo)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         // retrieve coords
    //         var cords = [data[0].lat, data[0].lon];
    //         // console.log('see this?' + data);
    //         // cords[0] = ;
    //         console.log(data[0].lat);
    //         // cords[1] = ;
    //         console.log('cords: ' + cords);
    //         localStorage.setItem('coordinates', cords);
    //         return cords;
    //     });
    // // var cords = JSON.parse(localStorage.getItem('coordinates'));
    // console.log('what about this?' + cords);


    // var queryURLmulti = apiURLmulti + lat + '&lon=' + lon + '&appid=' + keyAPI;
    var queryURL = apiURL + searchFor + '&appid=' + keyAPI; // use for one day request
    console.log(queryURL);
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // display results
            console.log(data);
            today = dayjs().format(' (MM/DD/YYYY)');
            console.log(today);
            // todayEl.children.eq(0).textContent = searchFor + today;
            $(todayEl).children().eq(0).text(searchFor + today);
            $(todayEl).children().eq(1).append('<li>Cloud Cover: ' + data.weather[0].description + '</li>');
            $(todayEl).children().eq(1).append('<li>Temp: ' + data.main.temp + ' °K</li>');
            $(todayEl).children().eq(1).append('<li>Wind: ' + data.wind.speed + ' m/s</li>');
            $(todayEl).children().eq(1).append('<li>Humidity: ' + data.main.humidity + ' %</li>');
            var cords = [data.coord.lon, data.coord.lat];
            console.log('cords from 1day: ' + cords);
        });

    // var cords = [cityStorage[cityStorage.length].cords[0], cityStorage[cityStorage.length].cords[1]];
    var cords = [-79.4163, 43.7001];
    console.log(cords);
    var queryURLmulti = apiURLmulti + cords[0] + '&lon=' + cords[1] + '&appid=' + keyAPI;
    console.log(queryURLmulti);
    fetch(queryURLmulti)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // display results
            console.log(data.list);
            // ------------------------------------------------------------------
            // Day 0
            today = dayjs().format(' (MM/DD/YYYY)');
            // todayEl.children.eq(0).textContent = searchFor + today;
            console.log(searchFor);
            $(todayEl).children().eq(0).text(searchFor + today);
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
                city: searchFor,
                cords: cords,
                day1: {
                    clouds: data.weather[0].description,
                    temp: data.main.temp,
                    wind: data.wind.speed,
                    humidity: data.main.humidity,
                },
                day2: 0,
                day3: 0,
                day4: 0,
                day5: 0,
                day6: 0,
            }
            cityStorage.push(cityStorageTemp);
            localStorage.setItem('cityStorage', JSON.stringify(cityStorage));

        });


    // update prev searched cities list
    // makeList(cityStorage);
});

// if user performs a search refresh the page
