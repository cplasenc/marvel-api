const apiKey = config.YOUR_API;
var global = ''; //variable global para saber si consultar por personaje, comic, etc.
let content = document.querySelector('#content');
let searchBar = document.querySelector('#search-bar');
let displayMore = document.querySelector('#display-more');
let row = document.querySelector('.row');
let imgs = document.querySelector('#home').getElementsByTagName('img');
let divs = content.getElementsByTagName('div');
let home1 = document.querySelector('#home1');
let home2 = document.querySelector('#home2');
let limit = 20;
let offset = 0;
let miSpinner = `<img src="img/spinner.gif"/>`

//ELIMINAR LLAVES CUANDO SE PUEDA EN FOR EACH PARA SIMPLIFICAR

//COMENTAR EL CÓDIGO
//

const getData = async (tipo, limit, offset) => {
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/${tipo}?limit=${limit}&offset=${offset}&apikey=${apiKey}`);
    if (response.status === 200) {
        return response.json();
    }
    else {
        throw new Error("Error al conectar con la API");
    }
}

/*const displayHome = () => new Promise((resolve, reject) => {
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
            //para que cargue el botón
            //callback();

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

//consigue el alt de las imagenes de portada
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

getGlobal().then((result) => {
    displayMore.addEventListener('click', () => {
        offset += 20;
        //result = global
        display(result, limit, offset);
    });    
});

// const renderDisplayMore = () => {
//     let contentHTML = `<button id="display-more">Cargar más</button>`;
//     displayMore.innerHTML.contentHTML;
// }