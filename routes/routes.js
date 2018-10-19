"use strict";

const Chat_Routes = require('./chat_routes');
const Dashboard_Routes = require('./dashboard_routes');
const Static_Routes = require('./static_routes');

module.exports = [].concat(Chat_Routes,Dashboard_Routes,Static_Routes);