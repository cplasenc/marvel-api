const apiKey = config.YOUR_API;
let personajes = document.querySelector("#personajes");
let comics = document.querySelector("#comics");
let show = document.querySelector('#show');
const urlComicStartWith = "https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=";
const urlPersonajeStartWith = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=";
let miSpinner = document.createElement("img");
miSpinner.src = "img/spinner.gif";


/* FETCH API */
/* Abstracción de código */
const getData = (tipo) => {
    return fetch(`https://gateway.marvel.com:443/v1/public/${tipo}?apikey=${apiKey}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error("Error al conectar con la API");
            }
        })
}

let main = document.querySelector('#main').getElementsByTagName('img');
let row = document.querySelector('.row');
const display = () => {
    var idComic;
    Array.from(main).forEach(element => {
        element.addEventListener('click', e => {

            getData(e.target.alt).then((datos) => {
                let miData = datos.data.results;
        
                row.innerHTML = "";
        
                miData.forEach(comic => {
        
                    let titulo = document.createElement("h2");
                    let enlace = document.createElement("a");
                    let descripcion = document.createElement("div");
                    let imagen = document.createElement("img");
        
                    titulo.innerHTML = comic.name;
                    enlace.href = "#";
                    descripcion.className = "article";
                    descripcion.innerHTML = comic.description;
        
                    //$(".article").readmore(); //librería externa de jQuery
                    imagen.src = comic.thumbnail.path + "." + comic.thumbnail.extension;
        
                    show.appendChild(enlace);
                    enlace.appendChild(titulo);
                    show.appendChild(imagen);
                    show.appendChild(descripcion);
        
                    enlace.onclick = function () {
                        idComic = comic.id;
                        getDetalleComic(idComic);
                    }
                });
            }).catch((error) => {
                console.log(error);
            })
        })
    });
}

display();

/*
let main = document.querySelector('#main').getElementsByTagName('img');
Array.from(main).forEach(element => {
    element.addEventListener('click', e => {
        console.log(e.target.alt)
        getData(e.target.alt);
    })
});
*/

/* RE-HACER */
function getDetalleComic(detalleId) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        comics.appendChild(miSpinner);
        if (http.readyState == 4 && http.status == 200) {

            let datos = JSON.parse(this.responseText);
            let detalle = Object.values(datos.data.results);

            for (let i = 0; i < detalle.length; i++) {

                comics.innerHTML = "";

                let titulo = document.createElement("h1");
                let descripcion = document.createElement("div");
                let imagen = document.createElement("img");
                let botonVolver = document.createElement("button");

                titulo.innerHTML = detalle[i].title;
                if (titulo.innerHTML == "undefined") {
                    titulo.innerHTML = detalle[i].name;
                }
                descripcion.innerHTML = detalle[i].description;
                imagen.src = detalle[i].thumbnail.path + "." + detalle[i].thumbnail.extension;
                botonVolver.className = "btn btn-info";
                botonVolver.innerHTML = "Volver";

                comics.appendChild(titulo);
                comics.appendChild(imagen);
                comics.appendChild(descripcion);
                comics.appendChild(botonVolver);

                botonVolver.onclick = function () {
                    comics.innerHTML = "";
                    displayComics();
                }

            }
        }
    }
    http.open("GET", "https://gateway.marvel.com:443/v1/public/comics/" + detalleId + "?apikey=" + apiKey, true);
    http.send();
}

function getDetallePersonaje(detalleId) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        personajes.appendChild(miSpinner);
        if (http.readyState == 4 && http.status == 200) {

            let datos = JSON.parse(this.responseText);
            let detalle = Object.values(datos.data.results);

            for (let i = 0; i < detalle.length; i++) {

                personajes.innerHTML = "";

                let titulo = document.createElement("h1");
                let descripcion = document.createElement("div");
                let imagen = document.createElement("img");
                let botonVolver = document.createElement("button");

                titulo.innerHTML = detalle[i].name;
                descripcion.innerHTML = detalle[i].description;
                imagen.src = detalle[i].thumbnail.path + "." + detalle[i].thumbnail.extension;
                botonVolver.className = "btn btn-info";
                botonVolver.innerHTML = "Volver";

                personajes.appendChild(titulo);
                personajes.appendChild(imagen);
                personajes.appendChild(descripcion);
                personajes.appendChild(botonVolver);

                botonVolver.onclick = function () {
                    personajes.innerHTML = "";
                    displayPersonaje();
                }

            }
        }
    }
    http.open("GET", "https://gateway.marvel.com:443/v1/public/characters/" + detalleId + "?apikey=" + apiKey, true);
    http.send();
}


//leer más
function verMas() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

function busquedaDOM(textoIntroducido, url, elemento) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        elemento.appendChild(miSpinner);
        if (http.readyState == 4 && http.status == 200) {

            let datos = JSON.parse(this.responseText);
            let detalle = Object.values(datos.data.results);
            elemento.innerHTML = "";

            for (let i = 0; i < detalle.length; i++) {

                console.log(detalle[i].title);

                let nombre = document.createElement("h2");
                let imagen = document.createElement("img");
                let enlace = document.createElement("a");
                let descripcion = document.createElement("div");

                nombre.innerHTML = detalle[i].name;
                if (nombre.innerHTML == "undefined") {
                    nombre.innerHTML = detalle[i].title;
                }
                imagen.src = detalle[i].thumbnail.path + "." + detalle[i].thumbnail.extension;
                enlace.href = "#";
                descripcion.innerHTML = detalle[i].description;

                elemento.appendChild(enlace);
                enlace.appendChild(nombre);
                elemento.appendChild(imagen);
                elemento.appendChild(descripcion);

                if (detalle[i].name == "undefined") {
                    enlace.onclick = function () {
                        idComic = detalle[i].id;
                        getDetalleComic(idComic);
                    }
                } else {
                    enlace.onclick = function () {
                        idPersonaje = detalle[i].id;
                        getDetallePersonaje(idPersonaje);
                    }
                }
            }
        }
    }
    http.open("GET", url + textoIntroducido + "&apikey=" + apiKey, true);
    http.send();
}

function busqueda() {
    let dropdownMenu = document.querySelector(".dropdown-menu");
    let buttonDropdown = document.querySelector("#miBoton");
    dropdownMenu.onclick = function (event) {
        let target = event.target || event.srcElement;

        document.getElementById("miBoton").innerHTML = target.innerHTML;

        if (buttonDropdown.innerHTML == "Personaje") {
            console.log("buscando por personaje");
            let barraBuscar = document.getElementById("miBusqueda").querySelector("input");
            barraBuscar.addEventListener("keyup", function () {
                console.log(barraBuscar.value);
                busquedaDOM(barraBuscar.value, urlPersonajeStartWith, personajes);
            });

        } else if (buttonDropdown.innerHTML == "Comic") {
            console.log(buttonDropdown.innerHTML);
            let barraBuscar = document.getElementById("miBusqueda").querySelector("input");
            console.log("buscando por comic");
            barraBuscar.addEventListener("keyup", function () {
                console.log(barraBuscar.value);
                busquedaDOM(barraBuscar.value, urlComicStartWith, comics);
            });

        } else if (buttonDropdown.innerHTML == "undefined") {
            console.log("error ?");
        }
    };
}