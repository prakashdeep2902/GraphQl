import express from "express";

const app = express();

const port = 9090;

app.get("/", (req, res) => {
  res.send("<h1>GraphQl<h1>");
});
app.listen(port, () => {
  console.log(`app is running port ${port}`);
});
