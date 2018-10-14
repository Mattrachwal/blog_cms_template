/**
 * Created by MattRach on 9/18/18.
 */
"use strict";

module.exports = [

    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return h.view('index',{title:"The Test Title"});
        }
    },

    {
        method: 'GET',
        path: '/test',
        handler: (request, h) => {

            return 'test route';
        }
    },

    {
        method: 'GET',
        path: '/loggedIn',
        options: {
            auth: 'simple'
        },
        handler: function (request, h) {

            return 'welcome';
        }
    }

];