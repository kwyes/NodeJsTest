const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({path:'./.env'});
const app = express();

const db = mysql.createConnection({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    multipleStatements : true
});

const publicDirectory = path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.set('view engine', 'hbs');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

db.connect((error)=>{
    if(error) {
        console.log('connection failed' + error);
    } else {
        console.log('Connected')
    }

})

app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));



app.listen(5000, () => {
    console.log("Server started on Port 5000");
});