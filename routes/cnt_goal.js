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
router.post("/findone", function (req, res) {

    db.Goal.findAll({
        include: [{
            model: db.Remark
        }],
        where: {
            goalID: parseInt(req.body.goalID)
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
        status: req.body.status,
        completed: req.body.completed


    }).then(function () {
        res.redirect("/");
    });
});

router.post("/update", function (req, res) {

    var newGoal = {
        title: req.body.title,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description,
        difficulty: req.body.difficulty,
        status: req.body.status,
        completed: parseInt(req.body.completed)
    };

    db.Goal.update(newGoal,
        {
            where: {
                goalID: req.body.goalID
            }
        })
        .then(function () {
            res.redirect("/");
        });
});

router.post("/del", function (req, res) {

    console.log('Delete: ' + JSON.stringify(req.body));
    db.Goal.destroy({
        where: {
            goalID: parseInt(req.body.goalID)
        }
    }).then(function () {
        res.redirect("/");
    });
});

// Export routes for server.js to use.
module.exports = router;