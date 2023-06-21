//La variable url se utiliza para indicar la  url en donde se encuentra el api (modulo/plantilla de oracle cloud)
//y asi poder gestionar peticiones a los manejadores
let url="http://localhost:8080/api/user/all"

//Acceder a un elemento html que se identifica por un id
let seccionNuevo = document.getElementById("nuevo")
let seccionEditar = document.getElementById("editar")
let seccionEliminar = document.getElementById("eliminar")
let seccionListar = document.getElementById("listar")
let tableBody = document.getElementById("tableBody")
let botonAplicarUsuarioNuevo =  document.getElementById("botonAplicarUsuarioNuevo")
let botonAplicarUsuarioEditar =  document.getElementById("botonAplicarUsuarioEditar")
let botonAplicarEliminarUsuario = document.getElementById("botonAplicarEliminarUsuario")
let bottonCancelarNuevo =  document.getElementById("bottonCancelarNuevo")
let bottonCancelarEditar = document.getElementById("bottonCancelarEditar")
let bottonCancelarEliminar = document.getElementById("bottonCancelarEliminar")

//registro de eventos
botonNuevoUsuario.addEventListener("click",nuevaUsuario)
botonAplicarUsuarioNuevo.addEventListener("click",aplicarNuevoUsuario)
botonAplicarUsuarioEditar.addEventListener("click",aplicarEditarUsuario)
botonAplicarEliminarUsuario.addEventListener("click",aplicarBorrarUsuario)
bottonCancelarNuevo.addEventListener("click",inicial)
bottonCancelarEditar.addEventListener("click",inicial)
bottonCancelarEliminar.addEventListener("click",inicial)

//almacena html de los registros a presentar en el listado de Usuarios <tr><td>....</td></td></tr>
let resultados = ""

//se ejecuta cuando inicia la aplicación para establecer el estado inicial de la pagina
inicial()

function inicial(){
    seccionNuevo.style.display="none"
    seccionEditar.style.display="none"
    seccionEliminar.style.display="none"
    listar()
}

function nuevaUsuario(){
    document.getElementById('nameUsuario').value=""
    document.getElementById('emailUsuario').value=""
    document.getElementById('passwordUsuario').value=""
    document.getElementById('edadUsuario').value=""
    seccionNuevo.style.display="block"    
    seccionListar.style.display="none"
    seccionEditar.style.display="none"
    seccionEliminar.style.display="none"
    document.getElementById("nameUsuario").focus()
}

function aplicarNuevoUsuario(){
    url="http://localhost:8080/api/Client/save"
    //leer informacion del Usuario editado o modificado
    let nameUsuario = document.getElementById('nameUsuario').value
    let emailUsuario = document.getElementById('emailUsuario').value
    let passwordUsuario = document.getElementById('passwordUsuario').value
    let edadUsuario = document.getElementById('edadUsuario').value
  
    axios.post(url, {
      name: nameUsuario,
      email:emailUsuario,
      password: passwordUsuario,
      age: edadUsuario
  })
    .then(function (response) {
      console.log(response.data);
      //actualizar tabla de datos
      inicial()      
    })
    .catch(function (error) {
      // manejar error
      console.log(error);
    })
}

function editarUsuario(idClient){
  seccionNuevo.style.display="none"
  seccionEditar.style.display="block"
  seccionEliminar.style.display="none" 
  seccionListar.style.display="none" 

  //invocar a ws que recupera la gama por id
  recuperarInformacionUsuario(idClient,'idEditUsuario','nameEditUsuario','emailEditUsuario','passwordEditUsuario','edadEditUsuario','countEditMsgUsuario','countEditRsvUsuario')
  document.getElementById('nameEditUsuario').focus()
}

function aplicarEditarUsuario(){
  let idEditUsuario = document.getElementById("idEditUsuario").value
  let nameEditUsuario = document.getElementById("nameEditUsuario").value
  let emailEditUsuario = document.getElementById("emailEditUsuario").value
  let passwordEditUsuario = document.getElementById("passwordEditUsuario").value
  let edadEditUsuario = document.getElementById("edadEditUsuario").value

  url="http://localhost:8080/api/Client/update"
 
  axios.put(url,{
    idClient:idEditUsuario,
    name: nameEditUsuario,
    email:emailEditUsuario,
    password:passwordEditUsuario,
    age:edadEditUsuario
  })
  .then(function (response) {
      console.log(response.data)
      inicial()
  }).catch(function (error){
      console.log(error)
  })    
}

function eliminarUsuario(idClient){
  seccionNuevo.style.display="none"
  seccionEditar.style.display="none"
  seccionEliminar.style.display="block" 
  seccionListar.style.display="none" 

  //invocar a ws que recupera la gama por id
  recuperarInformacionUsuario(idClient,'idDeleteUsuario','nameDeleteUsuario','emailDeleteUsuario','passwordDeleteUsuario','edadDeleteUsuario','countDelMsgUsuario','countDelRsvUsuario')
}

function aplicarBorrarUsuario(){
  let idDeleteUsuario = document.getElementById("idDeleteUsuario").value
  

  url="http://localhost:8080/api/Client"
  
  axios.delete(url + "/" + idDeleteUsuario)
  .then(function (response) {
      console.log(response.data)
      inicial()
  }).catch(function (error){
      console.log(error)
  })
}

function recuperarInformacionUsuario(idClient,idUsuario,nameUsuario,emailUsuario,passwordUsuario,edadUsuario,countMsg,countRsv){
  url="http://localhost:8080/api/Client"
  //peticion http de tipo get
  axios.get(url + "/" + idClient)
  .then(function (response) {
    let items = response.data

    document.getElementById(idUsuario).value = items.idClient
    document.getElementById(nameUsuario).value = items.name                                                   
    document.getElementById(emailUsuario).value = items.email
    document.getElementById(passwordUsuario).value = items.password
    document.getElementById(edadUsuario).value = items.age
    document.getElementById(countMsg).value = items.messages.length
    document.getElementById(countRsv).value = items.reservations.length

    let countMsgId = items.messages.length
    let countRsvId = items.reservations.length
        
    countMsgId = parseInt(countMsgId)
    countRsvId = parseInt(countRsvId)

    if ((countMsgId > 0 ) || (countRsvId > 0 )) botonAplicarEliminarUsuario.disabled = true
     else botonAplicarEliminarUsuario.disabled = false
  })
}

function listar(){
    let url = "http://localhost:8080/api/user/all"
    resultados=""
    axios.get(url)
    .then(function (response){
        let items = response.data

        for(let i in items){
            resultados +=  '<tr>' + 
                            '<td>' + items[i].id + ' </td>' + 
                            '<td>' + items[i].identification +'</td>' +
                            '<td>' + items[i].name +'</td>' +
                            '<td>' + items[i].email +'</td>' +
                            '<td>' + items[i].cellPhone +'</td>' +
                            '<td colspan="2">' +
                            '    <button class="btn btn-outline-primary" onclick="editarUsuario(' +  items[i].idClient + ')">Editar</button>' +
                            '    <button class="btn btn-outline-primary" onclick="eliminarUsuario(' +  items[i].idClient + ')">Eliminar</button>' +
                            '</td>' + 
                        '</tr>'
        }
        tableBody.innerHTML = resultados
        seccionListar.style.display="block"
        
    })
    .catch(function (error){
        console.log(error)
    })
}
