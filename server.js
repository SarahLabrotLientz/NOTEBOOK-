// const express = require('express');
// const path = require('path');
// const { clog } = require('./middleware/clog');
// const api = require('./routes/index.js');

// const PORT = process.env.PORT || 3001;

// const app = express();

// // Import custom middleware, "cLog"----Ask Rich how he used this, looks cool
// app.use(clog);

// // Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

const express = require("express");
const path = require("path");
const fs = require("fs");
const noteData = require("./db/db.json"); // Helper method for generating unique ids
const uuid = require("./helpers/uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("./helpers/fsUtils");
const { json } = require("express/lib/response");
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

// GET Route for notes.html page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET api/notes and return db.json
app.get("/api/notes", (req, res) => res.json(noteData));
app.get("/api/notes/:note_id", (req, res) => res.json(noteData));

// GET Route for wildcard page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

// POST request to add a note
app.post("/api/notes", (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring object for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    noteData.push(newNote);

    // Obtain existing notes
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated notes back to the file
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!")
        );
      }
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});


// *****
// Delete function to delete a note from the db.json file
app.delete("/api/notes/:id", function (req, res) {
  let jsonFilePath = path.join(__dirname, "./db/db.json");
  // console.log(req.param.id);
  // console.log(noteData);

  readFromFile("./db/db.json").then((data) => {

   const newVariable = JSON.parse(data) 
    for (let i = 0; i < newVariable.length; i++) {
      if (newVariable[i].id == req.params.id) {
        noteData.splice(i, 1);
        break;
    }};
  
// this fs.writeFile function must be located inside the readFromFile() in order to correctly delete the data from the db.json file.
  fs.writeFile(jsonFilePath, JSON.stringify(noteData, null, 2), function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log("Note was deleted");
    }
  });

  res.json(noteData);

  });

}); //end app.delete

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
//call all dependencies