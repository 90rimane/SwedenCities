//HamburgerMenu
const hamburger_menu = document.querySelector(".hamburger-menu");
const container = document.querySelector(".container");

hamburger_menu.addEventListener("click", () => {
  container.classList.toggle("active");
});

//Api

let weather = {
    apikey: "7e39e44542afffe07cf335a084d1a09f",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=7e39e44542afffe07cf335a084d1a09f"
      )
        .then((Response) => Response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){ 
        const {name} = data;
        const {icon , description} = data.weather[0];
        const {temp , humidity, temp_min, temp_max}= data.main;
        const {speed}= data.wind;
        const {sunrise, sunset}= data.sys; 
        const {all}= data.clouds; 

        localStorage.setItem('temp', JSON.stringify(data.main.temp));  //Localstorage set
        localStorage.setItem('speed', JSON.stringify(data.wind.speed));

        let valueFromLocalTemp = JSON.parse(localStorage.getItem('temp')); //Localstorage get
        let valueFromLocalSpeed = JSON.parse(localStorage.getItem('speed'));

        document.querySelector(".city").textContent ="Vädret i "+ name; 
        document.querySelector(".temp").innerHTML= temp +" °C";   
        document.querySelector(".icon").src="http://openweathermap.org/img/wn/"+icon+".png";
        document.querySelector(".description").textContent = description;
        document.querySelector(".humidity").innerHTML ="Luftfukt: "+humidity+" %";
        document.querySelector(".wind").innerHTML = "Lufttryck: "+speed +" km/h";
        document.querySelector(".sunrise").innerHTML= "Soluppgång: "+sunrise;   
        document.querySelector(".sunset").innerHTML= "Solnedgång: " +sunset;   
        document.querySelector(".temp_min").innerHTML= "Temperatur-min: " + temp_min +" °C";   
        document.querySelector(".temp-max").innerHTML= "Temperatur-max: " + temp_max +" °C";   
        document.querySelector(".all-clouds").innerHTML= "Moln: " +all+ " %";  

        document.querySelector('.localValueTemp').innerHTML = "Senaste Temperatur: " +valueFromLocalTemp+ " °C"; 
        document.querySelector('.localValueSpeed').innerHTML = "Senaste Lufttryck: " +valueFromLocalSpeed+ " km/h";
        
        document.querySelector(".weather").classList.remove("loading");
      },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
  };
  
  document.querySelector(".search button").addEventListener("click", () =>{
      weather.search();
      document.querySelector(".search-bar").value = '';
  })
  
  document.querySelector(".search-bar").addEventListener("keyup", (event) =>{
      if(event.key == "Enter"){
          weather.search();
          document.querySelector(".search-bar").value = '';
      }
  })
  
  weather.fetchWeather("Gothenburg");
  