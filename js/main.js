const apiKey = config.YOUR_API;
//let personajes = document.querySelector("#personajes");
let show = document.querySelector('#show');
let searchBar = document.querySelector('#searchBar');
const urlComicStartWith = "https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=";
const urlPersonajeStartWith = "https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=";
//let miSpinner = document.createElement("img");
let main = document.querySelector('#main').getElementsByTagName('img');
let divs = document.querySelector('#show').getElementsByTagName('div');
let row = document.querySelector('.row');
//miSpinner.src = "img/spinner.gif";


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

/* PAGINACION */
//https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=0&apikey=

const display = () => {
    let contentHTML = '';
    Array.from(main).forEach(element => {
        element.addEventListener('click', e => {
            getData(e.target.alt).then((datos) => {
                row.innerHTML = '';
                let miData = datos.data.results;
                miData.forEach(field => {

                    renderSearchBar();
                    contentHTML = `
                        <div id='${field.id}' class='${e.target.alt}'>
                            <img src='${field.thumbnail.path}.${field.thumbnail.extension}' />
                            <a href=''>
                                <h2 class='titulo'>${field.name}</h2>
                            </a>
                        </div>`;
                    show.innerHTML += contentHTML;

                    Array.from(divs).forEach(element => {
                        element.addEventListener('click', e => {
                            displayDetail(e.currentTarget.className, e.currentTarget.id);
                        })

                    })
                });

            }).catch((error) => {
                console.log(error);
            })
        })
    });
}

display();

/* DETALLE */
const getDataDetail = (tipo, detailId) => {
    return fetch(`https://gateway.marvel.com:443/v1/public/${tipo}/${detailId}?apikey=${apiKey}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error("Error al conectar con la API");
            }
        })
}

const displayDetail = (tipo, detailId) => {
    let contentHTML = '';
    getDataDetail(tipo, detailId).then((datos) => {
        console.log(datos.data);
        let field = datos.data.results[0];
        show.innerHTML = '';
        contentHTML = `
            <div class=''>
                <h1>${field.name}</h1>
                <img src='${field.thumbnail.path}.${field.thumbnail.extension}' />
                <span>${field.description}</span>
            </div>`;
        show.innerHTML = contentHTML;
    })
};

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

const renderSearchBar = () => {
    let contentHTML = `
        <div class="input-group input-group-lg pb-5 pt-2" id="miBusqueda">
        <div class="input-group-prepend">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="miBoton"
                data-toggle="dropdown">Buscar por</button>
            <div class="dropdown-menu">
                <a class="dropdown-item" onclick="busqueda()">Comic</a>
                <a class="dropdown-item" onclick="busqueda()">Personaje</a>
            </div>
        </div>
        <input type="text" class="form-control" placeholder="Busca en Marvel...">`
    searchBar.innerHTML = contentHTML;
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
                busquedaDOM(barraBuscar.value, urlComicStartWith, show);
            });

        } else if (buttonDropdown.innerHTML == "undefined") {
            console.log("error ?");
        }
    };
}