import mysql from 'mysql2';

class Pool {
    constructor() {
        if (!this.pool) {
            this.pool = mysql.createPool({
                host: process.env.HOST,
                user: process.env.USERNAME,
                password: process.env.PASSWORD,
                database: process.env.DATABASE,
                connectionLimit: 100,
                multipleStatements: true,
            });
        }
        return this.pool;
    }
}

const instance = new Pool();

export default instance;
