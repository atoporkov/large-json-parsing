'use strict';
module.exports = function(app) {
    let schemaMaker = require('../controllers/schemaMaker.js');

    app.route('/makeSchema').post(schemaMaker.makeSchema);
};
