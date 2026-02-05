from playwright.sync_api import sync_playwright

def verify_theme():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:3000")
            page.wait_for_load_state("networkidle")
            # Wait for some animation or content
            page.wait_for_timeout(2000)

            # Take a screenshot
            page.screenshot(path="verification/screenshot_theme.png", full_page=True)
            print("Screenshot taken.")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_theme()
