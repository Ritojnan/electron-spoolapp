// import os from "os";
// import path from "path";
// import { ContextBridge, ipcRenderer } from "electron";
const os = require("os");
const path = require("path");
const { contextBridge, ipcRenderer } = require("electron");
const Toastify = require("toastify-js");

// import Toastify from "toastify-js"

contextBridge.exposeInMainWorld("electron", {
  minimize: () => ipcRenderer.send("minimize"),
  maximize: () => ipcRenderer.send("maximize"),
  unmaximize: () => ipcRenderer.send("unmaximize"),
  close: () => ipcRenderer.send("close"),
});

contextBridge.exposeInMainWorld("os", {
  homedir: () => os.homedir(),
});

contextBridge.exposeInMainWorld("path", {
  join: (...args) => path.join(...args),
});

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) =>
    ipcRenderer.on(channel, (event, ...args) => func(...args)),
});

contextBridge.exposeInMainWorld("Toastify", {
  toast: (options) => Toastify(options).showToast(),
});
