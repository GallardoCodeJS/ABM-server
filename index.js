const express = require("express");
const cors = require("cors");
const app = express();

//Llama la clase mysql
const mysql = require('mysql');

//Session
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Mysql Conection
const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "Sanmiguel2018$.",
    database: "basenacho",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

//Session % Cookies
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}
));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(
    session({
        key: "useID",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
)

//Use of express
app.use(express.json());


//Select all user form user table
app.get("/api/loginselect", (req, res) => {
    const sqlSelect = "SELECT * FROM user";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});

//Select by MYSQL
app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM persona";
    db.query(sqlSelect, (err, result) => {
        //console.log(result);
        res.send(result);
    });
});

//Take the Session from frontend
app.get("/api/login", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user });
    } else {
        res.send({ loggedIn: false });
    }
});

//Login de usuario con session y cookies!
app.post("/api/login", (req, res) => {
    const id = req.body.id
    const pass = req.body.pass;

    db.query(
        "SELECT * FROM user WHERE Id = ? AND Password = ?;",
        [id, pass],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                //Guarda los datos en una cookie
                req.session.user = result;
                console.log(req.session.user);
                res.send(result);
            } else {
                res.send({ message: "Error caca culo" });
            }
        }
    );
});


//Editar usuario
app.post("/api/useredit", (req, res) => {
    const Ci = req.body.Ci
    const Name = req.body.Name
    const Age = req.body.Age
    const Email = req.body.Email

    const sqlUpdate = "UPDATE persona SET Age = ?, Name = ?, Email = ? WHERE Ci = ?";
    db.query(sqlUpdate, [Age, Name, Email, Ci], (err, result) => {
        console.log(result);
    })
});

//Eliminar usuario
app.post("/api/userdelete", (req, res) => {
    const Ci = req.body.Ci

    const sqlDelete = "DELETE FROM persona WHERE Ci = ?";
    db.query(sqlDelete, [Ci], (err, result) => {
        console.log(result);
    })
    //console.log("Cedula eliminada es:" +ci);
});

//Insert user by MYSQL
app.post("/api/insert", (req, res) => {

    const Ci = req.body.Ci
    const Age = req.body.Age
    const Name = req.body.Name
    const Email = req.body.Email

    const sqlInsert = "INSERT INTO persona (Ci, Age, Name, Email) VALUES (?,?,?,?)";
    db.query(sqlInsert, [Ci, Age, Name, Email], (err, result) => {
        console.log(result);
    });
});

//Listening
app.listen(3001, () => {
    console.log("Corriendo en puerto 3001");
});

