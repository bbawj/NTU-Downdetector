import mysql from "serverless-mysql";

export const db = mysql({
  config: {
    host:
      process.env.NODE_ENV === "production"
        ? process.env.PLANETSCALE_DB_HOST
        : process.env.HOST,
    database:
      process.env.NODE_ENV === "production"
        ? process.env.PLANETSCALE_DB
        : process.env.DATABASE,
    user:
      process.env.NODE_ENV === "production"
        ? process.env.PLANETSCALE_DB_USERNAME
        : process.env.USER,
    password:
      process.env.NODE_ENV === "production"
        ? process.env.PLANETSCALE_DB_PASSWORD
        : process.env.PASSWORD,
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
