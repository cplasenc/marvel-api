/**
 * petición para conseguir un objeto específico
 * @param {*} tipo 
 * @param {*} detailId 
 */
const getDataDetail = async (tipo, detailId) => {
    const response = await fetch(`https://gateway.marvel.com:443/v1/public/${tipo}/${detailId}?apikey=${apiKey}`);
    if (response.status === 200) {
        return response.json();
    }
    else {
        throw new Error("Error al conectar con la API");
    }
}

const displayDetail = (tipo, detailId) => {
    let contentHTML = '';
    getDataDetail(tipo, detailId).then((datos) => {
        console.log(datos.data);
        let field = datos.data.results[0];
        content.innerHTML = '';
            console.log('global', global);
            contentHTML = `
            <div class=''>
                <h1 class='titulo'>${(global == 'characters') ? field.name : field.title}</h1>
                <img src='${field.thumbnail.path}.${field.thumbnail.extension}' />
                <span>${(field.description == null) ? '' : field.description}</span>
            </div>`;
        content.innerHTML = contentHTML;
    });
    displayMore.style.display = 'none';
};
