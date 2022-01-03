import { query } from "../../../lib/db";

export default async function reportHandler(req, res) {
  try {
    const time = Date.now() / 1000;
    const { hall_id } = req.query;
    const results = await query(
      `
      SELECT hall_id, DATE_FORMAT(timestamp, "%Y-%m-%d %H:%i:%s") timestamp FROM report
      WHERE timestamp >= DATE_SUB(FROM_UNIXTIME(?), INTERVAL 24 HOUR) AND hall_id = ?
  `,
      [time, hall_id]
    );

    return res.json(results);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
