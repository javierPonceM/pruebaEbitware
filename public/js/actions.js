window.onload = () => {
    let pathPost = '/api/cliente/nuevo';
    let pathGet = '/api/cliente/todos';
    let pathPut = '/api/cliente/';
    let pathQuery1 = '/api/ventasBy/producto';
    let pathQuery2 = '/api/ventasBy/reporteCompleto';
    let pathQuery3 = '/api/ventasBy/piso';
    let pathQuery4 = '/api/ventasBy/cajero';
    let pathQuery5 = '/api/ventasBy/piso/inferiores';

    let formularioPost = document.getElementById('formPost');
    let nombrePost = document.getElementById('nombrePost');
    let apellidosPost = document.getElementById('apellidosPost');
    let nombreUsrPost = document.getElementById('nombreUsrPost');
    let emailPost = document.getElementById('emailPost');
    let contrasenhaaPost = document.getElementById('contrasenhaPost');
    let buttonGetAllClients = document.getElementById('recoverData');
    let tableClientes = document.getElementById('tableClientes');
    let buttonActualizarDatos = document.getElementById('updateInfoUser');
    let ventasPorProducto = document.getElementById('ventasPorProducto');
    let reporteCompletoVentas = document.getElementById('reporteCompletoVentas');
    let ventasPorPiso = document.getElementById('ventasPorPiso');
    let ventasTotalesPorCajero = document.getElementById('ventasTotalesPorCajero');
    let ventasPorPisoInferiorA5000 = document.getElementById('ventasPorPisoInferiorA5000');
    let divResponse1 = document.getElementById('response1');
    formularioPost.addEventListener('submit', (e) => {
        e.preventDefault();
        let dataUser = {
            Nombre: nombrePost.value,
            Apellidos: apellidosPost.value,
            Nombre_Usuario: nombreUsrPost.value,
            Correo_Electronico: emailPost.value,
            Contraseña: contrasenhaaPost.value
        };
        realizarPeticion(dataUser, pathPost, 'POST', (err, response) => {
            if (err) {
                alert('something wrong with post request!');
            } else {

                alert(`Clave: ${response[0].Cve_Mensaje} \n Mensaje: ${response[0].Mensaje}`);
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

    buttonActualizarDatos.addEventListener('click', (e) => {
        let noCliente = 59;
        let data = {
            Edad: 39,
            Estatura: 1.80,
            Peso: 60,
            GEB: 1500
        };
        realizarPeticion(data, `${pathPut}${noCliente}`, 'PUT', (err, response) => {
            if (err) {
                alert('something wrong with post request!');
            } else {
                alert(`Clave: ${response[0].Cve_Mensaje} \n Mensaje: ${response[0].Mensaje}`);
            }
        });
    });


    ventasPorProducto.addEventListener('click', (e) => {
        realizarPeticion({}, pathQuery1, 'GET', (err, response) => {
            if (err) {
                console.log(err);
                alert('something wrong with the server');
            } else {
                divResponse1.innerText = '';
                divResponse1.innerText = JSON.stringify(response);
            }
        });
    });
    reporteCompletoVentas.addEventListener('click', (e) => {
        realizarPeticion({}, pathQuery2, 'GET', (err, response) => {
            if (err) {
                console.log(err);
                alert('something wrong with the server');
            } else {
                divResponse1.innerText = '';
                divResponse1.innerText = JSON.stringify(response);
            }
        });
    });
    ventasPorPiso.addEventListener('click', (e) => {
        realizarPeticion({}, pathQuery3, 'GET', (err, response) => {
            if (err) {
                console.log(err);
                alert('something wrong with the server');
            } else {
                divResponse1.innerText = '';
                divResponse1.innerText = JSON.stringify(response);
            }
        });
    });
    ventasTotalesPorCajero.addEventListener('click', (e) => {
        realizarPeticion({}, pathQuery4, 'GET', (err, response) => {
            if (err) {
                console.log(err);
                alert('something wrong with the server');
            } else {
                divResponse1.innerText = '';
                divResponse1.innerText = JSON.stringify(response);
            }
        });
    });
    ventasPorPisoInferiorA5000.addEventListener('click', (e) => {
        realizarPeticion({}, pathQuery5, 'GET', (err, response) => {
            if (err) {
                console.log(err);
                alert('something wrong with the server');
            } else {
                divResponse1.innerText = '';
                divResponse1.innerText = JSON.stringify(response);
            }
        });
    });

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
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}