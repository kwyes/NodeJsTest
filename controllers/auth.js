const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});


exports.register = (req,res) => {
    console.log(req.body);

    const name = req.body.first_name + ' ' + req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    
    db.query('SELECT email FROM users WHERE email = ?', [email], (error, results) => {
        if(error) {
            console.log(error);
        } 

        if(results.length > 0) {
            return res.render('register', {
                message : "That email is already in use"
            })
        }

        let hashedPassword  = bcrypt.hash(password, 8);
        console.log(hashedPassword);
    });

    res.send("form sumitted");
}