import sharp from 'sharp'
import Jimp from 'jimp'

interface DetectionResult {
  isAiGenerated: boolean
  confidence: number
  reasoning: string[]
  fileName: string
  fileType: 'image' | 'video'
}

/**
 * Main detection function that analyzes images and videos for AI-generated content
 */
export async function detectAiContent(
  buffer: Buffer,
  mimeType: string,
  fileName: string
): Promise<DetectionResult> {
  const fileType = mimeType.startsWith('image/') ? 'image' : 'video'
  const reasoning: string[] = []
  let confidence = 0

  if (fileType === 'image') {
    const imageAnalysis = await analyzeImage(buffer)
    confidence = imageAnalysis.confidence
    reasoning.push(...imageAnalysis.reasoning)
  } else {
    const videoAnalysis = analyzeVideo(buffer, fileName)
    confidence = videoAnalysis.confidence
    reasoning.push(...videoAnalysis.reasoning)
  }

  return {
    isAiGenerated: confidence >= 50,
    confidence: Math.round(confidence),
    reasoning,
    fileName,
    fileType,
  }
}

/**
 * Analyzes image for AI-generated characteristics
 */
async function analyzeImage(buffer: Buffer): Promise<{ confidence: number; reasoning: string[] }> {
  const reasoning: string[] = []
  let score = 0
  const factors: { name: string; weight: number; value: number }[] = []

  try {
    // Load image with sharp for metadata and Jimp for pixel analysis
    const metadata = await sharp(buffer).metadata()
    const image = await Jimp.read(buffer)

    // 1. Check for unusual dimensions or aspect ratios
    if (metadata.width && metadata.height) {
      const aspectRatio = metadata.width / metadata.height
      // AI models often generate square or standard ratios
      if (aspectRatio === 1) {
        score += 5
        factors.push({ name: 'Square aspect ratio', weight: 5, value: 5 })
        reasoning.push('Square aspect ratio detected (common in AI-generated images)')
      }
    }

    // 2. Analyze noise patterns and smoothness
    const noiseAnalysis = analyzeNoisePatterns(image)
    score += noiseAnalysis.score
    factors.push(noiseAnalysis.factor)
    reasoning.push(noiseAnalysis.reason)

    // 3. Check for perfect symmetry (common in AI images)
    const symmetryAnalysis = analyzeSymmetry(image)
    score += symmetryAnalysis.score
    factors.push(symmetryAnalysis.factor)
    reasoning.push(symmetryAnalysis.reason)

    // 4. Analyze color distribution and gradients
    const colorAnalysis = analyzeColorDistribution(image)
    score += colorAnalysis.score
    factors.push(colorAnalysis.factor)
    reasoning.push(colorAnalysis.reason)

    // 5. Check for metadata anomalies
    const metadataAnalysis = analyzeMetadata(metadata)
    score += metadataAnalysis.score
    factors.push(metadataAnalysis.factor)
    if (metadataAnalysis.reason) reasoning.push(metadataAnalysis.reason)

    // 6. Detect over-smoothness or lack of natural imperfections
    const smoothnessAnalysis = analyzeSmoothness(image)
    score += smoothnessAnalysis.score
    factors.push(smoothnessAnalysis.factor)
    reasoning.push(smoothnessAnalysis.reason)

    // Normalize score to 0-100 range
    const totalWeight = factors.reduce((sum, f) => sum + f.weight, 0)
    const normalizedScore = totalWeight > 0 ? (score / totalWeight) * 100 : 0

    return {
      confidence: Math.min(100, Math.max(0, normalizedScore)),
      reasoning,
    }
  } catch (error) {
    console.error('Error analyzing image:', error)
    return {
      confidence: 50, // Neutral on error
      reasoning: ['Unable to complete full analysis due to processing error'],
    }
  }
}

/**
 * Analyzes noise patterns - AI images often have different noise characteristics
 */
function analyzeNoisePatterns(image: Jimp): { score: number; factor: any; reason: string } {
  const width = image.getWidth()
  const height = image.getHeight()
  let variance = 0
  const sampleSize = Math.min(100, width * height)
  const samples: number[] = []

  // Sample random pixels to calculate variance
  for (let i = 0; i < sampleSize; i++) {
    const x = Math.floor(Math.random() * width)
    const y = Math.floor(Math.random() * height)
    const pixel = Jimp.intToRGBA(image.getPixelColor(x, y))
    const brightness = (pixel.r + pixel.g + pixel.b) / 3
    samples.push(brightness)
  }

  const mean = samples.reduce((a, b) => a + b, 0) / samples.length
  variance = samples.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / samples.length

  // Very low variance suggests AI generation (too smooth)
  // Very high variance suggests natural photography (more noise)
  let score = 0
  let reason = 'Natural noise patterns detected'

  if (variance < 100) {
    score = 15
    reason = 'Unusually smooth texture detected - low noise variance suggests AI generation'
  } else if (variance < 200) {
    score = 8
    reason = 'Moderate smoothness detected - possible AI generation'
  }

  return {
    score,
    factor: { name: 'Noise patterns', weight: 15, value: score },
    reason,
  }
}

/**
 * Analyzes symmetry - AI images often have perfect symmetry
 */
function analyzeSymmetry(image: Jimp): { score: number; factor: any; reason: string } {
  const width = image.getWidth()
  const height = image.getHeight()
  const midX = Math.floor(width / 2)
  let symmetryScore = 0
  const sampleRows = Math.min(50, height)

  // Check horizontal symmetry
  for (let y = 0; y < sampleRows; y++) {
    for (let x = 0; x < midX; x++) {
      const leftPixel = Jimp.intToRGBA(image.getPixelColor(x, y))
      const rightPixel = Jimp.intToRGBA(image.getPixelColor(width - 1 - x, y))
      const diff = Math.abs(leftPixel.r - rightPixel.r) + 
                   Math.abs(leftPixel.g - rightPixel.g) + 
                   Math.abs(leftPixel.b - rightPixel.b)
      if (diff < 10) symmetryScore++
    }
  }

  const symmetryRatio = symmetryScore / (sampleRows * midX)
  let score = 0
  let reason = 'Natural asymmetry detected'

  if (symmetryRatio > 0.7) {
    score = 12
    reason = 'High symmetry detected - AI models often generate highly symmetrical images'
  } else if (symmetryRatio > 0.5) {
    score = 6
    reason = 'Moderate symmetry detected - possible AI generation'
  }

  return {
    score,
    factor: { name: 'Symmetry', weight: 12, value: score },
    reason,
  }
}

/**
 * Analyzes color distribution - AI images may have unusual color patterns
 */
function analyzeColorDistribution(image: Jimp): { score: number; factor: any; reason: string } {
  const width = image.getWidth()
  const height = image.getHeight()
  const colorHistogram: { [key: string]: number } = {}
  const sampleSize = Math.min(1000, width * height)

  // Build color histogram
  for (let i = 0; i < sampleSize; i++) {
    const x = Math.floor(Math.random() * width)
    const y = Math.floor(Math.random() * height)
    const pixel = Jimp.intToRGBA(image.getPixelColor(x, y))
    // Quantize colors to reduce granularity
    const r = Math.floor(pixel.r / 32) * 32
    const g = Math.floor(pixel.g / 32) * 32
    const b = Math.floor(pixel.b / 32) * 32
    const key = `${r},${g},${b}`
    colorHistogram[key] = (colorHistogram[key] || 0) + 1
  }

  // Calculate color diversity (unique colors / total samples)
  const uniqueColors = Object.keys(colorHistogram).length
  const colorDiversity = uniqueColors / sampleSize

  let score = 0
  let reason = 'Natural color distribution detected'

  // Very high or very low color diversity can indicate AI generation
  if (colorDiversity < 0.1 || colorDiversity > 0.9) {
    score = 10
    reason = 'Unusual color distribution detected - may indicate AI generation'
  } else if (colorDiversity < 0.15 || colorDiversity > 0.8) {
    score = 5
    reason = 'Moderate color distribution anomaly detected'
  }

  return {
    score,
    factor: { name: 'Color distribution', weight: 10, value: score },
    reason,
  }
}

/**
 * Analyzes image metadata for anomalies
 */
function analyzeMetadata(metadata: sharp.Metadata): { score: number; factor: any; reason: string | null } {
  let score = 0
  let reason: string | null = null

  // Missing or minimal EXIF data can indicate AI generation
  if (!metadata.exif && !metadata.icc) {
    score = 8
    reason = 'Missing EXIF/ICC metadata - AI-generated images often lack camera metadata'
  } else if (!metadata.exif) {
    score = 4
    reason = 'Limited metadata detected - may indicate generated content'
  }

  return {
    score,
    factor: { name: 'Metadata', weight: 8, value: score },
    reason,
  }
}

/**
 * Analyzes smoothness - AI images often lack natural imperfections
 */
function analyzeSmoothness(image: Jimp): { score: number; factor: any; reason: string } {
  const width = image.getWidth()
  const height = image.getHeight()
  let edgeCount = 0
  const sampleSize = Math.min(200, width * height)

  // Sample and detect edges (sharp transitions)
  for (let i = 0; i < sampleSize; i++) {
    const x = Math.floor(Math.random() * (width - 2))
    const y = Math.floor(Math.random() * (height - 2))
    
    const center = Jimp.intToRGBA(image.getPixelColor(x, y))
    const right = Jimp.intToRGBA(image.getPixelColor(x + 1, y))
    const bottom = Jimp.intToRGBA(image.getPixelColor(x, y + 1))
    
    const diffX = Math.abs(center.r - right.r) + Math.abs(center.g - right.g) + Math.abs(center.b - right.b)
    const diffY = Math.abs(center.r - bottom.r) + Math.abs(center.g - bottom.g) + Math.abs(center.b - bottom.b)
    
    if (diffX > 30 || diffY > 30) edgeCount++
  }

  const edgeRatio = edgeCount / sampleSize
  let score = 0
  let reason = 'Natural texture and edges detected'

  // Very low edge ratio suggests over-smoothness (AI)
  if (edgeRatio < 0.1) {
    score = 12
    reason = 'Unusually smooth texture detected - lack of natural edges suggests AI generation'
  } else if (edgeRatio < 0.15) {
    score = 6
    reason = 'Moderate smoothness detected - possible AI generation'
  }

  return {
    score,
    factor: { name: 'Smoothness', weight: 12, value: score },
    reason,
  }
}

/**
 * Analyzes video files (basic analysis for now)
 */
function analyzeVideo(buffer: Buffer, fileName: string): { confidence: number; reasoning: string[] } {
  const reasoning: string[] = []
  let score = 0

  // Video analysis is more complex and typically requires frame extraction
  // For now, we provide a basic heuristic-based analysis
  
  reasoning.push('Video analysis: Limited analysis performed (frame extraction recommended for deeper analysis)')
  
  // Check file size - AI-generated videos are often smaller or have compression artifacts
  const fileSizeMB = buffer.length / (1024 * 1024)
  if (fileSizeMB < 1) {
    score += 10
    reasoning.push('Unusually small file size may indicate generated content')
  }

  // Since we can't easily analyze video frames in Node.js without additional libraries,
  // we return a conservative score
  reasoning.push('For accurate video detection, frame-by-frame analysis with ML models is recommended')
  
  return {
    confidence: Math.min(60, score + 30), // Conservative score for videos
    reasoning,
  }
}

