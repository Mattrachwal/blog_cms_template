"use strict";

const Server = require('./server');
const Path = require('path');
const Hoek = require('hoek');
const Handlebars = require('handlebars');
const Vision = require('vision');
const Inert = require('inert');
const Bcrypt = require('bcrypt');
const HapiAuthCookie = require('hapi-auth-cookie');
const Users = require('../admins.js');

class APIServer extends Server {
    constructor (config) {
        super(config);
    }


    async startServer() {
        // var hash = Bcrypt.hashSync("password", 10);
        // console.log(hash);
        try {
            await this.server.register(Vision);
            await this.server.register(Inert);
            await this.server.register(HapiAuthCookie);
            await this.server.auth.strategy('base', 'cookie', {
                password: 'ThisPasswordNeedsToBeChangedWhenInProduction', // cookie secret
                cookie: 'app-cookie', // Cookie name
                ttl: 24 * 60 * 60 * 1000 // Set session to 1 day
            });
            await this.server.views({
                engines: {
                    html: Handlebars
                },
                relativeTo: Path.join(__dirname, '../'),
                path: './views',
                helpersPath: './views/helpers',
                layoutPath: './views/layout',
                layout: 'default',
                partialsPath: './views/partials'
            });
            const Routes = require('../routes/routes.js');
            await this.server.route(Routes);
            await this.server.start();
            console.log(`Server with type: ${this.config.type} running at: ${this.server.info.uri}`);
        } catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
}

module.exports = APIServer;
