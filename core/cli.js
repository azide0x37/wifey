import { resolve } from 'path'
import { readdirSync } from 'fs'
import cli from 'commander'
import commands from 'core/commands'
import { version } from 'core/vulcan'

const pad = (str, width) => str + Array(Math.max(0, width - str.length) + 1).join(' ')

cli.version(version, '-v, --version')

commands.map((cmd) => {
  const command = cli.command(cmd.command)
  command.description(cmd.description)
  if (cmd.options) {
    cmd.options.map((opt) => command.option(opt.flags, opt.description, opt.default))
  }
  if (cmd.alias) {
    command.alias(cmd.alias)
  }
  command.action(cmd.action())
})

cli.on('--help', () => {
  const tasks = readdirSync(resolve('tasks'))
    .map((file) => ({ name: file.replace(/^(.+)\.js/, '$1'), task: require(resolve(`tasks/${file}`)) }))
    .filter(({ task }) => task.description)
  const width = tasks.reduce((max, task) => Math.max(max, task.name.length), 0)

  console.log('  Tasks:\n')
  tasks.map(({ name, task }) => console.log(`    ${pad(name, width)}  ${task.description}`))
  console.log('')
})

cli.parse(process.argv)

if (!cli.args.length) {
  cli.help()
}
