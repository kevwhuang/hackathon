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

let employees = [
    new Employee(1, "Bob", "Smith", 80000, "Front End"),
    new Employee(2, "Halle", "Berry", 90000, "Back End"),
    new Employee(3, "Alex", "Johnson", 120000, "Senior Engineer"),
    new Employee(4, "Tim", "Burton", 90000, "Back End"),
    new Employee(5, "Reese", "Witherspoon", 90000, "Front End"),
    new Employee(6, "Tim", "Curry", 95000, "Back End"),
    new Employee(7, "Avril", "Lavigne", 90000, "Back End"),
    new Employee(8, "Eve", "Freeman", 90000, "Back End"),
    new Employee(9, "Jayce", "Davis", 90000, "Back End"),
    new Employee(10, "Mia", "Pennington", 90000, "Back End"),
    new Employee(11, "Bobby", "Ware", 90000, "Back End"),
    new Employee(12, "Emily", "Garza", 90000, "Back End")
];

let results = [];
let sortArray = [...employees];

const searchInput = $("search-query");
const searchButton = $("search-button");
const resultsElement = $("results");
const prevButton = $("prev");
const nextButton = $("next");
const ascendingButton = $("ascending");
const descendingButton = $("descending");
const selectElement = $("sort-by");
const clearButton = $("clear");

let offset = 0;
let ascending = true;
let isSearching = false;

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
    fetch("https://randomuser.me/api/?results=1000")
        .then(res => res.json())
        .then(data => {
            let i = 1;
            if (data.results) {
                employees.length = 0;
                for (let person of data.results) {
                    employees.push(new Employee(i, person.name.first, person.name.last, randomSalary(), randomDepartment()));
                    i++;
                }
            }
            sortArray = [...employees];
            offset = 0;
            sortEmployees();
        });
});

prevButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (offset - 50 >= 0) {
        offset -= 50;
        loadEmployees();
    }
});

nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (offset + 50 < sortArray.length) {
        offset += 50;
        loadEmployees();
    }
});

ascendingButton.addEventListener("click", (e) => {
    e.preventDefault();
    ascending = true;
    ascendingButton.style.color = "var(--highlight-color)";
    descendingButton.style.color = "white";
    sortEmployees();
});

descendingButton.addEventListener("click", (e) => {
    e.preventDefault();
    ascending = false;
    descendingButton.style.color = "var(--highlight-color)";
    ascendingButton.style.color = "white";
    sortEmployees();
});

selectElement.addEventListener("change", (e) => {
    sortEmployees();
});

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    searchEmployees();
});

clearButton.addEventListener("click", (e) => {
    e.preventDefault();
    results.length = 0;
    clearButton.style.display = "none";
    isSearching = false;
    sortArray = [...employees];
    searchInput.value = "";
    loadEmployees();
});

const searchEmployees = () => {
    isSearching = true;
    clearButton.style.display = "block";
    resultsElement.innerHTML = "";
    const query = searchInput.value.toLowerCase();
    const regex = new RegExp(/[0-9]/, 'g');
    results.length = 0;
    if (query.match(regex)) {
        results = employees.filter(emp => {
            return query === emp.id.toString();
        });
    }
    else {
        results = employees.filter(emp => {
            return query === emp.firstName.toLowerCase();
        });
    }
    sortArray = [...results];
    if (results.length > 0) {
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
        for (let i = 0; i < offset + 50; i++) {
            if (!results[i]) {
                break;
            }
            const emp = results[i];
            const values = ["id", "firstName", "lastName", "salary", "department"];
            const tr = document.createElement("tr");
            for (let value of values) {
                const td = document.createElement("td");
                td.textContent = emp[value].toString();
                tr.appendChild(td);
            }
            employeeTable.appendChild(tr);
        }
        let pElement = document.createElement("p");
        let max = offset + 50 > results.length ? results.length : offset + 50;
        pElement.textContent = `Showing ${offset + 1}-${max} of ${results.length}`;
        resultsElement.appendChild(pElement);
    }
    else {
        resultsElement.textContent = "No matching result";
    }
};

const loadEmployees = () => {
    resultsElement.innerHTML = "";
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
    for (let i = offset; i < offset + 50; i++) {
        if (!sortArray[i]) {
            break;
        }
        const emp = sortArray[i];
        const values = ["id", "firstName", "lastName", "salary", "department"];
        const tr = document.createElement("tr");
        for (let value of values) {
            const td = document.createElement("td");
            td.textContent = emp[value].toLocaleString("en-US");
            tr.appendChild(td);
        }
        employeeTable.appendChild(tr);
    }
    let pElement = document.createElement("p");
    let max = offset + 50 > sortArray.length ? sortArray.length : offset + 50;
    pElement.textContent = `Showing ${offset + 1}-${max} of ${sortArray.length}`;
    resultsElement.appendChild(pElement);
};

const sortEmployees = () => {
    const sortBy = selectElement.value;
    sortArray.length = 0;
    if (isSearching) {
        sortArray = [...results];
    }
    else {
        sortArray = [...employees];
    }
    if (ascending) {
        sortArray = sortArray.sort((a, b) => {
            if (a[sortBy] > b[sortBy]) {
                return 1;
            }
            else if (a[sortBy] < b[sortBy]) {
                return -1;
            }
            return 0;
        });
    }
    else {
        sortArray = sortArray.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) {
                return 1;
            }
            else if (a[sortBy] > b[sortBy]) {
                return -1;
            }
            return 0;
        });
    }
    loadEmployees();
};
