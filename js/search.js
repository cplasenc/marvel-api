const getDataSearch = async (inputText, tipo, startsWith) => {
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/${tipo}?${startsWith}=${inputText}&apikey=${apiKey}`);
    if (response.status === 200) {
        return response.json();
    }
    else {
        throw new Error("Error al conectar con la API");
    }
}

const displaySearch = (inputText, tipo, startsWith) => {
    let contentHTML = '';
    displayMore.style.display = 'none';
    getDataSearch(inputText, tipo, startsWith).then((datos) => {
        console.log(datos.data.results);
        let field = datos.data.results;
        content.innerHTML = '';
        field.forEach(element => {
            contentHTML = `
            <div id="${element.id}" class="${global}">
                <h2 class="titulo">${(global == 'characters') ? element.name : element.title}</h2>
                <img src='${element.thumbnail.path}.${element.thumbnail.extension}' />
            </div>`;
            content.innerHTML += contentHTML;

            //recorre divs para encontrar id y tipo de consulta (character, comic, etc)
            Array.from(divs).forEach(element => {
                element.addEventListener('click', e => {
                    e.preventDefault();
                    console.log(e.currentTarget.className, e.currentTarget.id)
                    displayDetail(e.currentTarget.className, e.currentTarget.id);
                });
            });
        });
    });
}

const search = () => {
    console.log("buscando por personaje");
    let barraBuscar = document.getElementById("miBusqueda").querySelector("input");
    barraBuscar.addEventListener("keyup", function () {
        console.log((barraBuscar.value).length);

        if ((barraBuscar.value).length === 0) {
            content.innerHTML = '';
            reset();
        } else {
            if (global == 'characters') {
                content.innerHTML = '';
                displaySearch(barraBuscar.value, global, 'nameStartsWith');
            } else if (global == 'comics') {
                content.innerHTML = '';
                displaySearch(barraBuscar.value, global, 'titleStartsWith');
            }
        }
    });
}

/**
 * barra de busqueda
 */
const renderSearchBar = () => {
    let contentHTML = `
        <div class="input-group input-group-lg pb-5 pt-2" id=miBusqueda>
        <input type="text" class="form-control" onclick="search()" placeholder="Busca en Marvel...">`
    searchBar.innerHTML = contentHTML;
}

/**
 * Reinicia la busqueda cuando se borra el input
 */
const reset = () => {
    let contentHTML = '';
    getData(global).then((datos) => {
        content.innerHTML = '';
        let miData = datos.data.results;
        miData.forEach(field => {
            contentHTML = `
                        <div id='${field.id}' class='characters'>
                            <img src='${field.thumbnail.path}.${field.thumbnail.extension}' />
                            <a href=''>
                                <h2 class='titulo'>${(global == 'characters') ? field.name : field.title}</h2>
                            </a>
                        </div>`;
            content.innerHTML += contentHTML;
            
            Array.from(divs).forEach(element => {
                element.addEventListener('click', e => {
                    e.preventDefault();
                    displayDetail(e.currentTarget.className, e.currentTarget.id);
                });
            });
        });
    }).catch((error) => {
        console.log(error);
    });
}