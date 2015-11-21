'use strict'

const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const GhReleases = require('electron-gh-releases')

let mainWindow = null;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  let options = {
    repo: 'jenslind/electron-gh-releases-test-v2',
    currentVersion: app.getVersion()
  }

  let updater = new GhReleases(options)

  mainWindow = new BrowserWindow({width: 800, height: 600})
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.webContents.openDevTools()

  updater.check(function (err, status) {
    mainWindow.webContents.send('log', 'Check:' + err)
    mainWindow.webContents.send('log', 'Check:' + status)
    if (!err && status) {
      updater.download()
    }
  })

  updater.on('update-downloaded', function () {
    mainWindow.webContents.send('log', 'Update downloaded')
    updater.install()
  })
})
