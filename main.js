const electron=require('electron');
const url=require('url');
const path= require('path');
const { app, BrowserWindow}= electron;
const activeWindows = require('electron-active-window');
const { ipcMain } = require('electron');
//var monitor = require('active-window');
let mainWindow;
app.on('ready', function(){
mainWindow=new BrowserWindow({
  height:500,
  width:800,
  webPreferences:{
    nodeIntegration:true,
    enableRemoteModule:true
  }
})
mainWindow.loadURL(url.format({
  pathname:path.join(__dirname, 'index.html'),
  protocol:'file',
  slashes:true
}))
  mainWindow.openDevTools();
  
  
});

// activeWindows().getActiveWindow().then((result)=>{
//     console.log(result)
// });
 

ipcMain.on('msg',(event,arg)=>{
  console.log(arg);
  function intervalFunc() {
    activeWindows().getActiveWindow().then((result)=>{
    //console.log(result)
    event.reply('back-msg',result);
    });
  }
  setInterval(intervalFunc, 1500);
 
 
  
  //event.reply('back-msg1',"Title: " + window.title);
})
