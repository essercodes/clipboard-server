// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import {contextBridge, ipcRenderer} from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    onCopyValue: (callback: CallableFunction) => ipcRenderer.on('copy-value', (_event, value: string) => callback(value))
})