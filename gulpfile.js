var gulp = require("gulp");
var gUtil = require("gulp-util");
var gCoffee = require("gulp-coffee");
var gConcat = require("gulp-concat");
var browserify = require("gulp-browserify");
var compass = require("gulp-compass");
var connect = require("gulp-connect");

var coffeeSources = ["components/coffee/*.coffee"];
var jsSources = [
    "components/scripts/tagline.js",// must be first becase it defines $
    "components/scripts/rclick.js",
    "components/scripts/template.js",
    "components/scripts/pixgrid.js"
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
        .pipe(connect.reload());
});

gulp.task("compass", async function() {
    gulp.src(sassSources)
        .pipe(compass({
                sass: "components/sass", // where the sass directory is
                image: "builds/development/images", // image directory
                style: "expanded" // for more information, please check sass output style
            })
            .on("error", gUtil.log))
        .pipe(gulp.dest("builds/development/css"))
        .pipe(connect.reload());
});

gulp.task("watch", function() {
    gulp.watch(coffeeSources, gulp.series("coffee"));// when any of these coffee files change, then we run coffee task
    gulp.watch(jsSources, gulp.series("js"));
    gulp.watch("components/sass/*.scss", gulp.series("compass"));
});// will monitor and update things when they change.

gulp.task("connect", async function() {// it must be async
    connect.server({
        root: "builds/development/", // define the root of our server
        livereload: true
    });
});

gulp.task("default", gulp.series(["coffee", "js", "compass", "connect", "watch"])); // do all tasks in sequence
