"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const template = [
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
                click(menuItem, browserWindow) {
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
];
class AppMenu {
    static createMenu() {
        return electron_1.Menu.buildFromTemplate(template);
    }
}
exports.AppMenu = AppMenu;
//# sourceMappingURL=AppMenu.js.map