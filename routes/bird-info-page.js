var express = require('express');
var router = express.Router();
var csvToJson = require("csvtojson");

const helpers = require('./helper.js');
const fs = require('fs');
const path = require('path');

const userJson = fs.readFileSync(path.resolve(__dirname,`../public/data/users.json`), 'utf8');

module.exports = function(req, res, next) {
    csvToJson().fromFile(path.resolve(__dirname,`../public/data/bird_dataset.csv`)).then((jsonObj)=>{
        const bird = jsonObj.find((object) => {
            if(object.bird_name.replace(' ','') == req.params.bird_name){
                return object;
            }
        });
        console.log(JSON.parse(sightings));
        
        res.render('bird-info-page', {
            birdData: [bird]
        });
    });
};


