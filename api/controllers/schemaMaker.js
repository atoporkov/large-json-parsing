'use strict';
exports.makeSchema = function(req, res) {

    const StreamArray = require('stream-json/utils/StreamArray'),
          {Writable} = require('stream'),
          path = require('path'),
          multer = require('multer'),
          fs = require('fs');

    let jsonStream = StreamArray.make();
    let fileStream = fs.createReadStream(path.join(__dirname, '../../spicy_data_sample.json'));

    let processingStream = new Writable({
        write(object, encoding, callback) {
            setTimeout(() => { console.log(object); callback()}, 1000);
        },
        objectMode: true
    });

    fileStream.pipe(jsonStream.input);
    jsonStream.output.pipe(processingStream);

    processingStream.on('finish', () => console.log('Parsed'));
};
