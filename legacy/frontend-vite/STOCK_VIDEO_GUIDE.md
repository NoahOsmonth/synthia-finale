## Stock Video Resources for Landing Page Background

Here are curated free stock video websites where you can download videos for your landing page background. These are perfect for tech/design-focused landing pages like Synthia.

### Recommended Free Stock Video Sites:

1. **Pexels Videos** (https://www.pexels.com/videos/)
   - Free, no attribution required
   - High quality videos
   - Search terms: "abstract tech", "digital transformation", "modern office", "technology", "workflow"

2. **Pixabay Videos** (https://pixabay.com/videos/)
   - Free, no login required
   - Large collection
   - Search terms: "technology", "abstract", "digital", "business", "innovation"

3. **Unsplash Videos** (https://unsplash.com/napi/videos)
   - Free, high resolution
   - Curated by community
   - Search terms: "tech", "workspace", "collaboration", "digital art"

4. **Coverr** (https://coverr.co/)
   - Free stock videos
   - Modern and trendy
   - Perfect for landing pages
   - Search terms: "office", "technology", "business"

5. **Videezy** (https://www.videezy.com/)
   - Free HD videos
   - Professional quality
   - Search terms: "technology", "business", "abstract"

### Recommended Video Characteristics for Synthia Landing Page:

- **Duration**: 5-30 seconds (loops well on landing page)
- **Resolution**: At least 1920x1080 (1080p)
- **Format**: MP4 (best browser compatibility)
- **File Size**: Under 10MB (for fast loading)
- **Content Ideas**:
  - Abstract digital backgrounds with flowing particles
  - Modern office collaboration scenes
  - Technology/code visualization
  - Gradient animations
  - Team collaboration moments
  - Workspace ambiance

### How to Add to Your Landing Page:

In your `Landing.tsx`, the video is already set up. Simply:

1. Download a video from one of the sites above
2. Upload it to your `assets` folder (e.g., `/assets/background-video.mp4`)
3. Update the src in the video tag:
   ```html
   <source src="/assets/background-video.mp4" type="video/mp4" />
   ```

### Alternative: Using CDN-hosted Stock Videos

You can also link directly to videos without downloading:

**Example from Pexels (if direct link available):**
```html
<source src="https://videos.pexels.com/video-file/..." type="video/mp4" />
```

### Video Tag Optimization:

The current implementation includes:
- `autoPlay` - Starts automatically
- `muted` - Required for autoPlay in most browsers
- `loop` - Repeats continuously
- `object-cover` - Fills the container while maintaining aspect ratio
- `poster` - Shows placeholder while loading

### Performance Tips:

1. **Compress Videos**: Use HandBrake (free) or online tools to compress
2. **Use WebM Format**: For better compression alongside MP4
3. **Fallback**: Current setup includes a gradient fallback
4. **Loading State**: Video will show poster image until loaded

### Example: Multiple Video Formats (Better Performance)

```html
<video autoPlay muted loop className="..." poster="...">
  <source src="/assets/background-video.webm" type="video/webm" />
  <source src="/assets/background-video.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

### Quick Start:

1. Visit Pexels Videos (https://www.pexels.com/videos/)
2. Search for "technology" or "abstract"
3. Find a video you like (5-30 seconds recommended)
4. Download in 1080p or 4K
5. Place in your `assets` folder
6. Update the src in Landing.tsx
7. Test on different browsers

### Recommended Videos to Try:

Search these specific terms for best results:
- "abstract technology"
- "modern collaboration"
- "digital innovation"
- "workflow"
- "tech office"
- "particle effects"
- "gradient animation"
