window.onload = () => {
    let pathPost = '/api/cliente/nuevo';
    let pathGet = '/api/cliente/todos';
    let formularioPost = document.getElementById('formPost');
    let nombrePost = document.getElementById('nombrePost');
    let apellidosPost = document.getElementById('apellidosPost');
    let nombreUsrPost = document.getElementById('nombreUsrPost');
    let emailPost = document.getElementById('emailPost');
    let contrasenhaaPost = document.getElementById('contrasenhaPost');
    let buttonGetAllClients = document.getElementById('recoverData');
    let tableClientes = document.getElementById('tableClientes');

    formularioPost.addEventListener('submit', (e) => {
        e.preventDefault();
        let data = {
            Nombre: nombrePost.value,
            Apellidos: apellidosPost.value,
            Nombre_Usuario: nombreUsrPost.value,
            Correo_Electronico: emailPost.value,
            Contraseña: contrasenhaaPost.value
        };
        realizarPeticion(data, pathPost, 'POST', (err, response) => {
            if (err) {
                alert('something wrong with post request!');
            } else {

                alert(response[0].Cve_Mensaje);
                formularioPost.value = "";
                nombrePost.value = "";
                apellidosPost.value = "";
                nombreUsrPost.value = "";
                emailPost.value = "";
                contrasenhaaPost.value = "";
            }
        });
    });

    buttonGetAllClients.addEventListener('click', (e) => {
        realizarPeticion({}, pathGet, 'GET', (err, response) => {
            if (err) {
                alert('something wrong with GET request')
            } else {
                renderResults(response);
            }
        });
    });

    function renderResults(response) {

        response.forEach(client => {

            let tr = document.createElement('tr');
            let tdId = document.createElement('td');
            let tdNombre = document.createElement('td');
            let tdApellidos = document.createElement('td');
            let tdUser = document.createElement('td');
            let tdEdad = document.createElement('td');
            let tdEstatura = document.createElement('td');

            tdId.innerText = client.Cliente_ID;
            tdNombre.innerText = client.Nombre;
            tdApellidos.innerText = client.Apellidos;
            tdUser.innerText = client.Nombre_Usuario;
            tdEdad.innerText = client.Edad;
            tdEstatura.innerText = client.Estatura;
            tr.appendChild(tdId);
            tr.appendChild(tdNombre);
            tr.appendChild(tdApellidos);
            tr.appendChild(tdUser);
            tr.appendChild(tdEdad);
            tr.appendChild(tdEstatura);
            tableClientes.appendChild(tr);
        });
        tableClientes.style.visibility = 'visible';
    }

}

function realizarPeticion(data, path, metodo, callback) {
    let url = 'http://localhost:3000';
    let xhr = new XMLHttpRequest();
    let response;
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status == 200) {
                response = JSON.parse(xhr.responseText);
                console.log(response);
                callback(null, response);
            } else {
                callback(this.err, null);
            }
        }
    }
    xhr.open(metodo, url + path, true);
    xhr.send(JSON.stringify(data));
}