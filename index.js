const express = require("express");
var bodyParser = require("body-parser");
const PythonShell = require("python-shell");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello world !");
});

app.post("/", (req, res) => {
  if (req.body.query.trim() === "")
    return res.status(200).send({ err: false, output: "" });

  PythonShell.runString(req.body, null, function (err, results) {
    if (err) {
      return res.status(200).send({ err: true, output: err.message });
    }

    res.status(200).send({ err: false, output: results });
  });
});

app.listen(port, () => {
  console.log("LISTENING ON PORT ", port);
});
