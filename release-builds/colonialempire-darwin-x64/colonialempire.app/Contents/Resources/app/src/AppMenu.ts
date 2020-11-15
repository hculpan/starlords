import { BrowserWindow, Menu, MenuItemConstructorOptions, MenuItem } from "electron";

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
       label: 'View',
       submenu: [
          {
             role: 'reload'
          },
          {
             role: 'toggledevtools'
          },
          {
            type: 'separator'
          },
          {
            label: 'Second view',
            accelerator: 'CmdOrCtrl+2',
            click(menuItem: MenuItem, browserWindow: BrowserWindow) {
              console.log('Got event!');
            }
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