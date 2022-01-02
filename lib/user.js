import bcrypt from "bcrypt";
import { query } from "./db";

export async function createUser({ email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const res = await query("INSERT INTO user (email, password) VALUES (?, ?)", [
    email,
    hashedPassword,
  ]);
  return res.insertId;
}

// Here you should lookup for the user in your DB
export async function findUser({ email }) {
  const results = await query("SELECT * FROM user WHERE email = ?", [email]);
  return results;
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export async function validatePassword(user, inputPassword) {
  const passwordsMatch = await bcrypt.compare(user.password, inputPassword);
  return passwordsMatch;
}
