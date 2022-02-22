const express = require('express');
const { redirect } = require('express/lib/response');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../db');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.filter((item) => item.id == req.params.id));
});

router.route('/seats').post((req, res) => {
  const newData = {
    id: uuidv4(),
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  if(db.seats.some(checkSeat => (checkSeat.day == req.body.day && checkSeat.seat == req.body.seat))) {
    return res.status(404).json({ message: "The seat has already been taken..."});
  } else {
    db.seats.push(newData);
    return res.json({ message: "Booking complete"});
  }
});

router.route('/seats/:id').delete((req, res) => {
  const deletedSeats = db.seats.findIndex((item) => item.id == req.params.id);
  db.seats.splice(deletedSeats, 1);
  return res.json({message: 'ok'});
});

router.route('/seats/:id').put((req, res) => {
  const editedSeats = db.seats.find((item) => item.id == req.params.id);
  const newSeats = {
    ...editedSeats,
    day: req.body.day,
    seat: req.body.seat,
    client: req.body.client,
    email: req.body.email,
  };
  db.seats[editedSeats] = newSeats;
  return res.json({message: 'ok'});
});

module.exports = router; 