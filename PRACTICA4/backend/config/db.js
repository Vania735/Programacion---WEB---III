//const mysql=require('mysql2');
import mysql from 'mysql2';
const pool=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'personal_adm'
}).promise();

export default pool;