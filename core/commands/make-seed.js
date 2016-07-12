import { resolve } from 'path'
import { writeFileSync } from 'fs'
import { upperFirst } from 'lodash'
import { pluralize } from 'inflection'

export const command = 'make:seed <model>'
export const description = 'create a new seed file'

const template = (Model) => `import faker from 'faker'
import ${upperFirst(Model)} from 'app/models/${Model.toLowerCase()}'

export const seed = () => ${Model}.create([{
  field: 'value_2'
}, {
  field: 'value_1'
}])
`

export const action = () => (model, { table }) => {
  const filename = `${pluralize(model.toLowerCase())}.js`
  writeFileSync(resolve(`database/seeds/${filename}`), template(model))
  console.log(`Created ${filename}`)
}
