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

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    
    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error);
        } 

        if(results.length > 0) {
            console.log('test');
            return res.render('register', {
                message : "That email is already in use"
            });
        } 

        let hashedPassword  = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {name : name, email:email, password:hashedPassword},(error,results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message : "User Registered"
                });
            }


        });
    });

}



exports.login = (req,res) => {

    const email = req.body.email;
    const password = req.body.password;
    
    db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        if(error) {
            console.log(error);
        } 

        if(results.length > 0) {
            console.log('success');
            if(bcrypt.compareSync(password, results[0].password)) {
                return res.render('login', {
                    message : "Successful!"
                });  
            } else {
                return res.render('login', {
                    message : "Incorrect Username and/or Password!"
                });
            }           
        } else {
            return res.render('login', {
                message : "Incorrect Username and/or Password!"
            });  
        }

       
    });

}