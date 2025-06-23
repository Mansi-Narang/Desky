if (require('electron-squirrel-startup')) return;
const {app, BrowserWindow, ipcMain} = require('electron');
const mongoose = require('mongoose');
const todoModel = require('./ToDoSchema');
const path = require('path');

mongoose.connect("mongodb://127.0.0.1:27017/desky")
.then(()=>{
    console.log("Mongo DB connected");
})
.catch((e) => {
    console.error("DATABASE ERROR" + e);
})

function createWindow(){
    const win = new BrowserWindow({
        width: 1000,
        height: 1000,
        webPreferences: {
            preload: path.resolve(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    if(win.maximizable) win.maximize();

    app.setName('Desky');
    win.loadFile('home.html');
    win.removeMenu();
    // win.webContents.openDevTools();
}

app.whenReady()
.then(() => {
    createWindow();

    ipcMain.handle('getToDo', async(event, date)=>{
        return await todoModel.find({date}).lean();   //converting docments to plain objects
    })

    ipcMain.on('postToDo', async(event, args)=>{
        const todo = new todoModel({
            task : args.task
        })
        await todo.save();
        console.log('TASK Stored!');
        return;
    })

    ipcMain.on('updateToDo', async(event, args) => {
        const task = await todoModel.findOne({id : args})
        if(task){
        task.completeTask = !task.completeTask; 
        await task.save();
        console.log('Task updated!');
        }
    })

    ipcMain.on('deleteToDo', async(event, args) => {
        await todoModel.deleteOne({id:args}); // can't do find by id as it will find by _id but we have inbuilt key named id
        console.log('Task deleted!');
    })
})

app.on("window-all-closed", ()=>{
    app.quit();
})

process.on('unhandledRejection', function(e) {
    console.log(e);
})

