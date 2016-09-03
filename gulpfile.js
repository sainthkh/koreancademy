const gulp = require('gulp')
const sass = require('gulp-sass')
const clean = require('gulp-clean')
const concatCss = require('gulp-concat-css')

gulp.task('styles', () => {
	return gulp.src('./app/**/*.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('./temp/css'))
})

gulp.task('css-concat', ['styles'], () => {
	return gulp.src('./temp/**/*.css')
    .pipe(concatCss("bundle.css"))
    .pipe(gulp.dest('assets/css'));
})

gulp.task('clean', ['css-concat'], () => {
	return gulp.src('./temp', {read: false})
        .pipe(clean());
})

gulp.task('default', ['clean'])