import { query } from "../../../lib/db";

export default async function reportHandler(req, res) {
  try {
    const time = Date.now() / 1000;
    const { hallName } = req.query;
    const results = await query(
      `
      SELECT r.hall_id, DATE_FORMAT(timestamp, "%Y-%m-%d %H:%i:%s") timestamp FROM report r JOIN hall h ON r.hall_id = h.id
      WHERE r.timestamp >= DATE_SUB(FROM_UNIXTIME(?), INTERVAL 24 HOUR) AND h.name = ?
  `,
      [time, hallName]
    );

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
