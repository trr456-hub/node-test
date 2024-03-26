const express = require('express');
const cors = require('cors');
const app = express();
const port = 3050;

app.use(cors());
app.use(express.json());

const { Client } = require('pg');

const client = new Client({
    user: 'board_admin',
    host: 'localhost',
    database: 'board',
    password: '1234',
    port: 5432,
});

client.connect();

app.listen(port, () => {
    console.log(`PORT : ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello API');
});

app.post('/insert', async (req, res) => {
    const { text_title, text, user_name } = req.body;
    console.log(text_title, text, user_name);
    try {
        const result = await client.query(
            'INSERT INTO board_list(text_title, text, user_name) VALUES($1, $2, $3) RETURNING *',
            [text_title, text, user_name]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
    }
});
// client.query(
//     `
//     CREATE TABLE board_list (
//         id SERIAL PRIMARY KEY,
//         user_name VARCHAR(255) UNIQUE NOT NULL,
//         text VARCHAR(2000) NOT NULL,
//         text_title VARCHAR(255) NOT NULL,
//         time TIMESTAMPTZ
//     )
// `,
//     (err, res) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log('테이블 생성 성공');
//         }
//     }
// );
