/// <binding BeforeBuild='build' ProjectOpened='watch' />
var ts = require('gulp-typescript');
var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('delete');


gulp.task("dist-libs", () => {
    gulp.src([
            'core-js/client/**',
            'systemjs/dist/system.src.js',
            'reflect-metadata/**',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/**',
            '@ngrx/**',
            'deep-freeze-strict/**',
            'ngrx-store-freeze/**',
            '@swimlane/ngx-datatable/release/**',
            'tassign/**',
            'lodash/**',
            'jquery/dist/jquery.*js',
            'hammerjs/hammer.js'
    ], {
        cwd: "node_modules/**"
    })
        .pipe(gulp.dest('./dist/libs'));
});

gulp.task('clean-libs', function () {
    return del('./dist/libs');
});



gulp.task('build-ts', function () {
    var tsResult = gulp.src("./app/**/*.ts")
        .pipe(ts.createProject('app/tsconfig.json')());
    return tsResult.js.pipe(gulp.dest('./dist/app/'));
});

gulp.task('build-sass', function () {
    gulp.src('./app/**/*.scss')
        .pipe(sass()).on('error', function (err) {
            console.log(err);
        })
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('copy-html', function () {
    gulp.src("./app/**/*.html")
        .pipe(gulp.dest('./dist/html/'));
});

gulp.task('build', ['build-ts', 'copy-html', 'build-sass']);

gulp.task('clean-dist', function () {
    return del(['./dist/**', '!./dist', '!./dist/libs']);
});

gulp.task('watch', function () {
    gulp.watch('./app/**/*.scss', ['build-sass']);

    gulp.watch('app/**/*.ts', ['build-ts']);

    gulp.watch('./app/**/*.html', ['copy-html']);
});
