const path = require('path')
var prod = process.env.NODE_ENV === 'production'

// 使用 UglifyJS 对编译后的代码进行打混淆压缩。
const UglifyPlugin = require('@wepy/plugin-uglifyjs')
const TypeScriptCompiler = require('@wepy/compiler-typescript')
const fs = require('fs')
const prependData = fs.readFileSync('src/assets/variables.scss', 'utf-8').toString() + fs.readFileSync('src/assets/mixins.scss', 'utf-8').toString()

module.exports = {
  wpyExt: '.wpy',
  eslint: true,
  cliLogs: !prod,
  static: ['static', 'custom-tab-bar'],
  build: {
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    },
    aliasFields: ['wepy', 'weapp'],
    modules: ['node_modules']
  },
  compilers: {
    less: {
      compress: prod
    },
    sass: {
      outputStyle: 'compressed',
      data: prependData
    },
    babel: {
      sourceMap: true,
      presets: [
        '@babel/preset-env'
      ],
      plugins: [
        '@wepy/babel-plugin-import-regenerator',
        '@babel/plugin-proposal-class-properties'
      ]
    }
  },
  plugins: [
    TypeScriptCompiler(),
    // UglifyPlugin()
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}
