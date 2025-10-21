
// Add this to your main application to monitor performance
const performanceMonitor = {
  // Monitor Core Web Vitals
  observeWebVitals() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
            // Send to analytics
          }
          if (entry.entryType === 'first-input') {
            console.log('FID:', entry.processingStart - entry.startTime);
            // Send to analytics  
          }
          if (entry.entryType === 'layout-shift') {
            console.log('CLS:', entry.value);
            // Send to analytics
          }
        }
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    }
  },
  
  // Monitor image loading performance
  observeImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      img.addEventListener('load', () => {
        const isWebP = img.src.includes('.webp');
        console.log(`Image ${index} loaded: ${isWebP ? 'WebP' : 'Original'} - ${img.src}`);
      });
    });
  }
};

// Initialize monitoring
performanceMonitor.observeWebVitals();
performanceMonitor.observeImageLoading();
