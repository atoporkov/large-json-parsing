'use strict';
exports.makeSchema = function(req, res) {

    const streamArray = require('stream-json/utils/StreamArray'),
          {Writable} = require('stream'),
          path = require('path'),
          fileSystem = require('fs'),
          executionTime = process.hrtime(),
          dividerStr = '---------------------------------------------------------------';

    res.setHeader('Content-Type', 'application/json');

    let jsonStream = streamArray.make(),
        fileStream = fileSystem.createReadStream(path.join(__dirname, '../../spicy_data_sample.json')),
        schema = {};

    var getSchema = (object, counter) => {

        let $counter = 0 || counter;

        for (let key in object)
        {
            $counter = $counter + 1;

            if (typeof object[key] === "object" && object[key] !== null) {
                getSchema(object[key], $counter);
            }else{
                res.write(key+'\r\n');
                res.write('\r\n');
            }
        }

    }

    let processingStream = new Writable({
        write(object, encoding, callback) {
            setTimeout(() => {
                getSchema(object);
                callback()
            }, 1000);
        },
        objectMode: true
    });

    fileStream.pipe(jsonStream.input);
    jsonStream.output.pipe(processingStream);

    processingStream.on('finish', () => {
        res.write('\r\n'+dividerStr+'\r\n'+process.hrtime(executionTime)+' sec');
        res.end();
    });

};
