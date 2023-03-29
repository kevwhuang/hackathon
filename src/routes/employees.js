import express from "express";
import employeesController from "../controllers/employees.js";
const router = express.Router()

router.get("/", employeesController.getEmployees);

router.get("/:id", employeesController.getEmployeesById);

router.get("/firstname/:first_name", employeesController.getEmployeesByFirstName);

router.get("/salary/:id", employeesController.getSalaryById);

router.get("/salary/firstname/:first_name", employeesController.getSalaryByName);

router.get("/department/", employeesController.getEmployeesByDepartment);

export default router;


