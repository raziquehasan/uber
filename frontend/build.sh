#!/bin/bash
set -e

echo "Starting frontend build..."
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"

# Install dependencies
echo "Installing dependencies..."
npm ci --only=production=false

# Build the project
echo "Building project..."
npm run build

echo "Build completed successfully!"
ls -la dist/
