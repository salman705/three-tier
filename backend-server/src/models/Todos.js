// src/models/Todo.js
const Sequelize = require('sequelize');
const sequelize = require('../database');

const Todo = sequelize.define('todo', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Todo;
