// @ts-nocheck

// 局部模式
const shell = require('shelljs')

if (shell.exec('npm run clean').code !== 0) { // 执行npm run build 命令
  shell.echo('Error: clean failed')
  shell.exit(1)
}

if (shell.exec('npm run dev').code !== 0) { // 执行npm run build 命令
  shell.echo('Error: run failed')
  shell.exit(1)
}
