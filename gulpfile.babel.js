import gulp from 'gulp'
import babel from 'gulp-babel'
import watch from 'gulp-watch'
import express from 'gulp-express'

gulp.task('transform', () => {
  gulp.src('src/**/*.js')
      .pipe(babel({
        "presets": ["es2015", "stage-3"],
        "plugins": ["transform-class-properties", "transform-runtime"]
      }))
      .pipe(gulp.dest('dest'))
})

// gulp.task('watch', () => {
//   gulp.src('src/**/*.js')
//       .pipe(watch('src/**/*.js', {verbose: true}))
//       .pipe(babel({
//         "presets": ["es2015", "stage-3"],
//         "plugins": ["transform-runtime","transform-class-properties"]
//       }))
//       .pipe(gulp.dest('dest'))
// })

gulp.task('server', () => {
  express.run(['dest/app.js'])
  // gulp.watch('[src/**/*.js]', ['transform', 'server'])
  
})

gulp.task('monitor', function () {
  gulp.watch('src/**/*.js', ['transform']);
  gulp.watch('src/**/*.js', ['server'])
})

gulp.task('deploy', ['monitor', 'transform', 'server'], function () {
  console.log("heihei u have finished the task");
})

gulp.task('default', () => gulp.start('transform'))