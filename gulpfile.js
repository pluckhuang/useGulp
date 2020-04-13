// Gulp packages
var gulp = require("gulp"),
    util = require("gulp-util"),
    del = require("del"),
    livereload = require("gulp-livereload"),
    extReplace = require("gulp-ext-replace"),
    htmlmin = require("gulp-htmlmin"),
    less = require("gulp-less"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    autorem = require("autorem"),
    cssnano = require("cssnano"),
    uglify = require("gulp-uglify"),
    concat = require("gulp-concat"),
    imagemin = require("gulp-imagemin"),
    imageminWebp = require("imagemin-webp");
;

// HTML
function minifyHTML() {
    var src = "src/**/*.html",
        dest = "dist";

    return gulp.src(src)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
}

gulp.task(minifyHTML);

// CSS
function buildCSS() {
    var src = "src/less/main.less",
        dest = "dist/css";

    return gulp.src(src)
        .pipe(less().on("error", function (err) {
            util.log(err);
            this.emit("end");
        }))
        .pipe(postcss([
            autoprefixer({
                Browserslist: ["last 4 versions"]
            }), autorem(), cssnano()
        ]))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
}

gulp.task(buildCSS);

// JavaScript
function uglifyJS() {
    var src = "src/js/**/*.js",
        dest = "dist/js";

    return gulp.src(src)
        .pipe(uglify())
        .pipe(gulp.dest(dest))
        .pipe(livereload());
}

gulp.task(uglifyJS);

function concatJS() {
    var src = ["dist/**/*.js", "!dist/js/scripts.js"],
        dest = "dist/js",
        concatScript = "scripts.js";

    return gulp.src(src)
        .pipe(concat(concatScript))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
}

gulp.task(concatJS);

// Images
function imageminMain() {
    var src = "src/img/**/*.{png,jpg,gif,svg}",
        dest = "dist/img";

    return gulp.src(src, {
        since: gulp.lastRun("imageminMain")
    })
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
}

gulp.task(imageminMain);

// imagemin - WebP
function imageminWebP() {
    var src = "src/img/**/*.{jpg,png}",
        dest = "dist/img";

    return gulp.src(src, {
        since: gulp.lastRun("imageminWebP")
    })
        .pipe(imagemin({
            use: [
                imageminWebp({ quality: 50 })
            ]
        }))
        .pipe(extReplace(".webp"))
        .pipe(gulp.dest(dest))
        .pipe(livereload());
}

gulp.task(imageminWebP);

// Watch
function watch() {
    livereload.listen();

    gulp.watch("src/**/*.html", minifyHTML);
    gulp.watch("src/less/**/*.less", buildCSS);
    gulp.watch("src/js/**/*.js", gulp.series(uglifyJS, concatJS));
    gulp.watch("src/img/**/*.{png,jpg,svg,gif}", gulp.parallel(imageminMain, imageminWebP));
}

gulp.task("default", watch);

// Clean
function clean() {
    return del(["dist"]);
}

gulp.task(clean);

gulp.task("build", gulp.parallel(minifyHTML, buildCSS, uglifyJS, imageminMain, imageminWebP, gulp.series(uglifyJS, concatJS)));