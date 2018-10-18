"use strict";

const SocketIO = require('socket.io');

class Service {

    constructor (app) {
        this.server = new SocketIO(app.server.listener, {
            path: '/test',
            serveClient: false,
            // below are engine.IO options
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false
        });
    }

}