var express = require('express');

// Requiring our models
var db = require("../models");
var router = express.Router();

"use strict";

// Create all our routes and set up logic within those routes where required.
router.get("/findall", function (req, res) {
    db.User.findAll({
        include: [{
            model: db.Goal,
            include: [{
                model: db.Remark
            }]
        }]
    })
        .then(function (data) {
            res.json(data);
        });
});

router.post("/create", function (req, res) {
    db.User.create({
        email: req.body.email,
        DOB: req.body.DOB,
        fullName: req.body.fullName
    }).then(function () {
        res.redirect("/");
    });
});

// Export routes for server.js to use.
module.exports = router;