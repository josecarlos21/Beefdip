
from playwright.sync_api import Page, expect, sync_playwright
import re

def test_theme_load(page: Page):
    print("Navigating to http://localhost:3000")
    page.goto("http://localhost:3000")

    # Wait for React to mount
    print("Waiting for root...")
    page.wait_for_selector("#root")

    # Wait for network idle to ensure scripts are loaded
    page.wait_for_load_state("networkidle")

    # Check body classes
    print("Checking body classes...")
    body = page.locator("body")
    # We verify that our new token class is present
    expect(body).to_have_class(re.compile(r"bg-bg-canvas"))
    expect(body).to_have_class(re.compile(r"font-body"))

    print("Taking screenshot...")
    page.screenshot(path="/app/verification/theme_verification.png")
    print("Done.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_theme_load(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="/app/verification/error.png")
            raise e
        finally:
            browser.close()
