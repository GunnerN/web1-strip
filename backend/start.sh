#!/bin/bash

echo "Setting up Strip Token Live Streamers API..."

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Install Playwright browsers with retry mechanism
echo "Installing Playwright browsers..."
MAX_RETRIES=3
RETRY_COUNT=0

while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if playwright install chromium; then
        echo "Successfully installed Playwright browsers"
        break
    else
        RETRY_COUNT=$((RETRY_COUNT + 1))
        if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
            echo "Failed to install Playwright browsers after $MAX_RETRIES attempts"
            exit 1
        fi
        echo "Retrying Playwright browser installation (Attempt $RETRY_COUNT of $MAX_RETRIES)..."
        sleep 5
    fi
done

echo "Setup complete! Starting the API server..."

# Start the server
python main.py 
