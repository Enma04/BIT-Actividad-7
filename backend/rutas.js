/*
 Este archivo lo único que hace es crear las api's que se van a consumir, con
 su respectiva dirección de la pgáina web para hacer las peticiones (dirección)
 y utiliza la información proveniente de "controladoresUsuarios.js"
 ESTE ARCHIVO PUEDE IR PERFECTAMENTE EN "app.js"
*/


/*
---------------------//---------------------------------//-------------- 
------------//--------------APIS DE TIPO (C.R.U.D)-----------//--------- 
---------------------//---------------------------------//--------------
*/


var usuariosRutas = require(__dirname + "/controladores/controladorUsuarios.js").controladorUsuariosExport

// Api CREATE
app.post("/Cliente/Guardar", function (peticion, respuesta) {
    usuariosRutas.Guardar(peticion, respuesta);
})

// Api READ
app.post("/Cliente/ListarUsuarios", function (peticion,respuesta) {
    usuariosRutas.ListarUsuarios(peticion, respuesta);
})

// Api UPDATE
app.post("/Cliente/Modificar", function (peticion, respuesta) {
    usuariosRutas.Modificar(peticion, respuesta);
})

// Api DELETE
app.post("/Cliente/Eliminar", function (peticion, respuesta) {
    usuariosRutas.Eliminar(peticion, respuesta);
})