"use strict";
const Authentication_Routes = require('./authentication_routes');
const Dashboard_Routes = require('./dashboard_routes');
const Static_Routes = require('./static_routes');
const User_Routes = require('./user_routes');

module.exports = [].concat(Authentication_Routes, Dashboard_Routes,Static_Routes, User_Routes);