let cityId = document.querySelector('#cityId');
let cityName = document.querySelector('#cityName');
let cityPopular = document.querySelector('#cityPopular');
let sendCity = document.querySelector('#send');
let divErrors = document.querySelector('#status');
let checkBoxAdd = document.querySelector('#checkBoxAdd');
let checkBoxEdit = document.querySelector('#checkBoxEdit');
let checkBoxRemo = document.querySelector('#checkBoxRemo');
let form = document.querySelector('#form');

// let xValuesCity = [];
// let yValuesPopulatin = [];
// let chartColors = ["blue","fuchsia","gray","green","lime","maroon","navy","olive","purple","red"];

//#GET
let cities = fetch('https://avancera.app/cities/')

cities
  .then(response => {
    console.log(response)

    let someOtherPromise = response.json()

    return someOtherPromise
  })
  .then(data => {

    const cities = document.querySelector(".table");
    for (i = 0; i < 10; i++){
        cities.innerHTML += `<tr><th>${i+1}</th><td>${data[i].name}</td><td>${data[i].population}</td></tr>`;

        // xValuesCity.push(data[i].name);
        // yValuesPopulatin.push(data[i].population);
    }
});


//POST
let postCity = {
    fetchCity: function (city,polular) {
        let polulationInt = parseInt(polular);

      fetch("https://avancera.app/cities", {
        body:JSON.stringify({name: city, population: polulationInt }),
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'POST'
      })
        .then((Response) => {
          timeOut();    //start time out comment first(success and error)
            if(Response.ok){
                document.querySelector('#status').innerHTML = `Status: ${Response.status} :)`;
                return Response.json()
            }else{
                document.querySelector('#status').innerHTML = `Status: ${Response.status} :(`;
            }
        })
        .then((data) => {console.log(data);})
        .catch((error) => {
            console.log(error)
            document.querySelector('#status').innerHTML = `Error: ${error}`;
          });
    },
    post: function(){
        const city = document.querySelector("#cityName").value;
        const polulation = document.querySelector("#cityPopular").value;

        this.fetchCity(city,polulation);
    }
  };

//PATCH
let patchCity = {
    fetchCity: function (cityId,cityName,cityPopular) {
        let polulationInt = parseInt(cityPopular);
        
      fetch(`https://avancera.app/cities/${cityId}`, {
        body:JSON.stringify({
            name: cityName,
            population: polulationInt
        }),
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'PATCH'
      })
        .then((Response) => {
          timeOut();    //start time out comment first(success and error)
            if(Response.ok){
                document.querySelector('#status').innerHTML = `Status: ${Response.status} :)`;
                return Response.json()
            }else{
              document.querySelector('#status').innerHTML = `Status: ${Response.status} :(`;
            }
        })
        .then((data) => {console.log(data);})
        .catch((error) => {
            console.log(error)
            document.querySelector('#status').innerHTML = `Error: ${error}`;
          });
    },
    patch: function(){
        const cityId = document.querySelector("#cityId").value;
        const cityName = document.querySelector("#cityName").value;
        const cityPopular = document.querySelector("#cityPopular").value;

        this.fetchCity(cityId,cityName,cityPopular);
    }
  };
  
//Delete
let deleteCity = {
    fetchCity: function (cityId) {

      fetch(`https://avancera.app/cities/${cityId}`, {
        method: 'DELETE'
      })
        .then((Response) => {
          timeOut();    
            if(Response.ok){
                document.querySelector('#status').innerHTML = `Status: ${Response.status} :)`;
                return Response.json()
            }else{
                document.querySelector('#status').innerHTML = `Status: ${Response.status} :(`;
            }
        })
        .then((data) => {console.log(data);});
    },
    delete: function(){
        const cityId = document.querySelector("#cityId").value;
        this.fetchCity(cityId);
    }
};

function timeOut(){
  setTimeout(() => {
    document.querySelector('#status').style.display = 'none';
    document.querySelector('#status').value = '';
  }, 5000); // hide element after 5 seconds

}

  document.querySelector("#form").addEventListener("submit", clickChange);
  document.querySelector("#sendCity").addEventListener("keyup", keyChange);

  checkBoxAdd.addEventListener("input", change);
  checkBoxEdit.addEventListener("input", change);
  checkBoxRemo.addEventListener("input", change);
  document.querySelector('#sendCity').disabled = true;

  // function checkUncheck(){
  //   let checkBoxes = document.getElementsByTagName('input[type="checkbox"]');
  //   for(i = 0; i< checkBoxes.length; i++){
  //     if(checks[i].checked ){

  //     }
  //   }
  // }

  function change(){
    
    if(checkBoxAdd.checked){
        cityId.disabled = true;
        cityName.disabled = false;
        cityPopular.disabled = false;
        cityId.value = "";
        document.querySelector('#sendCity').disabled = false;

        checkBoxEdit.checked = false;
        checkBoxRemo.checked = false;
    }
    if(checkBoxEdit.checked){
        cityId.disabled = false;
        cityName.disabled = false;
        cityPopular.disabled = false;
        document.querySelector('#sendCity').disabled = false;
        checkBoxAdd.checked = false;
        checkBoxRemo.checked = false;
    }
    if(checkBoxRemo.checked){
        cityId.disabled = false;
        cityName.disabled = true;
        cityPopular.disabled = true;
        cityName.value = "";
        cityPopular.value = "";
        document.querySelector('#sendCity').disabled = false;
        checkBoxAdd.checked = false;
        checkBoxEdit.checked = false;
    }else{
        document.querySelector('#sendCity').disabled = false;
    }
  }

  function clickChange(e){
     e.preventDefault();
    if(checkBoxAdd.checked){
        postCity.post();
    }
    if(checkBoxEdit.checked){
        patchCity.patch()
    }
    if(checkBoxRemo.checked){
        deleteCity.delete();
    }

    cityId.value ="";
    cityName.value ="";
    cityPopular.value ="";

    document.querySelector('#status').value = '';
    document.querySelector('#status').style.display = 'flex';
  };
  
  function keyChange(event){
      if(event.key == "Enter"){
        postCity.post();
      }
      if(checkBoxAdd.checked){
        postCity.post();
      }
      if(checkBoxEdit.checked){
            patchCity.patch()
      }
      if(checkBoxRemo.checked){
            deleteCity.delete();
      }
      cityId.value ="";
      cityName.value ="";
      cityPopular.value ="";

      document.querySelector('#status').value = '';
      document.querySelector('#status').style.display = 'flex';
  };
  

