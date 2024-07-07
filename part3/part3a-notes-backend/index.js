require("dotenv").config();
const express = require("express");
const cors = require("cors");

const Note = require("./models/note");

const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.use(express.json());
app.use(cors());

const password = process.argv[2];

// DO NOT SAVE YOUR PASSWORD TO GITHUB!!

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response, next) => {
  Note.findById(request.params.id)
    .then((note) => {
      if (note) {
        response.json(note);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const generateId = () => {
  const maxId =
    notes.length > 0
      ? // Looks through the notes, one by one, looking at the value of the note.id for each one, and the max value is assigned to maxId i.e. using the Math.max function
        Math.max(...notes.map((note) => note.id))
      : 0;

  return maxId + 1;
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (body.content === undefined) {
    return response.send(400).json({
      error: "content missing",
    });
  }

  // Previous code from previous exercise
  // const note = {
  //     content: body.content,
  //     important: Boolean(body.important) || false,
  //     id: generateId()
  // }

  // notes = notes.concat(note)

  // response.json(note)

  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note.save().then((savedNote) => {
    response.json(savedNote);
  });
});

app.put("/api/notes/:id", (request, response, error) => {
  const body = request.body;

  // Create new note from passed in content
  const note = {
    content: body.content,
    important: body.important,
  };

  // Find the note
  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformatted ID" });
  }

  next(error);
};

app.use(errorHandler);

app.listen(config.PORT, () => {
  logger.info(`Server running on ${config.PORT}`);
});
