"use strict";
// ===============================
// == APPLICATION MANAGER
// ===============================

// require files for app
const config = require('./config');
const APIServer = require('./web_servers/api_server');
const SocketIOServer = require('./web_servers/socketio_server');
//const Mongoose = require('mongoose');

// ===============================
// == SERVICES
// ===============================

const app = {};
// ====================================================================
// == Manage Servers
app.servers = {};
app.servers.api = new APIServer(config.servers.api);
app.servers.socket_io = new SocketIOServer(config.servers.chat);

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