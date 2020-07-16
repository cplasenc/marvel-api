const apiKey = config.YOUR_API;
//variable global para saber si consultar por personaje, comic, etc.
var global = '';
let show = document.querySelector('#show');
let searchBar = document.querySelector('#searchBar');
let imgs = document.querySelector('#main').getElementsByTagName('img');
let divs = document.querySelector('#show').getElementsByTagName('div');
let row = document.querySelector('.row');


/* PAGINACION */
//https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=0&apikey=


/* FETCH API */
const getData = async (tipo) => {
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/${tipo}?apikey=${apiKey}`);
    if (response.status === 200) {
        return response.json();
    }
    else {
        throw new Error("Error al conectar con la API");
    }
}

//consigue el alt de las imagenes de portada
Array.from(imgs).forEach(img => {
    img.addEventListener('click', e => {
        global = e.target.alt;
        display(global);
    });
});


const display = (global) => {

    let contentHTML = '';
    //Array.from(imgs).forEach(img => {
    //img.addEventListener('click', e => {
    getData(global).then((datos) => {
        row.innerHTML = '';
        let miData = datos.data.results;
        miData.forEach(field => {

            renderSearchBar();
            contentHTML = `
                            <div id='${field.id}' class='${global}'>
                                <img src='${field.thumbnail.path}.${field.thumbnail.extension}' />
                                <a href=''>
                                    <h2 class='titulo'>${(global == 'characters') ? field.name : field.title}</h2>
                                </a>
                            </div>`;
            show.innerHTML += contentHTML;

            Array.from(divs).forEach(element => {
                element.addEventListener('click', e => {
                    e.preventDefault();
                    console.log(e.currentTarget.className, e.currentTarget.id)
                    displayDetail(e.currentTarget.className, e.currentTarget.id);
                });
            });
        });

    }).catch((error) => {
        console.log(error);
    })

    //})
    //});
}