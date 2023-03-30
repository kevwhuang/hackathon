import mysql from 'mysql2';

import handleError from '../mysql/errors.mjs';
import pool from '../mysql/pool.mjs';

const getEmployees = (req, res) => {
    pool.query('SELECT * FROM employees LIMIT 1000', (err, rows) => {
        if (err) return handleError.server(res, err);
        res.json(rows);
    });
};

const getEmployeesById = (req, res) => {
    let sql = 'SELECT * FROM employees WHERE emp_no = ?';
    sql = mysql.format(sql, [req.params.emp_no]);

    pool.query(sql, (err, rows) => {
        if (err) return handleError.server(res, err);
        if (!rows.length) return handleError.notFound(res, 'emp_no', req.params.emp_no);
        res.json(rows[0]);
    });
};

const getEmployeesByFirstName = (req, res) => {
    let sql = 'SELECT * FROM employees WHERE first_name = ?';
    sql = mysql.format(sql, [req.params.first_name]);

    pool.query(sql, (err, rows) => {
        if (err) return handleError.server(res, err);
        if (!rows.length) return handleError.notFound(res, 'first_name', req.params.first_name);
        res.json(rows);
    });
};

const getEmployeesByDepartment = (req, res) => {
    let sql = 'SELECT a.emp_no, birth_date, first_name, last_name, gender, '
        + 'hire_date, from_date, c.dept_no, dept_name FROM employees a '
        + 'JOIN dept_emp b ON a.emp_no = b.emp_no '
        + 'JOIN departments c ON b.dept_no = c.dept_no '
        + 'WHERE dept_name = ? AND to_date = "9999-01-01" LIMIT 1000';
    sql = mysql.format(sql, [req.params.dept_name]);

    pool.query(sql, (err, rows) => {
        if (err) return handleError.server(res, err);
        if (!rows.length) return handleError.notFound(res, 'dept_name', req.params.dept_name);
        res.json(rows);
    });
};

const getSalaryById = (req, res) => {
    let sql = 'SELECT * FROM salaries WHERE emp_no = ? ORDER BY to_date DESC';
    sql = mysql.format(sql, [req.params.emp_no]);

    pool.query(sql, (err, rows) => {
        if (err) return handleError.server(res, err);
        if (!rows.length) return handleError.notFound(res, 'emp_no', req.params.emp_no);
        res.json(rows);
    });
};

const getSalaryByName = (req, res) => {
    let sql = 'SELECT a.emp_no, salary, from_date, to_date FROM employees a '
        + 'JOIN salaries b ON a.emp_no = b.emp_no '
        + 'WHERE first_name = ? AND last_name = ? ORDER BY to_date DESC';
    sql = mysql.format(sql, [req.params.first_name, req.params.last_name]);

    pool.query(sql, (err, rows) => {
        if (err) return handleError.server(res, err);
        if (!rows.length) {
            const name = `${req.params.first_name} ${req.params.last_name}`;
            return handleError.notFound(res, '?', name);
        }

        res.json(rows);
    });
};

export default {
    getEmployees,
    getEmployeesByDepartment,
    getEmployeesByFirstName,
    getEmployeesById,
    getSalaryById,
    getSalaryByName,
};
