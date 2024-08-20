const Contact = require('../models/Contact');
const cloudStorageService = require('../services/cloudstorageservice');

exports.addContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const contact = new Contact({ name, email, phone, user: req.user.id });

        if (req.file) {
            const imageUrl = await cloudStorageService.uploadFile(req.file);
            contact.imageUrl = imageUrl;
        }

        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
