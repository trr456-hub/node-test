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

app.get('/select', async (req, res) => {
    const result = await client.query('SELECT * FROM board_list');
    try {
        res.json(result.rows);
    } catch (error) {
        console.error(error);
    }
});

app.post('/del', async (req, res) => {
    const { id } = req.body;
    // console.log(id);
    try {
        const result = await client.query('DELETE FROM board_list WHERE id = $1 RETURNING * ', [id]);
        if (result.rowCount > 0) {
            res.json({ success: true, deleteRow: result.rows[0] });
        } else {
            res.status(404).json({ success: false, message: 'No rows found to delete.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'An error occurred.' });
    }
});

app.post('/update', async (req, res) => {
    const { text, user_name, text_title, id } = req.body;
    // console.log(text, text_title, user_name, id);
    try {
        const query = `
        UPDATE board_list
        SET user_name = $1, text = $2, text_title = $3
        WHERE id = $4
        `;
        const values = [user_name, text, text_title, id];
        const result = await client.query(query, values);
        if (result.rowCount > 0) {
            res.send('update success');
        } else {
            res.send('data none');
        }
    } catch (err) {
        console.error(err);
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
