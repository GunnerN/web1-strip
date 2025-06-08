from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from playwright.async_api import async_playwright
import asyncio
import random
from typing import List, Dict
from pydantic import BaseModel
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Strip Token Live Streamers API", version="1.0.0")

# Add CORS middleware to allow requests from React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
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
        self.cache_duration = 300  # 5 minutes cache
    
    async def scrape_streamers(self) -> List[Dict]:
        """Scrape live streamers from Stripchat using Playwright"""
        try:
            async with async_playwright() as p:
                # Launch browser in headless mode
                browser = await p.chromium.launch(headless=True)
                context = await browser.new_context(
                    user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                )
                page = await context.new_page()
                
                logger.info(f"Navigating to {self.base_url}")
                await page.goto(self.base_url, wait_until="networkidle")
                
                # Handle age verification button
                try:
                    age_button = page.locator("button.btn-visitors-agreement-accept")
                    if await age_button.is_visible(timeout=5000):
                        logger.info("Clicking age verification button")
                        await age_button.click()
                        await page.wait_for_timeout(5000)  # Wait for content to load
                except Exception as e:
                    logger.warning(f"Age verification button not found or already handled: {e}")
                
                # Wait for the specific category section to load
                try:
                    await page.wait_for_selector(".category-mostPopularModels", timeout=15000)
                    logger.info("Found mostPopularModels category section")
                except Exception as e:
                    logger.error(f"Category section not found: {e}")
                    await browser.close()
                    return []
                
                # Find the model cards within the category section
                streamers = []
                
                try:
                    # Target the specific structure: category -> scroll wrapper -> model cards
                    category_section = await page.query_selector(".category-mostPopularModels")
                    if not category_section:
                        logger.error("Category section not found")
                        await browser.close()
                        return []
                    
                    # Look for the scroll wrapper within the category
                    scroll_wrapper = await category_section.query_selector(".multiple-categories-scroll-bar-wrapper")
                    if not scroll_wrapper:
                        logger.error("Scroll wrapper not found")
                        await browser.close()
                        return []
                    
                    # Get all model cards within the scroll wrapper
                    model_cards = await scroll_wrapper.query_selector_all(".model-list-item")
                    logger.info(f"Found {len(model_cards)} model cards")
                    
                    if not model_cards:
                        logger.error("No model cards found")
                        await browser.close()
                        return []
                    
                    # Randomly select 8 cards from available cards
                    selected_cards = random.sample(model_cards, min(8, len(model_cards)))
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
                            logger.info(f"Extracted streamer: {username} with image: {img_src[:50]}...")
                        
                        except Exception as e:
                            logger.warning(f"Error extracting data from card {i}: {e}")
                            continue
                    
                except Exception as e:
                    logger.error(f"Error finding model cards: {e}")
                
                await browser.close()
                logger.info(f"Successfully scraped {len(streamers)} streamers")
                return streamers
                
        except Exception as e:
            logger.error(f"Error during scraping: {e}")
            return []
    
    async def get_streamers(self) -> List[Dict]:
        """Get streamers with caching"""
        import time
        current_time = time.time()
        
        # Return cached data if still valid
        if (current_time - self.last_scrape_time < self.cache_duration and 
            self.cached_streamers):
            logger.info("Returning cached streamers")
            return self.cached_streamers
        
        # Scrape new data
        logger.info("Scraping fresh streamer data")
        streamers = await self.scrape_streamers()
        
        if streamers:
            self.cached_streamers = streamers
            self.last_scrape_time = current_time
        
        return streamers if streamers else self.cached_streamers

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
        if not streamers:
            raise HTTPException(status_code=503, detail="Unable to fetch streamers at the moment")
        return streamers
    except Exception as e:
        logger.error(f"Error in get_live_streamers: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/streamers/refresh")
async def refresh_streamers():
    """Force refresh streamer data"""
    try:
        scraping_service.last_scrape_time = 0  # Force refresh
        streamers = await scraping_service.get_streamers()
        return {"message": f"Refreshed {len(streamers)} streamers", "count": len(streamers)}
    except Exception as e:
        logger.error(f"Error in refresh_streamers: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 