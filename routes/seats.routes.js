const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seat.controller');

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getItem);

router.post('/seats', SeatController.postItem);

router.delete('/seats/:id', SeatController.deleteItem);

router.put('/seats/:id', SeatController.putItem);

module.exports = router;