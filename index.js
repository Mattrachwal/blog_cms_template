/**
 * Created by MattRach on 9/17/18.
 */

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


const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

const users = {
    matthew: {
        username: "matthew",
        password: "$2b$10$W4/2PbCJUk.h.8GKoiMm0OJIwNJ3aFl12Jtm0vBs4dgVQkuzI/Csy",
        name: "Matthew Rachwal",
        id:  "123456"
    }
};

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

const init = async () => {

    await server.register(Vision);
    await server.register(Inert);

    await server.register(HapiAuthBasic);

    await server.auth.strategy('simple', 'basic', { validate });

    await server.views({
        engines: {
            html: Handlebars
        },
        relativeTo: __dirname,
        path: 'views',
        helpersPath: 'helpers'
    });
    await server.route(Routes);
    await server.start();

    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();