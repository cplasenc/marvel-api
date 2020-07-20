/* PROMISES */
const getPersonajesPromise = () => new Promise((resolve, reject) => {

    let request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
        if (request.readyState == 4 && request.status == 200) {

            let datos = JSON.parse(e.target.responseText);
            let datosPersonajes = Object.values(datos.data.results);
            resolve(datosPersonajes);
        } else if (request.readyState == 4) {
            reject('Ha ocurrido un error');
        }
    }

    request.open("GET", "https://gateway.marvel.com:443/v1/public/characters?&apikey=" + apiKey, true);
    request.send();
});

var idPersonaje;

const displayPersonaje = () => {
    getPersonajesPromise().then((datosPersonajes) => {

        personajes.innerHTML = "";

        datosPersonajes.forEach(personaje => {

            let nombre = document.createElement("h2");
            let imagen = document.createElement("img");
            let enlace = document.createElement("a");

            nombre.innerHTML = personaje.name;
            imagen.src = personaje.thumbnail.path + '.' + personaje.thumbnail.extension;
            enlace.href = "#";

            personajes.appendChild(enlace);
            enlace.appendChild(nombre);
            personajes.appendChild(imagen);

            enlace.onclick = function () {
                console.log(personaje.id)
                idPersonaje = personaje.id;
                getDetallePersonaje(idPersonaje);
            }
        });

    }, (err) => {
        console.log(`Error: ${err}`);
    })
}

displayPersonaje();