const express = require('express');
const  mysql = require('mysql');

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json());

//MySQL
const pool = mysql.createPool({
    connectionLimit: 0,
    host: 'us-cdbr-east-02.cleardb.com',
    user: 'b50996897e29fa',
    password: 'd32fe828',
    database: 'heroku_55f48c258b2b7b1'
});
//Route
app.get('/',(req, res) =>{
   res.send('Welcome to my first API');
});

//all products
app.get('/products',(req,res) =>{
    pool.getConnection(function (err, connection){
        const sql = 'SELECT * FROM products';
        connection.query(sql, (err, result)=>{
            if(err) throw err;
            if(result.length > 0){
                res.json(result);
                connection.release();
            }else{
                res.send('Empty');
            }
        });
    });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
