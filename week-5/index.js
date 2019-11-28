const express = require('express');
const bodyParser = require('body-parser');

const userReouter = require('./routes/user');
const projectRouter = require('./routes/project');
const backlogRouter = require('./routes/backlog');
const sprintRouter = require('./routes/sprint');
const taskRouter = require('./routes/task');


require('./mongo-connection');

const app = express();

app.set('view engine', 'pug');
app.use(bodyParser.json());

app.use('/user', userReouter);
app.use('/project', projectRouter);
app.use('/backlog', backlogRouter);
app.use('/sprint', sprintRouter);
app.use('/task', taskRouter);

app.get('/', (req, res) => {
  res.render('index')
});

app.listen(000, () => {
  console.log('Server listening')
});
