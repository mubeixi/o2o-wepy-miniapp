const path = require('path')
var prod = process.env.NODE_ENV === 'production'

// 使用 UglifyJS 对编译后的代码进行打混淆压缩。
const UglifyPlugin = require('@wepy/plugin-uglifyjs')
const TypeScriptCompiler = require('@wepy/compiler-typescript')
const fs = require('fs')
const prependData = fs.readFileSync('src/assets/variables.scss', 'utf-8') + fs.readFileSync('src/assets/mixins.scss', 'utf-8')
// const prependData = '@import "src/assets/variables.scss";@import "src/assets/mixins.scss";'

// const prependData = `
// $fun-gray-color: #BEBEBE;
// $fun-primary-color:#26C78D;
// $fun-green-color:#26C78D;
// $fun-black-color:#000000;
// $fun-red-color:#F53636;
// $fun-blue-color:#00A8FF;
// @mixin cover-img($paddingTop:0px,$bgsize:cover,$bgcolor:#f2f2f2,$repreat:no-repeat) {
//   background: {
//     color: $bgcolor;
//     size: $bgsize;
//     repeat: $repreat;
//   };
//   padding: {
//     top:$paddingTop;
//   };
// }
// `
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
    UglifyPlugin()
  ],
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}
