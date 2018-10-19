"use strict";

const Server = require('./server');
const Path = require('path');
const Hoek = require('hoek');
const Handlebars = require('handlebars');
const Vision = require('vision');
const Inert = require('inert');
const Bcrypt = require('bcrypt');
const HapiAuthBasic = require('hapi-auth-basic');

const Routes = require('../routes/routes');

class APIServer extends Server {
    constructor (config) {
        super(config);
    }


    async startServer() {
        // var hash = Bcrypt.hashSync("sooyeon", 10);
        // console.log(hash);

        const validate = async (request, username, password) => {

            const user = users[username];
            if (!user) {
                return { credentials: null, isValid: false };
            }

            const isValid = await Bcrypt.compare(password, user.password);
            const credentials = { id: user.id, name: user.name };

            return { isValid, credentials };
        };

        const users = {
            matthew: {
                username: "matthew",
                password: "$2b$10$W4/2PbCJUk.h.8GKoiMm0OJIwNJ3aFl12Jtm0vBs4dgVQkuzI/Csy",
                name: "Matthew Rachwal",
                id: "123456"
            }
        };

        await this.server.register(Vision);
        await this.server.register(Inert);
        await this.server.register(HapiAuthBasic);

        await this.server.auth.strategy('simple', 'basic', { validate });

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
        await this.server.route(Routes);
        await this.server.start();
        console.log(`Server with type: ${this.config.type} running at: ${this.server.info.uri}`);

    }
}

module.exports = APIServer;
