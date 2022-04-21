//exportaciones
require('colors')
require('./database/db')
const express = require('express')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require("cors")
const morgan = require("morgan")
const initSetupLib = require('./libs/initSetup')

const app = express()
initSetupLib.createRoles()


// Habilita CORS y Morgan
app.use(cors());
app.use(morgan("dev"));

app.use(fileUpload());

//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //url amistosa, captura los datos del formulario
//Parse de formato a application/json
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
    console.log('Server listening on port:', process.env.PORT.yellow);
});


//Routes
//-> Importando todas las rutas agrupadas
app.use('/api', require('./routes/index.routes'));

module.exports = app