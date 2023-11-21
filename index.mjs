import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import generator from '@babel/generator'
import template from '@babel/template'
import types from '@babel/types'
import fs from 'fs'

let code = fs.readFileSync('./code.js').toString()
const ast = parse(code)

const buildCodeFragment = function (code) {
  const ast = parse(code)
  console.log(ast.program.body)
  return ast.program.body.shift()
}

const buildElement = function (insertCode) {
  const element = template.default(insertCode, {
    sourceType: 'module',
    strictMode: false,
    plugins: [
      'jsx',
      'flow',
      'classProperties',
      'decorators',
      // 'decorators-legacy'
    ]
  })()

  return element
}

traverse.default(ast, {
  VariableDeclaration(path) {
    // 修改参数名
    // let args = path.parentPath.parentPath.node.params
    // args[0].name = "b"

    // 在当前路径前添加前节点
    // let insertNode = buildCodeFragment('var a = 1')
    // path.insertBefore(insertNode)
    // console.log(path.parentPath.parentPath.parentPath.parentPath.node)

    // toString() 用法
    // console.log(path.toString())

    // replaceWith(node) 用法
    // path.replaceWith(buildElement(`var a = 2;`))
    // path.stop()
    // path.replaceWith(buildCodeFragment("console.log('hello world');"))

    // replaceWithMultiple 用法
    // path.replaceWithMultiple([
    //   buildCodeFragment('console.log("hi")'),
    //   buildCodeFragment('console.log("小牛")')
    // ])

    // replaceWithSourceString 用法
    // path.replaceWithSourceString('console.log("hello world")')

    // remove 用法
    // path.remove()

    // insertBefore 用法
    // path.insertBefore(buildCodeFragment('var x = 3;'))
    // 如果不停止的话，会出现死循环问题。因为插入的是一个变量声明语句，这个变量声明语句会重新调用 VariableDeclaration() 这个 visitor，导致死循环
    // path.stop()

    // insertAfter 用法
    // path.insertAfter(buildElement('var x = 3; console.log("haha")'))
    // path.stop()

    // getFunctionParent 用法
    // console.log(path.getFunctionParent().node)

    // getPrevSibling 用法
    // console.log(path.getPrevSibling().node)

    // pushContainer 用法
    // path.parentPath.pushContainer('body', buildElement('if (true) {}'))

    // unshiftContainer 用法
    // path.parentPath.unshiftContainer('body', buildElement('if (true) {}'))
  }
})

console.log(generator.default(ast).code)
