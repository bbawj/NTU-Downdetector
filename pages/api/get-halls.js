import { query } from "../../lib/db";

export default async function hallHandler(req, res) {
  try {
    const results = await query(`
    SELECT * from hall
  `);

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
