const BASE = 'http://localhost:8000/api';
const checkDate = (year, month, day) => new Date(year, month - 1, day).toISOString();

describe('Controller: getEmployees', () => {
    test('Get first 1000 employees', async () => {
        const URL = `${BASE}/`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.length).toBe(1000);
        expect.assertions(7002);

        for (let i = 0; i < data.length; i += 1) {
            expect(Object.keys(data[i]).length).toBe(6);
            expect(typeof data[i].emp_no).toBe('number');
            expect(typeof data[i].birth_date).toBe('string');
            expect(typeof data[i].first_name).toBe('string');
            expect(typeof data[i].last_name).toBe('string');
            expect(typeof data[i].gender).toBe('string');
            expect(typeof data[i].hire_date).toBe('string');
        }
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
        const URL = `${BASE}/firstname/Bezalel`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.length).toBe(228);
        expect(data[0].emp_no).toBe(10002);
        expect(data[data.length - 1].emp_no).toBe(499846);
        expect.assertions(4);
    });

    test('Get employees by another first name', async () => {
        const URL = `${BASE}/firstname/Chirstian`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.length).toBe(226);
        expect(data[0].emp_no).toBe(10004);
        expect(data[data.length - 1].emp_no).toBe(498513);
        expect.assertions(4);
    });

    test('Display error message for first name not found', async () => {
        const URL = `${BASE}/firstname/Elon`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toBeTruthy();
        expect.assertions(2);
    });
});

describe('Controller: getEmployeesByDepartment', () => {
    test('Get first 1000 employees by department', async () => {
        const URL = `${BASE}/department/Production`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.length).toBe(1000);
        expect(data[0].emp_no).toBe(10003);
        expect(data[data.length - 1].emp_no).toBe(15398);
        expect.assertions(4);
    });

    test('Get first 1000 employees by another department', async () => {
        const URL = `${BASE}/department/Human%20Resources`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.length).toBe(1000);
        expect(data[0].emp_no).toBe(10005);
        expect(data[data.length - 1].emp_no).toBe(32911);
        expect.assertions(4);
    });

    test('Display error message for department not found', async () => {
        const URL = `${BASE}/department/Drugs`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toBeTruthy();
        expect.assertions(2);
    });
});

describe('Controller: getSalaryById', () => {
    test('Get salaries by employee id', async () => {
        const URL = `${BASE}/salary/10010`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.length).toBe(6);
        expect(data[0].salary).toBe(80324);
        expect(data[0].to_date).toBe(checkDate(9999, 1, 1));
        expect(data[data.length - 1].salary).toBe(72488);
        expect(data[data.length - 1].to_date).toBe(checkDate(1997, 11, 24));
        expect.assertions(6);
    });

    test('Get salaries by another employee id', async () => {
        const URL = `${BASE}/salary/499999`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.length).toBe(5);
        expect(data[0].salary).toBe(77303);
        expect(data[0].to_date).toBe(checkDate(9999, 1, 1));
        expect(data[data.length - 1].salary).toBe(63707);
        expect(data[data.length - 1].to_date).toBe(checkDate(1998, 11, 30));
        expect.assertions(6);
    });

    test('Display error message for employee id not found', async () => {
        const URL = `${BASE}/salary/300000`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toBeTruthy();
        expect.assertions(2);
    });
});

describe('Controller: getSalaryByName', () => {
    test('Get salaries by first name and last name', async () => {
        const URL = `${BASE}/salary/Duangkaew/Piveteau`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.length).toBe(6);
        expect(data[0].salary).toBe(80324);
        expect(data[0].to_date).toBe(checkDate(9999, 1, 1));
        expect(data[data.length - 1].salary).toBe(72488);
        expect(data[data.length - 1].to_date).toBe(checkDate(1997, 11, 24));
        expect.assertions(6);
    });

    test('Get salaries by another first name and last name', async () => {
        const URL = `${BASE}/salary/Mayuko/Warwick`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(200);
        expect(data.length).toBe(5);
        expect(data[0].salary).toBe(47017);
        expect(data[0].to_date).toBe(checkDate(9999, 1, 1));
        expect(data[data.length - 1].salary).toBe(40000);
        expect(data[data.length - 1].to_date).toBe(checkDate(1998, 12, 30));
        expect.assertions(6);
    });

    test('Display error message for name combination not found', async () => {
        const URL = `${BASE}/salary/Jimmy/Neutron`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toBeTruthy();
        expect.assertions(2);
    });
});

describe('Public: static files', () => {
    test('Serve page successfully', async () => {
        const URL = 'http://localhost:8000';
        const res = await fetch(URL);
        const data = await res.text();

        expect(res.status).toBe(200);
        expect(data.startsWith('<!DOCTYPE html>')).toBeTruthy();
        expect.assertions(2);
    });
});

describe('Error: page unavailable', () => {
    test('Display error message for status 404', async () => {
        const URL = 'http://localhost:8000/notapi';
        const res = await fetch(URL);

        expect(res.status).toBe(404);
        expect.assertions(1);
    });

    test('Display error message for status 500', async () => {
        try {
            await fetch(BASE);
        } catch (err) {
            expect(err.toString()).toBe('TypeError: fetch failed');
            expect.assertions(1);
        }
    });
});
