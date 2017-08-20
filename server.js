var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var db = require("./models");

var app = express();
var port = normalizePort(process.env.PORT || '3020');

"use strict";

app.set('port', port);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var index_route = require("./routes/cnt_index.js");
app.use("/", index_route);

var goal_route = require("./routes/cnt_goal.js");
app.use("/goal", goal_route);

var user_route = require("./routes/cnt_user.js");
app.use("/user", user_route);

var remark_route = require("./routes/cnt_remark.js");
app.use("/remark", remark_route);

db.sequelize.sync({force:true}).then(function () {
    app.listen(port,
        function () {
            console.log("App listening on PORT " + port);
        }
    );
});


/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
