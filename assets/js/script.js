var fetchButton = document.getElementById('searchBtn');
var APIkey = '37b99c5b26083bf1ad3685cc2948a7c6';
var NUMBER_OF_DAYS = 6;
var searchHis;

//displays the current date//
const today = dayjs();
$('#todaysDate').text(today.format('MMM D, YYYY'));
//-----------------------------------//

// displays dates for 5 day forecast ---
const day01 = dayjs().add(1, 'day')
const day02 = dayjs().add(2, 'day')
const day03 = dayjs().add(3, 'day')
const day04 = dayjs().add(4, 'day')
const day05 = dayjs().add(5, 'day')

$(date01).text(day01.format('MMM D, YYYY'));
$(date02).text(day02.format('MMM D, YYYY'));
$(date03).text(day03.format('MMM D, YYYY'));
$(date04).text(day04.format('MMM D, YYYY'));
$(date05).text(day05.format('MMM D, YYYY'));
//------------------------------------//
// displays stock image in 5 day forecast -------
for (var i = 0; i < 5; i++){
  forecast = document.querySelector('#weather0' + [(i + 1)]);
  var stockImg = document.createElement("img");
  stockImg.style.height = '135px';
  stockImg.style.width = '150px';
  forecast.appendChild(stockImg);
  stockImg.src = `https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80`;
  
}
//--------------------------------------//
// Produces all weather info when search item is submitted //
function getApi() {
  destroyIcon(); //called funtion from line 130//
    var city = document.getElementById('cityInput').value;
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=5&APPID=37b99c5b26083bf1ad3685cc2948a7c6&units=imperial`;
    
    $('input[id="cityInput"]').val('');
    // creates search history buttons and displays them on screen -------  
    localStorage.setItem("city", JSON.stringify(city));
    searchHis = JSON.parse(localStorage.getItem("city"));
  
    var cityHis = document.getElementById('searchHis');
    var historyBtn = document.createElement("button");
    
    historyBtn.setAttribute('id' , 'hisBtn');
    historyBtn.dataset.name = searchHis;
          
    historyBtn.innerHTML = searchHis;
    cityHis.appendChild(historyBtn);
  //------------------------------------------------------------//
  // produces new search based off the search history button clicked -----
  historyBtn.addEventListener('click', function (event) {
      newGetApi(historyBtn.dataset.name); //funtion called from line 141//
      destroyIcon(); //funtion called from line 130//
  })
  //------------------------------------------------//        
  // fetch request for weather info //
    fetch(queryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function(data){
        var obj = JSON.parse(JSON.stringify(data));

        var temp = document.getElementById('tempfield');
        temp.textContent = obj.main.temp + " F";

        var wind = document.getElementById('windfield');
        wind.textContent = obj.wind.speed + " MPH";

        var Humidity = document.getElementById('Humiditylevel');
        Humidity.textContent = obj.main.humidity + "%";
        
        var cityName = document.getElementById('cityName');
        cityName.textContent = obj.name;
        //grabbing the lattitude and longitude for the five day forecast//
        var lon = obj.coord.lon;
        var lat = obj.coord.lat;
        
      
        fiveGuys(lon,lat); // called function from line 91//
      })
  
    }

    // fetch request for the 5 day forecast info//
    function fiveGuys(lon,lat) {

      var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=37b99c5b26083bf1ad3685cc2948a7c6`;
      
      fetch(fiveDayURL)
      .then(function (response) {
      return response.json();
    })
      .then(function(data){
        var obj = JSON.parse(JSON.stringify(data));
        console.log(obj);
        var forecastData;
        var tempData;
        var windData;
        var humidityData;
        var cloudImg;
        //for loop for the 5 days //
        for (var i = 0; i < 6; i++){
          forecastData = document.getElementById('weather0' + [(i + 1)]);
          var weatherImg = document.createElement("img");
          cloudImg = obj.list[i].weather[0].icon;
          weatherImg.src = `http://openweathermap.org/img/wn/${cloudImg}@2x.png`;

          forecastData.appendChild(weatherImg);
          
          tempData = document.getElementById('temp0' + [(i + 1)]);
          tempData.textContent = obj.list[i].main.temp + " F";

          windData = document.getElementById('wind0' + [(i + 1)]);
          windData.textContent = obj.list[i].wind.speed + " MPH";

          humidityData = document.getElementById('humidity0' + [(i + 1)]);
          humidityData.textContent = obj.list[i].main.humidity + "%";
        }
      })

     

  }
  // funtion to erase the icons that are appended to the 5 day forecast//
  function destroyIcon() {
    var oldData;
        for (var i = 0; i < 5; i++){
          oldData = document.getElementById('weather0' + [(i + 1)]).lastChild;
          document.getElementById('weather0' + [(i + 1)]).removeChild(oldData);
        }
        }
  

//new fetch request using the search history buttons to again display that city's info //
function newGetApi(searchHis){
  destroyIcon();
  
  var newQueryURL = `http://api.openweathermap.org/data/2.5/weather?q=${searchHis}&cnt=5&APPID=37b99c5b26083bf1ad3685cc2948a7c6&units=imperial`;
    $('input[id="cityInput"]').val('');

    fetch(newQueryURL)
      .then(function (response) {
        return response.json();
      })
      .then(function(data){
        var obj = JSON.parse(JSON.stringify(data));

        var temp = document.getElementById('tempfield');
        temp.textContent = obj.main.temp + " F";

        var wind = document.getElementById('windfield');
        wind.textContent = obj.wind.speed + " MPH";

        var Humidity = document.getElementById('Humiditylevel');
        Humidity.textContent = obj.main.humidity + "%";
        
        var cityName = document.getElementById('cityName');
        cityName.textContent = obj.name;
        
        var lon = obj.coord.lon;
        var lat = obj.coord.lat;
        
      
        fiveGuysToo(lon,lat); //function called from line 175 //
      })
  
    }
    // same funtion as before, used to grab 5 day forecast weather info from the search made by search history button //
    function fiveGuysToo(lon,lat) {

      var fiveDayURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=5&appid=37b99c5b26083bf1ad3685cc2948a7c6`;
      
      fetch(fiveDayURL)
      .then(function (response) {
      return response.json();
    })
      .then(function(data){
        var obj = JSON.parse(JSON.stringify(data));
        console.log(obj);
        var forecastData;
        var tempData;
        var windData;
        var humidityData;
        var cloudImg;
        for (var i = 0; i < 6; i++){
          forecastData = document.getElementById('weather0' + [(i + 1)]);
          var weatherImg = document.createElement("img");
          cloudImg = obj.list[i].weather[0].icon;
          weatherImg.src = `http://openweathermap.org/img/wn/${cloudImg}@2x.png`;

          forecastData.appendChild(weatherImg);
          
          tempData = document.getElementById('temp0' + [(i + 1)]);
          tempData.textContent = obj.list[i].main.temp + " F";

          windData = document.getElementById('wind0' + [(i + 1)]);
          windData.textContent = obj.list[i].wind.speed + " MPH";

          humidityData = document.getElementById('humidity0' + [(i + 1)]);
          humidityData.textContent = obj.list[i].main.humidity + "%";
        }
      })

     

  }


 // submit button that makes search //
  fetchButton.addEventListener('click', getApi); 