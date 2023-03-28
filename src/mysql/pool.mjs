import mysql from "mysql2";

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating connection...");
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: process.env.HOST,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      });

      return this.pool;
    }
  return this.pool;
  }
}

const instance = new Connection();

export { instance };
