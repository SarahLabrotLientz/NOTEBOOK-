const express = require('express');
const path = require('path');

const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware 
app.use(clog);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Setting routes for API calls
app.use('/api', api)


// As all is set, now listen for requests
app.listen(PORT, () =>
  console.log(`Note Taker App is listening at http://localhost:${PORT}`)
);