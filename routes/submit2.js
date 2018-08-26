var express = require('express');
var router = express.Router();


/* GET submit page. */
router.get('/', function(req, res, next){
  // res.send('submit - WTF DAWG THIS BETTER WORK'); //// DEBUG
  res.render("submit2.ejs", {});
})

module.exports = router;
