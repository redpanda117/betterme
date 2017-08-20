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
        description: DataTypes.TEXT
    });

    Goal.associate = function(db) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Goal.belongsTo(db.User, {
            foreignKey: {
                allowNull: false
            }
        });
    }
    return Goal;
}