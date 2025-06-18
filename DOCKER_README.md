# Gemini Agent Docker Setup

This directory contains Docker configuration for running the Gemini LiveKit Agent.

## Prerequisites

- Docker and Docker Compose installed
- Environment variables configured in `agent/.env.local`

## Quick Start

1. **Configure Environment Variables**
   Edit `agent/.env.local` with your credentials:
   ```bash
   LIVEKIT_URL=your_livekit_url
   LIVEKIT_API_KEY=your_api_key
   LIVEKIT_API_SECRET=your_api_secret
   GOOGLE_API_KEY=your_google_api_key
   ```

2. **Run the Agent**
   ```bash
   ./run-docker.sh
   ```

3. **Stop the Agent**
   ```bash
   ./stop-docker.sh
   ```

## Scripts

- `run-docker.sh` - Stops existing containers, rebuilds, and starts the agent
- `stop-docker.sh` - Stops and removes containers

## Docker Configuration

- The agent runs with `python3 main.py dev` command
- Source code is mounted as a volume for development
- Container restarts automatically unless stopped
- Logs are followed automatically after startup

## Manual Commands

If you prefer manual control:

```bash
# Build and start
docker-compose up --build -d

# View logs
docker-compose logs -f gemini-agent

# Stop
docker-compose down

# Rebuild
docker-compose up --build --force-recreate -d
```

## Troubleshooting

- Check logs: `docker-compose logs gemini-agent`
- Restart container: `docker-compose restart gemini-agent`
- Clean rebuild: `./run-docker.sh`
