const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Create a todo
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Retrieve all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    await todo.update({ title, completed });
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    await todo.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;