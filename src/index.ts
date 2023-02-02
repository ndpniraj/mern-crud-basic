import express from "express";
import "./db";
import Note, { NoteDocument } from "./models/note";

// create a server
const app = express();

// this will parse post request coming from fetch.post() method
app.use(express.json());

// this will parse post request coming from html form
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
  // here we need data so that we can create new note/todo
  console.log(req.body);
  res.json({ message: "I am listening!" });
});

interface IncomingBody {
  title: string;
  description?: string;
}

app.post("/create", async (req, res) => {
  // const newNote = new Note<NoteDocument>({
  //   title: (req.body as IncomingBody).title,
  //   description: (req.body as IncomingBody).description,
  // });

  // await newNote.save();

  await Note.create<NoteDocument>({
    title: (req.body as IncomingBody).title,
    description: (req.body as IncomingBody).description,
  });

  res.json({ message: "I am listening to create!" });
});

app.patch("/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await Note.findById(noteId);
  if (!note) return res.json({ error: "Note not found!" });

  const { title, description } = req.body as IncomingBody;
  if (title) note.title = title;
  if (description) note.description = description;

  await note.save();

  res.json({ note });
});

// listen to some port
app.listen(8000, () => {
  console.log("listening");
});
