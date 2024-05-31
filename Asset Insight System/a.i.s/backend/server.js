import express, { json } from "express";
import nodemailer from "nodemailer"; // this is for sending mails
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";
import exceljs from "exceljs";
const { Workbook } = exceljs;
import multer from "multer";
import * as path from "path";
// import * as fs from 'fs'
// import * as https from 'https'

// configurations for express to work properly
dotenv.config();
const app = express();
app.use(express.json(), cors());

// configurations for mysql to work
// you'll need to create a .env file in the same directory/ folder you'll put this file in
const conn = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: true,
});

const today = new Date();
const day = today.getDate();
const month = today.getMonth();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const year = today.getFullYear();
const todayDate = `${day} ${months[month]} ${year}`;
const formattedDate = today
  .toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/\//g, "");
const hour = today.getHours();
const minute = today.getMinutes();
const amOrPm = hour >= 12 ? "PM" : "AM";
const time = `${hour}:${minute} ${amOrPm}`;

let uploadedFileName;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../src/profiles/");
  },
  filename: (req, file, cb) => {
    const fileName = Math.floor(Math.random() * 9000000000) + 1000000000;
    cb(null, fileName + path.extname(file.originalname));
    uploadedFileName = fileName + path.extname(file.originalname);
  },
});

const upload = multer({ storage: storage });

// Email Functions
const DevEmail = process.env.DevEmail;
const DevPass = process.env.DevPass;
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: DevEmail,
    pass: DevPass,
  },
});

// test
app.get("/test", (req, res) => {
  res.send("This is a test");
});

// search bar api
app.get("/searchAsset/:category/:sn/:brand/:username", (req, res) => {
  const category = req.params.category;
  const sn = req.params.sn;
  const brand = req.params.brand;
  const username = req.params.username;
  const query =
    "SELECT * FROM assets WHERE category = ? AND (sn REGEXP ? OR brand REGEXP ? or username REGEXP ?)";

  conn.query(query, [category, sn, brand, username], (err, info) => {
    if (err) {
      console.log("Error Executing Query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    return res.json(info);
  });
});

// search user api
app.get("/searchUsers/:username", (req, res) => {
  const username = req.params.username;
  const query = "SELECT * FROM users WHERE username REGEXP ?";

  conn.query(query, username, (err, info) => {
    if (err) {
      console.log("Error Executing Query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    return res.json(info);
  });
});

// ADMIN
// get admin info
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM admin WHERE email = ?";

  conn.query(query, email, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }

    const passwordCheck = bcrypt.compareSync(password, info[0].password);

    if (passwordCheck) {
      return res.json({ message: "Success", user: info[0] });
    } else {
      return res.json({ message: "Incorrect Credentials" });
    }
  });
});

app.get("/sendCode/:email", (req, res) => {
  const generatedCode = Math.floor(Math.random() * 9000) + 1000;
  const email = req.params.email;
  const fetchUser = "SELECT * FROM admin WHERE email = ?";
  const query = "UPDATE admin SET code = ? WHERE email = ?";
  const message = `
    <div style="text-align: left;">
        <p>Hello,</br>
            Use the code below to reset to reset your password for Asset Manager.io
        </p>
        <h1 style="letter-spacing: 1px; color: #1e90ff;">${generatedCode}</h1>
        <p style="font-size: 15px;">
            If you didn't make this request, kindly ignore this email.
        </p>
        <span style="font-size: 12px; opacity: .4;">
            Asset Manager.io Support
        </span>
    </div>
    `;
  const mailOptions = {
    from: "Asset Manager.io Support <ace19dev@gmail.com>",
    to: email,
    subject: "Reset Password Code for Asset Manager,io",
    html: message,
  };

  conn.query(fetchUser, email, (err, result) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (result.length === 0) {
      return res.json({ message: "Account does not exist" });
    }
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending mail", error);
        return res.json({ message: "Error sending mail" });
      }
      conn.query(query, [generatedCode, email], (fail, pass) => {
        if (fail) {
          console.log("Error executing query", fail);
          return res.json({ message: "Error executing query" });
        }
        return res.json(pass);
      });
    });
  });
});

app.post("/verifyCode", (req, res) => {
  const { email, code } = req.body;
  const query = "SELECT code FROM admin WHERE email = ?";

  conn.query(query, email, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error exeuting query" });
    }
    const dbCode = info[0].code;
    console.log(code);
    if (code !== dbCode) {
      return res.json({ message: "Code does not match" });
    } else {
      return res.json({ message: "Code match" });
    }
  });
});

app.post("/resetPassword", (req, res) => {
  const { email, password } = req.body;
  const query = "UPDATE admin SET password = ? WHERE email = ?";
  const encrypted = bcrypt.hashSync(password, 13);

  conn.query(query, [encrypted, email], (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error exeuting query" });
    }
    if (info.affectedRows === 0) {
      return res.json({ message: "No change occured" });
    }
    return res.json(info);
  });
});

app.post("/changePassword", (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const fetchSQL = `SELECT password FROM admin WHERE email = ?`;
  const changeSQL = `UPDATE admin SET password = ? WHERE email = ?`;

  conn.query(fetchSQL, email, (err, info) => {
    if (err) {
      console.log("error executing query", err);
      return res.json({ message: "error executing query" });
    }
    const oldPassDB = info[0].password;
    const passMatch = bcrypt.compareSync(oldPassword, oldPassDB);

    if (!passMatch) {
      return res.json({ message: "password does not match" });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 13);

    conn.query(changeSQL, [hashedPassword, email], (error, pass) => {
      if (error) {
        console.log("error executing query", error);
        return res.json({ message: "error executing query" });
      } else if (pass.affectedRows === 0) {
        return res.json({ message: "an error occured" });
      }
      return res.json({ message: "success" });
    });
  });
});

app.get("/removeProfilePic/:email", (req, res) => {
  const email = req.params.email;
  const sql =
    "UPDATE admin SET profilePicture = 'profile.jpg' WHERE email = ?;";

  conn.query(sql, email, (err, info) => {
    if (err) {
      console.warn("error executing query", err);
      return res.json({ message: "error executing query" });
    }
    return res.json({ message: "success" });
  });
});

app.post("/uploadPP", upload.single("image"), (req, res) => {
  return res.status(200).send("File uploaded");
});

// save profilePic filename to db
app.get("/saveProfilePic/:email", (req, res) => {
  const email = req.params.email;
  const query = "UPDATE admin SET profilePicture = ? WHERE email = ?";

  conn.query(query, [uploadedFileName, email], (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "error executing query" });
    }

    res.json({
      message: "Profile picture Saved",
      profileName: uploadedFileName,
    });
    uploadedFileName = null;
    return;
  });
});

// ASSIGN AND REVOKE
// assign
app.post("/assign", (req, res) => {
  const { sn, username, useremail } = req.body;
  const query =
    "UPDATE assets SET status = ?, username = ?, useremail = ? WHERE sn = ?";

  conn.query(query, ["Assigned", username, useremail, sn], (err, info) => {
    if (err) {
      console.log("error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    return res.json(info);
  });
});

// revoke
app.get("/revoke/:sn", (req, res) => {
  const sn = req.params.sn;
  const query =
    "UPDATE assets SET status = ?, username = ?, useremail = ? WHERE sn = ?";

  conn.query(query, ["Unused", null, null, sn], (err, info) => {
    if (err) {
      console.log("error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    return res.json(info);
  });
});

// DASHBOARD
app.get("/countLaptops", (req, res) => {
  const query =
    "SELECT COUNT(*) as totalLaptops FROM assets WHERE category = 'Laptop';" +
    "SELECT COUNT(*) as assignedLaptops FROM assets WHERE category = 'Laptop' AND status = 'Assigned';" +
    "SELECT COUNT(*) as unusedLaptops FROM assets WHERE category = 'Laptop' AND status = 'Unused';" +
    "SELECT COUNT(*) as retiredLaptops FROM assets WHERE category = 'Laptop' AND status = 'Retired';" +
    "SELECT COUNT(*) as damagedLaptops FROM assets WHERE category = 'Laptop' AND status = 'Damaged';" +
    "SELECT COUNT(*) as outofserviceLaptops FROM assets WHERE category = 'Laptop' AND status = 'Out Of Service'";

  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error exeuting query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    const totalLaptops = info[0][0].totalLaptops;
    const assignedLaptops = info[1][0].assignedLaptops;
    const unusedLaptops = info[2][0].unusedLaptops;
    const retiredLaptops = info[3][0].retiredLaptops;
    const damagedLaptops = info[4][0].damagedLaptops;
    const oosLaptops = info[5][0].outofserviceLaptops;

    return res.json({
      totalLaptops,
      assignedLaptops,
      unusedLaptops,
      retiredLaptops,
      damagedLaptops,
      oosLaptops,
    });
  });

  return;
});

app.get("/countPhones", (req, res) => {
  const query =
    "SELECT COUNT(*) as totalPhones FROM assets WHERE category = 'Phone';" +
    "SELECT COUNT(*) as assignedPhones FROM assets WHERE category = 'Phone' AND status = 'Assigned';" +
    "SELECT COUNT(*) as unusedPhones FROM assets WHERE category = 'Phone' AND status = 'Unused';" +
    "SELECT COUNT(*) as retiredPhones FROM assets WHERE category = 'Phone' AND status = 'Retired';" +
    "SELECT COUNT(*) as damagedPhones FROM assets WHERE category = 'Phone' AND status = 'Damaged';" +
    "SELECT COUNT(*) as outofservicePhones FROM assets WHERE category = 'Phone' AND status = 'Out Of Service'";
  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query");
      return res.json({ message: "Error exeuting query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    const totalPhones = info[0][0].totalPhones;
    const assignedPhones = info[1][0].assignedPhones;
    const unusedPhones = info[2][0].unusedPhones;
    const retiredPhones = info[3][0].retiredPhones;
    const damagedPhones = info[4][0].damagedPhones;
    const oosPhones = info[5][0].outofservicePhones;

    return res.json({
      totalPhones,
      assignedPhones,
      unusedPhones,
      retiredPhones,
      damagedPhones,
      oosPhones,
    });
  });
});

app.get("/countMonitors", (req, res) => {
  const query =
    "SELECT COUNT(*) as totalMonitors FROM assets WHERE category = 'Monitor';" +
    "SELECT COUNT(*) as assignedMonitors FROM assets WHERE category = 'Monitor' AND status = 'Assigned';" +
    "SELECT COUNT(*) as unusedMonitors FROM assets WHERE category = 'Monitor' AND status = 'Unused';" +
    "SELECT COUNT(*) as retiredMonitors FROM assets WHERE category = 'Monitor' AND status = 'Retired';" +
    "SELECT COUNT(*) as damagedMonitors FROM assets WHERE category = 'Monitor' AND status = 'Damaged';" +
    "SELECT COUNT(*) as outofserviceMonitors FROM assets WHERE category = 'Monitor' AND status = 'Out Of Service'";
  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query");
      return res.json({ message: "Error exeuting query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    const totalMonitors = info[0][0].totalMonitors;
    const assignedMonitors = info[1][0].assignedMonitors;
    const unusedMonitors = info[2][0].unusedMonitors;
    const retiredMonitors = info[3][0].retiredMonitors;
    const damagedMonitors = info[4][0].damagedMonitors;
    const oosMonitors = info[5][0].outofserviceMonitors;

    return res.json({
      totalMonitors,
      assignedMonitors,
      unusedMonitors,
      retiredMonitors,
      damagedMonitors,
      oosMonitors,
    });
  });
});

app.get("/countNetworkDevices", (req, res) => {
  const query =
    "SELECT COUNT(*) as totalNDevices FROM assets WHERE category = 'NetworkDevices';" +
    "SELECT COUNT(*) as assignedNDevices FROM assets WHERE category = 'NetworkDevices' AND status = 'Assigned';" +
    "SELECT COUNT(*) as unusedNDevices FROM assets WHERE category = 'NetworkDevices' AND status = 'Unused';" +
    "SELECT COUNT(*) as retiredNDevices FROM assets WHERE category = 'NetworkDevices' AND status = 'Retired';" +
    "SELECT COUNT(*) as damagedNDevices FROM assets WHERE category = 'NetworkDevices' AND status = 'Damaged';" +
    "SELECT COUNT(*) as outofserviceNDevices FROM assets WHERE category = 'NetworkDevices' AND status = 'Out Of Service'";
  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query");
      return res.json({ message: "Error exeuting query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    const totalNDevices = info[0][0].totalNDevices;
    const assignedNDevices = info[1][0].assignedNDevices;
    const unusedNDevices = info[2][0].unusedNDevices;
    const retiredNDevices = info[3][0].retiredNDevices;
    const damagedNDevices = info[4][0].damagedNDevices;
    const oosNDevices = info[5][0].outofserviceNDevices;

    return res.json({
      totalNDevices,
      assignedNDevices,
      unusedNDevices,
      retiredNDevices,
      damagedNDevices,
      oosNDevices,
    });
  });
});

app.get("/countPrinters", (req, res) => {
  const query =
    "SELECT COUNT(*) as totalPrinters FROM assets WHERE category = 'Printer';" +
    "SELECT COUNT(*) as assignedPrinters FROM assets WHERE category = 'Printer' AND status = 'Assigned';" +
    "SELECT COUNT(*) as unusedPrinters FROM assets WHERE category = 'Printer' AND status = 'Unused';" +
    "SELECT COUNT(*) as retiredPrinters FROM assets WHERE category = 'Printer' AND status = 'Retired';" +
    "SELECT COUNT(*) as damagedPrinters FROM assets WHERE category = 'Printer' AND status = 'Damaged';" +
    "SELECT COUNT(*) as outofservicePrinters FROM assets WHERE category = 'Printer' AND status = 'Out Of Service'";
  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error exeuting query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }

    const totalPrinters = info[0][0].totalPrinters;
    const assignedPrinters = info[1][0].assignedPrinters;
    const unusedPrinters = info[2][0].unusedPrinters;
    const retiredPrinters = info[3][0].retiredPrinters;
    const damagedPrinters = info[4][0].damagedPrinters;
    const oosPrinters = info[5][0].outofservicePrinters;

    return res.json({
      totalPrinters,
      assignedPrinters,
      unusedPrinters,
      retiredPrinters,
      damagedPrinters,
      oosPrinters,
    });
  });
});

app.get("/countMisc", (req, res) => {
  const query =
    "SELECT COUNT(*) as totalMiscs FROM assets WHERE category = 'Misc';" +
    "SELECT COUNT(*) as assignedMiscs FROM assets WHERE category = 'Misc' AND status = 'Assigned';" +
    "SELECT COUNT(*) as unusedMiscs FROM assets WHERE category = 'Misc' AND status = 'Unused';" +
    "SELECT COUNT(*) as retiredMiscs FROM assets WHERE category = 'Misc' AND status = 'Retired';" +
    "SELECT COUNT(*) as damagedMiscs FROM assets WHERE category = 'Misc' AND status = 'Damaged';" +
    "SELECT COUNT(*) as outofserviceMiscs FROM assets WHERE category = 'Misc' AND status = 'Out Of Service'";

  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error exeuting query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }

    const totalMiscs = info[0][0].totalMiscs;
    const assignedMiscs = info[1][0].assignedMiscs;
    const unusedMiscs = info[2][0].unusedMiscs;
    const retiredMiscs = info[3][0].retiredMiscs;
    const damagedMiscs = info[4][0].damagedMiscs;
    const oosMiscs = info[5][0].outofserviceMiscs;

    return res.json({
      totalMiscs,
      assignedMiscs,
      unusedMiscs,
      retiredMiscs,
      damagedMiscs,
      oosMiscs,
    });
  });
});

app.get("/countStatus", (req, res) => {
  const query =
    "SELECT COUNT(*) as assigned FROM assets WHERE status = 'Assigned';" +
    "SELECT COUNT(*) as unused FROM assets WHERE status = 'Unused';" +
    "SELECT COUNT(*) as damaged FROM assets WHERE status = 'Damaged';" +
    "SELECT COUNT(*) as retired FROM assets WHERE status = 'Retired';" +
    "SELECT COUNT(*) as oos FROM assets WHERE status = 'Out of Service';";

  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }

    const totalAssigned = info[0][0].assigned;
    const totalUnused = info[1][0].unused;
    const totalDamaged = info[2][0].damaged;
    const totalRetired = info[3][0].retired;
    const totalOOS = info[4][0].oos;

    return res.json({
      totalAssigned,
      totalUnused,
      totalDamaged,
      totalRetired,
      totalOOS,
    });
  });
});

app.get("/recentAssets", (req, res) => {
  const query = "SELECT * FROM assets ORDER BY dateadded DESC LIMIT 5";
  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    return res.json(info);
  });
});

// LAPTOP----------------------------------------
//add laptop
app.post("/addLaptop", (req, res) => {
  const { sn, brand, model, processor, ram, rom, comment, addedby } = req.body;
  const query =
    "INSERT INTO assets (category, sn, brand, model, processor, ram, rom, status, comment, addedby) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  conn.query(
    query,
    [
      "Laptop",
      sn,
      brand,
      model,
      processor,
      ram,
      rom,
      "Unused",
      comment,
      addedby,
    ],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding laptop");
        return res.json({ message: "Error adding laptop" });
      }
      return res.status(201).json({ message: "Laptop Added Successfully" });
    }
  );
});

//save laptop
app.post("/saveLaptop", (req, res) => {
  const { sn, brand, model, processor, ram, rom, status, comment } = req.body;
  const query =
    "UPDATE assets SET brand = ?, model = ?, processor = ?, ram = ?, rom = ?, status = ?, comment = ? WHERE sn = ?";

  conn.query(
    query,
    [brand, model, processor, ram, rom, status, comment, sn],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding laptop");
        return res.json({ message: "Error adding laptop" });
      }
      return res.status(201).json({ message: "Laptop Added Successfully" });
    }
  );
});

// PHONE----------------------------------------
//add phone
app.post("/addPhone", (req, res) => {
  const { sn, brand, model, ram, rom, comment, addedby } = req.body;
  const query =
    "INSERT INTO assets (category, sn, brand, model, ram, rom, status, comment, addedby) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  conn.query(
    query,
    ["Phone", sn, brand, model, ram, rom, "Unused", comment, addedby],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding phone");
        return res.json({ message: "Error adding phone" });
      }
      return res.status(201).json({ message: "Phone Added Successfully" });
    }
  );
});

// save phone
app.post("/savePhone", (req, res) => {
  const { sn, brand, model, ram, rom, status, comment } = req.body;
  const query =
    "UPDATE assets SET brand = ?, model = ?, ram = ?, rom = ?, status = ?, comment = ? WHERE sn = ?";

  conn.query(
    query,
    [brand, model, ram, rom, status, comment, sn],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding Phone");
        return res.json({ message: "Error adding Phone" });
      }
      return res.status(201).json({ message: "Phone Added Successfully" });
    }
  );
});

//add Monitor
app.post("/addMonitor", (req, res) => {
  const { sn, brand, model, comment, addedby } = req.body;
  const query =
    "INSERT INTO assets (category, sn, brand, model, status, comment, addedby) VALUES (?, ?, ?, ?, ?, ?, ?)";

  conn.query(
    query,
    ["Monitor", sn, brand, model, "Unused", comment, addedby],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding monitor");
        return res.json({ message: "Error adding monitor" });
      }
      return res.status(201).json({ message: "monitor Added Successfully" });
    }
  );
});

// save Monitor
app.post("/saveMonitor", (req, res) => {
  const { sn, brand, model, status, comment } = req.body;
  const query =
    "UPDATE assets SET brand = ?, model = ?, status = ?, comment = ? WHERE sn = ?";

  conn.query(query, [brand, model, status, comment, sn], (err, info) => {
    if (err) {
      console.log("Error Executing Query");
      return res.json({ message: "Error Executing Query" });
    }
    if (info.affectedRows === 0) {
      console.log("Error adding Monitor");
      return res.json({ message: "Error adding Monitor" });
    }
    return res.status(201).json({ message: "Monitor Added Successfully" });
  });
});

//add Printer
app.post("/addPrinter", (req, res) => {
  const { sn, brand, model, comment, addedby } = req.body;
  const query =
    "INSERT INTO assets (category, sn, brand, model, status, comment, addedby) VALUES (?, ?, ?, ?, ?, ?, ?)";

  conn.query(
    query,
    ["Printer", sn, brand, model, "Unused", comment, addedby],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding printer");
        return res.json({ message: "Error adding printer" });
      }
      return res.status(201).json({ message: "Printer Added Successfully" });
    }
  );
});

// get Printer
app.get("/getPrinters", (req, res) => {
  const query =
    'SELECT * FROM assets WHERE category = "Printer" ORDER by dateadded DESC';

  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    return res.json(info);
  });
});

//save Printer
app.post("/savePrinter", (req, res) => {
  const { sn, brand, model, status, comment } = req.body;
  const query =
    "UPDATE assets SET brand = ?, model = ?,status = ?, comment = ? WHERE sn = ?";

  conn.query(query, [brand, model, status, comment, sn], (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error Executing Query" });
    }
    if (info.affectedRows === 0) {
      console.log("Error adding printer");
      return res.json({ message: "Error adding printer" });
    }
    return res.status(201).json({ message: "Printer Added Successfully" });
  });
});

// delete Printer
app.get("/deletePrinter/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "DELETE FROM assets WHERE sn = ?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.affectedRows === 0) {
      return res.json({ message: "Empty" });
    }
    return res.status(201);
  });
});

// get Printer for edit
app.get("/getPrinter/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "SELECT * FROM assets WHERE sn = ?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    return res.json(info);
  });
});

// add Network Device
app.post("/addNetwork", (req, res) => {
  const { sn, brand, model, comment, addedby } = req.body;
  const query =
    "INSERT INTO assets (category,sn,brand,model,status,comment,addedby) VALUES (?,?,?,?,?,?,?)";

  conn.query(
    query,
    ["NetworkDevices", sn, brand, model, "Unused", comment, addedby],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding network device");
        return res.json({ message: "Error adding network device" });
      }
      return res
        .status(201)
        .json({ message: "Network Device Added Successfully" });
    }
  );
});

// save Network Device
app.post("/saveNetwork", (req, res) => {
  const { sn, brand, model, status, comment } = req.body;
  const query =
    "UPDATE assets SET brand = ?, model = ?, status = ?, comment = ? WHERE sn = ?";

  conn.query(query, [brand, model, status, comment, sn], (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error Executing Query" });
    }
    if (info.affectedRows === 0) {
      console.log("Error adding network device");
      return res.json({ message: "Error adding network device" });
    }
    return res
      .status(201)
      .json({ message: "Network Device Added Successfully" });
  });
});

//add Miscellaneous
app.post("/addMisc", (req, res) => {
  const { sn, brand, model, otherSpecs, comment, addedby } = req.body;
  const query =
    "INSERT INTO assets (category, sn, brand, model,status,otherSpecs,comment,addedby) VALUES (?, ?, ?, ?, ?, ?,?,?)";

  conn.query(
    query,
    ["Misc", sn, brand, model, "Unused", otherSpecs, comment, addedby],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding printer");
        return res.json({ message: "Error adding printer" });
      }
      return res.status(201).json({ message: "Misc item Added Successfully" });
    }
  );
});

//add user
app.post("/addUser", (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    phonenum,
    department,
    designation,
  } = req.body;

  const query = `INSERT INTO users (firstname,lastname,username,email,phonenumber,department,designation,laptop,phone,monitor,router,printer,misc) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  conn.query(
    query,
    [
      firstname,
      lastname,
      username,
      email,
      phonenum,
      department,
      designation,
      "0",
      "0",
      "0",
      "0",
      "0",
      "0",
    ],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding user");
        return res.json({ message: "Error adding user" });
      }
      return res.status(201).json({ message: "User Added Successfully" });
    }
  );
});

//save user
app.post("/saveUser", (req, res) => {
  const {
    firstname,
    lastname,
    username,
    email,
    phonenumber,
    department,
    designation,
  } = req.body;
  const query = `UPDATE users SET firstname = ?, lastname = ?, username = ?, email = ?, phonenumber = ?, department = ?, designation = ? WHERE email = ?`;

  conn.query(
    query,
    [
      firstname,
      lastname,
      username,
      email,
      phonenumber,
      department,
      designation,
      email,
    ],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding user");
        return res.json({ message: "Error adding user" });
      }
      return res.status(201).json({ message: "User Added Successfully" });
    }
  );
});

// GET----------------------------------------

// ------LAPTOPS FUNCTIONS------

// get Laptops
app.get("/getlaptops", (req, res) => {
  const query =
    'SELECT * FROM assets WHERE category = "Laptop" ORDER BY dateadded DESC';

  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    return res.json(info);
  });
});

// get Laptop for edit
app.get("/getlaptop/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "SELECT * FROM assets WHERE sn=?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    return res.json(info);
  });
});

// delete Laptop
app.get("/deleteLaptop/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "DELETE FROM assets WHERE sn = ?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.affectedRows === 0) {
      return res.json({ message: "Empty" });
    }
    return res.status(201);
  });
});
// ------PHONES FUNCTIONS------

// get Phones
app.get("/getPhones", (req, res) => {
  const query =
    'SELECT * FROM assets WHERE category = "Phone" ORDER by dateadded DESC';

  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    return res.json(info);
  });
});

// get Phone for edit
app.get("/getPhone/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "SELECT * FROM assets WHERE sn=?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    return res.json(info);
  });
});

// delete Phone
app.get("/deletePhone/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "DELETE FROM assets WHERE sn = ?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.affectedRows === 0) {
      return res.json({ message: "Empty" });
    }
    return res.status(201);
  });
});

// ----NETWORK DEVICES FUNCTIONS-----

// get network devices
app.get("/getNetworks", (req, res) => {
  const query =
    'SELECT * FROM assets WHERE category = "NetworkDevices" ORDER BY dateadded DESC';

  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    return res.json(info);
  });
});

// get network devices for edit
app.get("/getNetworkInfo/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "SELECT * FROM assets WHERE sn = ?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    return res.json(info);
  });
});

// delete network devices
app.get("/deleteNetwork/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "DELETE FROM assets WHERE sn = ?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.affectedRows === 0) {
      return res.json({ message: "Empty" });
    }
    return res.status(201);
  });
});

// ----MONITOR FUNCTIONS-----
// get Monitors
app.get("/getMonitors", (req, res) => {
  const query = `SELECT * FROM assets WHERE category ="Monitor" ORDER by dateadded DESC `;

  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    return res.json(info);
  });
});

// get monitors for edit
app.get("/getMonitorInfo/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "SELECT * FROM assets WHERE sn = ?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    return res.json(info);
  });
});

// delete Monitor
app.get("/deleteMonitor/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "DELETE FROM assets WHERE sn = ?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.affectedRows === 0) {
      return res.json({ message: "Empty" });
    }
    return res.status(201);
  });
});

// get user
app.get("/getUsers", (req, res) => {
  const query = `SELECT * FROM users ORDER BY firstname ASC`;

  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    return res.json(info);
  });
});

// get user for edit
app.get("/getUser/:email", (req, res) => {
  const email = req.params.email;
  const query = "SELECT * FROM users WHERE email = ?";

  conn.query(query, email, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    return res.json(info);
  });
});

// delete User
app.get("/deleteUser/:email", (req, res) => {
  const email = req.params.email;
  const query = "DELETE FROM users WHERE email = ?";

  conn.query(query, email, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    return res.json(info);
  });
});

// get Misc
app.get("/getMiscs", (req, res) => {
  const query =
    'SELECT * FROM assets WHERE category = "Misc" ORDER by dateadded DESC';

  conn.query(query, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.length === 0) {
      return res.json({ message: "Empty" });
    }
    return res.json(info);
  });
});

//save Misc
app.post("/saveMisc", (req, res) => {
  const { sn, brand, model, status, otherSpecs, comment } = req.body;
  const query =
    "UPDATE assets SET brand = ?, model = ?,status = ?,otherspecs = ? ,comment = ? WHERE sn = ?";

  conn.query(
    query,
    [brand, model, status, otherSpecs, comment, sn],
    (err, info) => {
      if (err) {
        console.log("Error executing query", err);
        return res.json({ message: "Error Executing Query" });
      }
      if (info.affectedRows === 0) {
        console.log("Error adding laptop");
        return res.json({ message: "Error adding Misc" });
      }
      return res.status(201).json({ message: "Misc Added Successfully" });
    }
  );
});

// delete Misc
app.get("/deleteMisc/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "DELETE FROM assets WHERE sn = ?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    if (info.affectedRows === 0) {
      return res.json({ message: "Empty" });
    }
    return res.status(201);
  });
});

// get Misc for edit
app.get("/getMiscInfo/:sn", (req, res) => {
  const serialNumber = req.params.sn;
  const query = "SELECT * FROM assets WHERE sn = ?";

  conn.query(query, serialNumber, (err, info) => {
    if (err) {
      console.log("Error executing query", err);
      return res.json({ message: "Error executing query" });
    }
    return res.json(info);
  });
});

app.get("/getUserAsset/:user", (req, res) => {
  const user = req.params.user;
  const query =
    "SELECT COUNT(*) AS totalLaptops FROM assets WHERE useremail = ? AND category = 'Laptop';" +
    "SELECT COUNT(*) AS totalPhones FROM assets WHERE useremail = ? AND category = 'Phone';" +
    "SELECT COUNT(*) AS totalMonitors FROM assets WHERE useremail = ? AND category = 'Monitor';" +
    "SELECT COUNT(*) AS totalMisc FROM assets WHERE useremail = ? AND category = 'Misc';";
  conn.query(query, [user, user, user, user, user], (err, info) => {
    if (err) {
      console.log("error executing query", err);
      return res.json("error executing query");
    }
    const totalLaptop = info[0][0].totalLaptops;
    const totalPhone = info[1][0].totalPhones;
    const totalMonitor = info[2][0].totalMonitors;
    const totalMisc = info[3][0].totalMisc;
    return res.json({
      laptops: totalLaptop,
      phones: totalPhone,
      monitors: totalMonitor,
      misc: totalMisc,
    });
  });
});

// EXPORT LAPTOPS
app.get("/exportLaptops", (req, res) => {
  const query = `SELECT * FROM assets WHERE category = 'Laptop';`;
  conn.query(query, async (error, info) => {
    if (error) {
      console.log("Error executing query", error);
      return res.send("error executing query");
    }
    if (info.length === 0) {
      console.log("Empty List");
      return res.send("nothing to export");
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Laptops");
    worksheet.columns = [
      { header: "SN", key: "sn" },
      { header: "Brand", key: "brand" },
      { header: "Model", key: "model" },
      { header: "Processor", key: "processor" },
      { header: "RAM", key: "ram" },
      { header: "ROM", key: "rom" },
      { header: "Assigned User", key: "assigneduser" },
      { header: "Status", key: "status" },
      { header: "Date Added", key: "dateadded" },
      { header: "Comment", key: "comment" },
    ];

    info.forEach((row) => {
      worksheet.addRow({
        sn: row.sn,
        brand: row.brand,
        model: row.model,
        processor: row.processor,
        ram: row.ram,
        rom: row.rom,
        assigneduser: row.username,
        status: row.status,
        dateadded: row.dateadded,
        comment: row.comment,
      });
    });

    worksheet.getRow(1).font = { bold: true };

    const fileBuffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Laptops_${formattedDate}.xlsx`
    );
    res.send(fileBuffer);
    return;
  });
});

// EXPORT PHONES
app.get("/exportPhones", (req, res) => {
  const query = `SELECT * FROM assets WHERE category = 'Phone';`;
  conn.query(query, async (error, info) => {
    if (error) {
      console.log("Error executing query", error);
      return res.send("error executing query");
    }
    if (info.length === 0) {
      console.log("Empty List");
      return res.send("nothing to export");
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Laptops");
    worksheet.columns = [
      { header: "SN", key: "sn" },
      { header: "Brand", key: "brand" },
      { header: "Model", key: "model" },
      { header: "RAM", key: "ram" },
      { header: "ROM", key: "rom" },
      { header: "Assigned User", key: "assigneduser" },
      { header: "Status", key: "status" },
      { header: "Date Added", key: "dateadded" },
      { header: "Comment", key: "comment" },
    ];

    info.forEach((row) => {
      worksheet.addRow({
        sn: row.sn,
        brand: row.brand,
        model: row.model,
        ram: row.ram,
        rom: row.rom,
        assigneduser: row.username,
        status: row.status,
        dateadded: row.dateadded,
        comment: row.comment,
      });
    });

    worksheet.getRow(1).font = { bold: true };

    const fileBuffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Phones_${formattedDate}.xlsx`
    );
    res.send(fileBuffer);
    return;
  });
});

// EXPORT MONITORS
app.get("/exportMonitors", (req, res) => {
  const query = `SELECT * FROM assets WHERE category = 'Monitor';`;
  conn.query(query, async (error, info) => {
    if (error) {
      console.log("Error executing query", error);
      return res.send("error executing query");
    }
    if (info.length === 0) {
      console.log("Empty List");
      return res.send("nothing to export");
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Monitors");
    worksheet.columns = [
      { header: "SN", key: "sn" },
      { header: "Brand", key: "brand" },
      { header: "Model", key: "model" },
      { header: "Assigned User", key: "assigneduser" },
      { header: "Status", key: "status" },
      { header: "Date Added", key: "dateadded" },
      { header: "Comment", key: "comment" },
    ];

    info.forEach((row) => {
      worksheet.addRow({
        sn: row.sn,
        brand: row.brand,
        model: row.model,
        assigneduser: row.username,
        status: row.status,
        dateadded: row.dateadded,
        comment: row.comment,
      });
    });

    worksheet.getRow(1).font = { bold: true };

    const fileBuffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Monitors_${formattedDate}.xlsx`
    );
    res.send(fileBuffer);
    return;
  });
});

// EXPORT NETWORK DEVICES
app.get("/exportNetworkDevices", (req, res) => {
  const query = `SELECT * FROM assets WHERE category = 'NetworkDevices';`;
  conn.query(query, async (error, info) => {
    if (error) {
      console.log("Error executing query", error);
      return res.send("error executing query");
    }
    if (info.length === 0) {
      console.log("Empty List");
      return res.send("nothing to export");
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Network Devices");
    worksheet.columns = [
      { header: "SN", key: "sn" },
      { header: "Brand", key: "brand" },
      { header: "Model", key: "model" },
      { header: "Assigned User", key: "assigneduser" },
      { header: "Status", key: "status" },
      { header: "Date Added", key: "dateadded" },
      { header: "Comment", key: "comment" },
    ];

    info.forEach((row) => {
      worksheet.addRow({
        sn: row.sn,
        brand: row.brand,
        model: row.model,
        assigneduser: row.username,
        status: row.status,
        dateadded: row.dateadded,
        comment: row.comment,
      });
    });

    worksheet.getRow(1).font = { bold: true };

    const fileBuffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=NetworkDevices_${formattedDate}.xlsx`
    );
    res.send(fileBuffer);
    return;
  });
});

// EXPORT PRINTERS
app.get("/exportPrinters", (req, res) => {
  const query = `SELECT * FROM assets WHERE category = 'Printer';`;
  conn.query(query, async (error, info) => {
    if (error) {
      console.log("Error executing query", error);
      return res.send("error executing query");
    }
    if (info.length === 0) {
      console.log("Empty List");
      return res.send("nothing to export");
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Printers");
    worksheet.columns = [
      { header: "SN", key: "sn" },
      { header: "Brand", key: "brand" },
      { header: "Model", key: "model" },
      { header: "Assigned User", key: "assigneduser" },
      { header: "Status", key: "status" },
      { header: "Date Added", key: "dateadded" },
      { header: "Comment", key: "comment" },
    ];

    info.forEach((row) => {
      worksheet.addRow({
        sn: row.sn,
        brand: row.brand,
        model: row.model,
        assigneduser: row.username,
        status: row.status,
        dateadded: row.dateadded,
        comment: row.comment,
      });
    });

    worksheet.getRow(1).font = { bold: true };

    const fileBuffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Printers_${formattedDate}.xlsx`
    );
    res.send(fileBuffer);
    return;
  });
});

// EXPORT MISC
app.get("/exportMisc", (req, res) => {
  const query = `SELECT * FROM assets WHERE category = 'Misc';`;
  conn.query(query, async (error, info) => {
    if (error) {
      console.log("Error executing query", error);
      return res.send("error executing query");
    }
    if (info.length === 0) {
      console.log("Empty List");
      return res.send("nothing to export");
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Misc");
    worksheet.columns = [
      { header: "SN", key: "sn" },
      { header: "Brand", key: "brand" },
      { header: "Model", key: "model" },
      { header: "Other Specifications", key: "otherSpecs" },
      { header: "Assigned User", key: "assigneduser" },
      { header: "Status", key: "status" },
      { header: "Date Added", key: "dateadded" },
      { header: "Comment", key: "comment" },
    ];

    info.forEach((row) => {
      worksheet.addRow({
        sn: row.sn,
        brand: row.brand,
        model: row.model,
        otherSpecs: row.otherSpecs,
        assigneduser: row.username,
        status: row.status,
        dateadded: row.dateadded,
        comment: row.comment,
      });
    });

    worksheet.getRow(1).font = { bold: true };

    const fileBuffer = await workbook.xlsx.writeBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Miscellaneous_${formattedDate}.xlsx`
    );
    res.send(fileBuffer);
    return;
  });
});

// general error
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something Broke!");
});

// listen
const port = process.env.PORT;
app.listen(port, "0.0.0.0", () => {
  console.log(`Listening on ${port}`);
});
    const host = process.env.MYSQL_HOST;
    const db = process.env.MYSQL_DATABASE
    console.log(`Connected to database ${db} on ${host} port ${port}`);
