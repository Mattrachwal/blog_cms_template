"use strict";

const app = require('../app');

module.exports = [

    {
        method: 'GET',
        path: '/sign-up',
        handler: (request, h) => {

            return h.view('sign-up',{title:"The Test Title"});
        }
    },

    {
        method: 'POST',
        path: '/sign-up',
        handler: async (request, h) => {
            console.log('Where in the post request==============');
            try {
                const res = await app.services.user.registerUser(request.payload);
                console.log("In the handler++++++++++");
                console.log(res);
                console.log("++++++++++++++++++++++++");
                return h.view('login');
            } catch (error) {
                console.log("we found an error", error);
                return h.view('sign-up', {errors: error});
            }

        }
    }

];
