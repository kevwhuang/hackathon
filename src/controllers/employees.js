import mysql from 'mysql2';
import pool from '../mysql/pool';
import { handleSQLError } from '../mysql/errors';

const getEmployees = (req, res) => {
  pool.query('select * from employees', (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getEmployeesById = (req, res) => {
  let sql = 'select * from employees where emp_no = ?';
  sql = mysql.format(sql, [req.params.emp_no]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getEmployeesByFirstName = (req, res) => {
  let sql = 'select * from employees where first_name = ?';
  sql = mysql.format(sql, [req.params.first_name]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getSalaryById = (req, res) => {
  let sql = 'select * from salaries where emp_no = ? order by to_date desc';
  sql = mysql.format(sql, [req.params.emp_no]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

// requires two values: first_name and last_name
const getSalaryByName = (req, res) => {
  let sql = 'select a.emp_no, salary, from_date, to_date from employees a join salaries b on a.emp_no = b.emp_no where first_name = ? and last_name = ? order by to_date desc';
  sql = mysql.format(sql, [req.params.first_name, req.params.last_name]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

// Query interpreting the date '9999-01-01' to mean 'to present'.
// Ignores employees who left department.
const getEmployeesByDepartment = (req, res) => {
  let sql = "select a.emp_no, birth_date, first_name, last_name, gender, hire_date, from_date, c.dept_no, dept_name from employees a  join dept_emp b  on a.emp_no = b.emp_no join departments c on b.dept_no = c.dept_no where dept_name = ? and to_date = '9999-01-01';";
  sql = mysql.format(sql, [req.params.dept_no]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

export default {
  getEmployees,
  getEmployeesById,
  getEmployeesByFirstName,
  getSalaryById,
  getSalaryByName,
  getEmployeesByDepartment,
};

// TODO=========================

// Set-up local database and verify queries
// crossreference routes
