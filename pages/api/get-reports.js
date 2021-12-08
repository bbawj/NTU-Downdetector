import { query } from "../../lib/db";

export default async function reportHandler(req, res) {
  try {
    const time = Date.now() / 1000;
    const results = await query(
      `
      SELECT hall_id, DATE_FORMAT(timestamp, "%Y-%m-%d %H:%i:%s") timestamp FROM report r
      WHERE r.timestamp >= DATE_SUB(FROM_UNIXTIME(?), INTERVAL 24 HOUR)
  `,
      [time]
    );

    return res.json(results);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
