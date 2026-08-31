import express from "express";
import pool from "../config/db.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.use(authMiddleware);

// GET all sessions for the logged-in user
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM sessions WHERE user_id = ? ORDER BY date DESC",
      [req.userId]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST a new session (called when Focus.jsx timer completes)
router.post("/", async (req, res) => {
  const { subject, date, minutes } = req.body;
  if (!subject || !date || !minutes) {
    return res.status(400).json({ error: "Missing subject, date, or minutes" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO sessions (user_id, subject, date, minutes) VALUES (?, ?, ?, ?)",
      [req.userId, subject, date, minutes]
    );
    res.status(201).json({ id: result.insertId, subject, date, minutes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
// POST /sessions/complete — does session save + progress update + activity log
// as ONE transaction, so a failure partway through rolls back everything
// instead of leaving the data half-updated.
router.post("/complete", async (req, res) => {
  const { subject, subjectId, date, minutes } = req.body;
  const minutesNum = Number(minutes);
  if (!subject || !date || minutes === undefined || minutes === null || isNaN(minutesNum) || minutesNum <= 0) {
    return res.status(400).json({ error: "Missing subject, date, or minutes must be a positive number" });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      "INSERT INTO sessions (user_id, subject, subject_id, date, minutes) VALUES (?, ?, ?, ?, ?)",
      [req.userId, subject, subjectId || null, date, minutesNum]
    );

    if (subjectId) {
      await connection.query(
        "UPDATE subjects SET progress = progress + ? WHERE id = ? AND user_id = ?",
        [minutesNum, subjectId, req.userId]
      );
    }

    await connection.query(
      "INSERT INTO activity (user_id, text) VALUES (?, ?)",
      [req.userId, `Completed a ${minutesNum} min focus session in ${subject}`]
    );

    await connection.commit();
    res.status(201).json({ success: true, sessionId: result.insertId });
  } catch (err) {
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: "Failed to save focus session" });
  } finally {
    connection.release();
  }
});

export default router;