let cityDays = ["Dag 1","Dag 2", "Dag 3","Dag 4","Dag 5"];
let chartColors = ["orange","red", "gray","green","maroon"];
let daysTemp = [];

let forecast = {
  apikey: "a00f51b5282335d0f94456f3c1441f40",
  fetchForecast: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=metric&cnt=5&appid=a00f51b5282335d0f94456f3c1441f40"
    )
      .then((Response) => Response.json())
      .then((data) => {
        const {name}= data.city;
        document.querySelector(".title").innerHTML = name;

        this.displayForecast(data);

        let ctx = document.getElementById('myChart').getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: cityDays,
                datasets: [{
                    label: 'Temperatur °C',
                    data: daysTemp,
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
      });
  },
  displayForecast: function(data){ 

    for(i=0; i < 5; i++){
      const {temp}= data.list[i].main;
      daysTemp.push(temp);
    } 
  }
};

//Hämna senaste sökning från localstorage
let nameFromLocal = JSON.parse(localStorage.getItem('cityName'));

forecast.fetchForecast(nameFromLocal);
