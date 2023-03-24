import express from "express";
import { router as employeesRoute } from "./routes/employees.js";
import { controller as employeesContoller } from "./controllers/employees.js";

// const express = require("express");
// const router = express.Router();
// const employeesController = require("../controllers/employees");

employeesRoute.get("/", employeesController.getEmployees(req, res) => {
  res.send('getting employees..')
});

employeesRoute.get("/:id", employeesController.getEmployeesById(req, res) => {
  res.send('getting employees..')
});

employeesRoute.get("/firstname/:first_name", employeesController.getEmployeesByFirstName(req, res) => {
  res.send('getting employees..')
});

module.exports = router;


// getSalaryById
// getSalaryByFirstName
// getEmployeesByDepartment