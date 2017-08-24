var express = require('express');

// Requiring our models
var db = require("../models");
var router = express.Router();

"use strict";

// Create all our routes and set up logic within those routes where required.
router.get("/findall", function (req, res) {

    db.Goal.findAll({
        include: [{
            model: db.Remark
        }]
    })
        .then(function (data) {
            res.json(data);
        });
});

router.post("/find", function (req, res) {

    db.Goal.findAll({
        include: [{
            model: db.Remark
        }],
        where: {
            UserUserID: parseInt(req.body.userID)
        }
    })
        .then(function (data) {
            res.json(data);
        });
});

router.post("/create", function (req, res) {
    db.Goal.create({
        //goalID: req.body.goalID,
        UserUserID: parseInt(req.body.userID),
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        difficulty: req.body.difficulty,
        status: req.body.status
    }).then(function () {
        res.redirect("/");
    });
});

router.post("/update", function (req, res) {
    db.Goal.update({
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        difficulty: req.body.difficulty,
        status: req.body.status,
        goalsCompleted: req.body.goalsCompleted,

        where: {
            goalID: req.body.goalID
        }
    }).then(function () {
        res.redirect("/");
    });
});

router.post("/del", function (req, res) {
    db.Goal.destroy({
        where: {
            UserUserID: parseInt(req.body.userID)
        }
    }).then(function () {
        res.redirect("/");
    });
});

// Export routes for server.js to use.
module.exports = router;