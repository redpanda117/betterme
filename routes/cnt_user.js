var express = require('express');

// Requiring our models
var db = require("../models");
var router = express.Router();


// Create all our routes and set up logic within those routes where required.
router.get("/findall", function (req, res) {
    "use strict";
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

router.post("/find", function (req, res) {
    console.log("This is the request body of the find  API: " + JSON.stringify(req.body));
    db.User.findAll({
        include: [{
            model: db.Goal,
            include: [{
                model: db.Remark
            }]
        }],
        where: {
            email: req.body.email
        }
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

router.post("/findorcreate", function (req, res) {
    db.User.findOrCreate(
        {
            where: {
                email: req.body.email
            },
            defaults:
                {
                    email: req.body.email,
                    DOB: req.body.DOB,
                    fullName: req.body.fullName
                }
        }).spread(function (user, created) {
        console.log("Find or Create: " + user);
        console.log("Created?: " + created);
        res.redirect("/");
    });
});

router.post("/update", function (req, res) {
    db.User.update({
        email: req.body.email,
        DOB: req.body.DOB,
        fullName: req.body.fullName,
        goalsCompleted: parseInt(req.body.goalsCompleted),
        userScore: parseInt(req.body.userScore),
        where: {
            email: req.body.email
        }
    }).then(function () {
        res.redirect("/");
    });
});

router.post("/del", function (req, res) {
    db.User.destroy({
        where: {
            email: req.body.email
        }
    }).then(function () {
        res.redirect("/");
    });
});

// Export routes for server.js to use.
module.exports = router;