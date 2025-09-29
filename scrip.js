const inputBox = document.querySelector('.search-bar input'); /*Busca en el HTML un elemento <input> que esté dentro de un elemento con clase .search-bar y lo guarda en inputBox.*/
const searchBtn = document.querySelector('.search-bar button'); /*Busca en el HTML el elemento <button> dentro del elemento .search-bar y lo guarda en el JS searchBtn.*/
const weatherIcon = document.querySelector('.weather-icon'); /*Selecciona el elemento con la clase .weather-icon <img> y lo guarda en weatherIcon.*/
const weather = document.querySelector('.weather'); /*Selecciona el contenedor de información del clima (.weather) y lo guarda en weather.*/
const erromsg = document.querySelector('.error'); /*Selecciona el elemento que muestra mensajes de error (.error) y lo guarda en erromsg*/
const enter = document.querySelector('.busqueda');

async function checkWeather(city) { /*Define una función asíncrona llamada checkWeather que recibe el nombre de una ciudad (city).*/
    const apiKey = '1c9675ac342ffce10a05693880539499'; /*Guarda la clave de API de OpenWeatherMap (una especie de contraseña que te permite hacer consultas).*/
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; /*Crea la URL para consultar el clima en la ciudad que se pasó como parámetro. Pide la temperatura en grados Celsius (units=metric).*/

    const response = await fetch(apiURL); /*Hace la consulta a la API (petición HTTP) y espera la respuesta.*/
    const data = await response.json(); /*Convierte la respuesta en formato JSON (datos legibles por JavaScript) y la guarda en data.*/

    console.log(data); /*Muestra los datos de la API en la consola del navegador (para depurar o ver qué información llega).*/
    
    updateWeatherUI(data); /*Llama a otra función (updateWeatherUI) para actualizar la interfaz con los datos del clima.*/
}

function updateWeatherUI(data) { /*esta función recibe los datos del clima y los muestra en la página.*/
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}&deg;C`; /*Muestra la temperatura redondeada y con el símbolo °C en el elemento con clase .temp.*/
    document.querySelector('.city').innerHTML = data.name; /*Muestra el nombre de la ciudad en el elemento con clase .city.*/
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`; /*Muestra el porcentaje de humedad*/
    document.querySelector('.wind').innerHTML = `${data.wind.speed}km/h`; /*Muestra la velocidad del viento en km/h.*/

    const weatherIcons = { /*Define un objeto con diferentes tipos de clima y su respectivo ícono (una imagen en URL).*/
        Clear: 'https://cdn-icons-png.flaticon.com/512/1838/1838873.png',
        Clouds: 'https://cdn-icons-png.flaticon.com/512/11166/11166805.png',
        Snow: 'https://cdn-icons-png.flaticon.com/512/3104/3104595.png',
        Rain: 'https://cdn-icons-png.flaticon.com/512/460/460268.png'
    }

    weatherIcon.src = weatherIcons[data.weather[0].main] || 'https://cdn-icons-png.flaticon.com/512/4514/4514767.png'; /*Cambia la imagen del ícono del clima según el tipo de clima que devuelve la API. Si no se encuentra el tipo, se muestra una imagen genérica.*/

    weather.style.display = 'block'; /*Muestra en pantalla la sección .weather (por si estaba oculta).*/
}

searchBtn.addEventListener('click',() => { /*Cuando el usuario hace clic en el botón de búsqueda, toma el valor del <input> y llama a la función checkWeather() con ese valor (la ciudad).*/
    checkWeather(inputBox.value); 
})



window.onload = () => { /*Esta funcion se ejecuta cuando la pagina ya cargo, lo que permite que pasar a la siguiente parte del codigo. debem ir juntas*/
    checkWeather('xalapa') /*esta parte del codigo hace que cuando la pagina cargue, automaticamente ejecute la funcion checkWeather para consultar el clima de xalapa*/
}