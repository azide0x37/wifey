import del from 'del'

export const description = 'clean assets out of public/'

export default function () {
  return del(['public/app.js', 'public/vendor.js', 'app.css'])
}
