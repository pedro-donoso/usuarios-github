const baseUrl = 'https://api.github.com/users';
const request = async(url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}

const getUser = async(nombre) => {
    const url = `${baseUrl}/${nombre}`;
    return request(url);
}

const obtener = async(nombre, pagina, repositorio) => {
    const url = `${baseUrl}/${nombre}/repos?page=${pagina}&per_page=${repositorio}`;
    return request(url);

}


const capturaDatosDom = (nombre, pagina, repositorio) => {
    let resultados = document.getElementById("resultados");

    let index = "";
    Promise.all([getUser(nombre), obtener(nombre, pagina, repositorio)])
        .then(resp => {
            let usuario = resp[0],
                post = resp[1];
            if (usuario.message != "Not Found") {
                index += `
   <div class="col-4 seccion">
   <h6>Datos Usuario :</h6>
   <img src="${usuario.avatar_url}" alt="" width="100">
           <ul class="list-unstyled">
                    <li><strong>Usuario :</strong> ${usuario.name}</li>
                    <li><strong>Nickname :</strong> ${usuario.login}</li>
                    <li><strong>Repositorios :</strong> ${usuario.public_repos}</li>
                    <li><strong>Ubicación:</strong> ${usuario.location}</li>
                </ul>
            </div>
            <div class="col-8 repos text-right">
                <h6>Repositorios :</h6>
<ul class="list-unstyled">
            `;

                post.forEach(element => {
                    index += `
    <li><a href="${element.html_url}" target="_blank" rel="noopener noreferrer">${element.name}</a></li>
    `;
                    console.log(element);
                });

                resultados.innerHTML = index;
            } else {

                $('.modal').modal('show');
                console.log("errorrrr usuario no encontrado");
            }

        })

    .catch(err => console.log('err', err));


}

let nombre = document.getElementById("nombre"),
    pagina = document.getElementById("pagina"),
    repositorio = document.getElementById("repositorio"),
    boton = document.getElementById("boton");

boton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("el boton");
    capturaDatosDom(nombre.value, pagina.value, repositorio.value);
})