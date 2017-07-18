'use strict';
module.exports = function(app) {
    let schemaMaker = require('../controllers/schemaMaker.js');

    app.route('/makeSchema')
        .get(schemaMaker.makeSchema)
        .post(schemaMaker.makeSchema);
};
