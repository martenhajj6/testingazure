const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from 'public' directory
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Simple Web App</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                .container { background: #f4f4f4; padding: 20px; border-radius: 8px; }
                button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
                button:hover { background: #0056b3; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Welcome to My Simple Web App! 🚀</h1>
                <p>This is a basic Node.js web application using Express.</p>
                
                <h2>Send a Message</h2>
                <form action="/message" method="POST">
                    <input type="text" name="message" placeholder="Enter your message" required>
                    <button type="submit">Send</button>
                </form>
                
                <h2>API Endpoints</h2>
                <ul>
                    <li><a href="/api/hello">/api/hello</a> - JSON greeting</li>
                    <li><a href="/api/time">/api/time</a> - Current server time</li>
                </ul>
            </div>
        </body>
        </html>
    `);
});

// API routes
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the server!', timestamp: new Date().toISOString() });
});

app.get('/api/time', (req, res) => {
    res.json({ currentTime: new Date().toLocaleString() });
});

// Handle form submission
app.post('/message', (req, res) => {
    const message = req.body.message;
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Message Received</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                .container { background: #e8f5e8; padding: 20px; border-radius: 8px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Message Received! ✅</h1>
                <p>Your message: <strong>"${message}"</strong></p>
                <p><a href="/">Go back home</a></p>
            </div>
        </body>
        </html>
    `);
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Press Ctrl+C to stop the server`);
});
