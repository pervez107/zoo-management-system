const Ticket = require('../models/Ticket');

// @desc    Book a new ticket
const bookTicket = async (req, res) => {
    const { visitorName, email, visitDate, adultCount, childCount } = req.body;
    const TICKET_PRICE = 20; 
    const totalAmount = adultCount * TICKET_PRICE;

    try {
        const ticketId = `T-${Date.now()}`;
        const ticket = await Ticket.create({
            visitorName, email, visitDate, adultCount, childCount, totalAmount, ticketId, paymentStatus: 'Pending'
        });
        res.status(201).json({ message: "Booking Initiated", bookingId: ticket._id, totalAmount });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Process Fake Payment
const processPayment = async (req, res) => {
    const { bookingId } = req.body;
    try {
        const ticket = await Ticket.findById(bookingId);
        if (ticket) {
            ticket.paymentStatus = 'Paid';
            await ticket.save();
            res.json({ message: "Payment Successful", ticketId: ticket.ticketId });
        } else {
            res.status(404).json({ message: "Ticket not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Ticket Details (Single Ticket)
const getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findOne({ ticketId: req.params.ticketId });
        if (ticket) res.json(ticket);
        else res.status(404).json({ message: "Ticket not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get All Tickets (For Admin Dashboard)
const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({}).sort({ createdAt: -1 });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Tickets by User Email (For My Tickets Dashboard)
const getUserTickets = async (req, res) => {
    try {
        // Find tickets matching the email, newest first
        const tickets = await Ticket.find({ email: req.params.email }).sort({ createdAt: -1 });
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { bookTicket, processPayment, getTicket, getAllTickets, getUserTickets };