const idiomaActual = document.getElementById('idioma');
const listaIdiomas = document.getElementById('idiomas');
const idiomas = document.getElementsByClassName('opcion');
const boton = document.getElementById('btn-rotar');

//info
const humedad = document.getElementsByClassName('humidity');

idiomaActual.addEventListener('click',()=>{
    listaIdiomas.classList.toggle('toggle');
});

const opcionesArray = Array.from(idiomas);

opcionesArray.forEach((opcion)=>{
    opcion.addEventListener('click',()=>{
        const idioma = opcion.getElementsByTagName('span')[0].textContent.toLowerCase();
        console.log(idioma);
        establecerIdioma(idioma);
    });
})

function establecerIdioma(idioma) {
    idiomaActual.getElementsByTagName('img')[0].src = `Banderas/${idioma}.png`;
    
}

boton.addEventListener('click', () => {
    boton.classList.toggle('girado');
})

boton.addEventListener('click', () => {
    listaIdiomas.classList.toggle('aparece');
})

boton.addEventListener('click', () => {
    listaIdiomas.classList.toggle('desaparece');
})

