var gulp = require('gulp');
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

gulp.task('clean', function () {
    var stream = gulp.src('dist/*', {read: false})
        .pipe(clean());
    return stream;
});

gulp.task('build', function () {
    var stream = gulp.src('./app/**/*.js')
        .pipe(concat('select.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
    return stream;
});

gulp.task('default', ['clean', 'build']);

