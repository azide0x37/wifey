import { resolve } from 'path'
import webpack from 'webpack-stream'
import livereload from 'gulp-livereload'
import UglifyJs from 'webpack/lib/optimize/UglifyJsPlugin'
import CommonsChunk from 'webpack/lib/optimize/CommonsChunkPlugin'
import DedupePlugin from 'webpack/lib/optimize/DedupePlugin'
import OccurrenceOrderPlugin from 'webpack/lib/optimize/OccurrenceOrderPlugin'
import DefinePlugin from 'webpack/lib/DefinePlugin'

export const description = 'build scripts with webpack'

export default function () {
  const src = resolve('assets/scripts')
  const modules = resolve('node_modules')
  const config = {
    entry: {
      app: resolve(src, 'app.js')
    },
    resolve: {
      context: src,
      extensions: ['', '.js', '.json'],
      modulesDirectories: [src, modules]
    },
    output: {
      filename: '[name].js'
    },
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015'],
          plugins: ['add-module-exports']
        }
      }, {
        test: /\.json$/,
        loader: 'json',
        exclude: /node_modules/
      }]
    },
    plugins: [
      new CommonsChunk({
        name: 'vendors',
        filename: 'vendors.js',
        minChunks: (m) => m.resource && !!~m.resource.indexOf(modules)
      })
    ]
  }

  if (this.environment === 'production') {
    config.plugins.push(new DedupePlugin())
    config.plugins.push(new OccurrenceOrderPlugin())
    config.plugins.push(new UglifyJs({ compress: { warnings: false } }))
    config.plugins.push(new DefinePlugin({
      process: {
        env: {
          NODE_ENV: '"production"'
        }
      }
    }))
  }

  return webpack(config)
    .on('error', function (err) {
      this.emit('end', err)
    })
    .pipe(this.dest('public/'))
    .pipe(livereload())
}
