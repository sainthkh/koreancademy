const gulp = require('gulp')
const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const precss = require('precss')
const postcssUtil = require('postcss-utilities')
const stylelint = require('stylelint')
const postcssReporter = require('postcss-reporter')

const webpack = require('webpack-stream')

gulp.task('css', () => {
	let processors = [
		postcssUtil,
		cssnext,
		precss,
		stylelint,
		postcssReporter({clearMessage:true})
	]
	return gulp.src('./app/**/*.css')
			.pipe(postcss(processors))
			.pipe(gulp.dest('./temp/css'))
})

gulp.task('frontend', () => {
	return gulp.src('./app/frontend/client.js')
			.pipe(webpack( require('./build/webpack.jsconfig.js')))
			.pipe(gulp.dest('./static/js'))
})

gulp.task('default', ['css', 'frontend'])