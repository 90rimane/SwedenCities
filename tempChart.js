let svCities = ["Stockholm","Göteborg", "Uppsala","Malmö","Västerås"];
let chartColors = ["orange","red", "gray","green","maroon"];
let svTemps = [];

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
      const {temp}= data.main;
      svTemps.push(temp);
    }
};
for(i = 0; i< svCities.length; i++){
  weather.fetchWeather(svCities[i]);
}
console.log(svTemps);
console.log(Array.isArray(svTemps));



let ctx = document.getElementById('myChart').getContext('2d');

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: svCities,
        datasets: [{
            label: 'Temperatur °C',
            data: [8.79, 10.21, 11.64, 8.69, 8.95],
            backgroundColor: chartColors,
            borderColor: 'black',
            borderWidth: .5
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
