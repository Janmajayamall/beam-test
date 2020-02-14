const Scooter = require('../models/scooters.model');

exports.add = (req, res) => {
    if(!req.body.long || !req.body.lat) {
        res.status(400).send({
            message: "For adding a new scooter please provide its current location (i.e. long and lat)"
        });
        
    }

    const scooter = new Scooter({
        currentLocation:{
            coordinates:[req.body.long, req.body.lat]
        }});

    scooter.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error in adding a new scooter"
        });
    });
};

exports.allScooters = (req, res) => {
    Scooter.find()
    .then(scooters => {
        res.send(scooters);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error in retrieving all scooters"
        });
    });
};


exports.closestScooters = (req, res) =>{
    if(!req.body.long || !req.body.lat) {
        res.status(400).send({
            message: "For finding closest scooters please provide your current location (i.e. long and lat)"
        });
    }

    Scooter.find({
        currentLocation:{
            $near: {
                $geometry: {
                 type: "Point",
                 coordinates: [req.body.long, req.body.lat]
                }
            }
        }
    }).limit(req.body.max).then(scooters =>{
        res.send(scooters);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error in retrieving nearest scooters"
        });
    });
}