const express = require("express");
const mysql2 = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


// Database connection
const db = mysql2.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cor",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err) => {
  if (err) {
    console.log("Database Connection Failed", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden

    req.user = user;
    next();
  });
};
// =================== REGISTER =================== //
app.post("/register", async (req, res) => {
  const { username, password, roles, employeeNumber } = req.body;

  if (!username || !password || !roles || !employeeNumber) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const checkUserSql = "SELECT * FROM users WHERE username = ?";

  db.query(checkUserSql, [username], (err, results) => {
    if (err) return res.status(500).json({ message: "Database Error" });

    if (results.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const insertUserSql =
      "INSERT INTO users (username, password, roles, employeeNumber ) VALUES (?, ?, ?,?)";
    db.query(insertUserSql, [username, hashedPassword, roles, employeeNumber], (err) => {
      if (err)
        return res.status(500).json({ message: "Registration Failed" });

      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

// =================== LOGIN =================== //
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], async (err, results) => {
    if (err || results.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid username or password" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, roles: user.roles, employeeNumber: user.employeeNumber
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login response:", {
      token,
      username: user.username,
      roles: user.roles,
      employeeNumber: user.employeeNumber
    });

    res.json({
      message: "Login successful",
      token,
      username: user.username,
      roles: user.roles,
      employeeNumber: user.employeeNumber
    });
  });
});

// =================== ADMIN USERS LIST =================== //
// Middleware to verify JWT and check if user is Admin
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.roles !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Get all users (Admin only)
app.get("/api/users", verifyToken, isAdmin, (req, res) => {
  const sql = "SELECT id, username, roles FROM users";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  });
});

// Delete a user by ID (Admin only)
app.delete("/api/users/:id", verifyToken, isAdmin, (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed" });
    res.json({ message: "User deleted successfully" });
  });
});

// Update a user by ID (Admin only)
app.put("/api/users/:id", verifyToken, isAdmin, (req, res) => {
  const { id } = req.params;
  const { username, roles } = req.body;

  if (!username || !roles) {
    return res.status(400).json({ message: "Username and role are required" });
  }

  const sql = "UPDATE users SET username = ?, roles = ? WHERE id = ?";
  db.query(sql, [username, roles, id], (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed" });
    res.json({ message: "User updated successfully" });
  });
});


// =================== CERTIFICATE OF REGISTRATION API =================== //
// Create new registration (48 fields)
app.post("/api/registrations", (req, res) => {
  const data = req.body;

  const sql = `INSERT INTO certificate_of_registration (
    registration_no, academic_year_term, student_no, name, gender, age, email_address,
    college, program, major, year_level, curriculum, scholarship_discount,
    subject_code, subject_title, lec_units, lab_units, credit_units, tuition_units,
    subject_section, subject_schedule_room, subject_faculty,
    total_lec_units, total_lab_units, total_credit_units, total_tuition,
    tuition, athletic_fee, cultural_fee, development_fee, guidance_fee,
    library_fee, medical_dental_fee, registration_fee, computer_fee,
    laboratory_fee, total_assessment, less_financial_aid, net_assessed,
    credit_memo, total_discount, total_payment, outstanding_balance,
    first_payment_due, second_payment_due, third_payment_due,
    payment_validation_date, official_receipt
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  const values = [
    data.registration_no, data.academic_year_term, data.student_no, data.name, data.gender, data.age, data.email_address,
    data.college, data.program, data.major, data.year_level, data.curriculum, data.scholarship_discount,
    data.subject_code, data.subject_title, data.lec_units, data.lab_units, data.credit_units, data.tuition_units,
    data.subject_section, data.subject_schedule_room, data.subject_faculty,
    data.total_lec_units, data.total_lab_units, data.total_credit_units, data.total_tuition,
    data.tuition, data.athletic_fee, data.cultural_fee, data.development_fee, data.guidance_fee,
    data.library_fee, data.medical_dental_fee, data.registration_fee, data.computer_fee,
    data.laboratory_fee, data.total_assessment, data.less_financial_aid, data.net_assessed,
    data.credit_memo, data.total_discount, data.total_payment, data.outstanding_balance,
    data.first_payment_due, data.second_payment_due, data.third_payment_due,
    data.payment_validation_date, data.official_receipt
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Insert failed", error: err });
    res.status(201).json({ message: "Registration added" });
  });
});

// Get all registrations
app.get("/api/registrations", (req, res) => {
  const sql = "SELECT * FROM certificate_of_registration";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Fetch failed", error: err });
    res.json(results);
  });
});

// Update a registration (48 fields)
app.put("/api/registrations/:registration_no", (req, res) => {
  const data = req.body;
  const { registration_no } = req.params;

  const sql = `UPDATE certificate_of_registration SET 
    academic_year_term=?, student_no=?, name=?, gender=?, age=?, email_address=?,
    college=?, program=?, major=?, year_level=?, curriculum=?, scholarship_discount=?,
    subject_code=?, subject_title=?, lec_units=?, lab_units=?, credit_units=?, tuition_units=?,
    subject_section=?, subject_schedule_room=?, subject_faculty=?,
    total_lec_units=?, total_lab_units=?, total_credit_units=?, total_tuition=?,
    tuition=?, athletic_fee=?, cultural_fee=?, development_fee=?, guidance_fee=?,
    library_fee=?, medical_dental_fee=?, registration_fee=?, computer_fee=?,
    laboratory_fee=?, total_assessment=?, less_financial_aid=?, net_assessed=?,
    credit_memo=?, total_discount=?, total_payment=?, outstanding_balance=?,
    first_payment_due=?, second_payment_due=?, third_payment_due=?,
    payment_validation_date=?, official_receipt=?
    WHERE registration_no=?`;

  const values = [
    data.academic_year_term, data.student_no, data.name, data.gender, data.age, data.email_address,
    data.college, data.program, data.major, data.year_level, data.curriculum, data.scholarship_discount,
    data.subject_code, data.subject_title, data.lec_units, data.lab_units, data.credit_units, data.tuition_units,
    data.subject_section, data.subject_schedule_room, data.subject_faculty,
    data.total_lec_units, data.total_lab_units, data.total_credit_units, data.total_tuition,
    data.tuition, data.athletic_fee, data.cultural_fee, data.development_fee, data.guidance_fee,
    data.library_fee, data.medical_dental_fee, data.registration_fee, data.computer_fee,
    data.laboratory_fee, data.total_assessment, data.less_financial_aid, data.net_assessed,
    data.credit_memo, data.total_discount, data.total_payment, data.outstanding_balance,
    data.first_payment_due, data.second_payment_due, data.third_payment_due,
    data.payment_validation_date, data.official_receipt,
    registration_no
  ];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed", error: err });
    res.json({ message: "Registration updated" });
  });
});

// Delete a registration
app.delete("/api/registrations/:registration_no", (req, res) => {
  const { registration_no } = req.params;
  const sql = "DELETE FROM certificate_of_registration WHERE registration_no = ?";
  db.query(sql, [registration_no], (err, result) => {
    if (err) return res.status(500).json({ message: "Delete failed", error: err });
    res.json({ message: "Registration deleted" });
  });
});


// =================== SERVER =================== //
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
