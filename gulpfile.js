var gulp = require('gulp');

var less = require('gulp-less');
var LessAutoprefix = require('less-plugin-autoprefix');
var autoprefix = new LessAutoprefix({ browsers: ['> 1%', 'last 2 versions', 'iOS >= 6', 'Android >= 2.1'] });

var styleGlob = './public/**/*.less';
var otherGlob = ['./public/**/*', '!./public/**/*.js', '!./public/**/*.less'];

// 样式表的处理
gulp.task('style', function() {
  return gulp
    .src(styleGlob)
    .pipe(less({
      plugins: [autoprefix],
    }))
    .pipe(gulp.dest('./build'));
});

// 其他文件的处理
gulp.task('other', function() {
  return gulp
    .src(otherGlob)
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', ['style', 'other'], function() {
  gulp.watch(['./public/**/*', '!./public/**/*.js'], ['style', 'other']);
});

gulp.task('default', ['style', 'other']);
