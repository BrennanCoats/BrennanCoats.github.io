var fetchButton = document.getElementById('searchBtn');
var APIkey = '37b99c5b26083bf1ad3685cc2948a7c6';
var NUMBER_OF_DAYS = 6;
var searchHis;

const today = dayjs();
$('#todaysDate').text(today.format('MMM D, YYYY'));

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

for (var i = 0; i < 5; i++){
  forecast = document.querySelector('#weather0' + [(i + 1)]);
  var stockImg = document.createElement("img");
  stockImg.style.height = '135px';
  stockImg.style.width = '150px';
  forecast.appendChild(stockImg);
  stockImg.src = `https://images.unsplash.com/photo-1499346030926-9a72daac6c63?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80`;
  
}


function getApi() {
  destroyIcon();
    var city = document.getElementById('cityInput').value;
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=5&APPID=37b99c5b26083bf1ad3685cc2948a7c6&units=imperial`;
    $('input[id="cityInput"]').val('');


    
       
          localStorage.setItem("city", JSON.stringify(city));
          searchHis = JSON.parse(localStorage.getItem("city"));
          console.log(searchHis);
          var cityHis = document.getElementById('searchHis');
          var historyBtn = document.createElement("button");
          historyBtn.setAttribute('id' , 'hisBtn');
          historyBtn.dataset.name = searchHis;
          
          historyBtn.innerHTML = searchHis;
          cityHis.appendChild(historyBtn);

          historyBtn.addEventListener('click', function (event) {
            
            
            //var search = event.AT_TARGET.valueOf(historyBtn);
            console.log('works');
            newGetApi(historyBtn.dataset.name); 
            destroyIcon();
          })
          

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
        
        var lon = obj.coord.lon;
        var lat = obj.coord.lat;
        
      
        fiveGuys(lon,lat);
      })
  
    }
  
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
  
  function destroyIcon() {
    var oldData;
        for (var i = 0; i < 5; i++){
          oldData = document.getElementById('weather0' + [(i + 1)]).lastChild;
          document.getElementById('weather0' + [(i + 1)]).removeChild(oldData);
        }
        }
  //function historysearch(searchHis) {
  //  var oldData;
  //    for (var i = 0; i < 6; i++){
  //      oldData = document.getElementById('weather0' + [(i + 1)]).lastChild;
  //      document.getElementById('weather0' + [(i + 1)]).removeChild(oldData);
  //    }
  //    document.getElementById('cityInput').value = searchHis;
      //getApi();
  //  }


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
        
      
        fiveGuysToo(lon,lat);
      })
  
    }
  
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


 // historyBtn.addEventListener('click', historysearch(searchHis));
  fetchButton.addEventListener('click', getApi); 