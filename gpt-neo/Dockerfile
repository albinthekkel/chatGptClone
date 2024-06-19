FROM python:3.8-slim

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    wget \
    && rm -rf /var/lib/apt/lists/*

# Install pip packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Set the model name
ENV MODEL_NAME="EleutherAI/gpt-neo-125m"

# Expose port
EXPOSE 5000

# Run the application
CMD ["python", "serve.py"]

