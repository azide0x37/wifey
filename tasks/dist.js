import run from 'run-sequence'

export const description = 'build assets for production'

export default function (done) {
  return run(['styles', 'scripts'], done)
}
