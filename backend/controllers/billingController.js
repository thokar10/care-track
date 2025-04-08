const Billing = require('../models/Billing');

// Create a new invoice
exports.createInvoice = async (req, res) => {
  const { residentId, invoiceNumber, amount, dueDate } = req.body;
  try {
    const invoice = new Billing({
      resident: residentId,
      invoiceNumber,
      amount,
      dueDate,
    });
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all invoices
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Billing.find().populate('resident');
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};