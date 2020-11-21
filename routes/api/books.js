var express = require('express');
const mysql = require('mysql2')
var router = express.Router();

const con = mysql.createConnection({
  host: { DB_HOST },
  database: { DB_NAME },
  user: { DB_USER },
  password: { DB_PASSWORD }
});

router.get('/', function(req, res, next) {
  const sql = "select * from book order by id"
  con.query(sql, (e, r, f) => {
    res.json(r)
  });
});

module.exports = router;
