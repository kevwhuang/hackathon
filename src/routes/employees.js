import express from "express";
import employeesController from "../controllers/employees.js";
const router = express.Router()

router.get("/", employeesController.getEmployees);

router.get("/search/", employeesController.searchEmployees);

router.get("/count/", employeesController.getCount)

router.get("/count/search/", employeesController.getCountSearch)

export default router;