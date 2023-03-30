import express from 'express';

import employeesController from '../controllers/employees.mjs';

const router = express.Router();

router.get('/', employeesController.getEmployees);
router.get('/:emp_no', employeesController.getEmployeesById);
router.get('/department/:dept_name', employeesController.getEmployeesByDepartment);
router.get('/firstname/:first_name', employeesController.getEmployeesByFirstName);
router.get('/salary/:emp_no', employeesController.getSalaryById);
router.get('/salary/:first_name/:last_name', employeesController.getSalaryByName);

export default router;
