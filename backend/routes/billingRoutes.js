const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

// Create a new invoice
router.post('/create', billingController.createInvoice);

// Get all invoices
router.get('/get', billingController.getInvoices);

module.exports = router;