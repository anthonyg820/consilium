const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

const queries = require("./queries.js");


//Initialize body barser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
});

app.get('/users', queries.getAllUsers);
app.get('/users/:userId', queries.getUserById);
app.get('/users/projects/:userId', queries.getUsersProjects);
app.get('/users/tasks/:userId/:projectId', queries.getUsersTasks);
app.get('/tasks/:taskId', queries.getTask);
app.get('/projects', queries.getAllProjects);
app.get('/projects/tasks/:projectId', queries.getAllTasksForProject);

//app.post('/login', queries.loginUser);
app.post('/users', queries.createUser);
app.post('/projects', queries.createProject);
app.post('/tasks', queries.createTask);