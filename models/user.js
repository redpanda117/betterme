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



