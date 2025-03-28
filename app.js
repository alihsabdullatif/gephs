const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Add body parser middleware
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// Set up routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services/services.html'));
});

app.get('/devices', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'devices/devices.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Update the routes for the new service pages
app.get('/services/service1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services/service1.html'));
});

app.get('/services/service2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'services/service2.html'));
});

// Handle form submission
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: 'hussam.ghanem@gephs.net', // The email where you want to receive messages
        subject: `New Contact Form Message from ${name}`,
        text: `
            Name: ${name}
            Email: ${email}
            Message: ${message}
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

// Other routes will be added here

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});