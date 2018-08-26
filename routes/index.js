var express = require('express');
var router = express.Router();
var csvToJson = require("csvtojson");

const helpers = require('./helper.js');
const fs = require('fs');
const path = require('path');

const sightings = fs.readFileSync(path.resolve(__dirname,`../public/data/sightings.json`), 'utf8');
const userJson = fs.readFileSync(path.resolve(__dirname,`../public/data/users.json`), 'utf8');
var birdArray = [];
var birdNames = [];

var seenBirds = [];
var notSeenBirds =[];
/* GET home page. */
function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}
router.get('/', async function (req, res, next) {
    if(birdArray.length == 0){
      birdArray = await csvToJson().fromFile(path.resolve(__dirname,`../public/data/bird_dataset.csv`));
    }
    
    birdArray.forEach(bird =>{
        birdNames.push(bird.bird_name);
    });
    
    
    console.log(JSON.parse(userJson)[0].birds);
    notSeenBirdObjects = arr_diff(birdNames, JSON.parse(userJson)[0].birds)
    var seenUserBirds = JSON.parse(userJson)[0].birds;
    
    for(var i = 0; i<notSeenBirdObjects.length; i++){
        for(var j = 0; j<birdArray.length; j++){
            if(notSeenBirdObjects[i] == birdArray[j].bird_name){
                notSeenBirds.push(birdArray[j]);
               }
        }
    }
    
    for(var i = 0; i<seenUserBirds.length; i++){
        for(var j = 0; j<birdArray.length; j++){
            if(seenUserBirds[i] == birdArray[j].bird_name){
                seenBirds.push(birdArray[j]);
               }
        }
    }
        console.log("seen=============================================================================")
    console.log(notSeenBirdObjects);
        console.log("seen=============================================================================")
    console.log(seenUserBirds);
        console.log("seen=============================================================================")
    console.log("seen=============================================================================")
    
    console.log(seenBirds);
    console.log("seen=============================================================================")
    console.log("notSeen=============================================================================")
    console.log(notSeenBirds);
    console.log("NotSeen=============================================================================")
    
    res.render('index', {
      birdData: birdArray,
      sightings: sightings,
        users: JSON.parse(userJson),
        seen: seenBirds,
        notSeen: notSeenBirds
    });
  
});

module.exports = router;
