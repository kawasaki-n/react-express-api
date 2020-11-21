var express = require('express');
const mysql = require('mysql2')
var router = express.Router();

const con = mysql.createConnection({
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
});

router.get('/', function(req, res, next) {
  const sql = "select * from book order by id"
  con.query(sql, (e, r, f) => {
    res.json(r)
  });
});

module.exports = router;
