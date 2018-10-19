"use strict";

module.exports = [

    {
        method: 'GET',
        path: '/chat',
        handler: (request, h) => {

            return h.view('chat',{title:"Chat Test"});
        }
    }

];