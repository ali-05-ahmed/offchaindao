const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "bvbreus!1",
  host: "localhost",
  port: 5432,
  database: "offchaindao"
});

module.exports = pool;