import mysql from "serverless-mysql";

export const getDB = () => {
  if (process.env.NODE_ENV === "production") {
    return mysql({
      config: {
        host: process.env.PLANETSCALE_DB_HOST,
        database: process.env.PLANETSCALE_DB,
        user: process.env.PLANETSCALE_DB_USERNAME,
        password: process.env.PLANETSCALE_DB_PASSWORD,
        ssl: {
          ca: process.env.PLANETSCALE_SSL_CERT_PATH,
        },
      },
    });
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
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    console.log(error.message);
    throw Error(error.message);
  }
}
