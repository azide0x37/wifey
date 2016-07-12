import { resolve } from 'path'
import sass from 'gulp-sass'
import ifTrue from 'gulp-if'
import minify from 'gulp-minify-css'
import livereload from 'gulp-livereload'

export const description = 'build styles with sass'

export default function () {
  return this.src(['assets/styles/app.scss'])
    .pipe(sass({
      includePaths: [resolve('node_modules')]
    }))
    .pipe(ifTrue(this.environment === 'production', minify()))
    .pipe(this.dest('public/'))
    .pipe(livereload())
}
