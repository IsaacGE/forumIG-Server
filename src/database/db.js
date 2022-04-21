const mongoose = require("mongoose");
require('../config/config')

mongoose.connect(process.env.URLDB, {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, resp) => {
        if (err) throw err;
        console.log('DataBase Connection:', process.env.URLDB.green);
    });

module.exports = mongoose;