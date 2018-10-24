"use strict";
// ===============================
// == APPLICATION MANAGER
// ===============================

// require files for app
const config = require('./config');
const APIServer = require('./web_servers/api_server');
const Mongoose = require('mongoose');

// ===============================
// == SERVICES
// ===============================
const UserService = require('./services/user_service');





const app = {};
app.config = config;
// ====================================================================
// == Manage Servers
app.servers = {};
app.servers.api = new APIServer(app.config.servers.api);

// ====================================================================
// == Start Mongo connection
Mongoose.connect(app.config.dbs.mongoDb.main);

// ====================================================================
// == Connect the database models to app
app.db = require('./dbs/main');
// ====================================================================
// == Build services
app.services = {};
app.services.user = new UserService(app.db.User);

module.exports = app;