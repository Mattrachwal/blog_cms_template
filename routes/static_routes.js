/**
 * Created by MattRach on 9/20/18.
 */
"use static";
const Path = require("path");

module.exports = [
    {
        method: 'GET',
        path: '/assets/{filename*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '../public'),
                redirectToSlash: true,
                index: true
            }
        }
    }
];