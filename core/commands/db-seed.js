import { basename } from 'path'
import { db } from 'core/bookshelf'

export const command = 'db:seed [files...]'
export const description = 'seed the database with records'

export const action = () => (files) => {
  const seed = files.length > 0 ? db.seed._runSeeds(files) : db.seed.run()

  seed.spread((seeds) => {
    if (seeds.length === 0) {
      console.log('No seed files exist')
    } else {
      console.log(`Ran ${seeds.length} seed files:`)
      seeds.map((file) => console.log(basename(file, '.js')))
    }
    db.destroy()
  })
}
