var fetchButton = document.getElementById('searchBtn');
var APIkey = '37b99c5b26083bf1ad3685cc2948a7c6';
var NUMBER_OF_DAYS = 6;

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




function getApi() {

    var city = document.getElementById('cityInput').value;
    var queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=5&APPID=37b99c5b26083bf1ad3685cc2948a7c6&units=imperial`;

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
        
        //var lat = 
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
        var firstDayW = document.getElementById('weather01');
        console.log(obj.list[0].weather[0].description);
        firstDayW.textContent = obj.list[0].weather[0].description;

      })

    

  }
  fetchButton.addEventListener('click', getApi);


  