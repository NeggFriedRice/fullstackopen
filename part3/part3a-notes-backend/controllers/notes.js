const notesRouter = require("express").Router();
const User = require('../models/user')
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  // Refactorered
  const notes = await Note.find({}).populate('user', {username: 1, name: 1});
  response.json(notes);
});

notesRouter.get("/:id", async (request, response, next) => {
  // Note.findById(request.params.id)
  //   .then((note) => {
  //     if (note) {
  //       response.json(note);
  //     } else {
  //       response.status(404).end();
  //     }
  //   })
  //   .catch((error) => next(error));

  const note = await Note.findById(request.params.id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

notesRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(request.body.userId)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    user: user.id
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id)
  await user.save()
  response.status(201).json(savedNote);
});

notesRouter.delete("/:id", async (request, response, next) => {
  // Note.findByIdAndDelete(request.params.id)
  //   .then(() => {
  //     response.status(204).end();
  //   })
  //   .catch((error) => next(error));

  await Note.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;
