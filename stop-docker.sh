#!/bin/bash

# Script to stop the Gemini Agent Docker container

echo "🛑 Stopping and removing containers..."
docker compose down --remove-orphans

echo "✅ Containers stopped successfully"
