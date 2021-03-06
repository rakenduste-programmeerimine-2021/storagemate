const router = require("express").Router()
const reservationController = require("../controllers/reservation")

router.get("/", reservationController.getReservations)
router.get("/byid", reservationController.getReservationById)
router.post("/bydate", reservationController.getReservationsByDate)
router.post("/byuser", reservationController.getReservationsByUser)
router.post("/create", reservationController.createReservation)
router.put("/update/:id", reservationController.updateReservation)
router.delete("/delete/:id", reservationController.deleteReservation)

module.exports = router
