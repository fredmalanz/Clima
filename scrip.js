const inputBox = document.querySelector('.search-bar input'); /*Busca en el HTML un elemento <input> que esté dentro de un elemento con clase .search-bar y lo guarda en inputBox.*/
const searchBtn = document.querySelector('.search-bar button'); /*Busca en el HTML el elemento <button> dentro del elemento .search-bar y lo guarda en el JS searchBtn.*/
const weatherIcon = document.querySelector('.weather-icon'); /*Selecciona el elemento con la clase .weather-icon <img> y lo guarda en weatherIcon.*/
const weather = document.querySelector('.weather'); /*Selecciona el contenedor de información del clima (.weather) y lo guarda en weather.*/
const erromsg = document.querySelector('.error'); /*Selecciona el elemento que muestra mensajes de error (.error) y lo guarda en erromsg*/
const enter = document.querySelector('.busqueda');
const bodycont = document.querySelector("body");
const weatherh1 = document.querySelector('.weather h1');
const weatherh2 = document.querySelector('.weather h2');
const col1 = document.querySelector('.col');
const coli1 = document.querySelector('.coli');
const selectaut = document.querySelector('.displayLatLon');

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

    const weatherIcons = { /*Define un objeto con diferentes tipos de clima y su respectivo ícono (una imagen en URL). esto solo define que tipo de clima pondra una imagen*/
        Clear: 'https://cdn-icons-png.flaticon.com/512/1838/1838873.png',
        Clouds: 'https://cdn-icons-png.flaticon.com/512/11166/11166805.png',
        Snow: 'https://cdn-icons-png.flaticon.com/512/3104/3104595.png',
        Rain: 'https://cdn-icons-png.flaticon.com/512/460/460268.png'
    }

    weatherIcon.src = weatherIcons[data.weather[0].main] || 'https://cdn-icons-png.flaticon.com/512/4514/4514767.png'; /*Cambia la imagen del ícono del clima según el tipo de clima que devuelve la API. }
    compara que la clase weather-icon del html, al obtener el dato main de weather 0: (se ve desde consola) tenga alguno de los climas que estan en const weatherIcons = { 
    tal cual estan escritos en el main. Y si no se encuentra el nombre de clima o es diferente a como dice const weatherIcons = { muestra una imagen genérica.*/

    weather.style.display = 'block'; /*Muestra en pantalla la sección .weather (por si estaba oculta).*/
}

function cambiarFondoPorHora() { /*Esta es una funcion que cambia el fondo de dependiendo de la hora ya sea dia, tarde o noche*/
    const hora = new Date().getHours();
    document.body.style.backgroundSize = "absolute"
        
    if (hora >= 6 && hora <= 16) { /*declaramos que si la variable hora es mayor o igual que 6 y menor que 16. pondra la imagen del dia*/
        bodycont.style.backgroundImage = "url('https://images.alphacoders.com/736/thumb-1920-736053.png')";
        weatherh1.style.color = "rgba(101, 106, 109, 1)"
        weatherh2.style.color = "rgba(101, 106, 109, 1)"
        col1.style.color = "rgba(101, 106, 109, 1)"
        coli1.style.color = "rgba(101, 106, 109, 1)"
    } else if (hora >= 17 && hora < 19) { 
        bodycont.style.backgroundImage = "url('https://images8.alphacoders.com/736/thumb-1920-736059.png')";
        weatherh1.style.color = "rgb(255, 255, 255)"
        weatherh2.style.color = "rgb(255, 255, 255)"
        col1.style.color = "rgb(255, 255, 255)"
        coli1.style.color = "rgb(255, 255, 255)"
    } else {
        bodycont.style.backgroundImage = "url('https://images8.alphacoders.com/736/thumb-1920-736059.png')";
    }
}

searchBtn.addEventListener('click', () => { /*Cuando el usuario hace clic en el botón de búsqueda, toma el valor del <input> y llama a la función checkWeather() con ese valor (la ciudad).*/
    checkWeather(inputBox.value); 
})

inputBox.addEventListener("keypress", (e) => { /*Creamos la funcion de Enter para buscar*/
    if(e.key === "Enter"){
        checkWeather(inputBox.value);
    }
})

window.onload = () => { /*Esta funcion se ejecuta cuando la pagina ya cargo, lo que permite que pasar a la siguiente parte del codigo. debem ir juntas*/
    checkWeather('xalapa') /*esta parte del codigo hace que cuando la pagina cargue, automaticamente ejecute la funcion checkWeather para consultar el clima de xalapa*/
    cambiarFondoPorHora();
}

