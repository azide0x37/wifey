import { name } from 'package.json'

export default {
  name,
  debug: false,
  keys: ['123-change-me'],
  methodOverride: {
    getter: '_method',
    methods: ['POST']
  },
  etag: {
    weak: false
  },
  compress: {
    filter: undefined,
    threshold: 1024
  },
  bodyparser: {
    enableTypes: ['json', 'form'],
    encode: 'utf-8',
    formLimit: '56kb',
    jsonLimit: '1mb',
    textLimit: '1mb',
    strict: true,
    detectJSON: undefined,
    extendTypes: {},
    onError: undefined
  }
}
