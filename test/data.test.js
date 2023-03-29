const BASE = 'http://localhost:8000/api';
const c = console.log;
const checkDate = (year, month, day) => {
    return new Date(year, month - 1, day).toISOString();
}

describe('Controller: getEmployeesById', () => {
    test('Get first employee', async () => {
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

    test('Get last employee', async () => {
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

    test('Employee not found', async () => {
        const URL = `${BASE}/500000`;
        const res = await fetch(URL);
        const data = await res.json();

        expect(res.status).toBe(400);
        expect(data.error).toBeTruthy();
        expect.assertions(2);
    });
});
