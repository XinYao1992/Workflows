var gulp = require("gulp");
var gUtil = require("gulp-util");

gulp.task("log", function() {
    gUtil.log("Workflows are awesome!");
}); // create a task called log