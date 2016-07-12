import { readdirSync } from 'fs'
import { resolve } from 'path'

const internal = readdirSync(resolve('core/commands'))
  .filter((file) => !file.startsWith('index'))
  .map((file) => require(resolve(`core/commands/${file}`)))

const app = readdirSync(resolve('app/commands'))
  .map((file) => require(resolve(`app/commands/${file}`)))

const commands = [...internal, ...app]

commands.sort((a, b) => (a.command > b.command) ? 1 : ((b.command > a.command) ? -1 : 0))

export default commands
