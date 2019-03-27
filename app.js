var express = require('express');
var app = express();


var fileUpload = require('express-fileupload');
app.use(fileUpload());


var mongo = require('mongodb');

var swig = require('swig');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var gestorBD = require("./modules/gestorBD.js");
gestorBD.init(app,mongo);


app.use(express.static('public'));

// Variables
app.set('port', 8081);
app.set('db','mongodb://admin:sdi123456@tiendamusica-shard-00-00-ozuku.mongodb.net:27017,tiendamusica-shard-00-01-ozuku.mongodb.net:27017,tiendamusica-shard-00-02-ozuku.mongodb.net:27017/test?ssl=true&replicaSet=tiendamusica-shard-0&authSource=admin&retryWrites=true');



//Rutas/controladores por lógica
require("./routes/rusuarios.js")(app, swig, gestorBD); // (app, param1, param2, etc.)
require("./routes/rcanciones.js")(app, swig, gestorBD);

app.listen(app.get('port'), function() {
    console.log("Servidor activo");
});

app.post("/cancion", function(req, res) {
    res.send("Canción agregada:"+req.body.nombre +"<br>"
        +" genero :" +req.body.genero +"<br>"
        +" precio: "+req.body.precio);
});

app.get('/promo*', function (req, res) {
    res.send('Respuesta patrón promo* ');
});
