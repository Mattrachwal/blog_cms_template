"use strict";

const app = require('./app');

app.servers.api.startServer();
app.servers.socket_io.startServer();