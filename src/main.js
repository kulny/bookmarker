const { app, BrowserWindow, ipcMain, shell, session, globalShortcut, Menu } = require("electron");
const windowStateKeeper = require("electron-window-state");
const path = require("path");
const url = require("url")

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

ipcMain.handle("getPageScreenshot", async (e, url) => {
  let offscreenWindow = new BrowserWindow({
    show: false,
  });

  let title;
  await offscreenWindow.loadURL(url);
  title = offscreenWindow.webContents.getTitle();
  let openGraphTitle = await offscreenWindow.webContents.executeJavaScript(
    `document.querySelector('meta[property="og:title"]').content;`
  );
  let openGraphImgUrl = await offscreenWindow.webContents.executeJavaScript(`document.querySelector('meta[property="og:image"]').content;`);
  offscreenWindow.close();
  offscreenWindow = null;

  return {title, 
    url,
    openGraphImgUrl,
    openGraphTitle
    };
});

const createWindow = () => {
  let windowState = windowStateKeeper({
    defaultHeight: 650,
    defaultWidth: 700,
    
  });

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    x: windowState.x,
    y: windowState.y,
    width: windowState.width,
    height: windowState.height,
    minWidth: 700,
    minHeight: 500,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.webContents.setWindowOpenHandler(({url}) => {
    shell.openExternal(url);
  })

  globalShortcut.register('CommandOrControl+Alt+Shift+A', () => {
    mainWindow.webContents.send('open-shortcut-modal');
    mainWindow.show();
    mainWindow.focus();
  })

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  windowState.manage(mainWindow);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  ipcMain.on('show-context-menu', (event, url) => {
    const template = [{
      label: "Edit",
      click: ()=>{event.sender.send('edit-command', url)},
    }]
  
    const menu = Menu.buildFromTemplate(template);
    menu.popup();
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  /// yknow, this might not even be used, and I haven't tested it
  // session.defaultSession.protocol.registerFileProtocol('static', (request, callback) => {
  //   const fileUrl = request.url.replace('static://', '');
  //   const filePath = path.join(app.getAppPath(), '.webpack/renderer', fileUrl);
  //   callback(filePath);
  // })


  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

