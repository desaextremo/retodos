//La variable url se utiliza para indicar la  url en donde se encuentra el api (modulo/plantilla de oracle cloud)
//y asi poder gestionar peticiones a los manejadores
let url="http://localhost:8080/api/user/all"

//Acceder a un elemento html que se identifica por un id
let seccionNuevo = document.getElementById("nuevo")
let seccionEditar = document.getElementById("editar")
let seccionEliminar = document.getElementById("eliminar")
let seccionListar = document.getElementById("listar")
let tableBody = document.getElementById("tableBody")
let botonAplicarGadgetNuevo =  document.getElementById("botonAplicarGadgetNuevo")
let botonAplicarGadgetEditar =  document.getElementById("botonAplicarGadgetEditar")
let botonAplicarEliminarGadget = document.getElementById("botonAplicarEliminarGadget")
let bottonCancelarNuevo =  document.getElementById("bottonCancelarNuevo")
let bottonCancelarEditar = document.getElementById("bottonCancelarEditar")
let bottonCancelarEliminar = document.getElementById("bottonCancelarEliminar")

//registro de eventos
botonNuevoGadget.addEventListener("click",nuevoGadget)
botonAplicarGadgetNuevo.addEventListener("click",aplicarNuevoGadget)
botonAplicarGadgetEditar.addEventListener("click",aplicarEditarGadget)
botonAplicarEliminarGadget.addEventListener("click",aplicarBorrarGadget)
bottonCancelarNuevo.addEventListener("click",inicial)
bottonCancelarEditar.addEventListener("click",inicial)
bottonCancelarEliminar.addEventListener("click",inicial)

//almacena html de los registros a presentar en el listado de Gadgets <tr><td>....</td></td></tr>
let resultados = ""

//se ejecuta cuando inicia la aplicación para establecer el estado inicial de la pagina
inicial()

function inicial(){
    seccionNuevo.style.display="none"
    seccionEditar.style.display="none"
    seccionEliminar.style.display="none"
    listar()
}

function nuevoGadget(){
    document.getElementById('nameGadget').value=""
    document.getElementById('emailGadget').value=""
    document.getElementById('passwordGadget').value=""
    document.getElementById('idGadget').value=""
    seccionNuevo.style.display="block"    
    seccionListar.style.display="none"
    seccionEditar.style.display="none"
    seccionEliminar.style.display="none"
    document.getElementById("idGadget").focus()
}

function aplicarNuevoGadget(){
    url="http://localhost:8080/api/user/new"
    //leer informacion del Gadget editado o modificado
   
    let idGadget = document.getElementById("idGadget").value
    let nroIdGadget = document.getElementById("nroIdGadget").value
    let nameGadget = document.getElementById("nameGadget").value
    let dirGadget = document.getElementById("dirGadget").value
    let celdirGadget = document.getElementById("celGadget").value
    let emailGadget = document.getElementById("emailGadget").value
    let passwordGadget = document.getElementById("passwordGadget").value
    let zonaGadget = document.getElementById("zonaGadget").value
    let tipoGadget = document.getElementById("tipoGadget").value

    
    axios.post(url, {
      id: 1,
      identification: idGadget,
      name: nroIdGadget,
      address: dirGadget,
      cellPhone: celdirGadget,
      email: emailGadget,
      password: passwordGadget,
      zone: zonaGadget,
      type: tipoGadget
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

function editarGadget(idUser){
  seccionNuevo.style.display="none"
  seccionEditar.style.display="block"
  seccionEliminar.style.display="none" 
  seccionListar.style.display="none" 

  //invocar a ws que recupera la gama por id
  recuperarInformacionGadget(idUser,'idEditGadget','nroEditIdGadget','nameEditGadget','dirEditGadget','celdirEditGadget','emailEditGadget','passwordEditGadget','zonaEditGadget','tipoEditGadget')
  document.getElementById('nroEditIdGadget').focus()
}

function aplicarEditarGadget(){
  let idEditGadget = document.getElementById("idEditGadget").value
  let nroEditIdGadget = document.getElementById("nroEditIdGadget").value
  let nameEditGadget = document.getElementById("nameEditGadget").value
  let dirEditGadget = document.getElementById("dirEditGadget").value
  let celdirEditGadget = document.getElementById("celdirEditGadget").value
  let emailEditGadget = document.getElementById("emailEditGadget").value
  let passwordEditGadget = document.getElementById("passwordEditGadget").value
  let zonaEditGadget = document.getElementById("zonaEditGadget").value
  let tipoEditGadget = document.getElementById("tipoEditGadget").value

  url="http://localhost:8080/api/user/update"
 
  axios.put(url,{
    id: idEditGadget,
    identification: nroEditIdGadget,
    name: nameEditGadget,
    address: dirEditGadget,
    cellPhone: celdirEditGadget,
    email: emailEditGadget,
    password: passwordEditGadget,
    zone: zonaEditGadget,
    type: tipoEditGadget
  })
  .then(function (response) {
      console.log(response.data)
      inicial()
  }).catch(function (error){
      console.log(error)
  })    
}

function eliminarGadget(idUser){
  seccionNuevo.style.display="none"
  seccionEditar.style.display="none"
  seccionEliminar.style.display="block" 
  seccionListar.style.display="none" 

  //invocar a ws que recupera la gama por id
  recuperarInformacionGadget(idUser,'idDeleteGadget','nroIdDeleteGadget','nameDeleteGadget','dirDeleteGadget','celDeleteGadget','emailDeleteGadget','passwordDeleteGadget','zonaDeleteGadget','tipoDeleteGadget')  
}

function aplicarBorrarGadget(){
  let idDeleteGadget = document.getElementById("idDeleteGadget").value
  

  url="http://localhost:8080/api/user"
  
  axios.delete(url + "/" + idDeleteGadget)
  .then(function (response) {
      console.log(response.data)
      inicial()
  }).catch(function (error){
      console.log(error)
  })
}

function recuperarInformacionGadget(idUser,idGadget,nroIdGadget,nameGadget,dirGadget,celdirGadget,emailGadget,passwordGadget,zonaGadget,tipoGadget){
  url="http://localhost:8080/api/user"
  //peticion http de tipo get
  axios.get(url + "/" + idUser)
  .then(function (response) {
    let items = response.data

    document.getElementById(idGadget).value = items.id
    document.getElementById(nroIdGadget).value = items.identification                                                   
    document.getElementById(nameGadget).value = items.name
    document.getElementById(dirGadget).value = items.address
    document.getElementById(celdirGadget).value = items.cellPhone
    document.getElementById(emailGadget).value = items.email
    document.getElementById(passwordGadget).value = items.password
    document.getElementById(zonaGadget).value = items.zone
    document.getElementById(tipoGadget).value = items.type
    
    botonAplicarEliminarGadget.disabled = false
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
                            '    <button class="btn btn-outline-primary" onclick="editarGadget(' +  items[i].id + ')">Editar</button>' +
                            '    <button class="btn btn-outline-primary" onclick="eliminarGadget(' +  items[i].id + ')">Eliminar</button>' +
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
