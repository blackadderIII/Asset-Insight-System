 // you'd have to install everything from line 3 - 8 (npm install)
// aside express(line 4), use their names to install them.
// they are exactly as you see them in the "". eg. npm install bcryptjs


//use the line below to install express
// npm install "express@>=5.0.0-beta.1" --save
// copy everything above expect the '//'
import express, { json } from "express";
// import nodemailer from 'nodemailer'; // this is for sending mails
// import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mysql from "mysql2";
import cors from "cors";
// import { Stream } from "nodemailer/lib/xoauth2";

// configurations for express to work properly
dotenv.config();
const app = express();
app.use(express.json(), cors());

// configurations for mysql to work
// you'll need to create a .env file in the same directory/ folder you'll put this file in
// I'll attach an example.
const conn = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
});
//  console.log(process.env)
// test
app.get("/test", (req, res) => {
    conn.execute('SELECT * FROM admin', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Something Broke!");
        } else {
            console.log(results);
            res.send("This is a test");
        }
    });
});

conn.on('connection', () => {
    const { host, port } = conn.config;
    console.log(`Connected to database ${host} on port ${port}`);
  });



// general error
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something Broke!");
});

// listen
const port = process.env.PORT;
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on ${port}`);
});