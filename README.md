# AI Content Detector

A production-ready Next.js web application that detects whether uploaded images or videos are AI-generated or real, providing confidence percentages and detailed reasoning behind each detection.

## Features

- 🖼️ **Image Detection**: Analyzes images using multiple heuristics including:
  - Noise pattern analysis
  - Symmetry detection
  - Color distribution analysis
  - Metadata examination
  - Texture smoothness detection

- 🎥 **Video Detection**: Basic video analysis with recommendations for deeper frame-by-frame analysis

- 📊 **Confidence Scoring**: Provides a percentage score indicating the likelihood of AI generation

- 📝 **Detailed Reasoning**: Explains the factors that contributed to the detection result

- 🎨 **Modern UI**: Beautiful, responsive interface with dark mode support

- ✅ **Production Ready**: Includes error handling, validation, loading states, and TypeScript types

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** for styling
- **Sharp** for image processing
- **Jimp** for pixel-level image analysis
- **React 18** with modern hooks

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai_detecter
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Upload an image or video file using the drag-and-drop interface or click to browse
2. Wait for the analysis to complete
3. View the results showing:
   - Whether the content is AI-generated or real
   - Confidence percentage
   - Detailed reasoning for the detection

## Supported File Types

### Images
- JPEG/JPG
- PNG
- WebP
- GIF

### Videos
- MP4
- WebM
- OGG
- MOV (QuickTime)

**Maximum file size**: 50MB

## How It Works

The detection system uses a multi-factor heuristic analysis approach:

1. **Noise Pattern Analysis**: Examines pixel variance to detect unnatural smoothness
2. **Symmetry Detection**: Identifies perfect or near-perfect symmetry (common in AI images)
3. **Color Distribution**: Analyzes color histogram for unusual patterns
4. **Metadata Analysis**: Checks for missing EXIF/ICC data (AI images often lack camera metadata)
5. **Texture Smoothness**: Detects lack of natural edges and imperfections

The system combines these factors with weighted scoring to produce a confidence percentage.

## Production Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Considerations

- Ensure sufficient memory allocation for image processing
- Configure appropriate timeout settings for large file processing
- Consider implementing rate limiting for production use
- Set up proper error logging and monitoring

### Recommended Enhancements for Production

1. **ML Model Integration**: Replace or supplement heuristics with trained ML models
2. **Frame Extraction**: Add frame-by-frame analysis for videos
3. **Caching**: Implement result caching for identical files
4. **Rate Limiting**: Add API rate limiting to prevent abuse
5. **File Storage**: Consider cloud storage for uploaded files
6. **Background Processing**: Move heavy processing to background jobs for better UX

## Project Structure

```
ai_detecter/
├── app/
│   ├── api/
│   │   └── detect/
│   │       └── route.ts          # API endpoint for file upload
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page component
├── components/
│   ├── FileUploader.tsx          # File upload component
│   └── ResultsDisplay.tsx        # Results display component
├── lib/
│   └── aiDetector.ts             # Core detection logic
├── package.json
├── tsconfig.json
├── next.config.js
└── tailwind.config.js
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

