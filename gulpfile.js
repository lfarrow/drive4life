var gulp = require('gulp');
var concat = require("gulp-concat");
var sass = require('gulp-sass');
var watch = require('gulp-watch');

/*
	Sass
*/ 
gulp.task('styles', function() {
	gulp.src('assets/css/sass/styles.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('assets/css/'))
});

gulp.task('watchScss', function(){
	gulp.watch('assets/css/sass/**/*.scss', ['styles']);
});


gulp.task('default', ['styles', 'watchScss'], function(){});