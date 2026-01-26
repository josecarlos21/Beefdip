from playwright.sync_api import Page, expect, sync_playwright
import json
import os
import time

def verify_theme(page: Page):
    page.goto("http://localhost:3000/")

    # Wait for content
    try:
        expect(page.get_by_text("Vallarta")).to_be_visible(timeout=10000)
    except Exception as e:
        print("Failed to find 'Vallarta'. Taking screenshot...")
        os.makedirs("/home/jules/verification", exist_ok=True)
        page.screenshot(path="/home/jules/verification/error_screenshot.png")
        raise e

    icon = page.get_by_text("local_fire_department")
    container = icon.locator("xpath=..") # Parent div

    # Check computed style
    bg_color = container.evaluate("el => window.getComputedStyle(el).backgroundColor")
    print(f"Computed background color: {bg_color}")

    # rgb(251, 146, 60) is #fb923c
    if "rgb(251, 146, 60)" not in bg_color:
        raise Exception(f"Primary color not applied. Expected rgb(251, 146, 60), got {bg_color}")

    print("Theme verification successful!")

    os.makedirs("/home/jules/verification", exist_ok=True)
    page.screenshot(path="/home/jules/verification/login_theme.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_theme(page)
        finally:
            browser.close()
