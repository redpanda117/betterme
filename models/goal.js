/**
 * Created by bernardwilliams on 8/19/17.
 */



var db = require("../models");

module.exports = function (sequelize, DataTypes) {
    "use strict";
    var Goal = sequelize.define("Goal", {

        goalID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userID: {
            type: DataTypes.INTEGER
        },
        title: DataTypes.STRING,
        startDate: DataTypes.DATEONLY,
        endDate: DataTypes.DATEONLY,
        difficulty: DataTypes.INTEGER,
        description: DataTypes.TEXT
    });

    Goal.associate = function (db) {
        Goal.belongsTo(db.User);
        Goal.hasMany(db.Remark,
            {
                onDelete: "cascade"
            });
    }
    return Goal;
}