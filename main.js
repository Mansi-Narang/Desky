const {app, BrowserWindow} = require('electron');

function createWindow(){
    const win = new BrowserWindow({
        width: 1000,
        height: 1000
    })

    win.loadFile('home.html');
}

app.whenReady()
.then(() => {
    createWindow();
})

app.on("window-all-closed", ()=>{
    app.quit();
})
