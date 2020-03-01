const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

const routes = require("./routes.js");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

app.get('/users', routes.getUsers);
app.get('/users/:id', routes.getUserById);

