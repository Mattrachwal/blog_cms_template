'use strict';

const Hapi = require('hapi');
const Path = require('path');
const Hoek = require('hoek');
const Handlebars = require('handlebars');
const Vision = require('vision');
const Inert = require('inert');
const Bcrypt = require('bcrypt');
const HapiAuthBasic = require('hapi-auth-basic');

const Routes = require('./routes/routes');

class AppServer {

    constructor(config) {
        this.config = config;
        this.server = Hapi.server({
            port: this.config.port,
            host: this.config.host,
        });
    }

    /**
     * Add server types here in order to manage multiple Hapi servers. This was created in order to deal with Hapi v17
     * removing "server connections" so now this just manages servers instead of connections.
     * @returns {Promise.<void>}
     */
    async startServer() {
        let type = this.config.type;
        if (type === 'api') {
            this._initAPIServer();
                console.log(`Server with type: ${type} running at: ${this.server.info.uri}`);
        } else if (type === 'chat') {
            this._initChatServer();
                console.log(`Server with type: ${type} running at: ${this.server.info.uri}`);
        } else {
            console.log('Server with type: ' + type + ' is trying to initiate?');
        }


    }

    async _initAPIServer () {
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

    }

    async _initChatServer () {
        io.on('connection', function (socket) {

            socket.emit('Oh hii!');

            socket.on('burp', function () {
                socket.emit('Excuse you!');
            });
        });
    }

}


module.exports = AppServer;
