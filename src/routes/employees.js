import { router as employeesRoute } from "./routes/employees.js";
import {
  controller as getEmployees,
  getEmployeesById,
  getEmployeesByFirstName,
  getSalaryById,
  getSalaryByName,
  getEmployeesByDepartment,
} from "./controllers/employees.js";

employeesRoute.get("/", getEmployees);

employeesRoute.get("/:id", getEmployeesById);

employeesRoute.get("/firstname/:first_name", getEmployeesByFirstName);

employeesRoute.get("/salary/:id", getSalaryById);

employeesRoute.get("/salary/firstname/:first_name", getSalaryByName);

employeesRoute.get("/department/", getEmployeesByDepartment);

export default router;


