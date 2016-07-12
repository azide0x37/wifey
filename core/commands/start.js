import env from '@niftyco/env'
import config from 'core/config'
import server from 'core/server'
import gulp from 'core/gulp'

export const command = 'start'
export const description = 'start your app'
export const options = [{
  flags: '-p, --port [int]',
  description: 'the port the app will be running on',
  default: env.get('port', config.get('app.port', 80))
}, {
  flags: '-B, --no-banner',
  description: "don't show the banner"
}]

const callback = env.get('node_env', 'development') === 'development' ? () => gulp.start('index') : () => {}

export const action = () => ({ port, banner }) => server(port, banner, callback)
