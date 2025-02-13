export interface IElectronAPI {
  onCopyValue: (callback: (value: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}