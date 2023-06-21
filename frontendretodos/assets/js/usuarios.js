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
botonNuevoUsuario.addEventListener("click",nuevoUsuario)
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

function nuevoUsuario(){
    document.getElementById('nameUsuario').value=""
    document.getElementById('emailUsuario').value=""
    document.getElementById('passwordUsuario').value=""
    document.getElementById('idUsuario').value=""
    seccionNuevo.style.display="block"    
    seccionListar.style.display="none"
    seccionEditar.style.display="none"
    seccionEliminar.style.display="none"
    document.getElementById("idUsuario").focus()
}

function aplicarNuevoUsuario(){
    url="http://localhost:8080/api/user/new"
    //leer informacion del Usuario editado o modificado
   
    let idUsuario = document.getElementById("idUsuario").value
    let nroIdUsuario = document.getElementById("nroIdUsuario").value
    let nameUsuario = document.getElementById("nameUsuario").value
    let dirUsuario = document.getElementById("dirUsuario").value
    let celdirUsuario = document.getElementById("celUsuario").value
    let emailUsuario = document.getElementById("emailUsuario").value
    let passwordUsuario = document.getElementById("passwordUsuario").value
    let zonaUsuario = document.getElementById("zonaUsuario").value
    let tipoUsuario = document.getElementById("tipoUsuario").value

    
    axios.post(url, {
      id: 1,
      identification: idUsuario,
      name: nroIdUsuario,
      address: dirUsuario,
      cellPhone: celdirUsuario,
      email: emailUsuario,
      password: passwordUsuario,
      zone: zonaUsuario,
      type: tipoUsuario
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

function editarUsuario(idUser){
  seccionNuevo.style.display="none"
  seccionEditar.style.display="block"
  seccionEliminar.style.display="none" 
  seccionListar.style.display="none" 

  //invocar a ws que recupera la gama por id
  recuperarInformacionUsuario(idUser,'idEditUsuario','nroEditIdUsuario','nameEditUsuario','dirEditUsuario','celdirEditUsuario','emailEditUsuario','passwordEditUsuario','zonaEditUsuario','tipoEditUsuario')
  document.getElementById('nroEditIdUsuario').focus()
}

function aplicarEditarUsuario(){
  let idEditUsuario = document.getElementById("idEditUsuario").value
  let nroEditIdUsuario = document.getElementById("nroEditIdUsuario").value
  let nameEditUsuario = document.getElementById("nameEditUsuario").value
  let dirEditUsuario = document.getElementById("dirEditUsuario").value
  let celdirEditUsuario = document.getElementById("celdirEditUsuario").value
  let emailEditUsuario = document.getElementById("emailEditUsuario").value
  let passwordEditUsuario = document.getElementById("passwordEditUsuario").value
  let zonaEditUsuario = document.getElementById("zonaEditUsuario").value
  let tipoEditUsuario = document.getElementById("tipoEditUsuario").value

  url="http://localhost:8080/api/user/update"
 
  axios.put(url,{
    id: idEditUsuario,
    identification: nroEditIdUsuario,
    name: nameEditUsuario,
    address: dirEditUsuario,
    cellPhone: celdirEditUsuario,
    email: emailEditUsuario,
    password: passwordEditUsuario,
    zone: zonaEditUsuario,
    type: tipoEditUsuario
  })
  .then(function (response) {
      console.log(response.data)
      inicial()
  }).catch(function (error){
      console.log(error)
  })    
}

function eliminarUsuario(idUser){
  seccionNuevo.style.display="none"
  seccionEditar.style.display="none"
  seccionEliminar.style.display="block" 
  seccionListar.style.display="none" 

  //invocar a ws que recupera la gama por id
  recuperarInformacionUsuario(idUser,'idDeleteUsuario','nroIdDeleteUsuario','nameDeleteUsuario','dirDeleteUsuario','celDeleteUsuario','emailDeleteUsuario','passwordDeleteUsuario','zonaDeleteUsuario','tipoDeleteUsuario')  
}

function aplicarBorrarUsuario(){
  let idDeleteUsuario = document.getElementById("idDeleteUsuario").value
  

  url="http://localhost:8080/api/user"
  
  axios.delete(url + "/" + idDeleteUsuario)
  .then(function (response) {
      console.log(response.data)
      inicial()
  }).catch(function (error){
      console.log(error)
  })
}

function recuperarInformacionUsuario(idUser,idUsuario,nroIdUsuario,nameUsuario,dirUsuario,celdirUsuario,emailUsuario,passwordUsuario,zonaUsuario,tipoUsuario){
  url="http://localhost:8080/api/user"
  //peticion http de tipo get
  axios.get(url + "/" + idUser)
  .then(function (response) {
    let items = response.data

    document.getElementById(idUsuario).value = items.id
    document.getElementById(nroIdUsuario).value = items.identification                                                   
    document.getElementById(nameUsuario).value = items.name
    document.getElementById(dirUsuario).value = items.address
    document.getElementById(celdirUsuario).value = items.cellPhone
    document.getElementById(emailUsuario).value = items.email
    document.getElementById(passwordUsuario).value = items.password
    document.getElementById(zonaUsuario).value = items.zone
    document.getElementById(tipoUsuario).value = items.type
    
    botonAplicarEliminarUsuario.disabled = false
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
                            '    <button class="btn btn-outline-primary" onclick="editarUsuario(' +  items[i].id + ')">Editar</button>' +
                            '    <button class="btn btn-outline-primary" onclick="eliminarUsuario(' +  items[i].id + ')">Eliminar</button>' +
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
