var express = require('express');

// Requiring our models
var db = require("../models");
var router = express.Router();

"use strict";

// Create all our routes and set up logic within those routes where required.
router.get("/findall", function (req, res) {

    db.Remark.findAll({})
        .then(function (data) {
            res.json(data);
        });
});

router.post("/create", function (req, res) {
    db.Remark.create({
        remarkID: req.body.remarkID,
        goalID: req.body.goalID,
        remark: req.body.remark
    }).then(function () {
        res.redirect("/");
    });
});

// Export routes for server.js to use.
module.exports = router;