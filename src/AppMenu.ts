import { BrowserWindow, Menu, MenuItemConstructorOptions, MenuItem, ipcRenderer, ipcMain } from "electron";

const template: MenuItemConstructorOptions[] = [
    {
      label: 'appmenu',
      submenu: [
        {
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          role: 'quit'
        }
      ]
    },
    {
      label: 'Game',
      submenu: [
         {
            label: 'New Game',
            accelerator: 'CmdOrCtrl+N',
            click(menuItem: MenuItem, browserWindow: BrowserWindow) {
              browserWindow.webContents.send('new-game');
            }
         }
        ]
     },
   
     {
       label: 'View',
       submenu: [
          {
             role: 'reload'
          },
          {
             role: 'toggledevtools'
          }
         ]
    },
    
    {
       role: 'window',
       submenu: [
          {
             role: 'minimize'
          },
          {
             role: 'close'
          }
       ]
    },
    
    {
       role: 'help',
       submenu: [
          {
             label: 'Learn More'
          }
       ]
    }
  ]
  
export class AppMenu {
    static createMenu(): Menu {
        return Menu.buildFromTemplate(template);
    }
}