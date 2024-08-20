const nodemailer = require('nodemailer');
const config = require('../config/keys');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: config.emailUser,
        pass: config.emailPass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const sendEmail = async (to, subject, htmlContent) => {
    try {
        const mailOptions = {
            from: `"Your App Name" <${config.emailUser}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            html: htmlContent, // html body
        };

        const info = await transporter.sendMail(mailOptions);

        console.log(`Email sent: ${info.response}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
    