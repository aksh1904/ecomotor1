const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// PostgreSQL connection configuration
const pool = new Pool({
    user: 'testDB_owner',
    host: 'ep-yellow-term-a1tcb2vy.ap-southeast-1.aws.neon.tech',
    database: 'testDB',
    password: 'PuSBohm2ky6j',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

app.use(express.json());

// Endpoint to fetch data
app.get('/data', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM transport_modes');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});