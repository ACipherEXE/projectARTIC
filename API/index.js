import express from "express";
import pkg from "pg";

const { Pool } = pkg;

const app = express();
app.use(express.json());

// --- PostgreSQL connection ---
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "projectARTIC",
});
// Time entry area
// Enter a student ID and the database will take care of the rest
app.get("/time-entry/:studentId", async (req, res) => {
  // Takes the student ID from the URL
  const studentId = req.params.studentId;
  try {
    const result = await pool.query(
      `INSERT INTO entry_log (studentid) VALUES ('${studentId}');`,
    );
    res
      .status(200)
      .json({ response: "Time entry was a success", studentId: studentId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Student area

// Joining student and time

// --- Start server ---
app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});
