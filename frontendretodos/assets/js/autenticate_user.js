/*
    Codificar logica necesaria para interacturar con el backend o api de ws
*/

//acceder a las cajas de datos
const user_email = document.getElementById("user_email");
const user_password = document.getElementById("user_password");
const autenticate_button = document.getElementById("autenticate_button");
const emailHelp = document.getElementById("emailHelp");
const passwordHelp = document.getElementById("passwordHelp");
const mensajes = document.getElementById("mensajes");

//valores ingresados en las cajas de datos
let user_email_data = "";
let user_password_data = "";

//ubicar el cursor sobre el campo email del usuario
user_email.focus()

//definir oyente de eventos
autenticate_button.addEventListener("click", validar_datos)

//elementos invisibles
emailHelp.style.display="none"
passwordHelp.style.display="none"
mensajes.style.display="none"

//valida entrada de datos, que los datos sean correctos y contraseña y su  confirmación coincidadn
function validar_datos(e) {
    e.preventDefault();
    user_email_data = user_email.value;
    user_password_data = user_password.value;

    emailHelp.style.display="none" 
    passwordHelp.style.display="none"

    //validar si los datos son nulos
    if(!user_email_data || user_email_data.trim().length == 0 || validateEmail(user_email_data)==false){
        user_email.focus()
        emailHelp.style.display="block" 
    }
    else if(!user_password_data || user_password_data.trim().length == 0){
        user_password.focus()
        passwordHelp.style.display="block"      
    }else{
        //Invocar WS para autenticar un usuario
        autenticate_user();
    }
}

//funcion para valdiar un correo electronico
function validateEmail(email) {
    let filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!filter.test(email)) {
        return false;
    } else {
        return true;
    }
}

//invocar ws para autenticar usuarios
function autenticate_user() {
    let id_user;
    let name_user;
    let email_user;
    let mensaje_respuesta;
    let url = "http://localhost:8080/api/user/" + user_email_data + "/" + user_password_data; 

    
    axios.get(url)
      .then(function (response) {
        console.log(response.data); 

        id_user = response.data.id;
        name_user = response.data.name;
        email_user = response.data.email;

        //usuario no existe
        if (id_user == null){
            mensaje_respuesta = "No existe un usuario con " + email_user + " y la contraseña ingresada";
            mensajes.classList.remove("alert-primary");
            mensajes.classList.add("alert-danger");
            mensajes.innerHTML=mensaje_respuesta
            
        }else{
            mensaje_respuesta = "Usuario " + name_user + "/" + email_user + " autenticado correctamente";
            mensajes.classList.remove("alert-danger");
            mensajes.classList.add("alert-primary");
            mensajes.innerHTML=mensaje_respuesta
        }


        
        mensajes.style.display="block"
      })
      .catch(function (error) {
        // manejar error
        console.log(error);
        mensaje_respuesta = "cod: " + error.code + " msg: " + error.message + "...";
        mensajes.innerHTML=mensaje_respuesta
        mensajes.classList.remove("alert-primary");
        mensajes.classList.add("alert-danger");
        mensajes.style.display="block"
      })
}