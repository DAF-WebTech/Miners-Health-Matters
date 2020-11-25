var gulp = require('gulp');

/* browser sync */
var browserSync = require('browser-sync').create();

/* sass stuff */
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sassInput = 'src/sass/style.scss';
var sassOutput = 'dist/css';
var autoprefixerOptions = {
	browsers: ['last 2 versions','iOS > 7']
};

/* js stuff */
var babel = require('gulp-babel');
var jsInput = 'src/js/*.js';
var jsOutput = 'dist/js';

gulp.task('sass', function() {
	/* input files */
	gulp.src(sassInput)
	/* run sass */
	.pipe(sass({outputStyle: 'compressed'}).on('error',sass.logError))
	/* rename file */
	.pipe(rename('style.min.css'))
	/* run autoprefixer */
  .pipe(autoprefixer(autoprefixerOptions))
  /* output files */
  .pipe(gulp.dest(sassOutput))
	/* browser sync */
	.pipe(browserSync.reload({
		stream: true
	}));
});

/* babel */
gulp.task('js', function() {
	return gulp.src(jsInput)
	.pipe(babel({
		presets: [
      ["env", {
        "targets": {
          "browsers": ["last 2 versions", "safari >= 7"]
        }
      }]
    ]
	}))
	.pipe(gulp.dest(jsOutput));
});

/* browser sync */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  })
});

/* watch files */
gulp.task('watch', ['browserSync', 'sass', 'js'], function (){
  gulp.watch('src/**/*', ['sass','js']);
  gulp.watch('dist/*.html', browserSync.reload);
  gulp.watch('dist/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['sass', 'js', 'watch']);
