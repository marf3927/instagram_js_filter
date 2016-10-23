/**
 * index.spec.js
 */

const fs = require('fs');
const path = require('path');
const app = require('../src/index');
const winston = require('winston');

const convert = (imagePath, type, options) => {
    return new Promise((resolve, reject) => {
        fs.readFile(imagePath, (err, imageBuffer) => {
            if (err) {
                reject(err);
            }
            const result = app.filter(imageBuffer, type, options);
            resolve(result);
        });
    });
};

const saveFile = (outPath, buffer) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(outPath, buffer, error => {
            if (error) {
                reject(error);
            }
            resolve(outPath);
        });
    });
};

const imagePath = path.join(__dirname + '/img/sample.jpg');
convert(imagePath, 'grayscale', {})
    .then(base64 => {
        const buffer = new Buffer(base64, 'base64');
        const outPath = path.join(__dirname + '/img/converted.jpg');
        return saveFile(outPath, buffer);
    })
    .then(savedPath => {
        winston.info(savedPath);
    })
    .catch(err => {
        winston.error(err);
    });
