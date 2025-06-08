# Strip Token Live Streamers API

A FastAPI-based web scraping service that extracts live streamer data from Stripchat using Playwright automation.

## Features

- **Age Verification Handling**: Automatically clicks the "I'm Over 18" button
- **Smart Scraping**: Uses multiple CSS selectors to handle site structure changes
- **Caching**: 5-minute cache to avoid excessive requests
- **CORS Support**: Ready for React frontend integration
- **Error Handling**: Robust error handling and logging
- **API Documentation**: Auto-generated OpenAPI docs

## Quick Start

### Option 1: Using the startup script (Recommended)
```bash
cd backend
./start.sh
```

### Option 2: Manual setup
```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Install Playwright browsers
playwright install chromium

# Start the server
python main.py
```

## API Endpoints

### GET `/streamers`
Returns current live streamers data.

**Response:**
```json
[
  {
    "id": 1,
    "name": "StreamerName",
    "viewers": 2847,
    "profileImage": "https://example.com/image.jpg",
    "isLive": true
  }
]
```

### POST `/streamers/refresh`
Forces a refresh of streamer data (bypasses cache).

**Response:**
```json
{
  "message": "Refreshed 8 streamers",
  "count": 8
}
```

### GET `/`
Health check endpoint.

## API Documentation

Once the server is running, visit:
- **Interactive docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Configuration

The scraper includes several configurable options in `main.py`:

- `cache_duration`: How long to cache results (default: 300 seconds)
- `base_url`: The Stripchat URL to scrape
- `headless`: Browser mode (default: True for production)

## Integration with React Frontend

The API is configured with CORS to allow requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

To use in your React component:

```javascript
// Fetch live streamers
const response = await fetch('http://localhost:8000/streamers');
const streamers = await response.json();

// Force refresh
await fetch('http://localhost:8000/streamers/refresh', { method: 'POST' });
```

## Error Handling

The API includes comprehensive error handling:
- Network timeouts
- Missing elements
- Browser crashes
- Invalid data

All errors are logged and appropriate HTTP status codes are returned.

## Development

To run in development mode with auto-reload:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Notes

- The scraper respects the site's structure and handles age verification
- Uses a realistic user agent to avoid detection
- Implements caching to be respectful of the target site
- Extracts up to 20 streamers per request
- Generates random viewer counts for demonstration purposes 