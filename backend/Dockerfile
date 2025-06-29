# Use Python 3.11 base image
FROM python:3.11-slim-bullseye

# Upgrade system packages and install build dependencies
RUN apt-get update && \
	apt-get upgrade -y && \
	apt-get install -y --no-install-recommends build-essential gcc && \
	apt-get clean && \
	rm -rf /var/lib/apt/lists/*

# Set workdir
WORKDIR /app

# Copy requirements
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port and run
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
