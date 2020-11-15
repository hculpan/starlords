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
                click(menuItem, browserWindow) {
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
];
class AppMenu {
    static createMenu() {
        return electron_1.Menu.buildFromTemplate(template);
    }
}
exports.AppMenu = AppMenu;
//# sourceMappingURL=AppMenu.js.map