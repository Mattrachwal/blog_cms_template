"use strict";

module.exports = {
    mongoDb:{
        main: "mongodb://192.168.99.100:32768/main"
    },

    servers:{
        api: {
            port: 3000,
            host: 'localhost',
            type: 'api'
        },
        chat: {
            port: 3001,
            host: 'localhost',
            type: 'chat',
            allowedOrigins: "*:*"

            // allowedOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"]
        }
    }
};