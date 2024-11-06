const express = require("express");
const { showMe } = require("./controllers/controller");
const app = express();
const port = 3000;

app.get("/", showMe);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
