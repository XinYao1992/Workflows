var gulp = require("gulp");
var gUtil = require("gulp-util");
var gCoffee = require("gulp-coffee");
var gConcat = require("gulp-concat");
var browserify = require("gulp-browserify");
var compass = require("gulp-compass");

var coffeeSources = ["components/coffee/*.coffee"];
var jsSources = [
    "components/scripts/rclick.js",
    "components/scripts/template.js",
    "components/scripts/pixgrid.js",
    "components/scripts/tagline.js"
];
var sassSources = ["components/sass/style.scss"];

gulp.task("log", async function() {
    gUtil.log("Workflows are awesome!");
}); // create a task called log

gulp.task("coffee", async function() {
    gulp.src(coffeeSources)// define where is the original source location
        .pipe(gCoffee({ bare: true })
            .on("error", gUtil.log))// once we get an error, we should catch it
        .pipe(gulp.dest("components/scripts"))// where we are going to send the file to once this process is done
}); // create a task called log

gulp.task("js", async function() {
    gulp.src(jsSources)
        .pipe(gConcat("script.js"))
        .pipe(browserify())// adding all plugins and dependencies, such as jquery and mustache, into application
        .pipe(gulp.dest("builds/development/js"))
});

gulp.task("compass", async function() {
    gulp.src(sassSources)
        .pipe(compass({
                sass: "components/sass", // where the sass directory is
                image: "builds/development/images", // image directory
                style: "expanded" // for more information, please check sass output style
            }))
            .on("error", gUtil.log)
        .pipe(gulp.dest("builds/development/css"))
});