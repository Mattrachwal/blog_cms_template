"use strict";

module.exports = {
    dbs: {
        mongoDb: {
            main: "mongodb://localhost:32769/main"
        }
    },

    servers: {
        api: {
            port: 3000,
            host: 'localhost',
            type: 'api'
        }
    }
};