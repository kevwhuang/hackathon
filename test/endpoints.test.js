const BASE = 'http://localhost:8000/api';
const checkDate = (year, month, day) => new Date(year, month - 1, day).toISOString();

describe('Controller: getEmployees', () => {
    test('Get first 1000 employees', async () => {
    });
});

describe('Controller: getEmployeesById', () => {
    test('Get first employee by employee id', async () => {
        const URL = `${BASE}/10001`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(Object.keys(data).length).toBe(6);
        expect(data.emp_no).toBe(10001);
        expect(data.birth_date).toBe(checkDate(1953, 9, 2));
        expect(data.first_name).toBe('Georgi');
        expect(data.last_name).toBe('Facello');
        expect(data.gender).toBe('M');
        expect(data.hire_date).toBe(checkDate(1986, 6, 26));
        expect.assertions(8);
    });

    test('Get last employee by employee id', async () => {
        const URL = `${BASE}/499999`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(Object.keys(data).length).toBe(6);
        expect(data.emp_no).toBe(499999);
        expect(data.birth_date).toBe(checkDate(1958, 5, 1));
        expect(data.first_name).toBe('Sachin');
        expect(data.last_name).toBe('Tsukuda');
        expect(data.gender).toBe('M');
        expect(data.hire_date).toBe(checkDate(1997, 11, 30));
        expect.assertions(8);
    });

    test('Display error message for employee id not found', async () => {
        const URL = `${BASE}/500000`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toBeTruthy();
        expect.assertions(2);
    });
});

describe('Controller: getEmployeesByFirstName', () => {
    test('Get employees by first name', async () => {
    });

    test('Get employees by another first name', async () => {
    });

    test('Display error message for first name not found', async () => {
    });
});

describe('Controller: getEmployeesByDepartment', () => {
    test('Get employees by department', async () => {
    });

    test('Get employees by another department', async () => {
    });

    test('Display error message for department not found', async () => {
    });
});

describe('Controller: getSalaryById', () => {
    test('Get salaries by employee id', async () => {
    });

    test('Get salaries by another employee id', async () => {
    });

    test('Display error message for employee id not found', async () => {
    });
});

describe('Controller: getSalaryByName', () => {
    test('Get salaries by first name and last name', async () => {
    });

    test('Get salaries by another first name and last name', async () => {
    });

    test('Display error message for name combination not found', async () => {
    });
});

describe('Public: static files', () => {
    test('Send page successfully', async () => {
    });
});

describe('Error: server unavailable', () => {
    test('Display error message', async () => {
    });
});
