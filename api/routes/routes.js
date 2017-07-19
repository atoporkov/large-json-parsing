'use strict';
module.exports = function(app) {
    let schemaMaker = require('../controllers/makeSchema.js');

    app.route('/makeSchema')
        .post(schemaMaker.makeSchema);
};
