import { HOST, DATABASE, PASSWORD, USERNAME } from "dotenv/config";
import mysql from "mysql2";

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating connection...");
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: HOST,
        user: USERNAME,
        password: PASSWORD,
        database: DATABASE,
      });

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

export { instance };
