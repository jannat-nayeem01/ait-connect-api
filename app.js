const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const { requireAuth } = require('./middleware/authMiddleware');
const informationRoutes = require('./routes/informationRoutes')

const db = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use(authRoutes);
//app.use('/groups', requireAuth);
app.use('/', groupRoutes);
//app.use('/', informationRoutes);


// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.get('/', (req, res) => {
    res.send('Hello, From Backend!');
});

app.get('/favicon.ico', (req, res) => res.status(204));

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}}`));
