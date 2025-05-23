import mysql from 'mysql2/promise';

const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'info_autor',
});

export default pool;