var express = require('express');
var router = express.Router();
var csvToJson = require("csvtojson");

const helpers = require('./helper.js');
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {


csvToJson().fromFile(path.resolve(__dirname,`../public/data/bird_dataset.csv`)).then((jsonObj)=>{
  res.render('index', {
    birdData: jsonObj
  });
});

});

module.exports = router;
