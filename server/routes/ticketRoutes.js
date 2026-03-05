const express = require('express');
const router = express.Router();
const { bookTicket, processPayment, getTicket, getAllTickets, getUserTickets } = require('../contollers/ticketController');

router.post('/book', bookTicket);
router.post('/pay', processPayment);
router.get('/', getAllTickets); // Admin Route
router.get('/user/:email', getUserTickets); // NEW: User Dashboard Route
router.get('/:ticketId', getTicket); 

module.exports = router;