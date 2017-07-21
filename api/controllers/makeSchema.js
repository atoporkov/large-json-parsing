'use strict';
exports.makeSchema = function(req, res) {

    res.setHeader('Content-Type', 'application/json');

    let isExist = (schemaJson, key) => {
        let result = false,
            schemaKeys = Object.keys(schemaJson);

        for(let i in schemaKeys){
            if(key == schemaKeys[i] || schemaKeys[i].indexOf(key) > -1){
                result = true;
                break;
            }
        }

        return result;
    }

    var setNewSchema = (eventJson, schemaJson) => {

        let keys = {},
            _schemaJson = schemaJson || {};

        for(let key in eventJson){

            if(!isExist(_schemaJson, key) || Object.keys(_schemaJson).length == 0){
                if(!(eventJson instanceof Array)) {
                    keys[key] = new Date().getTime();
                }
            }

            if (typeof eventJson[key] === "object" && eventJson[key] !== null) {
                let subKeys = setNewSchema(eventJson[key], _schemaJson);

                Object.keys(subKeys).map((subKey) => {
                    if(!(eventJson instanceof Array)){
                        subKeys[key + "." + subKey] = subKeys[subKey];
                        delete subKeys[subKey];
                    }
                });

                Object.assign(keys, subKeys);
            }
        }

        return keys;
    }

    let updateOldSchema = (newSchema, oldSchema) => {
        if(!oldSchema) return newSchema;

        Object.keys(oldSchema).map((key) => {
            newSchema[key] = oldSchema[key];
        })

        return newSchema;
    }

    res.json(
        updateOldSchema(
            setNewSchema(req.body.eventJson, req.body.schemaJson),
            req.body.schemaJson
        )
    );
};
