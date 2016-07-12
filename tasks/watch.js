import livereload from 'gulp-livereload'

export default function () {
  livereload.listen()
  this.watch(['assets/styles/**/*.scss'], ['styles'])
  this.watch(['assets/scripts/**/*.js'], ['scripts'])
}
