const express = require('express');
const mysql = require('mysql2')
const router = express.Router();

const connection_param = {
  "host": process.env.DB_HOSTNAME,
  "database": process.env.DB_NAME,
  "user": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD
}

router.get('/', function(req, res, next) {
  const sql = "select * from book order by id";
  let con;
  try {
    con = mysql.createConnection(connection_param);
    con.query(sql, (e, r, f) => {
      if (e) {
        throw e;
      }
      res.json(r);
    });
  } catch (error) {
    console.log(error);
    con.rollback();
    return {
      "status": "error",
      "error": "fail to fetch data."
    }
  } finally {
    if (con && con.connection) {
      con.end();
    }
  }
});

module.exports = router;
