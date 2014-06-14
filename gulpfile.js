var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('stylus', function () {
    gulp.src('./style.styl')
        .pipe(stylus())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
    gulp.watch("./style.styl", ["stylus"]);
});

gulp.task('default', ['watch', 'stylus']);