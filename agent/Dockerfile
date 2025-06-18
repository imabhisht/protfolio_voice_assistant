FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    bash \
    gcc \
    g++ \
    build-essential \
    libffi-dev \
    libssl-dev \
    make \
    pkg-config \
    libavformat-dev \
    libavcodec-dev \
    libavdevice-dev \
    libavutil-dev \
    libswscale-dev \
    libswresample-dev \
    libavfilter-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

COPY .env .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python3", "main.py", "dev"]
