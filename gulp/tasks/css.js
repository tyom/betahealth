const gulp = require('gulp');
const sass = require('gulp-sass');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const preprocess = require('gulp-preprocess');
const sourcemaps = require('gulp-sourcemaps');
const config = require('../../config/config');
const paths = require('../paths');

const isProduction = config.env === 'production';

// add extra sass paths
const SASS_PATHS = [
  `${paths.nodeModules}`,
];

gulp.task('css', () => {
  return gulp.src(`${paths.sourceStyles}/**/*.scss`)
    .pipe(gulpif(!isProduction, sourcemaps.init()))
    .pipe(sass({
      includePaths: SASS_PATHS,
      outputStyle: isProduction ? 'compressed' : 'expanded',
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['> 0%', 'IE 8'],
    }))
    .pipe(preprocess({
      context: {
        FONT_CDN_PATH: config.fontCdn,
      },
    }))
    .pipe(gulpif(!isProduction, sourcemaps.write('.')))
    .pipe(gulp.dest(`${paths.outputStyles}`));
});
