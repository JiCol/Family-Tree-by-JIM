var express = require('express');
var router = express.Router();
let index = require("../modules/index.js");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get("/firstlevel", index.firstLevel)

router.get("/firstlevelV2", index.firstLevelV2)

router.get("/firstlevelV3", index.firstLevelVV2)

router.post("/adduser", index.addUser)

router.post("/connectparents", index.connectParents)

router.post("/connectpartner", index.connectPartner)

router.get("/shortestpath", index.shortestPath)

router.get("/searchperson", index.searchPerson)

router.post("/edited", index.edited)

router.post("/deleted", index.deleted)

module.exports = router;
