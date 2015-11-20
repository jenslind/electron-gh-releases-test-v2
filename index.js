'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const GhReleases = require('./GhReleases')

let options = {
  repo: 'jenslind/electron-gh-releases-test-v2',
  version: app.getVersion()
}

let updater = new GhReleases(options)

let mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.webContents.openDevTools()

  updater.check(function (err, status) {
    if (!err && status) {
      console.log('Check: ', err)
      console.log('Check: ', status)
      updater.download()
    }
  })

  updater.on('update-downloaded', function () {
    console.log('Update downloaded')
    updater.install()
  })

  updater.on('error', function (err) {
    console.log('On error: ', err)
  })
})
