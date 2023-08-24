// src/database.js
const Sequelize = require('sequelize');

const sequelize = new Sequelize('salmansarwar', 'salmansarwar', 'psql', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
