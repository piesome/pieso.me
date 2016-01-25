var gulp = require('gulp');
var stylus = require('gulp-stylus');
var jade = require('gulp-jade');
var yaml = require('js-yaml');
var fs = require('fs');
var commonmark = require('commonmark');

var reader = new commonmark.Parser();
var writer = new commonmark.HtmlRenderer();

function md(text) {
    var parsed = reader.parse(text);
    return writer.render(parsed);
}

gulp.task('stylus', function () {
    gulp.src('./style.styl')
        .pipe(stylus())
        .pipe(gulp.dest('css'));
});

gulp.task('jade', function () {
    var data = yaml.safeLoad(fs.readFileSync('./data.yaml', 'utf8'));
    data.md = md;
    gulp.src('./index.jade')
        .pipe(jade({locals: data}))
        .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch('./style.styl', ['stylus']);
    gulp.watch('./index.jade', ['jade']);
    gulp.watch('./data.yaml', ['jade']);
});

gulp.task('default', ['watch', 'stylus', 'jade']);
