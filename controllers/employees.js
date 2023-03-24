import mysql from "mysql2";
import pool from "../sql/connection";
import { handleSQLError } from "../sql/error";

const getEmployees = (req, res) => {
  pool.query(`Query`, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getEmployeesById = (req, res) => {
  let sql = `Query`;

  sql = mysql.format(sql, [req.params.id]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getEmployeesByFirstName = () => {};

const getSalaryById = () => {};

const getSalaryByFirstName = () => {};

const getEmployeesByDepartment = () => {};

export default {
  getEmployees,
  getEmployeesById,
  getEmployeesByFirstName,
  getSalaryById,
  getSalaryByFirstName,
  getEmployeesByDepartment,
};

//TODO=========================

//node install
//npm i sql
//crossreference routes
//create error.js in connections/sql/
