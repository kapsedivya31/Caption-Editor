# Caption Editor SDK

## 📌 Project Overview
The Caption Editor SDK is a web-based application designed for seamless caption editing. Users can import videos and corresponding SRT files to modify captions, adjust synchronization, and apply styling. The system focuses on providing an interactive and user-friendly experience similar to Submagic.co.

## 🛠 Installation & Setup Instructions

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v16 or later)
- **npm** or **yarn**
- **Git**

### Clone the Repository
```sh
git clone (https://github.com/kapsedivya31/Caption-Editor)
cd Caption-Editor
```

### Install Dependencies
```sh
npm install  # or yarn install
```

### Start the Development Server
```sh
npm run dev  # or yarn dev
```

### Build for Production
```sh
npm run build  # or yarn build
```

## ✨ Features & Functionalities
- **Import Video & SRT Files**: Upload video files with or without embedded captions.
- **Styling Customization**: Change font type, size, color, background, and alignment.
- **Real-time Preview**: View edited captions overlaid on the video instantly.
- **Drag & Drop Support**: Easily reposition captions within the video frame.
- **Keyboard Shortcuts**: Enhanced accessibility and user efficiency.

## 🏗 Technologies Used
- **Frontend**: React.js, TypeScript
- **State Management**: Redux, Zustand, or Context API
- **Styling**: Tailwind CSS, Styled Components
- **File Handling**: Web APIs, third-party SRT parsing libraries
- **Video Processing**: WebAssembly, WebCodecs API, FFMPEG.js

## 🚀 How to Run the Project
1. **Ensure all dependencies are installed** (`npm install`)
2. **Start the local development server** (`npm run dev`)
3. **Access the app in the browser** at `http://localhost:3000`

## 🌐 API Details (if any)
This project is frontend-only. API calls for saving and retrieving data are **mocked** for demonstration.

## ❓ Troubleshooting Guide
### Common Issues & Solutions
- **Issue: Application fails to start**
  - Ensure you are using **Node.js v16 or later**.
  - Run `npm install` again to check missing dependencies.
- **Issue: Video file not loading**
  - Ensure the uploaded file format is supported (`.mp4`, `.webm`).
- **Issue: Captions not syncing properly**
  - Check the structure of the SRT file. Ensure timestamps are correctly formatted.

---
🚀 Happy coding!
