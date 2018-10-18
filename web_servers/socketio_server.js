"use strict";

const Server = require('./server');
const SocketIO = require('socket.io');

class SocketioServer extends Server {
    constructor (config) {
        super(config);
    }

    async startServer() {

        try {

            const io = SocketIO.listen(this.server.listener);
            io.sockets.on('connection', (socket) => {

                socket.emit({msg: 'welcome'});
            });

            await this.server.start();
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = SocketioServer;
