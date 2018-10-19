"use strict";

const Service = require('./service');

class SocketIOService extends Service {

    constructor (app) {
        super (app);
    }

    handleMessage (socket) {
        return "test test";
    }



}

module.exports = SocketIOService;