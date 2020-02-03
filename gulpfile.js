const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const del = require('del');
const webpack = require('webpack-stream');

const webpackConfig = {
	entry: './src/js/main.js',
	output: {
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node-modules/'
			}
		]
	},
	mode: 'development',
	devtool: 'eval-source-map'
};

const imgFiles = './src/images/**/*.*';
const scssFiles = './src/sass/**/*.scss';
const jsFiles = './src/js/**/*.js';
const htmlFiles = './src/html/**/*.html';

	
function html() {
	return gulp.src(htmlFiles)
			.pipe(gulp.dest('./build'))
			.pipe(browserSync.stream());
}

function script() {
	return gulp.src(jsFiles)
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}

function scss() {
	return gulp.src(scssFiles)
			.pipe(sass().on('error', sass.logError))
			.pipe(autoprefixer({
				cascade: false
			}))
			.pipe(cleanCSS())
			.pipe(gulp.dest('./build/css'))
			.pipe(browserSync.stream());
};

function img() {
	return gulp.src(imgFiles)
			.pipe(gulp.dest('./build/images'))
			.pipe(browserSync.stream());
};

function clean() {
	return del(['./build/*']);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./build/"
		}
	});
	gulp.watch(jsFiles, script);
	gulp.watch(imgFiles, img);
	gulp.watch(scssFiles, scss);
	gulp.watch(htmlFiles, html);
};

gulp.task('build', gulp.series(clean, gulp.parallel(html, img, scss, script)));
gulp.task('watch', watch);
gulp.task('dev', gulp.series('build', 'watch'))