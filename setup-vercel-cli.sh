#!/bin/bash

# Vercel CLI Setup Script

echo "🚀 Setting up Vercel CLI..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install Node.js first"
    exit 1
fi

# Install Vercel CLI globally
echo "📦 Installing Vercel CLI..."
npm i -g vercel

# Login to Vercel
echo "🔐 Login to Vercel..."
vercel login

# Link current project
echo "🔗 Linking project to Vercel..."
vercel link

# Show current project info
echo "📋 Current project info:"
vercel ls

echo "✅ Vercel CLI setup complete!"
echo ""
echo "Useful commands:"
echo "  vercel          - Deploy"
echo "  vercel dev      - Run locally"
echo "  vercel domains  - Manage domains"
echo "  vercel env      - Manage environment variables"
echo "  vercel ls       - List projects"