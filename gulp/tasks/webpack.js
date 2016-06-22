const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const browserSync = require('browser-sync').get('bs-proxy');

const config = require('../../config/config');
const paths = require('../paths');
const webpackConfig = config.env === 'production'
                      ? require(paths.webpackProductionConfig)
                      : require(paths.webpackConfig);

gulp.task('webpack', done => {
  return webpack(webpackConfig).run((err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    gutil.log('[webpack]', stats.toString({
      colors: true,
      chunks: false,
    }));

    browserSync.reload();
    return done();
  });
});