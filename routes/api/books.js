const express = require('express');
const mysql = require('mysql2')
const router = express.Router();

const connection_param = {
  "host": process.env.DB_HOSTNAME,
  "database": process.env.DB_NAME,
  "user": process.env.DB_USERNAME,
  "password": process.env.DB_PASSWORD
}

const pool = mysql.createPool(connection_param);

router.get('/', function(req, res, next) {
  const sql = "select * from book order by id";

  pool.getConnection((e, con) => {
    con.query(sql, (e, r, f) => {
      if (e) {
        throw e;
      }
      res.json(r);
    });
    con.release();
  });
});

router.post('/', function(req, res, next) {
  const sql = "insert into book (name, author, url, reg_time, update_time) values(?, ?, ?, now(), now())";
  const book = {
    name: req.body.name,
    author : req.body.author,
    url: req.body.url
  }
  pool.getConnection((e, con) => {
    con.query(sql, [book.name, book.author, book.url], (e, r, f) => {
      if (e) {
        throw e;
      }
    });
    con.release();
  });
});

module.exports = router;
