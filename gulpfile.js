const autoprefixer = require('gulp-autoprefixer'),
      browserSync  = require('browser-sync').create(),
      gulp       = require("gulp"),
      bourbon    = require("bourbon").includePaths,
      neat       = require("bourbon-neat").includePaths,
      sass       = require("gulp-sass");

gulp.task("sass", function () {
  return gulp.src(['src/assets/style.scss'])
    .pipe(sass({
        sourcemaps: true,
        includePaths: [bourbon, neat]
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  }))
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});


// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
  browserSync.init({
      server: "./src"  
  });

  gulp.watch(['src/assets/**/*.scss'], ['sass']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve']);