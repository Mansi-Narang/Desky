const { contextBridge, ipcRenderer } = require('electron'); 

contextBridge.exposeInMainWorld('Api', {
    getToDo : (date) => {
        return  ipcRenderer.invoke("getToDo", date);
    },
    postToDo : (todo) => {
        ipcRenderer.send("postToDo", todo);
    },
    updateToDo : (id) => {
        ipcRenderer.send("updateToDo", id);
    },
    deleteToDo : (id) => {
        ipcRenderer.send("deleteToDo", id);
    }
})