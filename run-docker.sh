#!/bin/bash

# Script to rebuild and run the Gemini Agent Docker container

echo "🐳 Stopping and removing existing containers..."
docker compose down --remove-orphans

echo "🧹 Cleaning up Docker images..."
docker image prune -f

echo "🔨 Building and starting the container..."
docker compose up --build -d

echo "📋 Showing container status..."
docker compose ps

echo "📊 Following logs (Ctrl+C to exit)..."
docker compose logs -f gemini-agent
