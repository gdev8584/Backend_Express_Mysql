const express = require('express');
const mysql = require('mysql')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const db = mysql.createConnection({
    host: 'localhost',
    port:'3306',
    user: 'root',
    password:'abc123',
    database: 'profile_create'
})
db.connect((err)=>{
    if(err){throw err}

db.query(`CREATE DATABASE IF NOT EXISTS profile_create`,(err)=>{
    if(err){throw err}

db.query(`CREATE TABLE IF NOT EXISTS customers (
    customerId INT AUTO_INCREMENT PRIMARY KEY, name varchar(255), email varchar(255)
)`,(err)=>{
    if(err){throw err}
})})})


app.post("/api/create",(req,res)=>{
    const { name, email } = req.body;
    const script = `INSERT INTO customers (name, email) VALUES (?,?)`;
    db.query(script, [name, email], (err,result)=>{
        if(err) res.send(`Data not stored in DB`)
        else res.send(`DATA Store in db: ${result.name}`)
    })
})

app.listen(3000, ()=>{
    console.log("server is running")
})