const Reservation = require('../models/Reservation')

exports.getReservations = async (req, res) => {
    const reservations = await Reservation.find({})

    res.status(200).send(reservations)
}

exports.getReservationsByDate = async (req, res) => {

    const { startdate, enddate } = req.body 

    const reservations = await Reservation.find( { $or: [ {rentalstart: {$gte:startdate, $lte: enddate}}, {rentalend: {$gte:startdate, $lte: enddate}}]})
    console.log(reservations);
    
    const resids =  reservations.map((singleitem) => {return (singleitem.storageid);} );

    console.log(resids);

    /* db.users.find({todos: {$elemMatch: {date: { $gte: start, $lt: end }}}}, {'todos':1}).pretty()
    db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )
    db.foo.find({a: { $not: {$elemMatch: {n: 1, r: 10 } } } }) */
    res.status(200).send(resids)
}

exports.getReservationByDate = async (req, res) => {

    const { startdate, enddate } = req.body 

    const reservations = await Reservation.find( { $or: [ {rentalstart: {$gte:startdate, $lte: enddate}}, {rentalend: {$gte:startdate, $lte: enddate}}]})

    /* db.users.find({todos: {$elemMatch: {date: { $gte: start, $lt: end }}}}, {'todos':1}).pretty()
    db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } )
    db.foo.find({a: { $not: {$elemMatch: {n: 1, r: 10 } } } }) */
    res.status(200).send(reservations)
}



exports.createReservation = async (req, res) => {
    // Saaksite info kätta req.body -st
    
    const { storageid, rentalstart, rentalend, rentinguseremail } = req.body  
    try{
        const newReservation = new Reservation({
            storageid,
            rentalstart,
            rentalend,
            rentinguseremail
        })

        const savedReservation = await newReservation.save()
        if (!savedReservation) throw Error("Error saving Reservation")

        res.status(200).send(`yay ${savedReservation._id}`)
    } catch (e){
        res.status(400).json({ error: e.message }) 
        alert(e.messasge)
    }
}
exports.updateReservation = async (req, res) => {

    const { id } = req.params;

    const reservation = await Reservation.findOneAndUpdate({ _id: id }, req.body)

    if (!reservation) res.status(404).send("No reservation with that id found")

    const updatedReservation = await Reservation.findOne({ _id: id })

    res.status(200).send(`Successfully updated the following Reservation: \n ${updatedReservation}`)
}



exports.deleteReservation = async (req, res) => {
    const { id } = req.params;

    const Reservation = await Reservation.findOneAndDelete({ _id: id })

    if (!reservation) res.status(404).send("No reservation with that id found")

    res.status(200).send(`Successfully deleted the following reservation: \n ${Reservation}`)
}   