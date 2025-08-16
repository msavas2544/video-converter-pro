const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

// FFmpeg yolunu ayarla
ffmpeg.setFfmpegPath(ffmpegPath);

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    titleBarStyle: 'default',
  });
  
  // HTML dosyasını yükle
  win.loadFile(path.join(__dirname, '../renderer/index.html'));
  
  // Development modunda DevTools'u aç
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools();
  }
}

// Video dönüştürme IPC handler'ı
ipcMain.handle('convert-video', async (event, { inputPath, outputFormat, quality }) => {
  try {
    console.log('Starting conversion for:', inputPath);
    
    // Input path kontrolü
    if (!inputPath || typeof inputPath !== 'string') {
      return {
        success: false,
        message: 'Geçersiz dosya yolu'
      };
    }

    // Dosya var mı kontrol et
    if (!fs.existsSync(inputPath)) {
      return {
        success: false,
        message: 'Dosya bulunamadı: ' + inputPath
      };
    }

    // Çıkış klasörünü seç
    const result = await dialog.showSaveDialog({
      title: 'Dönüştürülen videoyu kaydet',
      defaultPath: path.join(path.dirname(inputPath), `converted_${path.parse(inputPath).name}.${outputFormat}`),
      filters: [
        { name: 'Video Files', extensions: [outputFormat] },
        { name: 'All Files', extensions: ['*'] }
      ]
    });

    if (result.canceled) {
      return { success: false, message: 'İşlem iptal edildi' };
    }

    const outputPath = result.filePath;

    return new Promise((resolve, reject) => {
      let command = ffmpeg(inputPath);
      
      // Kalite ayarları
      switch (quality) {
        case 'low':
          command = command.videoBitrate('500k').audioBitrate('96k').size('640x360');
          break;
        case 'medium':
          command = command.videoBitrate('1000k').audioBitrate('128k').size('1280x720');
          break;
        case 'high':
          command = command.videoBitrate('2000k').audioBitrate('192k').size('1920x1080');
          break;
        case 'ultra':
          command = command.videoBitrate('4000k').audioBitrate('320k');
          break;
      }
      
      command
        .output(outputPath)
        .on('start', (commandLine) => {
          console.log('FFmpeg started with command:', commandLine);
        })
        .on('progress', (progress) => {
          const percent = Math.round(progress.percent || 0);
          console.log('Progress:', percent + '%');
          event.sender.send('conversion-progress', percent);
        })
        .on('end', () => {
          console.log('Conversion finished successfully');
          resolve({ 
            success: true, 
            outputPath: outputPath,
            message: `Video başarıyla dönüştürüldü: ${outputPath}`
          });
        })
        .on('error', (err) => {
          console.error('FFmpeg Error:', err);
          resolve({
            success: false,
            message: `Dönüştürme hatası: ${err.message}`
          });
        })
        .run();
    });
    
  } catch (error) {
    console.error('Conversion Error:', error);
    return {
      success: false,
      message: `Hata: ${error.message}`
    };
  }
});

// Dosya seçme dialog'u
ipcMain.handle('select-video-files', async () => {
  const result = await dialog.showOpenDialog({
    title: 'Video dosyalarını seçin',
    filters: [
      { name: 'Video Files', extensions: ['mp4', 'avi', 'mkv', 'mov', 'flv', 'wmv', 'webm', 'm4v', '3gp'] },
      { name: 'All Files', extensions: ['*'] }
    ],
    properties: ['openFile', 'multiSelections']
  });
  
  return result;
});

// Çıktı klasörünü aç
ipcMain.handle('open-output-folder', async (event, filePath) => {
  const { shell } = require('electron');
  shell.showItemInFolder(filePath);
});

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
