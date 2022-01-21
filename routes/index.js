
const notes = require("express").Router();
const noteDB = require('../db/noteDB');
// GET route
notes.get("/notes",function(req,res){
    noteDB.getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});
// POST route
notes.post("/notes", function(req,res){
    console.log(req.body);
    noteDB.addNote(req.body)
    .then(note => res.json(note))
    .catch(err => res.status(500).json(err));
});
// DELETE route
notes.delete("/notes/:id", function(req,res){
    noteDB.removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch(err => res.status(500).json(err));
});

module.exports = notes
