import mysql from "serverless-mysql";
import { PSDB } from "planetscale-node";

export const getDB = () => {
  if (process.env.NODE_ENV === "production") {
    return new PSDB("main");
  } else {
    return mysql({
      config: {
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD,
      },
    });
  }
};

export async function query(query, values) {
  try {
    const db = getDB();
    if (process.env.NODE_ENV === "production") {
      const [results] = await db.query(query, values);
      return results;
    } else {
      const results = await db.query(query, values);
      await db.end();
      return results;
    }
  } catch (error) {
    console.log(error.message);
    throw Error(error.message);
  }
}
