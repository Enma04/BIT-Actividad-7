// Aplicación

/* En el backend existen las peticiones tipo:
    GET, POST, DELETE, PUT. Las más usadas son GET y POST ya que contienen la información
    necesaria para hacer todo tipo de peticiones
    Toda petición debe tener una respuesta por parte del servidor
    Las peticiones tipo GEt son las que se hacen desde la URL
*/

//CONFIGURACIONES NECESARIAS DE PARTE DEL SERVIDOR
var express = require('express');
global.app = express();  //Para que app quede global

var configuracion = require(__dirname + "/config.js").configExports;

app.listen(configuracion.puerto, function(){
    console.log('Servidor fuincionando por el puerto: ' + configuracion.puerto);
    }
)

console.log('Hola mundo desde node con nodemon');

//Configuración adicional para usar body-parse
var bodyParse = require('body-parser');
//const { request } = require('express')
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

//Configuración de la base de datos con node (mongoose)
const mongoose = require("mongoose");

//Configuraciónpara realizar las peticiones desde HTML
app.all("*", function (peticion, respuesta, next) {

    var listaBlanca = peticion.headers.origin;

    console.log(listaBlanca);
    respuesta.header("Access-Control-Allow-Origin", listaBlanca);
    respuesta.header("Access-Control-Allow-Credentials", "true");
    respuesta.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    respuesta.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

    next();
})


//Configuración para permitir o no el paso de usuarios a la información
var cors_VAR = require('cors');  //Cross origin resource sharing

app.use(cors_VAR({
    origin: function (origin, callback) {

        console.log(origin);

        if (!origin) return callback(null, true);

        if (configuracion.listaBlancaDominios.indexOf(origin) === -1) {
            return callback("Error de cors: usuario no autorizado!", false);
        }

        return callback(null,true);
    }
    
}))

//Conexión a mongo
mongoose.connect('mongodb://127.0.0.1:27017/' + configuracion.database, { useNewUrlParser: true, UseUnifiedTopology: true }, (error, response) => {
    if (error) {
        console.log(error);
    }
    else {
        console.log("conectado a la bse de datos");
    }
});

//Comando para utilizar el archivo que contiene las rutas de dirección
require(__dirname + "/rutas.js");
