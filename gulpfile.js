var gulp = require('gulp');
var concat = require("gulp-concat");
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');

/*
	Sass
*/ 
gulp.task('styles', function() {
	gulp.src('assets/css/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		// .pipe(autoprefixer('last 6 versions'))
		.pipe(gulp.dest('assets/css/'));
	gulp.src('assets/css/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(minifyCSS())
		// .pipe(autoprefixer('last 6 versions'))
        .pipe(rename('styles.min.css'))
		.pipe(gulp.dest('assets/css/'));
});

gulp.task('watchScss', function(){
	gulp.watch('assets/css/sass/**/*.scss', ['styles']);
});


gulp.task('default', ['styles', 'watchScss'], function(){});