const currentTemp = document.querySelector('#temperature');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#condition');
const humidity = document.querySelector('#humidity')
//const url = 'https://api.openweathermap.org/data/2.5/weather?q=Carlsbad&units=metric&appid=992d5080d5389496bd0a7225f376c28e';

const day1 = document.querySelector('#day1');
const day1Temp = document.querySelector('#day1_temp');
const day2 = document.querySelector('#day2');
const day2Temp = document.querySelector('#day2_temp');
const day3 = document.querySelector('#day3');
const day3Temp = document.querySelector('#day3_temp');
//const url2 = 'https://api.openweathermap.org/data/2.5/forecast?q=Carlsbad&appid=992d5080d5389496bd0a7225f376c28e';

function GetInfo() {

  var newName = document.getElementById("cityInput");
  var cityName = document.getElementById("cityName");
  cityName.innerHTML = "---"+toUpperCase(newName.value)+"---";


  async function apiFetch() {
      try {
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+newName.value+'&units=metric&appid=992d5080d5389496bd0a7225f376c28e');
        if (response.ok) {
          const data = await response.json();
          //console.log(data); // this is for testing the call
          displayResults(data);
          GetInfo()
        } else {
            throw Error(await response.text());
        }
      } catch (error) {
          console.log(error);
      }
    }
    
  function toUpperCase(str) {
      const arr = str.split(" ");
      for (var i = 0; i < arr.length; i++) {
          arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      }
      const str2 = arr.join(" ");
      return str2
  }
  function  displayResults(weatherData) {
      currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>°`;
    
      const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
      const desc = weatherData.weather[0].description;
      
      weatherIcon.classList.add("icon");
      weatherIcon.setAttribute('src', iconsrc);
      weatherIcon.setAttribute('alt', desc);
      captionDesc.textContent = toUpperCase(desc);
      humidity.innerHTML = "💧 " + weatherData.main.humidity + "%";
  }

  async function apiFetchForecast() {
    try {
      const response2 = await fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=992d5080d5389496bd0a7225f376c28e');
      if (response2.ok) {
        const data2 = await response2.json();
        console.log(data2); // this is for testing the call
        displayTemp(data2);
      } else {
          throw Error(await response2.text());
      }
    } catch (error) {
        console.log(error);
    }
  }


  var d = new Date();
  var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",];


  function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }


  }

  document.getElementById("day1").innerHTML = weekday[CheckDay(0)];
  document.getElementById("day2").innerHTML = weekday[CheckDay(1)];
  document.getElementById("day3").innerHTML = weekday[CheckDay(2)];

  weekday[0] = "Sun";
  weekday[1] = "Mon";
  weekday[2] = "Tue";
  weekday[3] = "Wed";
  weekday[4] = "Thu";
  weekday[5] = "Fri";
  weekday[6] = "Sat";
  function displayTemp(data) {

  document.getElementById("day1_temp").innerHTML = Math.round(data.list[0].main.temp - 273.15, -2) + "°";
  document.getElementById("day2_temp").innerHTML = Math.round(data.list[1].main.temp - 273.15, -2) + "°";
  document.getElementById("day3_temp").innerHTML = Math.round(data.list[2].main.temp - 273.15, -2) + "°";
  }


  apiFetch();

  apiFetchForecast();
}