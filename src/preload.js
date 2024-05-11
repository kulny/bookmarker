// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  getScreenshot: async (url) => {
    console.log("sent message");
    return await ipcRenderer.invoke("getPageScreenshot", url);
  },
});
