import gulp from 'core/gulp'

export const command = 'run [task]'
export const description = 'run Gulpfile tasks'
export const options = [{
  flags: '-e, --env <environment>',
  description: 'set environment to run gulp in'
}]

export const action = () => (task = 'index', { env = 'development' }) => {
  gulp.environment = env
  gulp.on('stop', (e) => process.exit(0)).start(task)
}
