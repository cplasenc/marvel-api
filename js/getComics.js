/* FETCH API */
/*const getComicsFetch = () => {
    return fetch(`https://gateway.marvel.com:443/v1/public/comics?apikey=${apiKey}`)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                throw new Error("Error al conectar con la API");
            }
        })
}

const displayComics = () => {
    var idComic;
    getComicsFetch().then((datos) => {
        let datosComics = datos.data.results;

        comics.innerHTML = "";

        datosComics.forEach(comic => {

            let titulo = document.createElement("h2");
            let enlace = document.createElement("a");
            let descripcion = document.createElement("div");
            let imagen = document.createElement("img");

            titulo.innerHTML = comic.title;
            enlace.href = "#";
            descripcion.className = "article";
            descripcion.innerHTML = comic.description;

            $(".article").readmore(); //librería externa de jQuery
            imagen.src = comic.thumbnail.path + "." + comic.thumbnail.extension;

            comics.appendChild(enlace);
            enlace.appendChild(titulo);
            comics.appendChild(imagen);
            comics.appendChild(descripcion);

            enlace.onclick = function () {
                idComic = comic.id;
                getDetalleComic(idComic);
            }
        });
    }).catch((error) => {
        console.log(error);
    })
}

displayComics();*/