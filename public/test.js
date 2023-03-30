"use strict";
const $ = (id) => {
    const element = document.getElementById(id);
    if (!(element instanceof HTMLElement)) {
        throw new Error("Not an instance of HTMLElement.");
    }
    return element;
};
class Employee {
    constructor(id, firstName, lastName, salary, department) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.salary = salary;
        this.department = department;
    }
}
const searchInput = $("search-query");
const searchButton = $("search-button");
const resultsElement = $("results");
const resultCountElement = $("result-count");
const prevButton = $("prev");
const nextButton = $("next");
const ascendingButton = $("ascending");
const descendingButton = $("descending");
const selectElement = $("sort-by");
const clearButton = $("clear");
const progressButton = $("progress");
let offset = 0;
let isAscending = true;
let column = "emp_no";
let resultCount = 0;
const randomSalary = () => {
    const max = 201;
    const min = 80;
    return Math.floor(Math.random() * (max - min) + min) * 1000;
};
const randomDepartment = () => {
    const departments = ["Administrative",
        "Business",
        "Customer Service",
        "Finance",
        "Leadership",
        "Legal",
        "Marketing",
        "Public Relations"];
    const i = Math.floor(Math.random() * departments.length);
    return departments[i];
};
window.addEventListener("DOMContentLoaded", (e) => {
    loadEmployees();
});
prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (offset - 50 >= 0) {
        offset -= 50;
        let searchQuery = searchInput.value || "";
        loadEmployees(searchQuery);
    }
});
nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (offset + 50 < resultCount) {
        offset += 50;
        let searchQuery = searchInput.value || "";
        loadEmployees(searchQuery);
    }
});
ascendingButton.addEventListener("click", (e) => {
    e.preventDefault();
    isAscending = true;
    ascendingButton.style.color = "var(--highlight-color)";
    descendingButton.style.color = "white";
    loadEmployees();
});
descendingButton.addEventListener("click", (e) => {
    e.preventDefault();
    isAscending = false;
    descendingButton.style.color = "var(--highlight-color)";
    ascendingButton.style.color = "white";
    loadEmployees();
});
selectElement.addEventListener("change", (e) => {
    column = selectElement.value;
    loadEmployees();
});
searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    offset = 0;
    loadEmployees(searchInput.value);
});
clearButton.addEventListener("click", (e) => {
    e.preventDefault();
    clearButton.style.display = "none";
    searchInput.value = "";
    loadEmployees();
});
const loadEmployees = (searchQuery = "") => {
    resultsElement.innerHTML = "";
    resultCountElement.innerHTML = "";
    progressButton.style.display = "block";
    let pElement = document.createElement("p");
    pElement.textContent = "Loading...";
    resultCountElement.appendChild(pElement);
    const employeeTable = document.createElement("table");
    resultsElement.appendChild(employeeTable);
    const headerRow = document.createElement("tr");
    const tHeaders = ["ID", "First Name", "Last Name", "Salary", "Department"];
    for (let h of tHeaders) {
        const th = document.createElement("th");
        th.textContent = h;
        headerRow.appendChild(th);
    }
    employeeTable.appendChild(headerRow);
    let orderQuery = "";
    if (!isAscending) {
        orderQuery = "order=DESC&";
    }
    let offsetQuery = "";
    if (offset > 0) {
        offsetQuery = `offset=${offset}&`;
    }
    let columnQuery = "";
    if (column !== "emp_no") {
        columnQuery = `column=${column}&`;
    }
    let fetchURL = `/api?${orderQuery}${offsetQuery}${columnQuery}`;
    if (searchQuery) {
        searchQuery = searchQuery.replace(" ", "+");
        fetchURL = `/api/search?query=${searchQuery}&${orderQuery}${offsetQuery}${columnQuery}`;
    }
    let countFetchURL = "/api/count";
    if (searchQuery) {
        countFetchURL = `/api/count/search?query=${searchQuery}&${orderQuery}${offsetQuery}${columnQuery}`;
    }
    Promise.all([
        fetch(fetchURL)
            .then(res => res.json())
            .then(data => {
            let employees = [];
            if (data) {
                for (let employee of data) {
                    employees.push(new Employee(employee.emp_no, employee.first_name, employee.last_name, employee.salary, employee.dept_no.toUpperCase()));
                }
                for (let i = 0; i < 50; i++) {
                    const emp = employees[i];
                    if (!emp) {
                        break;
                    }
                    const values = ["id", "firstName", "lastName", "salary", "department"];
                    const tr = document.createElement("tr");
                    for (let value of values) {
                        const td = document.createElement("td");
                        let dollar = value === "salary" ? "$" : "";
                        td.textContent = dollar + emp[value].toLocaleString("en-US");
                        tr.appendChild(td);
                    }
                    employeeTable.appendChild(tr);
                }
            }
        }),
        fetch(countFetchURL)
            .then(res => res.json())
            .then(data => {
            resultCountElement.innerHTML = "";
            resultCount = data[0].count_emps;
            let pElement = document.createElement("p");
            let max = offset + 50 > resultCount ? resultCount : offset + 50;
            pElement.textContent = `Showing ${offset + 1}-${max} of ${resultCount}`;
            resultCountElement.appendChild(pElement);
        })
    ])
        .then(() => {
        progressButton.style.display = "none";
        if (searchQuery) {
            clearButton.style.display = "block";
        }
    });
};
