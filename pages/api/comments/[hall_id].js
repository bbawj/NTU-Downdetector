import { query } from "../../../lib/db";

export default async function commentHandler(req, res) {
  try {
    const { hall_id, cursor } = req.query;
    let results;
    if (!cursor || cursor === 0) {
      results = await query(
        `SELECT c.id, c.text, c.posted_at, u.email from comment c JOIN user u ON c.user_id = u.id WHERE c.hall_id = ? 
      ORDER BY c.posted_at DESC LIMIT 10`,
        [hall_id]
      );
    } else {
      results = await query(
        `SELECT c.id, c.text, c.posted_at, u.email from comment c JOIN user u ON c.user_id = u.id WHERE c.hall_id = ? 
        AND c.id < ? ORDER BY c.posted_at DESC LIMIT 10`,
        [hall_id, cursor]
      );
    }
    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
