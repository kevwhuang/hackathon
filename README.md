# HACKATHON

Author: Cohort10

Version: 1.0.0

Date: April 04, 2023

---

## INSTALL

- [ ] Install [Node.js LTS runtime](https://nodejs.org)
- [ ] Run <code style="color:yellow;">npm i</code> to install all dependencies
- [ ] Run <code style="color:yellow;">npm start</code> to initialize local server
- [ ] Interface database at [localhost:8000](http://127.0.0.1:8000)

## ROUTES

<i>Currently only the <b style="color:green;">GET</b> method is supported using the http protocol.</i>

<i>Request endpoints must begin with http://localhost:8000/api/</i>

<i>Example: http://localhost:8000/api/salary/Georgi/Facello</i>

METHOD|ENDPOINT|DESCRIPTION
-|-|-
GET | / | List first 1000 employees
GET | /:emp_no | Search employees by "employee id"
GET | /firstname/:first_name | Search employees by "first name"
GET | /department/:dept_name | Search employees by "department name"
GET | /salary/:emp_no | Search salaries by "employee id"
GET | /salary/:first_name/:last_name | Search salaries by "first name" and "last name"

## CHANGELOG

- 1.0.0: Initial release.

## ISSUES

- None.