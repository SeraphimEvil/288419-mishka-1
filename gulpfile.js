"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync");

var del = require('del');
var runSequence = require('run-sequence');
var mqpacker = require('css-mqpacker');
var flexboxfixer = require('postcss-flexboxfixer');
var assets = require('postcss-assets');
var cssnano = require('cssnano');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var path = require('path');
var imagemin = require('gulp-imagemin');

var srcPath = 'source';
var buildPath = 'build';


gulp.task("serve", ["build"], function () {
  server.init({
    server: {
      baseDir: buildPath
    },
    notify: false,
    open: false,
    cors: true,
    ui: false
  });

  gulp.watch('**/*.{scss,sass}', {cwd: path.join(srcPath, 'sass')}, ['style', server.stream]);
  gulp.watch("source/*.html").on("change", server.reload);
});

// del
gulp.task('del', del.bind(null, buildPath));

// img
gulp.task('img', function() {
  gulp.src(['**/*.{jpg,png,svg,webp}'], {cwd: path.join(srcPath, 'img')})
    .pipe(imagemin({
      progressive: true}))
    .pipe(gulp.dest(path.join(buildPath, 'img')))
});

// html
gulp.task('html', function() {
  gulp.src(['**/*.html'], {cwd: path.join(srcPath)})
    .pipe(gulp.dest(path.join(buildPath)))
});

// js
gulp.task('js', function() {
  gulp.src(['**/*.js'], {cwd: path.join(srcPath)})
    .pipe(gulp.dest(path.join(buildPath)))
});

// font
gulp.task('font', function() {
  gulp.src('**/*{woff,woff2}', {cwd: path.join(srcPath, 'fonts')})
    .pipe(gulp.dest(path.join(buildPath, 'fonts')))
});

// style
gulp.task('style', function() {
  gulp.src('style.scss', {cwd: path.join(srcPath, 'sass')})
    .pipe(plumber({
      errorHandler: notify.onError('Error:  <%= error.message %>')
    }))
    .pipe(sass())
    .pipe(postcss([
      mqpacker,
      flexboxfixer,
      autoprefixer({
        browsers: [
          'last 2 version',
          'last 2 Chrome versions',
          'last 2 Firefox versions',
          'last 2 Opera versions',
          'last 2 Edge versions'
        ]
      }),
      assets({
        loadPaths: [path.join(srcPath, 'img')]
      }),
      cssnano({
        safe:true
      })
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(path.join(buildPath, 'css')))
    .pipe(server.stream({match: '**/*.css'}));
});

gulp.task('build', ['del'], function (callback) {
  runSequence(
    'img',
    ['html', 'js', 'font'],
    'style',
    callback);
});
