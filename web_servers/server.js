"use strict";

const Hapi = require('hapi');


class Server {
    constructor (config) {
        this.config = config;
        this.server = Hapi.server({
            port: this.config.port,
            host: this.config.host,
        });
    }


}

module.exports = Server;