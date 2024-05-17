// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  getScreenshot: async (url) => {
    return await ipcRenderer.invoke("getPageScreenshot", url);
  },
  onShortcutAddItem: (callback) => {
    // registers callback as the function to run when open-shortcut-modal is called
    // use .once in callback patterns to prevent memory leaks from multiple listener calls
    ipcRenderer.once('open-shortcut-modal', callback)
  },
  openContextMenu: (url) => {
    ipcRenderer.send("show-context-menu", url);
  }
});

contextBridge.exposeInMainWorld("contextMenuCallbacks", {
  onEditItem: (callback) => {
    // define what we want this to do in the front end where it is used
    ipcRenderer.once('edit-command', (event, url) => {
      callback(url);
    });
  }
})
