/*
 Este archivo se encarga de recolectar y verificar toda la información
 del usuario, antes de ser enviada a la base de datos conectada con
 el serviodor.
 Aquí únicamente se realizan las validaciones de ingreso correcto
 de los datos que serán tratados, y que previamente hayan sido enviados
 por el archivo (rutas.js)
 */

var usuariosController = {}

/*
En la ruta especificada anteponemos "/../" para salirnos de una carpeta e ingresar a otra del
mismo nivel de jerarquía, en este caso, la carpeta "controladores" para ingresar en la
carpeta "modelos"
*/
var modelUsuario = require(__dirname + "/../modelos/modelUsuarios.js").modelUsuariosExport

//Api Guardar
usuariosController.Guardar = function (peticion, respuesta) {
    
    //Guardamos los datos recolectados desde el body (desde la página web)
    //para realizar las respectivas verificaciones
    let data = {
        cedula       :peticion.body.cedula,
        name         :peticion.body.name,
        apellido     :peticion.body.apellido,
        edad         :peticion.body.edad,
        direccion    :peticion.body.direccion,
        telefono     :peticion.body.telefono,
        estadocivil  :peticion.body.estadocivil,
    }

    //VALIDACIONES DE LOS DATOS
    //CEDULA
    if (data.cedula == "" || data.cedula == null || data.cedula == undefined || data.cedula == " ") {
        respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false;
    }

    //NOMBRE
    if (data.name == "" || data.name == null || data.name == undefined || data.name == " ") {
        respuesta.json({ state: false, mensaje: "El campo name es obligatorio" })
        return false;
    }
    if (data.name.length < 4 || data.name.length > 20) {
        respuesta.json({ state: false, mensaje: "El campo name debe tener entre 4 y 20 caracteres" })
        return false;
    }

    //APELLIDO
    if (data.apellido == "" || data.apellido == null || data.apellido == undefined || data.apellido == " ") {
        respuesta.json({ state: false, mensaje: "El campo apellido es obligatorio" })
        return false;
    }
    if (data.apellido.length < 4 || data.apellido.length > 20) {
        respuesta.json({ state: false, mensaje: "El campo apellido debe tener entre 4 y 20 caracteres" })
        return false;
    }

    //EDAD
    if (data.edad == "" || data.edad == null || data.edad == undefined || data.edad == " ") {
        respuesta.json({ state: false, mensaje: "El campo edad es obligatorio" })
        return false;
    }

    modelUsuario.Guardar(data, function (res) {
        respuesta.json(res);
    });

} //Fin api Guardar

//Api ListarUsuarios
usuariosController.ListarUsuarios = function (peticion, respuesta) {
    modelUsuario.ListarUsuarios(null, function (res) {
        respuesta.json(res);
    })
    
} //Fin api Listar usuarios

//Api Modificar
usuariosController.Modificar = function (peticion, respuesta) {

    let data = {
        cedula       :peticion.body.cedula,
        name         :peticion.body.name,
        apellido     :peticion.body.apellido,
        edad         :peticion.body.edad,
        direccion    :peticion.body.direccion,
        telefono     :peticion.body.telefono,
        estadocivil  :peticion.body.estadocivil,
    }

    //VALIDACIONES
    //CEDULA
    if (data.cedula == "" || data.cedula == null || data.cedula == undefined || data.cedula == " ") {
        respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false;
    }

    //EDAD
    if (data.edad == "" || data.edad == null || data.edad == undefined || data.edad == " ") {
        respuesta.json({ state: false, mensaje: "El campo edad es obligatorio" })
        return false;
    }

    //Respuesta del servidor
    modelUsuario.Modificar(data, function (res) {
        respuesta.json(res);
    })

} //Fin api Modificar

//Api Eliminar
usuariosController.Eliminar = function (peticion, respuesta) {

    let data = {
        cedula: peticion.body.cedula,
    }

    //VALIDACIONES
    //CEDULA
    if (data.cedula == "" || data.cedula == null || data.cedula == undefined || data.cedula == " ") {
        respuesta.json({ state: false, mensaje: "El campo cedula es obligatorio" })
        return false;
    }

    //Respuesta del servidor
    modelUsuario.Eliminar(data, function (res){
        respuesta.json(res);
    })
    

} //Fin api Eiliminar

//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
module.exports.controladorUsuariosExport = usuariosController;