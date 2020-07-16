/* DETALLE */
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
        show.innerHTML = '';
            console.log('global', global);
            contentHTML = `
            <div class=''>
                <h1 class='titulo'>${(global == 'characters') ? field.name : field.title}</h1>
                <img src='${field.thumbnail.path}.${field.thumbnail.extension}' />
                <span>${field.description}</span>
            </div>`;
        show.innerHTML = contentHTML;

    })
};
