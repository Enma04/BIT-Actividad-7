/*
 Este archivo se encarga de gestionar toda la información del
 usuario en una base de datos conectada al serviodor.
 Aquí únicamente se realizan las configuraciones,
 modificaciones y manipulaciones de los datos de usuario,
 que previamente hayan pasado por el filtro
 (controladorUsuarios.js)
 */

var usuariosModel = {}

var datos = [];

const mongoose = require("mongoose");

//Creamos nuestro propio esquema (molde) de mongo
const esquema = mongoose.Schema;

//Creamos una variables con el esquema creado
var esquemaUsuarios = new esquema({
    cedula: String,
    nombre: String,
    apellido: String,
    edad: Number,
    direccion: String,
    telefono: String,
    estadocivil: String
})

//Creamos el modelo (unión entre el nombre de la colección y el esquema de la colección)
const miModelo = mongoose.model('usuarios', esquemaUsuarios);

//Creamos una instancia del modelo
const instancia = new miModelo;

//LÓGICA DE LA API CREATE
usuariosModel.Guardar = function (data, callback) {

    //DATOS ALMACENADOS EN MEMORIA
     //ENVÍO DE DATOS
    /* datos.push({
        cedula       :data.cedula,
        nombre       :data.name,
        apellido     :data.apellido,
        edad         :data.edad,
        direccion    :data.direccion,
        telefono     :data.telefono,
        estadocivil  :data.estadocivil,
        })
        
        return callback({ state: true, mensaje: "Usuario guardado" });
    
    */

    //DATOS ALMACENADOS EN BASE DE DATOS

    instancia.cedula = data.cedula;
    instancia.nombre = data.name;
    instancia.apellido = data.apellido;
    instancia.edad = data.edad;
    instancia.direccion = data.direccion;
    instancia.telefono = data.telefono;
    instancia.estadocivil = data.estadocivil;

    instancia.save((error, correcto) => {
        if (error) {
            console.log(error);
            return callback({ state: false, mensaje: error });
        }
        else {
            console.log(correcto);
            return callback({ state: true, mensaje: correcto });
        }
    })

    
} //Fin api CREATE

//LÓGICA DE LA API READ
usuariosModel.ListarUsuarios = function (data, callback) {
    //find({criterio de búsqueda},{datos que se quieren ver o ocultar},{})
    miModelo.find({}, { _id: 0, __v: 0 }, (error, documentos) => {
        if (error) {
            console.log(error);
            return callback({ state: false, mensaje: error });
        }
        else {
            console.log(documentos);
            return callback({ state: true, mensaje: "Lista de usuarios", data:documentos });
        }
    });
    //return callback({ state: true, datos });
} //Fin api READ

//LÓGICA DE LA API UPDATE
usuariosModel.Modificar = function (data, callback) {
    
    //DATOS TRABAJADOS EN MEMORIA
    //Actualizacion de los datos
    /*let posicion = datos.findIndex((item) => item.cedula == data.cedula)
    
     if (posicion == -1) {
        return callback({ state: false, mensaje: "El usuario no existe" });
    }
    else {
        if (data.name != null && data.name != undefined && data.name != "" && data.name != " ") {
            datos[posicion].nombre = data.name;
        }
        if (data.apellido != null && data.apellido != undefined && data.apellido != "" && data.apellido != " ") {
            datos[posicion].apellido = data.apellido;
        }
        if (data.direccion != null && data.direccion != undefined && data.direccion != "" && data.direccion != " ") {
            datos[posicion].direccion = data.direccion;
        }
        if (data.telefono != null && data.telefono != undefined && data.telefono != "" && data.telefono != " ") {
            datos[posicion].telefono = data.telefono;
        }
        if (data.estadocivil != null && data.estadocivil != undefined && data.estadocivil != "" && data.estadocivil != " ") {
            datos[posicion].estadocivil = data.estadocivil;
        }
        
        datos[posicion].edad = data.edad;
        return callback({ state:true, mensaje:"Datos actualizados correctamente!", ubicacion: posicion });
    } */

    miModelo.find({ cedula: data.cedula }, {}, (error, documentos) => {  //Devuelve un array[] con los datos en la posicion 0
        if (error) {
            return callback({ state: false, mensaje: error });
        }
        else {
            if (documentos.length > 0) {
                //return callback({ state: false, mensaje: "Usuario encontrado" });

                miModelo.findOneAndUpdate({ cedula:documentos[0].cedula }, {
                // Para actualizar por _id es lo mismo pero se coloca así:
                // miModelo.findById(data.cedula, {

                    //Datos que se actualizan
                    nombre : data.name,
                    apellido : data.apellido,
                    edad : data.edad,
                    direccion : data.direccion,
                    telefono : data.telefono,
                    estadocivil: data.estadocivil,
                    
                }, (error, usuarioActualizado) => {

                    if (error) {
                        console.log(error);
                        return callback({ state: false, mensaje: error });
                    }
                    else {
                        console.log(usuarioActualizado);
                        return callback({ state: true, mensaje: "Usuario actualizado correctamente", data:usuarioActualizado });
                    }
                })  //Fin findOneAndUpdate
            } //Fin del if de length
            else {
                return callback({ state: false, mensaje: "cedula no encontrada" });
            }
        }
    })// Fin del find()
    
} //Fin api UPDATE

//LÓGICA DE LA API DELETE
usuariosModel.Eliminar = function (data, eliminacion) {

    /* let posicion = datos.findIndex((item) => item.cedula == data.cedula);

    if (posicion == -1) {
        return eliminacion({ state: false, mensaje: "El usuario no existe" });
    }
    else {

        let nombre = datos[posicion].nombre;
        let apellido = datos[posicion].apellido;

        //Actualizacion de los datos
        datos.splice(posicion, 1);

        return  eliminacion({state: true, mensaje: `El usuario ${nombre} ${apellido} fue eliminado`});
    } */
    
    miModelo.find({ cedula: data.cedula }, {}, (error, documentos) => {  //Devuelve un array[] con los datos en la posicion 0
        if (error) {
            return callback({ state: false, mensaje: error });
        }
        else {
            if (documentos.length > 0) {
                //return callback({ state: false, mensaje: "Usuario encontrado" });

                miModelo.findByIdAndDelete(documentos[0]._id, (error, usuarioEliminado) => {

                    if (error) {
                        console.log(error);
                        return eliminacion({ state: false, mensaje: error });
                    }
                    else {
                        console.log(usuarioEliminado);
                        return eliminacion({ state: true, mensaje: "Usuario eliminado correctamente", data:usuarioEliminado });
                    }
                })  //Fin findByIdAndDelete
            } //Fin del if de length
            else {
                return eliminacion({ state: false, mensaje: "cedula no encontrada" });
            }
        }
    })// Fin del find()

} //Fin api DELETE


//API READ DE 1 SOLO USUARIO
usuariosModel.ListarUsuario = function (data, callback) {
    //find({criterio de búsqueda},{datos que se quieren ver o ocultar},{})
    miModelo.find({ cedula: data.cedula }, { _id: 0, __v: 0 }, (error, documentos) => {
        if (error) {
            console.log(error);
            return callback({ state: false, mensaje: error });
        }
        else {
            console.log(documentos);
            return callback({ state: true, mensaje: "Datos de usuario", data:documentos });
        }
    });
    //return callback({ state: true, datos });
} //Fin api READ de 1 solo campo

//EXPORTAMOS LA VARIABLE QUE CONTIENE LA INFORMACIÓN
module.exports.modelUsuariosExport = usuariosModel;