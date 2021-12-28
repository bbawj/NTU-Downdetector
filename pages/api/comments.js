import { query } from "../../lib/db";

export default async function commentHandler(req, res) {
  const {
    body: { user_id, hall_id, text, posted_at },
    method,
  } = req;
  try {
    let results;
    switch (method) {
      case "GET":
        results = await query(`SELECT * from comment`);
        return res.json(results);

      case "POST":
        results = await query(
          `INSERT INTO comment (user_id, hall_id, text, posted_at) values (?, ?, ?, ?)`,
          [user_id, hall_id, text, posted_at]
        );
        return res.json(results);

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
