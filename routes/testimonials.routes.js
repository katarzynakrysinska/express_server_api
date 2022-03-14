const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonial.controller');

router.get('/testimonials', TestimonialController.getAll);

router.get('/testimonials/:id', TestimonialController.getItem);

router.get('/testimonials/random', TestimonialController.getRandom);

router.post('/testimonials', TestimonialController.postItem);

router.put('/testimonials/:id', TestimonialController.putItem);

router.delete('/testimonials/:id', TestimonialController.deleteItem);

module.exports = router; 