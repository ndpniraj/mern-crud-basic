import express from "express";

// create a server
const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  // read the data and we want to add that to req.body
  req.on("data", (chunk) => {
    // manipulate this here
    req.body = JSON.parse(chunk);
    next();
  });
});

app.post("/", (req, res) => {
  // here we need data so that we can create new note/todo
  console.log(req.body);
  res.json({ message: "I am listening!" });
});

app.post("/create", (req, res) => {
  // here we need data so that we can create new note/todo
  console.log(req.body);
  res.json({ message: "I am listening to create!" });
});

// listen to some port
app.listen(8000, () => {
  console.log("listening");
});
