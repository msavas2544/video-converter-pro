# 🎬 Video Converter Pro

Modern, gelişmiş video dönüştürücü masaüstü uygulaması. Electron + FFmpeg tabanlı, kullanıcı dostu arayüzle güçlü video işleme.

![Video Converter Pro](https://img.shields.io/badge/Electron-App-blue?style=for-the-badge&logo=electron)
![FFmpeg](https://img.shields.io/badge/FFmpeg-Powered-green?style=for-the-badge&logo=ffmpeg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)

## 🚀 Özellikler

### ✅ **Ana Özellikler**
- 🎥 **Çoklu Format Desteği**: MP4, AVI, MKV, MOV, FLV, WMV, WebM
- 📦 **Toplu Dönüştürme**: Birden fazla dosyayı aynı anda işle
- 🎨 **Modern GUI**: Glassmorphism tasarım, gradient arka planlar
- 📁 **Drag & Drop**: Dosyaları sürükleyip bırakma desteği
- ⚙️ **Kalite Kontrolü**: 4 farklı kalite seviyesi (Düşük → Ultra)
- 📊 **Gerçek Zamanlı İlerleme**: FFmpeg'den gelen canlı progress
- 💾 **Esnek Kaydetme**: İstediğiniz konuma kaydetme
- 🔍 **Dosya Yönetimi**: Dönüştürülen dosyaları kolayca bulma

### 🎯 **Kalite Seçenekleri**
- **Düşük**: 640x360, 500k video + 96k audio (Küçük boyut)
- **Orta**: 1280x720, 1000k video + 128k audio (Dengeli)
- **Yüksek**: 1920x1080, 2000k video + 192k audio (Kaliteli)
- **Ultra**: Orijinal çözünürlük, 4000k video + 320k audio (Maksimum)

## � Kurulum

### Gereksinimler
- Windows 10/11
- Node.js 16+
- npm 7+

### Adımlar
```bash
# Repository'yi klonlayın
git clone https://github.com/[kullanici-adi]/video-converter-pro.git
cd video-converter-pro

# Bağımlılıkları yükleyin
npm install

# Uygulamayı başlatın
npm start

# Production build için
npm run make
```

## 🎮 Kullanım

1. **Dosya Seçimi**: "Dosya Seç" butonuna tıklayın veya dosyaları sürükleyip bırakın
2. **Format Ayarı**: Çıkış formatını seçin (MP4, AVI, MKV, vb.)
3. **Kalite Ayarı**: İstediğiniz kalite seviyesini belirleyin
4. **Dönüştürme**: "Dönüştür" butonuna basın
5. **Kaydetme**: Çıkış konumunu seçin
6. **Tamamlama**: "Klasörü Aç" ile sonuca ulaşın

## 🛠 Teknolojiler

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Node.js, Electron
- **Video İşleme**: FFmpeg, fluent-ffmpeg
- **UI/UX**: Glassmorphism, CSS Grid, Flexbox
- **Paketleme**: Electron Forge

## 📸 Ekran Görüntüleri

*Yakında eklenecek*

## � Geliştirme

```bash
# Development mode
npm run start

# Lint kontrolü
npm run lint

# Package oluşturma
npm run package

# Platform-specific build
npm run make
```

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## � Teşekkürler

- [FFmpeg](https://ffmpeg.org/) - Güçlü video işleme
- [Electron](https://electronjs.org/) - Cross-platform masaüstü uygulamaları
- [Node.js](https://nodejs.org/) - JavaScript runtime

---

⭐ **Bu projeyi beğendiyseniz star vermeyi unutmayın!**

🐛 **Bug bulursanız veya öneriniz varsa issue açın**

💬 **Sorularınız için discussion başlatın**
