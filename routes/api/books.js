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
    try {
      con.query(sql, (e, r, f) => {
        if (e) {
          throw e;
        }
        res.json(r);
      });
    } catch (error) {
      console.log(error);
      res.send("エラーが発生しました。");
    } finally {
      if (con) {
        con.release();
      }
    }
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
    try {
      con.query(sql, [book.name, book.author, book.url], (e, r, f) => {
        if (e) {
          throw e;
        }
      });
    } catch (error) {
      console.log(error);
      res.send("エラーが発生しました。");
    } finally {
      con.release();
    }
  });
});

router.delete('/:id', function(req, res, next) {
  const sql = "delete from book where id = ?";
  var id = req.params.id;
  pool.getConnection((e, con) => {
    try {
      con.query(sql, [id], (e, r, f) => {
        if (e) {
          throw e;
        }
      });
    } catch (error) {
      console.log(error);
      res.send("エラーが発生しました。");
    } finally {
      con.release();
    }
  });
});

module.exports = router;
