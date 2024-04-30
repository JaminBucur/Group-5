"use strict";

const sqlite = require("better-sqlite3");
const path = require("path");

// if debugging with database2, change the path to database2.db
const db = new sqlite(path.resolve("database.db"), { fileMustExist: true });

function all(sql, ...params) {
  return db.prepare(sql).all(params);
}


function get(sql, ...params) {
  return db.prepare(sql).get(params);
}


function run(sql, ...params) {
  return db.prepare(sql).run(params[0]);
}

/*
function get(sql, ...params) {
  return db.prepare(sql).get(...params);
}
*/

module.exports = {
  all,
  get,
  run,
};
