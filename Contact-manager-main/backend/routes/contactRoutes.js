const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { ensureAuthenticated } = require('../middlewares/authMiddleware');

// Get all contacts
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Add a contact
router.post('/add', ensureAuthenticated, async (req, res) => {
    const { name, email, phone } = req.body;

    // Basic validation
    if (!name || !email || !phone) {
        return res.status(400).json({ msg: 'Please provide all required fields' });
    }

    try {
        const newContact = new Contact({
            user: req.user.id,
            name,
            email,
            phone
        });

        await newContact.save();
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Update a contact
router.put('/edit/:id', ensureAuthenticated, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        // Check if the contact belongs to the user
        if (contact.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        contact.name = req.body.name || contact.name;
        contact.email = req.body.email || contact.email;
        contact.phone = req.body.phone || contact.phone;

        await contact.save();
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

// Delete a contact
router.delete('/delete/:id', ensureAuthenticated, async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({ msg: 'Contact not found' });
        }

        // Check if the contact belongs to the user
        if (contact.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Not authorized' });
        }

        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
});

module.exports = router;
