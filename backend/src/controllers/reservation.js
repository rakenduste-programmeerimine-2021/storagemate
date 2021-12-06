const Reservation = require('../models/Reservation')

exports.getReservations = async (req, res) => {
    const reservations = await Reservation.find({})

    res.status(200).send(reservations)
}

exports.getReservationsByDate = async (req, res) => {

    const { startdate, enddate } = req.body 
    const reservations = await Reservation.find(
        { $or: 
            [ {rentalstart: {$gte:startdate, $lte: enddate}},
              {rentalend: {$gte:startdate, $lte: enddate}},
              { $and: 
                [ {rentalstart: {$lte:startdate}},
                  {rentalend: {$gte: enddate}}
                ]} 
        ]})
    
    
    const resids =  reservations.map((singleitem) => {return (singleitem.storageid);} );


    res.status(200).send(resids)
}

exports.getReservationsByUser = async (req, res) => {

    const { email } = req.body 

    const reservationsByUser = await Reservation.find( {rentinguseremail: email });

    res.status(200).send(reservationsByUser)
}



exports.createReservation = async (req, res) => {
    const { 
        storageid, 
        rentalstart, 
        rentalend, 
        rentinguseremail, 
        totalprice,
        storageName,
        storageNumber,
        volume,
        floorspace,
        priceperday
    } = req.body  
    try{
        const newReservation = new Reservation({
            storageid,
            rentalstart,
            rentalend,
            rentinguseremail,
            totalprice,
            storageName,
            storageNumber,
            volume,
            floorspace,
            priceperday


        })

        const savedReservation = await newReservation.save()
        if (!savedReservation) throw Error("Error saving Reservation")

        res.status(200).send(`yay ${savedReservation._id}`)
    } catch (e){
        res.status(400).json({ error: e.message }) 
        alert(e.message)
    }
}
exports.updateReservation = async (req, res) => {

    const { id } = req.params;
    console.log(req.body);
    console.log(id);
    const reservation = await Reservation.findOneAndUpdate({ _id: id }, req.body)

    if (!reservation) res.status(404).send("No reservation with that id found")

    const updatedReservation = await Reservation.findOne({ _id: id })

    res.status(200).send(updatedReservation)
}



exports.deleteReservation = async (req, res) => {
    const { id } = req.params;

    const Reservation = await Reservation.findOneAndDelete({ _id: id })

    if (!reservation) res.status(404).send("No reservation with that id found")

    res.status(200).send(`Successfully deleted the following reservation: \n ${Reservation}`)
}   


exports.getReservationById = async (req, res) => {
    const {id} = req.params;
    const reservation = await Reservation.findOne({ _id: id })

    res.status(200).send(reservation)
}