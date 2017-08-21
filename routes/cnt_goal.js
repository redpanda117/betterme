var express = require('express');

// Requiring our models
var db = require("../models");
var router = express.Router();

"use strict";

// Create all our routes and set up logic within those routes where required.
router.get("/findall", function (req, res) {

    db.Goal.findAll({
        include: [{
            model: db.Remark,
            as: "Remarks"
        }]
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
        description: req.body.description
    }).then(function () {
        res.redirect("/");
    });
});

// Export routes for server.js to use.
module.exports = router;