const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const fetchuser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
require("../models/Notes");
mongoose.set("strictQuery", true);
const Notes = mongoose.model("notes");

// this can be used to fetch all notes from the user given id here we will use fetchfunction and get the data of id and
//url:http://localhost:5000/api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const Id = req.user.id;
    const notes = await Notes.find({ user: Id });
    res.json(notes);
  } catch (error) {
    res.send({ error: error }, { status: "internal error" });
  }
});

// this is to add the notes
router.post(
  "/addnotes",
  fetchuser,
  [
    body("tile", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must contain the min 5 letters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const Id = req.user.id;
      const { title, description, tag } = req.body;

      await Notes.create({
        user: Id,
        title,
        description,
        tag,
      }).then((user) => {
        res.send(user);
      });
    } catch (error) {
      res.send({ error: error }, { status: "internal error" });
    }
  }
);

//this is to update the notes of the existing user

router.put("/updatenotes/:id", fetchuser, async (req, res) => {
  try {
    const Id = req.user.id;
    const { title, description, tag } = req.body;
    const newnotes = {};
    if (title) {
      newnotes.title = title;
    }
    if (description) {
      newnotes.description = description;
    }
    if (tag) {
      newnotes.tag = tag;
    }

    const verifyid = await Notes.findOne({ _id: req.params.id });
    if (!verifyid) {
      return res.status(404).send("user notes not found try again");
    }

    if (Id !== verifyid.user.toString()) {
      return res.status(401).send("user notes not found try again");
    }

    const note = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newnotes },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.send({ error: error }, { status: "internal error" });
  }
});

// this is to delete the existing notes with the login required

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({ "Success": "Note has been deleted", note: note });
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}
 
});

module.exports = router;
