/**
 * Created by MattRach on 9/18/18.
 */
const Dashboard_Routes = require('./dashboard_routes');
const Static_Routes = require('./static_routes');

module.exports = [].concat(Dashboard_Routes,Static_Routes);