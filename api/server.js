const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Todo = require('./models/Todo');

// Get the todos from db
app.get('/todos', async (req, res) => {
    const todos = await Todo.find();

    res.json(todos);
})

// Add tasks to todo list
app.post('/todo/new', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
})

// Deletes tasks from todo list
app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)

    res.json(result);
})

// Updates the complete task status of a task
app.put('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

app.listen(3001, () => console.log("Server started on port 3001"));