const express = require('express');
const app = express();
const port = 3000;
const db = require('./firebase');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Basic route


// Example POST route
app.post('/api/data', (req, res) => {
    const data = req.body;
    db.collection('users').doc('test').set({
        name: 'John Doe',
        age: 30
    });
    res.json({ 
        message: 'Data received',
        data: data 
    });
});

const server = http.createServer(app);

const io = new Server(server, 
    {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
    }
);

io.on('connection', (socket) => {
    console.log('a user connected');

  socket.join('vocab');

  

    socket.on('disconnect', () => {
        console.log('a user disconnected');
    });
});


app.get('/', async (req, res) => {
    // const messageRef = db.collection("messages");

    // await messageRef.add({
    //     content: "Hello World!",
    //     timestamp: Date.now(),
    // });

    io.to('vocab').emit('vocab', 'give me a vocabulary');
    res.json({ app_version: '1.0.0' });
});

app.post('/vocab', async (req, res) => {
    const message = req.body.message;
    console.log(message, "message");
    res.end();
});


// Start server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});