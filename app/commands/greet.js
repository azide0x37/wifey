export const command = 'greet [name]'
export const description = 'greet someone'
export const options = [{
  flags: '-g, --greeting <greeting>',
  description: 'how to greet someone'
}]

export const action = (done) => (name = 'World', { greeting = 'Hello' }) => {
  console.log(`
    > ${greeting} ${name}!
  `)
  done()
}
