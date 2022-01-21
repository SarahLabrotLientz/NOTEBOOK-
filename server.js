// Call all dependencies

const express = require('express');
// not sure if i need this--> const path = require('path');

const htmlroutes= require('./routes/htmroutes');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware 
app.use("/", htmlroutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Setting routes for API calls
app.use('/api', api)


// As all is set, now listen for requests
app.listen(PORT, () =>
  console.log(`NoteBook App is listening at http://localhost:${PORT}`)
);