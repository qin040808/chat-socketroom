import gulp from "gulp";
import gulpSass from "gulp-sass";
import nodeSass from "node-sass";
import autoPrefixer from "gulp-autoprefixer";
import minifyCSS from "gulp-csso";
import del from "del";
import bro from "gulp-bro";
import babel from "babelify";

const sass = gulpSass(nodeSass);

function clean() {
  return del(["src/static"]);
}

function styles() {
  return gulp
    .src("assets/scss/styles.scss")
    .pipe(sass())
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest("src/static/styles"));
}

function js() {
  return gulp
    .src("assets/js/main.js")
    .pipe(
      bro({
        transform: [
          babel.configure({
            presets: ["@babel/preset-env"],
          }),
        ],
      })
    )
    .pipe(gulp.dest("src/static/js"));
}

function watchFiles() {
  gulp.watch("assets/scss/**/*.scss", styles);
  gulp.watch("assets/js/**/*.js", js);
}
const dev = gulp.series([clean, styles, js, watchFiles]);
export default dev;
