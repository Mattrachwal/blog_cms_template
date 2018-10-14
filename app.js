"use strict";
// ===============================
// == APPLICATION MANAGER
// ===============================

// require files for app
const config = require('./config');
const Server = require('./server');
//const Mongoose = require('mongoose');

// ===============================
// == SERVICES
// ===============================


// ====================================================================
// == Start app
const app = new Server(config);

// ====================================================================
// == Start Mongo connection
//Mongoose.connect(app.config.mongoDb.main);

// ====================================================================
// == Connect the database models to app
//app.db = require('./dbs/main');

// ====================================================================
// == Build services
app.services = {};


module.exports = app;