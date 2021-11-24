const { Schema, model } = require('mongoose')

const reservationSchema = new Schema({
    
    storageid: { type: String, required: true },  
    rentalstart: { type: Date },
    rentalend: {type: Date},
    rentinguseremail: {type: String }
});



// staatused: available, inUse, outOfOrder
const Reservation = model("Reservation", reservationSchema)

module.exports = Reservation