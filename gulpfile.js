var gulp = require('gulp'),
	concat = require("gulp-concat"),
	sass = require('gulp-sass'),
	watch = require('gulp-watch'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require('gulp-rename'),
	minifyCSS = require('gulp-minify-css'),
	connect = require('gulp-connect');

/*
	Sass
*/ 
gulp.task('styles', function() {
	gulp.src('assets/css/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer('last 100 versions'))
		.pipe(gulp.dest('assets/css/'))
		.pipe(connect.reload());
	gulp.src('assets/css/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		.pipe(autoprefixer('last 100 versions'))
        .pipe(rename('styles.min.css'))
		.pipe(gulp.dest('assets/css/'))
		.pipe(connect.reload());
});

gulp.task('watchScss', function(){
	gulp.watch('assets/css/sass/**/*.scss', ['styles']);
});

/*
	Webserver
*/ 
gulp.task('connect', function() {
  connect.server({
    livereload: true,
    port: 8000
  });
});

gulp.task('default', ['styles', 'watchScss', 'connect'], function(){});