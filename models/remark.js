var db = require("../models");

module.exports = function(sequelize, DataTypes) {
    var Remark = sequelize.define("Remark", {

        remarkID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        goalID: {
            type: DataTypes.INTEGER
        },
        remark: DataTypes.TEXT
    });
    Remark.associate = function(db) {
        Remark.belongsTo(db.Goal, {
        });
    }
    return Remark;
}