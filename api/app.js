const   express    = require('express'),
        argv       = require('yargs').argv,
        bodyParser = require('body-parser'),
        app        = express(),
        port       = function(){ return (argv.port !== undefined) ? argv.port : 1331;}(),
        routes     = require('./routes/routes');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

routes(app);

app.listen(port, () => {
    console.log('Api server is listening to port '+port);
});
app.use((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

