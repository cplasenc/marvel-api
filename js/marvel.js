const apiKey = "206d41bfd8394758727be2110432ff6b";
let personajes = document.querySelector("#personajes");
let comics = document.querySelector("#comics");
const urlComicStartWith = "https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=";
const urlPersonajeStartWith = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=";
let miSpinner = document.createElement("img");
miSpinner.src = "img/spinner.gif";

var idPersonaje;
function getPersonajes() {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        personajes.appendChild(miSpinner);
        if (http.readyState == 4 && http.status == 200) {

            let datos = JSON.parse(this.responseText);
            let datosPersonajes = Object.values(datos.data.results);

            personajes.innerHTML = "";

            for (let i = 0; i < 10; i++) {

                let nombre = document.createElement("h2");
                let imagen = document.createElement("img");
                let enlace = document.createElement("a");

                nombre.innerHTML = datosPersonajes[i].name;
                imagen.src = datosPersonajes[i].thumbnail.path + "." + datosPersonajes[i].thumbnail.extension;
                enlace.href = "#";

                personajes.appendChild(enlace);
                enlace.appendChild(nombre);
                personajes.appendChild(imagen);

                enlace.onclick = function () {
                    console.log(datosPersonajes[i].id)
                    idPersonaje = datosPersonajes[i].id;
                    getDetallePersonaje(idPersonaje);
                }

            }

            /*Object.values(datos).map(item => {
                console.log(item.results);
                
            });*/

        }
    }
    http.open("GET", "https://gateway.marvel.com:443/v1/public/characters?&apikey=" + apiKey, true);
    http.send();
}
getPersonajes();

var idComic;
function getComics() {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        comics.appendChild(miSpinner);
        if (http.readyState == 4 && http.status == 200) {

            let datos = JSON.parse(this.responseText);
            let datosComics = Object.values(datos.data.results);

            comics.innerHTML = "";

            for (let i = 0; i < 10; i++) {

                let titulo = document.createElement("h2");
                let enlace = document.createElement("a");
                let descripcion = document.createElement("div");
                let imagen = document.createElement("img");

                titulo.innerHTML = datosComics[i].title;
                enlace.href = "#";
                descripcion.className = "article";
                descripcion.innerHTML = datosComics[i].description;
                //librería externa de jQuery
                $(".article").readmore();
                imagen.src = datosComics[i].thumbnail.path + "." + datosComics[i].thumbnail.extension;

                comics.appendChild(enlace);
                enlace.appendChild(titulo);
                comics.appendChild(imagen);
                comics.appendChild(descripcion);

                enlace.onclick = function () {
                    idComic = datosComics[i].id;
                    getDetalleComic(idComic);
                }

            }
        }
    }
    http.open("GET", "https://gateway.marvel.com:443/v1/public/comics?apikey=" + apiKey, true);
    http.send();
}

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
                    getComics();
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
                    getPersonajes();
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

getComics();

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

/** PAGINACION */
$(function () {
    (function (name) {
        var container = $('#personajes-' + name);
        container.pagination({
            dataSource: 'https://api.flickr.com/services/feeds/photos_public.gne?tags=cat&tagmode=any&format=json&jsoncallback=?',
            locator: 'items',
            totalNumber: 120,
            pageSize: 20,
            ajax: {
                beforeSend: function () {
                    container.prev().html('Loading data from flickr.com ...');
                }
            },
            callback: function (response, pagination) {
                window.console && console.log(22, response, pagination);
                var dataHtml = '<ul>';

                $.each(response, function (index, item) {
                    dataHtml += '<li>' + item.title + '</li>';
                });

                dataHtml += '</ul>';

                container.prev().html(dataHtml);
            }
        })
    })('demo2');

})
