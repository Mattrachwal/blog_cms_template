"use strict";
const app = require('../app.js');

module.exports = [
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            app.services.user.getValidatedUser(request.payload.email, request.payload.password, (user) => {
                if (user) {
                    request.auth.session.set(user);
                    return h.view();
                } else {
                }
            });
        }

    },

    {
        method: 'GET',
        path: '/login',
        config: {
            handler: (request, h) => {
                console.log('in The REdirect login');
                return h.view('login');
            }
        }
    },


    {
        method: 'GET',
        path: '/logout',
        config: {
            handler: (request, h) => {
                request.auth.session.clear();
                return h.view('Logout Successful!');
            }
        }
    }
];