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

app.get("/time-entry/:studentId", async (req, res) => {
  // Takes the student ID from the URL
  const studentId = req.params.studentId;
  try {
    const result = await pool.query(
      `INSERT INTO entry_log (studentid) VALUES (${studentId});`,
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// --- Start server ---
app.listen(3001, () => {
  console.log("API running on http://localhost:3001");
});
