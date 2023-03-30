import mysql from 'mysql2';
import pool from '../mysql/pool.mjs';
import { handleSQLError } from '../mysql/errors.mjs';

const limit = 50;

const getEmployees = (req, res) => {
  let offset = 0;
  let order = "ASC";
  let column = "emp_no";
  if (req.query.order) {
    order = "DESC";
  }
  if (req.query.offset && !isNaN(req.query.offset)) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.column) {
    switch (req.query.column.toLowerCase()) {
      case "first_name":
        column = "first_name";
        break;
      case "last_name":
        column = "last_name";
        break;
      case "salary":
        column = "salary";
        break;
      case "dept_no":
        column = "dept_no";
        break;
      default:
        column = "emp_no";
        break;
    }
  }
  let sql = `SELECT e.emp_no, e.first_name, e.last_name, s.salary, de.dept_no
            FROM employees e
            JOIN (
              SELECT emp_no, MAX(salary) AS max_salary
              FROM salaries
              GROUP BY emp_no
            ) AS max_salaries ON e.emp_no = max_salaries.emp_no
            JOIN salaries s ON e.emp_no = s.emp_no AND s.salary = max_salaries.max_salary
            JOIN dept_emp de ON e.emp_no = de.emp_no
            JOIN (
              SELECT emp_no, MAX(from_date) AS max_from_date
              FROM dept_emp
              GROUP BY emp_no
            ) AS max_dept_dates ON de.emp_no = max_dept_dates.emp_no AND de.from_date = max_dept_dates.max_from_date
            ORDER BY ${column} ${order}
            LIMIT ${limit}
            OFFSET ?;`;
  sql = mysql.format(sql, [offset]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const searchEmployees = (req, res) => {
  const searchQuery = req.query.query;
  let offset = 0;
  let order = "ASC";
  let column = "emp_no";
  if (req.query.order) {
    order = "DESC";
  }
  if (req.query.offset && !isNaN(req.query.offset)) {
    offset = parseInt(req.query.offset);
  }
  if (req.query.column) {
    switch (req.query.column.toLowerCase()) {
      case "first_name":
        column = "first_name";
        break;
      case "last_name":
        column = "last_name";
        break;
      case "salary":
        column = "salary";
        break;
      case "dept_no":
        column = "dept_no";
        break;
      default:
        column = "emp_no";
        break;
    }
  }

  if (!searchQuery) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const searchTerms = searchQuery.split("+").filter((term) => term.trim() !== "");
  let sql = `SELECT e.emp_no, e.first_name, e.last_name, s.salary, de.dept_no
            FROM employees e
            JOIN (
              SELECT emp_no, MAX(salary) AS max_salary
              FROM salaries
              GROUP BY emp_no
            ) AS max_salaries ON e.emp_no = max_salaries.emp_no
            JOIN salaries s ON e.emp_no = s.emp_no AND s.salary = max_salaries.max_salary
            JOIN dept_emp de ON e.emp_no = de.emp_no
            JOIN (
              SELECT emp_no, MAX(from_date) AS max_from_date
              FROM dept_emp
              GROUP BY emp_no
            ) AS max_dept_dates ON de.emp_no = max_dept_dates.emp_no AND de.from_date = max_dept_dates.max_from_date
            WHERE (e.emp_no = ?) OR (e.first_name LIKE ?) OR (e.last_name LIKE ?) OR (e.first_name LIKE ? AND e.last_name LIKE ?)
            ORDER BY ${column} ${order}
            LIMIT ${limit}
            OFFSET ?;`;

  const searchParams = searchTerms.map((term) => `%${term}%`);

  const empNoParams = [searchQuery];
  const firstNameParams = searchTerms.length > 0 ? [searchParams[0]] : ['%'];
  const lastNameParams = searchTerms.length > 1 ? [searchParams[1]] : searchTerms.length === 1 ? [searchParams[0]] : ['%'];

  sql = mysql.format(sql, [
    ...empNoParams,
    ...firstNameParams,
    ...lastNameParams,
    ...firstNameParams,
    ...lastNameParams,
    offset
  ]);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getCount = (req, res) => {
  let sql = `SELECT COUNT(*) as count_emps
            FROM (
              SELECT e.emp_no, e.first_name, e.last_name, s.salary, de.dept_no
              FROM employees e
              JOIN (
                SELECT emp_no, MAX(salary) AS max_salary
                FROM salaries
                GROUP BY emp_no
              ) AS max_salaries ON e.emp_no = max_salaries.emp_no
              JOIN salaries s ON e.emp_no = s.emp_no AND s.salary = max_salaries.max_salary
              JOIN dept_emp de ON e.emp_no = de.emp_no
              JOIN (
                SELECT emp_no, MAX(from_date) AS max_from_date
                FROM dept_emp
                GROUP BY emp_no
              ) AS max_dept_dates ON de.emp_no = max_dept_dates.emp_no AND de.from_date = max_dept_dates.max_from_date
            ) as result`
  sql = mysql.format(sql);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getCountSearch = (req, res) => {
  const searchQuery = req.query.query;
  let column = "emp_no";
  if (req.query.column) {
    switch (req.query.column.toLowerCase()) {
      case "first_name":
        column = "first_name";
        break;
      case "last_name":
        column = "last_name";
        break;
      case "salary":
        column = "salary";
        break;
      case "dept_no":
        column = "dept_no";
        break;
      default:
        column = "emp_no";
        break;
    }
  }

  if (!searchQuery) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const searchTerms = searchQuery.split("+").filter((term) => term.trim() !== "");
  let sql = `SELECT COUNT(*) as count_emps
            FROM (
              SELECT e.emp_no, e.first_name, e.last_name, s.salary, de.dept_no
              FROM employees e
              JOIN (
                SELECT emp_no, MAX(salary) AS max_salary
                FROM salaries
                GROUP BY emp_no
              ) AS max_salaries ON e.emp_no = max_salaries.emp_no
              JOIN salaries s ON e.emp_no = s.emp_no AND s.salary = max_salaries.max_salary
              JOIN dept_emp de ON e.emp_no = de.emp_no
              JOIN (
                SELECT emp_no, MAX(from_date) AS max_from_date
                FROM dept_emp
                GROUP BY emp_no
              ) AS max_dept_dates ON de.emp_no = max_dept_dates.emp_no AND de.from_date = max_dept_dates.max_from_date
              WHERE (e.emp_no = ?) OR (e.first_name LIKE ?) OR (e.last_name LIKE ?) OR (e.first_name LIKE ? AND e.last_name LIKE ?)
            ) as result`
  const searchParams = searchTerms.map((term) => `%${term}%`);

  const empNoParams = [searchQuery];
  const firstNameParams = searchTerms.length > 0 ? [searchParams[0]] : ['%'];
  const lastNameParams = searchTerms.length > 1 ? [searchParams[1]] : searchTerms.length === 1 ? [searchParams[0]] : ['%'];

  sql = mysql.format(sql, [
    ...empNoParams,
    ...firstNameParams,
    ...lastNameParams,
    ...firstNameParams,
    ...lastNameParams
  ]);
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

export default {
  getEmployees,
  searchEmployees,
  getCount,
  getCountSearch
};

// TODO=========================

// Set-up local database and verify queries
// crossreference routes
