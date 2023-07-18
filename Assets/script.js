// localStorage.clear();

// Get references to the HTML elements we will be using

const apiKey = "4204bfdd6f4f063ef67429ec56df1142";
const cityInput = document.getElementById("city");  
let citiesList = []; 
const todayDate = document.getElementById("todayDate"); 
const cityForm = document.getElementById("formCity");  
const buttons = document.getElementById("buttons");  
const cityEl = document.querySelector("#searchedCity");  



//  Get today weather data from the API
const getWeather = (city) => { 
  const apiURL1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetch(apiURL1)
    .then((response) => {
        response.json()
          .then((data) => {
              showWeather(data, city);
            });
      });
};

// Get forecast  weather data for a city
const getForecast = (city) => { 
  const apiURL2  = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  fetch(apiURL2)
    .then((response) => {
      response.json()
        .then((data) => { 
          showForecast(data, city); 
          let lat = data.city.coord.lat;
          let lon = data.city.coord.lon;
           
        });
    });
};

//display the search history

const submitQuery = (event) => {
  event.preventDefault();
  const cityEl = cityInput.value.trim();
  const btn = document.createElement("button");  
  btn.className = "searched-list btn";
  btn.innerHTML = cityEl;  
  buttons.appendChild(btn);
  listCity();
  if(!citiesList.includes(cityEl) && (cityEl != "")) {
    citiesList.push(cityEl);
  };
  localStorage.setItem("citiesList", JSON.stringify(citiesList));
  if(cityEl) {
    getWeather(cityEl);
    getForecast(cityEl);
    cityInput.value = "";
  } else {
    alert("Enter a city name to get the weather!");
  }
};

//  Pass search history 
let listCity = () => {
  citiesList = JSON.parse(localStorage.getItem("citiesList"));
  if(!citiesList) {
    citiesList = [];
  };
};

// Add a city to the search history
const addList = () => {
  for(var i = 0; i < citiesList.length; i++) {
    let btn = document.createElement("button");
    btn.className = "searched-list btn";  
    btn.innerHTML = citiesList[i];
    buttons.appendChild(btn);  
  };
  //   // If the city is already in the search history, remove it
  // const index = buttons.indexOf(city);
  // if (index !== -1) {
  //   buttons.splice(index, 1);
  // }

  // Use the search history if there is one
  const listButtons = document.querySelectorAll(".searched-list");
  for(var i = 0; i < listButtons.length; i++) {
    listButtons[i].addEventListener("click", (event) => {
      getWeather(event.target.textContent);
      getForecast(event.target.textContent);
    })
  }

};


// Display the current weather conditions for a city

todayDate.textContent = " (" + moment().format('M/D/YYYY') + ")"; 

const showWeather = (weather, searchQuery) => {
  cityEl.textContent = searchQuery;
  iconEl = weather.weather[0].icon;
  document.getElementById("todayIcon")
  .src = "http://openweathermap.org/img/wn/" + iconEl + ".png";
  document.getElementById("todayTemp")
    .innerHTML = weather.main.temp;
  document.getElementById("todayHumidity")
    .innerHTML = weather.main.humidity;
  document.getElementById("todayWind")
    .innerHTML = weather.wind.speed;
};

// 5 DAY FORECAST
document.getElementById("day1")
  .innerHTML = moment()
  .add(1, "d")
  .format('L');
document.getElementById("day2")
  .innerHTML = moment()
  .add(2, "d")
  .format('L');
document.getElementById("day3")
  .innerHTML = moment()
  .add(3, "d")
  .format('L');
document.getElementById("day4")
  .innerHTML = moment()
  .add(4, "d")
  .format('L');
document.getElementById("day5")
  .innerHTML = moment()
  .add(5, "d")
  .format('L');

const showForecast = (forecast, searchQuery) => {
  cityEl.textContent = searchQuery;
  // 1 of 5
  document.getElementById("t1")
    .innerHTML = forecast.list[4].main.temp;
  document.getElementById("w1")
    .innerHTML = forecast.list[4].wind.speed
  document.getElementById("h1")
    .innerHTML = forecast.list[4].main.humidity;
  iconEl1 = forecast.list[4].weather[0].icon;
  document.getElementById("i1")
  .src = "http://openweathermap.org/img/wn/" + iconEl1 + ".png";
  // 2 of 5
  document.getElementById("t2")
    .innerHTML = forecast.list[12].main.temp;
  document.getElementById("w2")
    .innerHTML = forecast.list[12].wind.speed
  document.getElementById("h2")
    .innerHTML = forecast.list[12].main.humidity;
  iconEl2 = forecast.list[12].weather[0].icon;
  document.getElementById("i2")
  .src = "http://openweathermap.org/img/wn/" + iconEl2 + ".png";
  // 3 of 5
  document.getElementById("t3")
    .innerHTML = forecast.list[20].main.temp;
  document.getElementById("w3")
    .innerHTML = forecast.list[20].wind.speed
  document.getElementById("h3")
    .innerHTML = forecast.list[20].main.humidity;
  iconEl3 = forecast.list[20].weather[0].icon;
  document.getElementById("i3")
  .src = "http://openweathermap.org/img/wn/" + iconEl3 + ".png";
  // 4 of 5
  document.getElementById("t4")
    .innerHTML = forecast.list[28].main.temp;
  document.getElementById("w4")
    .innerHTML = forecast.list[28].wind.speed
  document.getElementById("h4")
    .innerHTML = forecast.list[28].main.humidity;
  iconEl4 = forecast.list[28].weather[0].icon;
  document.getElementById("i4") 
  .src = "http://openweathermap.org/img/wn/" + iconEl4 + ".png";
  // 5 of 5
  document.getElementById("t5")
    .innerHTML = forecast.list[36].main.temp;
  document.getElementById("w5")
    .innerHTML = forecast.list[36].wind.speed
  document.getElementById("h5")
    .innerHTML = forecast.list[36].main.humidity;
  iconEl5 = forecast.list[36].weather[0].icon;
  document.getElementById("i5")
  .src = "http://openweathermap.org/img/wn/" + iconEl5 + ".png";
  // end 5 day Forecast
};

// Add event listeners to the search form and search history 
cityForm.addEventListener("submit", submitQuery);
listCity();
addList();

