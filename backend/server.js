const express = require('express');
const app = express();
const port = 4000;

const { Pool } = require('pg');

const pool = new Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'mydatabase',
    password: 'mypassword',
    port: 5432,
});

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// pool.connect();

// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res);
//     pool.end();
// });

app.get('/', async (req, res) => {
    res.send('안녕 API');
});
// 글 저장 API
app.post('/posts', async (req, res) => {
    const { title, content } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO posts(title, content) VALUES($1, $2) RETURNING *', [
            title,
            content,
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});
// 글 조회 API
app.get('/posts', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM posts');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});
// app.post('/text', (req, res) => {
//     // req
//     const text1 = req.body.inText;
//     console.log(text1);

//     //res
//     const sendText = {
//         text: 'send success',
//     };

//     res.send(sendText);
// });
// app.get('/hipen', (req, res) => {
//     // req
//     const textArr = ['rla', 'tjr', 'rms'];
//     // console.log(textArr);

//     // res
//     res.json(textArr);
// });

app.listen(port, () => {
    console.log(`서버실행 port : ${port}`);
});
