// const express = require('express');
// const path = require('path');
// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');

// const PORT = process.env.PORT || 3001;

// const app = express();


//call all dependencies
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clogs');
const api = require('./routes');
const db = require('./db/db.json')

const PORT = process.env.PORT || 3001;

const app = express();

// // Import custom middleware, "cLog"
app.use(clog);

// // Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.use('/api', api);
// API routing

// app.get('/api/notes', (req, res) => {
//   res.json(db)
// })




// // GET Route for notes page
app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, 'public/notes.html'))
 );

// // Wildcard route to direct users to index.html
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, 'public/index.html'))
 );

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// // ___________Definitely referencing mini project for help!!! This is so hard lol _______

// const express = require('express');
// const path = require('path');
// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');

// const PORT = process.env.PORT || 3001;

// const app = express();

// // Import custom middleware, "cLog"
// app.use(clog);

// // Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

// app.use(express.static('public'));

// // // Code from mini project i'm referencing to get routes
// // app.get('/', (req, res) =>
// //   res.sendFile(path.join(__dirname, '/public/index.html'))
// // );

// // GET Route for notes page
// app.get('/notes', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/notes.html'))
// );

// // Wildcard route to direct users to index.html
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/index.html'))
// );

// app.listen(PORT, () =>
//   console.log(`App listening at http://localhost:${PORT} 🚀`)
// );
