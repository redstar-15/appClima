let ciudad = document.getElementById("ciudad");
let botonSeleccion = document.getElementById("seleccion")
let respuesta = document.getElementById("respuesta")
let ciudadElegida = ""
let apikey = "8766f499d6c0a61ef121ad5c9c132660"
let lati = ""
let longi = ""


botonSeleccion.addEventListener("click", seleccion)

function seleccion() {
  ciudadElegida = ciudad.value
  cordenadas();
}
function cordenadas() {
  fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + ciudadElegida + ",{COL}&limit=1&appid=" + apikey)
    .then(response => response.json())
    .then(data => {
      let latitud = data[0].lat;
      let longitud = data[0].lon;
      lati = String(latitud);
      longi = String(longitud);
      console.log(latitud);
      console.log(longitud);
      fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lati + "&lon=" + longi + "&lang=es" + "&appid=" + apikey)
        .then(response => response.json())
        .then(data => {
          let mainClima = data.weather[0].main;
          let temperatura = data.main.temp - 273.15;
          temperatura = Math.round(temperatura);
          let lista = document.createElement("ul");

          let listaTemp = document.createElement("li");
          listaTemp.textContent = "temperatura: " + temperatura;
          lista.appendChild(listaTemp)

          let listaClima = document.createElement("li");
          listaClima.textContent = "clima: " + mainClima;
          lista.appendChild(listaClima);
          respuesta.appendChild(lista);
          console.log(respuesta)
        })
    });

}
