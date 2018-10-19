"use strict";

const Server = require('./server');
const SocketIO = require('socket.io');
const SocketIOService = require('../services/socketio_service.js');
const Inert = require('inert');
const Path = require('path');


class SocketioServer extends Server {
    constructor (config) {
        super(config);
    }

    async startServer() {

        await this.server.register(Inert);
        await this.server.route({
            method: 'GET',
            path: '/socket.io.js',
            handler: function (request, h) {

                return h.file(Path.join(__dirname, '../public/scripts/socket.io.js'));
            }
        },
        {
            method: 'GET',
            path: '/socket.io.js',
            handler: function (request, h) {

                return h.file(Path.join(__dirname, '../public/scripts/socket.io.js'));
            }
        }
        );


        try {

            const io = SocketIO.listen(this.server.listener, {
                path: '/chat-server',
                // below are engine.IO options
                pingInterval: 10000,
                pingTimeout: 5000,
                serveClient: false,
                origins: this.config.allowedOrigins
            });
            io.sockets.on('connection', (socket) => {

                socket.emit(SocketIOService.handleMessage(socket));
            });

            await this.server.start();
            console.log(`Server with type: ${this.config.type} running at: ${this.server.info.uri}`);

        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = SocketioServer;
