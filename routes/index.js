var express = require('express');
var router = express.Router();
var csvToJson = require("csvtojson");

const helpers = require('./helper.js');
const fs = require('fs');
const path = require('path');

const sightings = fs.readFileSync(path.resolve(__dirname,`../public/data/sightings.json`), 'utf8');
const userJson = fs.readFileSync(path.resolve(__dirname,`../public/data/users.json`), 'utf8');
var birdArray = [];
/* GET home page. */
router.get('/', async function (req, res, next) {
    if(birdArray.length == 0){
      birdArray = await csvToJson().fromFile(path.resolve(__dirname,`../public/data/bird_dataset.csv`));
    }
    //console.log(birdArray);
    console.log(JSON.parse(userJson)[1].birds);
    res.render('index', {
      birdData: birdArray,
      sightings: sightings
    });
});

module.exports = router;
