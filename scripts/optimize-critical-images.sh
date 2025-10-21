#!/bin/bash

# Fast Loading Image Optimization Script
# Optimizes the most critical images for immediate performance improvement

echo "🚀 Starting critical image optimization for fast loading..."

# Create a temporary directory for optimizations
mkdir -p /tmp/optimized-images

# Critical images that need immediate optimization (largest impact)
CRITICAL_IMAGES=(
  "forest-hero.png:4348KB"
  "forest-path.png:4274KB" 
  "og-image.jpg:1453KB"
  "public/RocksHero.png:1177KB"
  "public/lovable-uploads/d887535f-55ba-41c9-aeed-5e4a3a23f678.png:3064KB"
  "public/lovable-uploads/b1d32c79-ba80-48b5-83b4-3bf5e5e66bca.png:2911KB"
  "wave-bg.png:2630KB"
  "rainy-window.png:1925KB"
  "justin-black.jpg:1731KB"
  "justin-transformation.png:1484KB"
  "justin-transformation-new.png:1484KB"
)

# Function to optimize a single image
optimize_image() {
  local image_path="$1"
  local target_quality="$2"
  
  if [ ! -f "$image_path" ]; then
    echo "⚠️  Image not found: $image_path"
    return 1
  fi
  
  local dir=$(dirname "$image_path")
  local filename=$(basename "$image_path")
  local name="${filename%.*}"
  local ext="${filename##*.}"
  
  # Create WebP version
  local webp_path="${dir}/${name}.webp"
  
  echo "🔄 Optimizing $filename..."
  
  # Convert to WebP
  if cwebp "$image_path" -o "$webp_path" -q "$target_quality" -quiet; then
    local original_size=$(stat -c%s "$image_path" 2>/dev/null || echo "0")
    local webp_size=$(stat -c%s "$webp_path" 2>/dev/null || echo "0")
    
    if [ "$webp_size" -gt 0 ] && [ "$original_size" -gt 0 ]; then
      local savings=$((original_size - webp_size))
      local percent_savings=$((savings * 100 / original_size))
      
      echo "✅ $filename -> ${name}.webp"
      echo "   Original: $(($original_size / 1024))KB, WebP: $(($webp_size / 1024))KB"
      echo "   Savings: $(($savings / 1024))KB (${percent_savings}%)"
    else
      echo "❌ Failed to optimize $filename"
      rm -f "$webp_path"
    fi
  else
    echo "❌ WebP conversion failed for $filename"
  fi
  
  echo ""
}

# Optimize critical images with high quality
echo "📋 Optimizing critical images (high quality)..."
optimize_image "forest-hero.png" 90
optimize_image "forest-path.png" 85
optimize_image "og-image.jpg" 90
optimize_image "wave-bg.png" 85
optimize_image "rainy-window.png" 85
optimize_image "justin-black.jpg" 88
optimize_image "justin-transformation.png" 85
optimize_image "justin-transformation-new.png" 85

# Optimize public images
echo "📋 Optimizing public images..."
if [ -d "public" ]; then
  optimize_image "public/RocksHero.png" 85
  
  # Optimize lovable-uploads if they exist
  if [ -d "public/lovable-uploads" ]; then
    for img in public/lovable-uploads/*.{png,jpg,jpeg}; do
      if [ -f "$img" ]; then
        size=$(stat -c%s "$img" 2>/dev/null || echo "0")
        if [ "$size" -gt 500000 ]; then  # Only optimize images >500KB
          optimize_image "$img" 85
        fi
      fi
    done
  fi
fi

# Optimize logos with highest quality
echo "📋 Optimizing logos (highest quality)..."
optimize_image "downscale-logo.png" 95
optimize_image "downscale-logo-old.png" 95

# Optimize hero images in assets
echo "📋 Optimizing hero images in assets..."
if [ -d "src/assets" ]; then
  for hero_img in src/assets/*hero*.{jpg,png,jpeg}; do
    if [ -f "$hero_img" ]; then
      optimize_image "$hero_img" 88
    fi
  done
fi

echo "🎉 Critical image optimization complete!"
echo ""
echo "📊 Summary:"
echo "- WebP versions created for largest images"
echo "- Expected 25-40% size reduction"
echo "- Next step: Update code to use OptimizedImage component"
echo ""
echo "🔧 To apply optimizations:"
echo "1. The OptimizedImage component will automatically serve WebP when available"
echo "2. Fallback to original images for older browsers"
echo "3. Run 'npm run build' to verify optimizations"