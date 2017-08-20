var express = require('express');
// Requiring our models
var db = require("../models");
var router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
    var hbsObject = {
        goals: {}
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
});

// Export routes for server.js to use.
module.exports = router;