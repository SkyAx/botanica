var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    autoprefixer= require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglifyjs'),
    cssnano     = require('gulp-cssnano'),
    rename      = require('gulp-rename'),
    del         = require('del'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    cache       = require('gulp-cache'),
    sftp        = require('gulp-sftp'),
    nodemon     = require('gulp-nodemon'),
    less        = require('gulp-less');

gulp.task('sass', function () {
    return gulp.src('app/public/styles/**/*.sass')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], {cascade: true}))
        .pipe(gulp.dest('app/public/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('less', function () {
    return gulp.src('app/public/styles/**/*.less')
        .pipe(less())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8'], {cascade: true}))
        .pipe(gulp.dest('app/public/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('nodemon', function (cb) {
    var callbackCalled = false;
    return nodemon({script: 'app/app.js'}).on('start', function () {
        if (!callbackCalled) {
            callbackCalled = true;
            cb();
        }
    });
});

gulp.task('browser-sync', ['nodemon'], function () {
   browserSync({
       logPrefix: '',
       proxy: 'http://localhost:8080',
       notify: false
   });
});

gulp.task('css-libs', ['less'], function () {
   return gulp.src('app/public/css/libs.css')
       .pipe(cssnano())
       .pipe(rename({suffix: '.min'}))
       .pipe(gulp.dest('app/public/css'));
});

gulp.task('js-libs', function () {
    return gulp.src([
        'app/public/libs/jquery/dist/jquery.min.js',
        'app/public/libs/jquery-form/dist/jquery.form.min.js',
        'app/public/semantic/dist/semantic.js',
        'app/public/libs/raphael/raphael.min.js',
        'app/public/libs/justgage/justgage.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/public/js'))
});

gulp.task('clean', function () {
   return del.sync('dist');
});

gulp.task('clear-cache', function () {
    return cache.clearAll();
});

gulp.task('img', function () {
   return gulp.src('app/public/img/**/*')
       .pipe(cache(imagemin({
           interlaced: true,
           progressive: true,
           svgoPlugins: [{removeViewBox: false}],
           une: [pngquant()]
       })))
       .pipe(gulp.dest('dist/public/img'))
});

gulp.task('default', ['browser-sync', 'sass', 'less', 'js-libs', 'css-libs'], function () {
    gulp.watch('app/public/styles/**/*.sass', ['sass']);
    gulp.watch('app/public/styles/**/*.less', ['less']);
    gulp.watch('app/public/js/**/*.js', browserSync.reload);
    gulp.watch('app/modules/views/**/*', browserSync.reload);
    gulp.watch('app/server/views/**/*', browserSync.reload);
    gulp.watch('app/server/routes.js', browserSync.reload);
    gulp.watch('app/app.js', browserSync.reload);
});

gulp.task('build', ['clean', 'img', 'sass', 'less', 'js-libs'], function () {
    var buildCss = gulp.src([
      'app/public/css/core.css',
      'app/public/css/home.css',
      'app/public/css/login.css',
    ])
        .pipe(cssnano())
        .pipe(gulp.dest('dist/public/css'));

    var buildFonts = gulp.src('app/public/fonts/**/*.*')
        .pipe(gulp.dest('dist/public/fonts'));

    var buildJS = gulp.src('app/public/js/**/*')
        .pipe(gulp.dest('dist/public/js'));

    var buildViews = gulp.src('app/public/semantic/**/*')
        .pipe(gulp.dest('dist/public/semantic'));

    var buildData = gulp.src('app/public/tmp/data.json')
        .pipe(gulp.dest('dist/public/tmp'))

    var buildVendor = gulp.src('app/public/vendor/*')
        .pipe(gulp.dest('dist/public/vendor'))

    var buildServer = gulp.src('app/server/**/*')
        .pipe(gulp.dest('dist/server'))

    var buildApp = gulp.src('app/app.js')
        .pipe(gulp.dest('dist/'));
});

gulp.task('sftp', function () {
    return gulp.src(['dist/**/*'])
        .pipe(sftp({
            host: '188.166.41.188',
            user: 'root',
            pass: 'P51d232293_!',
            remotePath: '/root'
        }));
});

gulp.task('css-send', function () {
    return gulp.src(['dist/public/css/**/*'])
        .pipe(sftp({
            host: '188.166.41.188',
            user: 'root',
            pass: 'P51d232293_!',
            remotePath: '/root/public/css'
        }));
});

gulp.task('views-send', function () {
    return gulp.src(['dist/server/views/**/*'])
        .pipe(sftp({
            host: '188.166.41.188',
            user: 'root',
            pass: 'P51d232293_!',
            remotePath: '/root/server/views'
        }));
});

gulp.task('js-send', function () {
    return gulp.src(['dist/public/js/**/*'])
        .pipe(sftp({
            host: '188.166.41.188',
            user: 'root',
            pass: 'P51d232293_!',
            remotePath: '/root/public/js'
        }));
});

gulp.task('package-send', function () {
    return gulp.src('package.json')
        .pipe(sftp({
            host: '188.166.41.188',
            user: 'root',
            pass: 'P51d232293_!',
            remotePath: '/root'
        }));
});
