const gulp = require('gulp');
const browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
// const babel = require('gulp-babel');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const postcss = require('gulp-postcss');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const minifyImg = require('gulp-imagemin');
const minifyJS = require('gulp-uglify');
const del = require('del');
const runSequence = require('run-sequence');



gulp.task("browser-sync", () => {
    browserSync.init({
        server: {
            baseDir: "dist",
        },
    });
});

gulp.task("css", () => {
    return gulp
        .src("src/css/sass/**/*.scss")
        .pipe(sass().on('error', function (err) {
            log.error(err.message);
        }))
        .pipe(postcss([
            postcssPresetEnv({
                stage: 0,
            })
        ]))
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(concat("app.min.css"))
        .pipe(gulp.dest("dist/css"));
});

gulp.task("js", () => {
    return gulp
        .src("src/js/app/*.js")
        .pipe(concat("app.min.js"))
        .pipe(minifyJS())
        .pipe(gulp.dest("dist/js"));
});

gulp.task("html", () => {
    return gulp
        .src("src/*.pug")
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task("img", () => {
    gulp
        .src("src/image/**/*")
        .pipe(minifyImg())
        .pipe(gulp.dest("dist/image"));
});

gulp.task("delete", () =>
    del(["dist/css/*.css", "dist/js/*.js", "dist/image", "dist/*.html"])
);

gulp.task("watch", () => {
    gulp.watch("src/*.pug", ["html"]);
    gulp.watch("src/image/**/*", ["img"]);
    gulp.watch("src/js/app/*.js", ["js"]);
    gulp.watch("src/css/sass/**/*.scss", ["css"]);
});

gulp.task("default", () => {
    runSequence(["delete", "html", "css", "js", "img", "browser-sync", "watch"]);
});