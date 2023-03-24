## IMPORTANT

Read this ENTIRE document before beginning work.

## Collaboration

ONE person from the group will fork this repo from ACA. That person will give everyone else permissions as a "collaborator". From that point on, you will all clone THE ONE repo and your changes will be in the form of __pull requests__. For each change/ticket you will create a new branch and work from there. Remember to always pull the latest from the master branch before you begin on a new task.

_Adding a collaborator_
<br />
https://stackoverflow.com/questions/7920320/adding-a-collaborator-to-my-free-github-account

_Creating a new branch_
<br />
`git checkout -b <BRANCH_NAME>`

_Pulling from master_
* Make sure you are on the master branch (`git checkout master`)
* Pull the latest changes (`git pull origin master` or `git pull` for short)

While ONE person is working on this, ANOTHER person can begin work on [database setup](#database-setup)

## Instructions

You will work as a group to create APIs from the very beginning. Notice that there is currently no code. Not a single file. Follow the steps below to make this happen. Please keep in mind that not all tasks are parallizable.. that means that some things will need to happen before others and there are points where the rest of the group may need to wait for one person to complete a task in order to move on. That's fine. Give that person support and collaborate together to unblock each other. 

_Note: Many tasks are intentionally vague. It's up to you to learn/google some of these_

## Database setup

#### Download MySQL

1. https://dev.mysql.com/downloads/mysql/

2. Choose download file

3. Next page click "No thanks, just start my download" at the bottom 

4. Once downloaded, install the application

5. Type `mysql` in a new terminal

6. If you get a "command not found error" you need to add the command to your path. Run the following command to do that: `export PATH=$PATH:/usr/local/mysql/bin`

#### Connect to Google Cloud

We will use ONE person's Google Cloud database for this assignment. The steps for connecting to the database will follow.

1. Use the following command to connect to your Google Cloud database
  * `mysql -u root -h <HOST IP FROM WORKBENCH> -p`
  * You will be prompted for a password
  * This is very similar to connecting through MySQL Workbench
  * [Additional information](https://stackoverflow.com/questions/15872543/access-mysql-remote-database-from-command-line)

2. Type `quit` when you want to exit the process

#### Import data

We are going to use sample data given to use by MySQL. An overview of the process exists here: https://dev.mysql.com/doc/employee/en/

1. Git clone the following repo in a new directory (NOT THIS ONE)
  * https://github.com/datacharmer/test_db.git

2. cd into that directory

3. Run the connect command followed by `< employees.sql` to load that database
  * `mysql -u root -h <HOST IP FROM WORKBENCH> -p < employees.sql`

4. After the operation is complete (may take a couple mins) you should have automatically been exited from the `mysql` command

5. Pull up MySQL Workbench so that we can work with a familiar interface

6. You should see an "employees" database on the left hand side

7. Double-click that database

8. Open a new query and run `select * from employees;`

9. You should have retrieved 1000 employee rows 

10. You should see 6 tables under this database. There are over 2 million records among those two tables

11. Start tinkering with the data via SELECT statements to get familiar with it. We will use this data with our API

## Creating APIs

Let's get started...

### STEPS

#### 1. Initialize your project

* In this folder run `npm init`. Accept all the defaults (press enter a bunch of times)

* You should now have a `package.json` file

* Npm install the following packages: `express body-parser nodemon mysql`

* You should now have a `package-lock.json` file and a `node_modules` folder

* Create an `index.js` file and type `console.log('testing')` on the first line

* Open the package.json file and add a new `start` script. The value should be `nodemon ./index.js`

* Type `npm start` in the terminal. Did you see the log?

* Change the word "testing" to "re-testing". Did it re-load with the new log?

* Setup is complete

* Stop and commit/push work. Everyone else pull the updated code


#### 2. Basic Express

* Remove the "console.log" from the index.js file

* On the first line, import express: `const express = require('express')`

* Initialize the app on the second line: `const app = express()`

* Have the app listen on port 4001

* Re-run the `npm start` command if necessary.. is the app running?

* Navigate to `http://localhost:4001` in the browser to check if the app is running

* Before the "app.listen", add a default GET route and `res.send` the text: "Welcome to our API"

* Congratulations, we have a server running


#### 3. Express routes - BEGINNING

* Create a new folder called `routes`

* In the routes folder, create a new file called `employees.js`

* Create a router and make GET routes for `/, /:id, firstname/:first_name`

* For right now, use `res.send` to send back the text "getting employees..." for each route. We will update this later

* Export the router and import it into the `index.js` file. Use it with the prefix of "employees" so that each route above starts with "employees"

#### 4. Express controllers - BEGINNING

* Create a new folder called `controllers`

* In the controllers folder, create a new file called `employees.js`

* Create the following functions `getEmployees, getEmployeesById, getEmployeesByFirstName`

* Move the logic (everything after the route path) from the employees router into these functions

* Export these functions: `module.exports = { getEmployees, getEmployeesById, getEmployeesByFirstName }`

* Import these functions back into the employees router and use them `router.get('/:id', controller.getEmployeesById)`

* Everything should have stayed the same. If you navigate to `http://localhost:4001/employees/5` you should see the text "getting employees..."

#### 5. Hooking up MySQL

* Create a new folder called `mysql`

* In the mysql folder, create a new file called `connection.js`

* Import `mysql` at the top of the file

* Create a function (_singleton_) that creates a connection pool (if it doesn't already exist) and returns it. Export this function
  * Remember to use the appropriate credentials from the ONE database we are currently sharing and make sure the "database" field in the connection pool is set to "employees"

* Import the previous function into whichever file needs it. This will usually be the controller. You will import this connection as `pool` and use `pool.query` to query the database. Remember that the first argument to this function is a SELECT statement and the second argument is a callback with `(err, results)` parameters

* If at any point (in any file) we find an `err` when using `pool.query`, return a 500 status code and the text, "something went wrong"

#### 6. Employees controller - CONTINUED

* Import the `pool` function from `mysql/connection` at the top of the file (controllers/employees.js). Additionally import the general `mysql` package 

* Update the `getEmployees` function so that it calls the database, __selecting all fields from the employees table but limiting the results to 50__. Use `res.json` to return the results to the user

* Update the `getEmployeesById` function so that it calls the database, __selecting all fields from the employees table where the emp_no matches the id query parameter__. This should return one result. Use `res.json` to return the result to the user

* Update the `getEmployeesByFirstName` function so that it calls the database, __selecting all fields from the employees table where the first_name matches the first_name query parameter__. This could return multiple results. Use `res.json` to return the results to the user

#### Salaries and Departments

* Repeat steps 3-6 to create three more routes tying employee information to their current salaries or departments. New routes, controllers and queries will need to be created. You are free to collaboratively name these routes/controller functions anything you wish.

#### QA

All routes should be returning data from the database visible through either the browser or Postman. 

## Summary

When complete, there should be a fully functioning API integrated with an external MySQL database. This is most of the work required to create an API. Congratulations!