import { query } from "../../../lib/db";

export default async function hallHandler(req, res) {
  try {
    const { hall_id } = req.query;
    const results = await query(`SELECT name from hall WHERE id = ?`, [
      hall_id,
    ]);
    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
