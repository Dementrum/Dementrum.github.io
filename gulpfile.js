var syntax        = 'sass'; // Syntax: sass or scss;

var gulp          = require('gulp'),
		gutil         = require('gulp-util' ),
		sass          = require('gulp-sass'),
		browserSync   = require('browser-sync'),
		concat        = require('gulp-concat'),
		uglify        = require('gulp-uglify'),
		cleancss      = require('gulp-clean-css'),
		rename        = require('gulp-rename'),
		autoprefixer  = require('gulp-autoprefixer'),
		notify        = require("gulp-notify"),
		rsync         = require('gulp-rsync');
		pug        		= require('gulp-pug'),
		htmlBeautify  = require('gulp-html-beautify')
		plumber       = require('gulp-plumber')


gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// open: false,
		// online: false, // Work Offline Without Internet Connection
		// tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	})
});
//Piug in Html  + 
gulp.task('pug', function() {
  return gulp.src("app/pug/pages/*.pug")
	.pipe(pug())
	.pipe(gulp.dest("app/"))
	.pipe(browserSync.stream());
});

gulp.task('htmlBeautify', function() {
	var options = {
			indentSize: 2,
			unformatted: [
					// https://www.w3.org/TR/html5/dom.html#phrasing-content
					 'abbr', 'area', 'b', 'bdi', 'bdo', 'br', 'cite',
					'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'ins', 'kbd', 'keygen', 'map', 'mark', 'math', 'meter', 'noscript',
					'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
					 'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
					'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'
			]

	};
gulp.src('app/*.html')
	.pipe(htmlBeautify(options))
	.pipe(gulp.dest('app/index'))
});

gulp.task('pug', function() {
	return gulp.src("app/pug/pages/*.pug")
			.pipe(plumber({
					errorHandler: notify.onError()
			}))
			.pipe(pug())
			.pipe(htmlBeautify())
			.pipe(gulp.dest("app/"))
			.pipe(browserSync.stream());
});


//Styles
gulp.task('styles', function() {
	// return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	return gulp.src('app/sass/main.sass')
	.pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/likely/likely.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Mifify js (opt.)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('rsync', function() {
	return gulp.src('app/**')
	.pipe(rsync({
		root: 'app/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',
		// include: ['*.htaccess'], // Includes files to deploy
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});

gulp.task('watch', ['styles', 'js', 'pug', 'browser-sync'], function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch(['app/pug/**/*.pug'], ['pug']);
	gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', ['watch']);
