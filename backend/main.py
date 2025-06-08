from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from playwright.async_api import async_playwright
import asyncio
import random
from typing import List, Dict
from pydantic import BaseModel
import logging
import time

# Configure logging to be less verbose
logging.basicConfig(
    level=logging.WARNING,  # Change from INFO to WARNING
    format='%(levelname)s: %(message)s'  # Simplified format
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Strip Token Live Streamers API", version="1.0.0")

# Add CORS middleware to allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "https://startling-bombolone-650a48.netlify.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LiveStreamer(BaseModel):
    id: int
    name: str
    viewers: int
    profileImage: str
    isLive: bool

class ScrapingService:
    def __init__(self):
        self.base_url = "https://stripchat.com/girls/more"
        self.cached_streamers = []
        self.last_scrape_time = 0
        self.cache_duration = 900  # 15 minutes cache
        self.fallback_streamers = [
            {
                "id": 1,
                "name": "SexyStreamer1",
                "viewers": random.randint(100, 600),
                "profileImage": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                "isLive": True
            },
            {
                "id": 2,
                "name": "lolableux",
                "viewers": random.randint(100, 600),
                "profileImage": "backend/fallback/198865260.webp",
                "isLive": True
            },
            {
                "id": 3,
                "name": "layladream018",
                "viewers": random.randint(100, 600),
                "profileImage": "backend/fallback/204656359.webp",
                "isLive": True
            },
            {
                "id": 4,
                "name": "aliasyourfav",
                "viewers": random.randint(100, 600),
                "profileImage": "backend/fallback/204124771.webp",
                "isLive": True
            },
            {
                "id": 5,
                "name": "StunningShow5",
                "viewers": random.randint(100, 600),
                "profileImage": "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face",
                "isLive": True
            },
            {
                "id": 6,
                "name": "AmazingCam6",
                "viewers": random.randint(100, 600),
                "profileImage": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
                "isLive": True
            },
            {
                "id": 7,
                "name": "IncredibleLive7",
                "viewers": random.randint(100, 600),
                "profileImage": "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face",
                "isLive": True
            },
            {
                "id": 8,
                "name": "PerfectShow8",
                "viewers": random.randint(100, 600),
                "profileImage": "https://img.doppiocdn.com/thumbs/1749349740/125835266",
                "isLive": True
            }
        ]
    
    async def scrape_streamers(self) -> List[Dict]:
        """Scrape live streamers from Stripchat using Playwright"""
        browser = None
        try:
            logger.warning("Starting Playwright browser...")
            async with async_playwright() as p:
                # Launch browser with memory-optimized settings
                browser = await p.chromium.launch(
                    headless=True,
                    args=[
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                        '--disable-dev-shm-usage',
                        '--disable-accelerated-2d-canvas',
                        '--no-first-run',
                        '--no-zygote',
                        '--disable-gpu',
                        '--disable-extensions',
                        '--disable-default-apps',
                        '--disable-sync',
                        '--disable-translate',
                        '--hide-scrollbars',
                        '--metrics-recording-only',
                        '--mute-audio',
                        '--no-default-browser-check',
                        '--safebrowsing-disable-auto-update',
                        '--js-flags="--max-old-space-size=256"'
                    ]
                )
                
                context = await browser.new_context(
                    user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    viewport={'width': 1280, 'height': 720},  # Reduced viewport size
                    ignore_https_errors=True,
                    java_script_enabled=True,
                    bypass_csp=True
                )
                
                # Set memory limits for the context
                await context.set_extra_http_headers({
                    'Accept-Language': 'en-US,en;q=0.9',
                })
                
                page = await context.new_page()
                
                # Set shorter timeout
                page.set_default_timeout(30000)  # Reduced from 60s to 30s
                
                logger.warning(f"Navigating to {self.base_url}")
                
                # Try to navigate with retries
                max_retries = 2  # Reduced from 3 to 2
                for attempt in range(max_retries):
                    try:
                        await page.goto(self.base_url, wait_until="domcontentloaded", timeout=30000)
                        logger.warning(f"Successfully navigated to page (attempt {attempt + 1})")
                        break
                    except Exception as e:
                        logger.warning(f"Navigation attempt {attempt + 1} failed: {e}")
                        if attempt == max_retries - 1:
                            raise e
                        await asyncio.sleep(2)
                
                # Handle age verification button
                try:
                    logger.info("Looking for age verification button...")
                    age_button = page.locator("button.btn-visitors-agreement-accept")
                    if await age_button.is_visible(timeout=10000):
                        logger.info("Clicking age verification button")
                        await age_button.click()
                        await page.wait_for_timeout(5000)  # Wait for content to load
                        logger.info("Age verification completed")
                    else:
                        logger.info("Age verification button not found - may already be handled")
                except Exception as e:
                    logger.warning(f"Age verification handling failed: {e}")
                
                # Wait for the specific category section to load
                try:
                    logger.info("Waiting for category section...")
                    await page.wait_for_selector(".category-mostPopularModels", timeout=20000)
                    logger.info("Found mostPopularModels category section")
                except Exception as e:
                    logger.error(f"Category section not found: {e}")
                    # Try alternative selectors
                    try:
                        await page.wait_for_selector(".model-list-item", timeout=10000)
                        logger.info("Found model items with alternative selector")
                    except:
                        logger.error("No model elements found with any selector")
                        await browser.close()
                        return self.fallback_streamers
                
                # Find the model cards within the category section
                streamers = []
                
                try:
                    # Target the specific structure: category -> scroll wrapper -> model cards
                    category_section = await page.query_selector(".category-mostPopularModels")
                    if not category_section:
                        logger.warning("Category section not found, trying direct model search")
                        # Fallback to direct model search
                        model_cards = await page.query_selector_all(".model-list-item")
                    else:
                        # Look for the scroll wrapper within the category
                        scroll_wrapper = await category_section.query_selector(".multiple-categories-scroll-bar-wrapper")
                        if not scroll_wrapper:
                            logger.warning("Scroll wrapper not found, searching in category directly")
                            model_cards = await category_section.query_selector_all(".model-list-item")
                        else:
                            # Get all model cards within the scroll wrapper
                            model_cards = await scroll_wrapper.query_selector_all(".model-list-item")
                    
                    logger.info(f"Found {len(model_cards)} model cards")
                    
                    if not model_cards:
                        logger.error("No model cards found")
                        await browser.close()
                        return self.fallback_streamers
                    
                    # Randomly select 8 cards from available cards
                    selected_cards = random.sample(model_cards, min(9, len(model_cards)))
                    logger.info(f"Selected {len(selected_cards)} random cards")
                    
                    # Extract data from selected cards
                    for i, card in enumerate(selected_cards):
                        try:
                            # Extract the link element
                            link_elem = await card.query_selector("a.model-list-item-link")
                            if not link_elem:
                                logger.warning(f"No link found in card {i}")
                                continue
                            
                            # Extract username from href attribute
                            href = await link_elem.get_attribute("href")
                            if not href:
                                logger.warning(f"No href found in card {i}")
                                continue
                            
                            # Username is the part after the last slash
                            username = href.strip("/").split("/")[-1]
                            if not username:
                                logger.warning(f"Could not extract username from href: {href}")
                                continue
                            
                            # Extract profile image from img element
                            img_elem = await link_elem.query_selector("img.image-background")
                            if not img_elem:
                                logger.warning(f"No image found in card {i}")
                                continue
                            
                            img_src = await img_elem.get_attribute("src")
                            if not img_src:
                                logger.warning(f"No src attribute found in image for card {i}")
                                continue
                            
                            # Ensure the image URL is complete
                            if img_src.startswith("//"):
                                img_src = f"https:{img_src}"
                            elif not img_src.startswith("http"):
                                img_src = f"https://stripchat.com{img_src}"
                            
                            # Generate random viewer count between 100-600
                            viewers = random.randint(100, 600)
                            
                            streamer_data = {
                                "id": i + 1,
                                "name": username,
                                "viewers": viewers,
                                "profileImage": img_src,
                                "isLive": True
                            }
                            
                            streamers.append(streamer_data)
                            logger.info(f"Extracted streamer: {username}")
                        
                        except Exception as e:
                            logger.warning(f"Error extracting data from card {i}: {e}")
                            continue
                    
                except Exception as e:
                    logger.error(f"Error finding model cards: {e}")
                
                await browser.close()
                
                if streamers:
                    logger.info(f"Successfully scraped {len(streamers)} streamers")
                    return streamers
                else:
                    logger.warning("No streamers extracted, returning fallback data")
                    return self.fallback_streamers
                
        except Exception as e:
            logger.error(f"Error during scraping: {e}")
            if browser:
                try:
                    await browser.close()
                except:
                    pass
            logger.warning("Scraping failed completely - returning fallback data")
            return self.fallback_streamers
    
    async def get_streamers(self) -> List[Dict]:
        """Get streamers with caching"""
        current_time = time.time()
        
        # Return cached data if still valid (whether real scraped data or fallback)
        if (current_time - self.last_scrape_time < self.cache_duration and 
            self.cached_streamers):
            logger.info(f"Returning cached streamers ({len(self.cached_streamers)} items, cached {int(current_time - self.last_scrape_time)}s ago)")
            return self.cached_streamers
        
        # Cache expired or no cached data - attempt fresh scraping
        logger.info("Cache expired or empty - attempting fresh scrape")
        streamers = await self.scrape_streamers()
        
        # Update cache with scraped data (could be real data or fallback from scrape_streamers)
        if streamers:
            self.cached_streamers = streamers
            self.last_scrape_time = current_time
            
            # Log what type of data we're caching
            if streamers == self.fallback_streamers:
                logger.info(f"Cached fallback data ({len(streamers)} items) - scraping failed")
            else:
                logger.info(f"Cached fresh scraped data ({len(streamers)} items)")
        else:
            # This shouldn't happen since scrape_streamers always returns something
            logger.error("scrape_streamers returned empty data - using fallback")
            self.cached_streamers = self.fallback_streamers
            self.last_scrape_time = current_time
        
        return self.cached_streamers

    def get_cache_status(self) -> Dict:
        """Get current cache status information"""
        current_time = time.time()
        cache_age = current_time - self.last_scrape_time if self.last_scrape_time > 0 else None
        is_cache_valid = (cache_age is not None and 
                         cache_age < self.cache_duration and 
                         bool(self.cached_streamers))
        
        return {
            "has_cached_data": bool(self.cached_streamers),
            "cached_items_count": len(self.cached_streamers),
            "cache_age_seconds": int(cache_age) if cache_age else None,
            "cache_duration_seconds": self.cache_duration,
            "is_cache_valid": is_cache_valid,
            "is_using_fallback": self.cached_streamers == self.fallback_streamers if self.cached_streamers else None,
            "last_scrape_timestamp": self.last_scrape_time if self.last_scrape_time > 0 else None
        }

# Initialize scraping service
scraping_service = ScrapingService()

@app.get("/")
async def root():
    return {"message": "Strip Token Live Streamers API", "status": "running"}

@app.get("/streamers", response_model=List[LiveStreamer])
async def get_live_streamers():
    """Get current live streamers"""
    try:
        streamers = await scraping_service.get_streamers()
        return streamers
    except Exception as e:
        logger.error(f"Error in get_live_streamers: {e}")
        # Return fallback data instead of error
        return scraping_service.fallback_streamers

@app.post("/streamers/refresh")
async def refresh_streamers():
    """Force refresh streamer data"""
    try:
        old_cache_status = scraping_service.get_cache_status()
        scraping_service.last_scrape_time = 0  # Force refresh
        streamers = await scraping_service.get_streamers()
        new_cache_status = scraping_service.get_cache_status()
        
        return {
            "message": f"Refreshed {len(streamers)} streamers", 
            "count": len(streamers),
            "was_using_fallback": old_cache_status.get("is_using_fallback"),
            "now_using_fallback": new_cache_status.get("is_using_fallback"),
            "cache_status": new_cache_status
        }
    except Exception as e:
        logger.error(f"Error in refresh_streamers: {e}")
        return {
            "message": "Refresh failed, using fallback data", 
            "count": len(scraping_service.fallback_streamers),
            "error": str(e)
        }

@app.get("/cache/status")
async def get_cache_status():
    """Get current cache status"""
    return scraping_service.get_cache_status()

@app.post("/streamers/test-scrape")
async def test_scrape():
    """Test scraping without cache - for debugging"""
    try:
        logger.info("Testing direct scrape (bypassing cache)")
        streamers = await scraping_service.scrape_streamers()
        is_fallback = streamers == scraping_service.fallback_streamers
        
        return {
            "success": True,
            "count": len(streamers),
            "is_fallback_data": is_fallback,
            "streamers": streamers[:3] if streamers else [],  # Return first 3 for preview
            "message": "Fallback data returned - scraping failed" if is_fallback else "Real scraped data"
        }
    except Exception as e:
        logger.error(f"Error in test_scrape: {e}")
        return {
            "success": False,
            "error": str(e),
            "message": "Test scraping failed"
        }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": time.time()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8000,
        log_level="warning",  # Set uvicorn logging to warning
        access_log=False
    ) 
