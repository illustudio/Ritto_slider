var postcss = require("gulp-postcss");
var gulp = require("gulp");
var wait = require("gulp-wait");
var autoprefixer = require("autoprefixer");
var cssnano = require("gulp-cssnano");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();

gulp.task("postcss", function () {
  return gulp
    .src("./assets/css/index.css")
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer(
      "last 2 version",
      "safari 5",
      "ie 8",
      "ie 9",
      "opera 12.1",
      "ios 6",
      "android 4"
    )]))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./assets/css"));
});

gulp.task("sass", function () {
  return gulp
    .src("./assets/scss/index.scss")
    .pipe(wait(500))
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./assets/css"))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task("browser-sync", function () {
  browserSync.init(["./assets/css/index.css"], {
    proxy: "http://localhost:3000/",
    notify: false,
    port: 3000,
    stream:true
  });
});



gulp.task("cssnano", function () {
  return gulp
    .src("./assets/css/index.css")
    .pipe(cssnano())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./assets/css/"));
});

gulp.task("combine-js", function () {
  return gulp
    .src(["./assets/js/**/*.js"])
    .pipe(concat("slider.js"))
    .pipe(gulp.dest("./asstes/js"))
    .pipe(
      uglify({
        mangle: true
      })
    )
    .pipe(rename("slider.min.js"))
    .pipe(gulp.dest("./assets/js"));
});

gulp.task("default", ["sass", "browser-sync"], function () {
  gulp.watch("./assets/scss/**/*.scss", ["sass"]).on("change", browserSync.reload);
  gulp.watch("./assets/js/**/*.js").on("change", browserSync.reload);
  gulp.watch("./index.html").on("change", browserSync.reload);
});

gulp.task("production", ["postcss", "cssnano", "combine-js"]);