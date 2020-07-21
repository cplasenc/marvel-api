const apiKey = config.YOUR_API;
var global = ''; //variable global para saber si consultar por personaje, comic, etc.
let limit = 20;
let offset = 0;
let content = document.querySelector('#content');
let searchBar = document.querySelector('#search-bar');
let displayMore = document.querySelector('#display-more');
let row = document.querySelector('.row');
let imgs = document.querySelector('#home').getElementsByTagName('img');
let divs = content.getElementsByTagName('div');
let miSpinner = `<img src="img/spinner.gif"/>`;

/**
 * Realiza la consulta principal a la api de marvel
 * @param {*} global - tipo de consulta (characters, comics, etc)
 * @param {*} limit - limite de objetos que devuelve la consulta
 * @param {*} offset - donde comienza la consulta
 */
const getData = async (global, limit, offset) => {
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/${global}?limit=${limit}&offset=${offset}&apikey=${apiKey}`);
    if (response.status === 200) {
        return response.json();
    }
    else {
        throw new Error("Error al conectar con la API");
    }
}

/**
 * Dibuja el resultado de la consulta
 * @param {*} global - tipo de consulta
 * @param {*} limit - limite de objetos que devuelve la consulta
 * @param {*} offset - donde comienza la consulta
 */
const display = (global, limit, offset) => {
    let contentHTML = '';
    
    getData(global, limit, offset).then((datos) => {
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
            content.innerHTML += contentHTML;

            //añade el evento click a los divs para realizar una consulta de detalle
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
    });
}

/**
 * Consigue el alt de las imagenes de portada
 * que se utilizara para realizar las consultas
 */
const getGlobal = () => new Promise((resolve, reject) => {
    Array.from(imgs).forEach(img => {
        img.addEventListener('click', e => {
            global = e.target.alt;
            resolve(global);
            display(global, limit, offset);
            row.innerHTML = miSpinner;
            displayMore.classList.toggle('hide');
        });
    });
});

/**
 * Aumenta el offset para simular una paginación
 */
getGlobal().then((result) => {
    displayMore.addEventListener('click', () => {
        offset += 20;
        //result = global
        display(result, limit, offset);
    });    
});

/*
muestra una imagen random en portada

let home1 = document.querySelector('#home1');
let home2 = document.querySelector('#home2');
const displayHome = () => new Promise((resolve, reject) => {
    let imagenes = [];
    //que estos numeros sean random
    //http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg
    let random = Math.floor(Math.random() * 1000);
    getData('characters', limit, random).then((datos) => {
        let miData = datos.data.results;
        miData.forEach(imagen => {
            imagenes.push(imagen.thumbnail.path + '.' + imagen.thumbnail.extension);
        });
        
        resolve(imagenes);
    });
});

displayHome().then((result) => {
    let random = Math.floor(Math.random() * 19);
    if(result[random] != 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        home1.src = result[random];
    }
    let random2 = Math.floor(Math.random() * 19);
    home2.src = result[random2];
})*/
