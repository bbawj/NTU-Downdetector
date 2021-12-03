import mysql from "serverless-mysql";

export const db = mysql({
  config: {
    host: process.env.HOST,
    database: "ntudowndetector",
    user: process.env.USER,
    password: process.env.PASSWORD,
  },
});

export async function query(query, values) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    console.log(error.message);
    throw Error(error.message);
  }
}
