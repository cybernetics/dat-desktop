const mount = require('choo/mount')
const log = require('choo-log')
const choo = require('choo')
const css = require('sheetify')
const fs = require('fs')

css('./public/css/base.css', { global: true })

const mainView = require('./pages/main')

const app = choo()
app.use(log())

// import & init models
app.model(require('./models/app')())

// start
app.router(['/', mainView])
mount('body', app.start())

window.ondragover = e => e.preventDefault()
window.ondrop = e => {
  e.preventDefault()
  const folder = e.dataTransfer &&
    e.dataTransfer.files &&
    e.dataTransfer.files[0] &&
    e.dataTransfer.files[0].path
  if (!folder) return
  fs.stat(folder, (err, stat) => {
    if (err) throw err
    if (!stat.isDirectory()) return
    console.log({ folder })
  })
}
