
// FOR THE RECORD I HAVE SPENT 66 hours on this and it's a nightmare. and i hate coding and queue gif of papers going everywhere bc f-this i'm out. i can't stand backend. i legit would rather drink my dog's urine then do more of it. Thank you and have a nice day. 

const router = require("express").Router();
const noteDB = require('../db/noteDB');

router.get("/notes",function(req,res){
    noteDB.getNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

router.post("/notes", function(req,res){
    console.log(req.body);
    noteDB.addNote(req.body)
    .then(note => res.json(note))
    .catch(err => res.status(500).json(err));
});

router.delete("/notes/:id", function(req,res){
    noteDB.removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch(err => res.status(500).json(err));
});

module.exports = router