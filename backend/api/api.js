const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

router.get('/brands', async (req, res) => {
    let allCars = await database.allCars();
    let result = {};

    for (let car of allCars) {
        if (!result[car.brand]) {
            result[car.brand] = 1;
        } else {
            result[car.brand] += 1;
        }
    }

    console.log(result);
    res.status(200).json(result);
});

router.get('/salaries', async (req, res) => {
    let allEmployees = await database.allEmployees();
    let result = {};

    for (let employee of allEmployees) {
        if (!result[employee.department]) {
            result[employee.department] = employee.salary;
        } else {
            result[employee.department] += employee.salary;
        }
    }

    console.log(result);
    res.status(200).json(result);
});

router.get('/revenue', async (req, res) => {
    let allPurchases = await database.allPurchases();
    let result = {};

    for (let purchase of allPurchases) {
        let revenue = purchase.price * purchase.quantity;
        if (!result[purchase.category]) {
            result[purchase.category] = revenue;
        } else {
            result[purchase.category] += revenue;
        }
    }

    res.status(200).json(result);
});

module.exports = router;
