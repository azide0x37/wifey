import { repeat } from 'lodash'
import chalk from 'chalk'
import env from '@niftyco/env'
import config from 'core/config'
import { logo } from 'core/vulcan'
import { db } from 'core/bookshelf'
import app from 'core/app'

const timeout = 3000
export default (port, banner, cb = () => {}) => {
  const server = app.listen(port, () => {
    if (banner) {
      console.log(logo)
      console.log(`  ${repeat('-', 80)}\n`)
    }
    console.log(`  Started ${chalk.gray(config.get('app.name', 'your app'))} in ${chalk.cyan(env.get('node_env', 'development'))} mode at ${chalk.yellow(process.cwd())}`)
    console.log(`  You can view it by going to ${chalk.blue(`http://localhost:${port}`)} in your browser.`)
    console.log(`  Press ${chalk.cyan('<CTRL> + <C>')} at any time to shut down Vulcan server.\n`)

    cb()
  })

  process.on('SIGINT', () => {
    console.log(`\n  ${chalk.red('Shutting down server.')}\n`)
    db.destroy()
    server.close((e) => process.exit(1))

    setTimeout(() => {
      console.log(`  ${chalk.red(`Could not close server in time (${timeout}ms), forcefully shutting down.`)}\n`)
      process.exit(1)
    }, timeout).unref()
  })
  return server
}
