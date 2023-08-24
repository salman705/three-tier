const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 5000;

// Database configuration
// const sequelize = new Sequelize('your_database', 'your_username', 'your_password', {
//   host: 'localhost',
//   dialect: 'postgres',
// });

const sequelize = new Sequelize('salmansarwar', 'salmansarwar', 'psql', {
  host: 'localhost',
  dialect: 'postgres',
});

// Define the Todo model
const Todo = sequelize.define('Todo', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

// Parse JSON request body
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Get all todos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new todo
app.post('/api/todos', async (req, res) => {
  try {
    const { title, completed } = req.body;
    const newTodo = await Todo.create({ title, completed });
    res.json(newTodo);
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update a todo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    todo.title = title || todo.title;
    todo.completed = completed || todo.completed;
    await todo.save();
    res.json(todo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    await todo.destroy();
    res.end();
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Initialize the database connection
sequelize
  .sync()
  .then(async () => {
    // Add initial data to the database
    await Todo.bulkCreate([
      { title: 'Task 1', completed: false },
      { title: 'Task 2', completed: true },
      { title: 'Task 3', completed: false },
    ]);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


















































































// const dbConfig = require('./config/dbConf');
// const express = require('express');
// const Sequelize = require('sequelize');
// const todosRouter = require('./src/routes/todos');
// const sequelize = require('./src/database'); // Import the Sequelize instance

// const app = express();

// // Parse JSON request body
// app.use(express.json());

// // Define the Todo model
// const Todo = sequelize.define('todo', {
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   completed: {
//     type: Sequelize.BOOLEAN,
//     defaultValue: false,
//   },
// });

// // Routes
// app.use('/api/todos', todosRouter);
// // app.get('/', (req, res) => {
// //   res.send('Server is running'); // Send a response indicating that the server is running
// // });

// // Initialize the database connection
// sequelize
//   .sync()
//   .then(() => {
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Unable to connect to the database:', error);
//   });
