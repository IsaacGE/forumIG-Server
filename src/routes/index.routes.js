//agrupando todas las rutas 
const express = require('express');
const app = express();

app.use('/users', require('./user.routes'))

app.use('/comments', require('./comments.routes'))

app.use('/privateChat', require('./privateMsg.routes'))

app.use('/auth', require('./auth.routes'))

app.use('/roles', require('./rol.routes'))

module.exports = app;