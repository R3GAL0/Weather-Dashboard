// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// can use city name, state code, or country code

var cityEl = document.querySelector('#city');
var btnEl = document.querySelector('.btn');
var cityListEl = document.querySelector('#city-list');

// API Key
var keyAPI = '000d26729d4f39b6f39ce11ee8904c9b';


// get today + 5 day forcast for a city
// store the city + forecast in local storage



//  http://api.openweathermap.org/geo/1.0/direct?q=Toronto&limit=1&appid=000d26729d4f39b6f39ce11ee8904c9b

// var city = 'London';
var apiURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
// var apiURL = 'api.openweathermap.org/data/2.5/forecast?q=';

// var queryURL = apiURL + city + '&appid=' + keyAPI;

// fetch(queryURL).then(response) {

//     }



// // populate the city list from storage
var cityStor = JSON.parse(localStorage.getItem('cityStor')) || [];

// // structure
// cityStor[0] = {
//     city: 0; // contains city name
//     forecast: 0; // contains forcast info
// }


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
            // store results

        });
    // update prev searched cities list
    // makeList(cityStor);
});