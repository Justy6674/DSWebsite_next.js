module.exports = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'https://www.downscale.com.au/',
        'https://www.downscale.com.au/about',
        'https://www.downscale.com.au/medical-weight-management',
        'https://www.downscale.com.au/nutrition-meal-planning',
        'https://www.downscale.com.au/weight-loss-clinic-sydney',
        'https://www.downscale.com.au/weight-loss-clinic-melbourne',
        'https://www.downscale.com.au/weight-loss-clinic-brisbane',
        'https://www.downscale.com.au/blog',
        'https://www.downscale.com.au/faq',
        'https://www.downscale.com.au/how-it-works'
      ],
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.80 }],
        'categories:seo': ['error', { minScore: 0.90 }],
        'categories:accessibility': ['error', { minScore: 0.90 }],
        'categories:best-practices': ['error', { minScore: 0.85 }],
        
        // Performance assertions  
        'first-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 4000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        
        // Accessibility assertions
        'image-alt': 'error',
        'link-name': 'error',
        'heading-order': 'warn',
        'color-contrast': 'warn',
        
        // SEO assertions
        'meta-description': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'canonical': 'error'
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};