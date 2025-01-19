import express from 'express';
import mysql from 'mysql';

const app = express();

//MySql database connection
const dbConfig = {
    host : 'bqt5v9ctddrnozb65kaa-mysql.services.clever-cloud.com',
    user : 'umst8fma6so2bxzk',
    password : '9ynkqcMmpccVQu4DK772',
    database : 'bqt5v9ctddrnozb65kaa',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if(err){
        console.error('Error connecting to MySql', err.message);
        return;
    }else{
        console.log('Connected to MySql');
    }
});

//-----------------------------------------

//Connect to the mysql database
app.get ('/book', (req, res)=>{
    const query = 'SELECT * FROM books';

    connection.query(query, (err, results) => {
        if(err) {
            console.error ('Error fetching data:', err.message);
            res.status(500).json({error:'Error fetching data from database' });
        }else{
            res.json(results);
        }
    });
});

app.get('/about', (req, res)=>{
    res.send("About us");
});

app.get('/', (req, res)=>{
    res.send("Hello world!");
});

app.listen(5019, () => {
    console.log("Server is running on port 5019"); 
});