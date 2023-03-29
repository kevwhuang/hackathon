import express from "express";
import employeesController from "../controllers/employees.js";
const router = express.Router()

router.get("/", employeesController.getEmployees);

router.get("/:emp_no", employeesController.getEmployeesById);

router.get("/firstname/:first_name", employeesController.getEmployeesByFirstName);

router.get("/salary/:emp_no", employeesController.getSalaryById);

router.get("/salary/:first_name&:last_name", employeesController.getSalaryByName);

router.get("/department/", employeesController.getEmployeesByDepartment);

export default router;


