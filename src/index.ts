import express from "express";

// create a server
const app = express();

app.get("/", (request, response) => {
  response.send("<h1>Hello World, How Are You?</h1>");
});

// listen to some port
app.listen(8000, () => {
  console.log("listening");
});
