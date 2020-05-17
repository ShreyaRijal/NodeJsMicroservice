//This class outlines the different get requests

const services = require('./services');

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send('Home page')
    });

    app.get('/games', (req, res) => {
        res.send(services.gamesData);
    });

    app.get('/games/report', (req, res) => {
        res.send(services.getReport());
    });

    app.get('/games/:id', (req, res) => {
        var id = req.params.id;
        res.send(services.getGame(id));
    });
}