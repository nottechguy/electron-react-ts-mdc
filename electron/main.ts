import { app, BrowserWindow, session } from 'electron';

class Main {
    private mainWindow: Electron.BrowserWindow | any;
    private splashScreen: Electron.BrowserWindow | any;

    public init() {
        app.on('ready', this.createWindow);
        app.on('will-quit', this.quit);
        app.allowRendererProcessReuse = true;
    }

    private createWindow() {
        this.mainWindow = new BrowserWindow({
            titleBarStyle: 'hidden',
            height: 400,
            width: 800,
            title: '',
            webPreferences: {
                nodeIntegration: true
            },
            show: false
        });

        this.splashScreen = new BrowserWindow({
            width: 810,
            height: 500,
            transparent: true,
            frame: false,
            alwaysOnTop: true
        });

        this.splashScreen.loadURL(`file://${__dirname}/dist/renderer/splashscreen.html`);
        let startURL = (process.env.NODE_ENV === 'development') ? 
            'http://localhost:8080' : 
            `file://${__dirname}/dist/renderer/index.html`;

        this.mainWindow.loadURL(startURL);
        
        if (process.env.NODE_ENV === 'development') {
            this.mainWindow.webContents.openDevTools();
        }

        this.mainWindow.once('ready-to-show', () => {
            this.splashScreen.destroy();
            this.mainWindow.show();
        });

    }

    private quit() {
    }
}

new Main().init();