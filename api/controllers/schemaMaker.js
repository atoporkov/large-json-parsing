'use strict';
exports.makeSchema = function(req, res) {

    const executionTime = process.hrtime();

    res.setHeader('Content-Type', 'application/json');

    let isExist = (schemaJson, key) => {
        let result = false;

        let schemaKeys = Object.keys(schemaJson);

        for(let i in schemaKeys){
            
        }

        return result;
    }

    var getSchema = (eventJson, schemaJson) => {

        let keys = {};

        for (let key in eventJson) {
            if(isExist(schemaJson, key) || Object.keys(schemaJson).length == 0)
                keys[key] = new Date().getTime();
            if (typeof eventJson[key] === "object" && eventJson[key] !== null) {
                let subKeys = getSchema(eventJson[key], schemaJson);
                Object.keys(subKeys).map((subKey) => {
                    subKeys[key + "." + subKey] = subKeys[subKey];
                    delete subKeys[subKey];
                });
                Object.assign(keys, subKeys);
            }
        }

        return keys;
    }

    res.json(getSchema(req.body.eventJson, req.body.schemaJson));
};
