const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'statisztika',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

//!SQL Queries
async function selectall() {
    const query = 'SELECT * FROM exampletable;';
    const [rows] = await pool.execute(query);
    return rows;
}

async function allCars() {
    const [rows] = await pool.execute(`SELECT * FROM vehicles`);
    return rows;
}

async function allEmployees() {
    const [rows] = await pool.execute(`SELECT * FROM employees WHERE is_active = 1 `);
    return rows;
}

async function allPurchases() {
    const [rows] = await pool.execute(`SELECT * FROM purchases `);
    return rows;
}

//!Export
module.exports = {
    selectall,
    allCars,
    allEmployees,
    allPurchases
};
