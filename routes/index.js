var express = require('express');
var router = express.Router();
var csvToJson = require("csvtojson");

const helpers = require('./helper.js');
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {

  var json = {};

  let promises = new Promise(function(resolve, reject) {
    fs.readdir("./public/data/", async (err, files) => {
      console.log(files);
      if( err ) {
        console.log("here");
        console.log(err);
        reject();
      }
      await helpers.asyncForEach(files.filter(el => /\.csv$/.test(el)), async file => {
        console.log(file)
        console.log(files)
      json = await csvToJson().fromFile(path.resolve(__dirname,`../public/data/${file}`))
      console.log("Loaded json file: ",json)
      });
      resolve();
    })
  });


  promises.then(() => {
    res.render('index', {
      birdData: JSON.stringify(json)
    });
  });

});

module.exports = router;
