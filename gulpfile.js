/**
 *
 *
 * Created by Administrator on 2018/4/29.
 *@last Modified time: 2016-01-26 17:1028
*/
//gulp的主文件,用于用户注册
'use strict';
//此处代码都是由Node执行
//载入gulp模块
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
//var browserSync = require('browser-sync').create();
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var reload = browserSync.reload;
//注册一个任务
gulp.task('copy', function() {
    //当gulp执行这个Say任务时自动执行该函数
    //console.log('hello')
    //合并 压缩之类的操作
    //复制文件
    //gulo.src取一个文件
    gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'))//将此处需要的操作传递进去
});
gulp.task('dist', function() {

        //src/index.html
    gulp.watch('src/index.html',['copy']);
    gulp.watch('src/styles/*.less',['style']);
});

gulp.task('style',function(){
    gulp.src('src/styles/*.less')
        .pipe(less())//j经过该环节之后的到已经是CSS文件
        .pipe(cssnano())
        .pipe(gulp.dest('dist/style/'));
});
//1.LESS编译 压缩 --合并没有必要.一般预处理CSS都可以导包
gulp.task('style1',function(){
    gulp.src(['src/styles/*.less','!src/styles/_*.less'])
        .pipe(less())//j经过该环节之后的到已经是CSS文件
        .pipe(cssnano())
        .pipe(gulp.dest('dist/style/'));
});
//2.JS合并 压缩 混淆
gulp.task('script',function(){
    gulp.src('src/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});
//3.图片复制
gulp.task('image',function(){
    gulp.src('src/images/*.*')
        .pipe(gulp.dest('dist/images'));
});
//4.HTML的处理

gulp.task('html',function(){
    gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
        }))
        .pipe(gulp.dest('dist/'))
        .pipe(reload({
            stream: true
        }));
});
gulp.task('serve', ['style', 'script', 'image', 'html'], function() {
    browserSync({
        notify: false,
        port: 2018,
        server: {
            baseDir: ['dist']
        }
    });


    gulp.watch('src/styles/*.less', ['style']);
    gulp.watch('src/scripts/*.js', ['script']);
    gulp.watch('src/images/*.*', ['image']);
    gulp.watch('src/*.html', ['html']);
});



//Static server
/*gulp.task('serve',function(){
    browserSync.init({
        server:{
            baseDir:"./"
        }
    });
});*/
