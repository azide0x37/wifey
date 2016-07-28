require('babel-core/register')({ ignore: /node_modules\/(?!@vulcan\/core)/ })
require('app-module-path').addPath(require('path').resolve(__dirname, '..'))
process.env.NODE_ENV = process.env.NODE_ENV || 'test'
