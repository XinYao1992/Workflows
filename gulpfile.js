var gulp = require("gulp");
var gUtil = require("gulp-util");
var gCoffee = require("gulp-coffee");
var gConcat = require("gulp-concat");
var browserify = require("gulp-browserify");

var coffeeSources = ["components/coffee/*.coffee"];
var jsSources = [
    "components/scripts/rclick.js",
    "components/scripts/template.js",
    "components/scripts/pixgrid.js",
    "components/scripts/tagline.js"
];

gulp.task("log", async function() {
    gUtil.log("Workflows are awesome!");
}); // create a task called log

gulp.task("coffee", async function() {
    gulp.src(coffeeSources)// define where is the original source location
        .pipe(gCoffee({ bare: true })
            .on("error", gUtil.log))// once we get an error, we should catch it
        .pipe(gulp.dest("components/scripts"))// where we are going to send the file to once this process is done
}); // create a task called log

gulp.task("jsCombineAll", async function() {
    gulp.src(jsSources)
        .pipe(gConcat("script.js"))
        .pipe(browserify())// adding all plugins and dependencies, such as jquery and mustache, into application
        .pipe(gulp.dest("builds/development/js"))
});