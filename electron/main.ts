import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow;
app.on('ready', createWindow);

// const path = require('path');

require('electron-reload')(__dirname, {
  electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
});
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

function createWindow() {
  win = new BrowserWindow({
    width: 850,
    height: 600,
    webPreferences: { nodeIntegration: true }
  });

  // win.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, `/../../dist/angular-electron/index.html`),
  //     protocol: 'file:',
  //     slashes: true
  //   })
  // );
  win.loadURL('http://localhost:4200/');
  win.webContents.openDevTools();

  win.on('closed', () => {
    win = null;
  });
}

ipcMain.on('getFiles', (event, arg) => {
  const files = fs.readdirSync(__dirname);
  win.webContents.send('getFilesResponse', files);
});
