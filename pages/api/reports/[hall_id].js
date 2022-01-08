import { query } from "../../../lib/db";

export default async function reportHandler(req, res) {
  try {
    const {
      method,
      body: { timestamp },
    } = req;
    const { hall_id } = req.query;
    switch (method) {
      case "GET": {
        const time = Date.now() / 1000;
        const results = await query(
          `
          SELECT hall_id, DATE_FORMAT(timestamp, "%Y-%m-%d %H:%i:%s") timestamp FROM report
WHERE timestamp >= DATE_SUB(FROM_UNIXTIME(?), INTERVAL 24 HOUR) AND hall_id = ?
      `,
          [time, hall_id]
        );

        return res.json(results);
      }

      case "POST": {
        const results = await query(
          `
          INSERT INTO report (hall_id, timestamp) VALUES (?, ?)
        `,
          [hall_id, timestamp]
        );
        return res.json(results);
      }

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
