const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

const { Client } = require('pg');

const client = new Client({
    user: 'board_admin',
    host: 'localhost',
    database: 'board',
    password: '1234',
    port: 5432,
});

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// const createTable = async () => {
//     const queryText = `CREATE TABLE IF NOT EXISTS user_table (
//         id SERIAL PRIMARY KEY,
//         user_id VARCHAR(255) UNIQUE NOT NULL,
//         password VARCHAR(255) NOT NULL,
//         gender CHAR(1) CHECK (gender IN ('M','F','O'))
//     )`;
//     try {
//         await pool.query(queryText);
//         console.log('query 정상 생성');
//     } catch (err) {
//         console.error(err);
//     }
// };
// createTable();
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
// 회원가입
app.post('/user', async (req, res) => {
    const { id, pwd, gender } = req.body;
    const client = await pool.connect();
    try {
        const result = await client.query('INSERT INTO "user"(user_id, pwd, gender) VALUES($1, $2, $3) RETURNING *', [
            id,
            pwd,
            gender,
        ]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});
app.get('/user', async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT * FROM "user"');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
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
    console.log(`port : ${port}`);
});
