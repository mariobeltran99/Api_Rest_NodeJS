const express = require('express');
const  mysql = require('mysql');

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3050;

const app = express();

app.use(bodyParser.json());

//MySQL
const connection = mysql.createConnection({
    host: 'sql3.freemysqlhosting.net',
    user: 'sql3372248',
    password: 'yCYH9Q6iB1',
    database: 'sql3372248'
});
//Route
app.get('/',(req, res) =>{
   res.send('Welcome to my first API');
});

//all products
app.get('/products',(req,res) =>{
    const sql = 'SELECT * FROM products';
    connection.query(sql, (err, result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.json(result);
        }else{
            res.send('Empty');
        }
    });
});

app.post('/add',(req, res) =>{
    const sql = 'INSERT INTO products SET ?';
    const productObj = {
        name: req.body.name,
        existence: req.body.existence
    }
    connection.query(sql, productObj, err => {
        if(err) throw err;
        res.send('product created!');
    });
});

app.put('/update/:id',(req,res)=>{
    const { id } = req.params;
    const { name, existence } = req.body;
    const sql = `UPDATE products SET name = '${name}', existence='${existence}' WHERE id=${id}`;
    connection.query(sql, err => {
        if(err) throw err;
        res.send('product updated!');
    });
});

app.delete('/delete/:id',(req,res)=>{
    const { id } = req.params;
    const sql = `DELETE FROM products WHERE id=${id}`;
    connection.query(sql, err => {
        if(err) throw err;
        res.send('product deleted!');
    });
});

connection.connect(ex => {
    if(ex) throw ex;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
