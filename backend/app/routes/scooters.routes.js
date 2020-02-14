module.exports = (app) => {
    const scooters = require('../controllers/scooters.controller');

    app.post('/addScooter', scooters.add);

    app.get('/allScooters', scooters.allScooters);

    app.post('/closestScooters', scooters.closestScooters);
}