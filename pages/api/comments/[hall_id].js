import { query } from "../../../lib/db";

export default async function commentHandler(req, res) {
  try {
    const { hall_id } = req.query;
    const results = await query(
      `SELECT c.id, c.text, c.posted_at, u.email from comment c JOIN user u ON c.user_id = u.id WHERE c.hall_id = ?`,
      [hall_id]
    );
    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
