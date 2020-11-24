const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
//Llama la clase mysql
const mysql = require('mysql');

//Mysql Conection
const db = mysql.createPool({
    host:"127.0.0.1",
    user:"root",
    password:"Sanmiguel2018$.",
    database:"basenacho"
});

//Revisar
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

//Select all user form user table
app.get("/api/loginselect",(req,res) => {
    const sqlSelect = "SELECT * FROM user";
    db.query(sqlSelect,(err,result)=>{
        res.send(result);
    });
});

//Select by MYSQL
app.get("/api/get",(req,res) => {
    const sqlSelect = "SELECT * FROM persona";
    db.query(sqlSelect,(err,result)=>{
        //console.log(result);
        res.send(result);
    });
});

//Get informatio for login
app.post("/api/login",(req,res)=>{
        
    const id    = req.body.id
    const user  = req.body.user
    const pass  = req.body.pass

    const sqlSelect = "SELECT * FROM user WHERE Id = ?";
    db.query(sqlSelect, [id], (err,result)=>{
        res.send(result);
    });
});

//Editar usuario
app.post("/api/useredit",(req,res) =>{
    const Ci    = req.body.Ci
    const Name  = req.body.Name
    const Age   = req.body.Age
    const Email = req.body.Email

    const sqlUpdate = "UPDATE persona SET Age = ?, Name = ?, Email = ? WHERE Ci = ?";
    db.query(sqlUpdate, [Age,Name,Email,Ci], (err,result) => {
        console.log(result);
    })
});

//Eliminar usuario
app.post("/api/userdelete",(req,res) => {
    const Ci = req.body.Ci

    const sqlDelete = "DELETE FROM persona WHERE Ci = ?";
    db.query(sqlDelete, [Ci], (err,result) => {
        console.log(result);
    })
    //console.log("Cedula eliminada es:" +ci);
});

//Mirar usuario
app.post("/api/userview",(req,res) => {
    const Ci = req.body.Ci
    console.log("Cedula a mirar:" +Ci);
});

//Insert user by MYSQL
app.post("/api/insert",(req,res) =>{

    const Ci    = req.body.Ci
    const Age   = req.body.Age
    const Name  = req.body.Name
    const Email = req.body.Email

    const sqlInsert = "INSERT INTO persona (Ci, Age, Name, Email) VALUES (?,?,?,?)";
    db.query(sqlInsert, [Ci,Age,Name,Email] , (err,result) => {
        console.log(result);
    });    
});

//Listening
app.listen(3001,()=>{
    console.log("Corriendo en puerto 3001");
});

