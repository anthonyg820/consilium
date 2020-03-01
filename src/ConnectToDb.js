
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Consilium',
  password: 'gda012895',
  port: 5432,
})

module.exports = {
  pool
};
