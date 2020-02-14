const mongoose = require('mongoose');

const ScooterSchema = mongoose.Schema({
    currentLocation:  {
        type: {
          type: String,
          default: 'Point',
          required: true
        },
        coordinates: {
          type: [Number],
          index:"2dsphere",
          required: true
        }
      }},{
        timestamps: true
    });

module.exports = mongoose.model('Scooter', ScooterSchema);