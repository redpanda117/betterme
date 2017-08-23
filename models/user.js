/**
 * Created by bernardwilliams on 8/19/17.
 */
var db = require("../models");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {

        userID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: DataTypes.STRING,
        DOB: DataTypes.DATEONLY,
        fullName: DataTypes.STRING
    });

    User.associate = function(db) {
        User.hasMany(db.Goal, {
            onDelete: "cascade"
        });
    };

    return User;
}



///MY ATTEMPT TO DO WHAT BERNARD ASKED ME//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//ReferenceError: $ is not defined
//added ajax script link after jquery but still getting this error

//
//$(document).ready(function () {
//
//
//
//			/* attach a on click event to the form */
//			$("#createUserSubmit").on("click", function (event) {
//
//					/* stop form from submitting normally */
//					event.preventDefault();
//
//					/* get the action attribute from the <form element */
//					var email = $("#emailInput");
//					var DOB = $("#nameInput");
//					var fullName = $("#nameInput");
//
//					$.post("index.hdb", {
//						email: email,
//						DOB: DOB,
//						fullName: fullName
//					}).
//
//					done(function (data) {
//							console.log(data);
//
//						});
//					});
//
//			});
