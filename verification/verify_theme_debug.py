
from playwright.sync_api import Page, expect, sync_playwright
import re

def test_theme_load(page: Page):
    # Capture console logs
    page.on("console", lambda msg: print(f"Console: {msg.text}"))
    page.on("pageerror", lambda err: print(f"PageError: {err}"))

    print("Navigating to http://localhost:3000")
    page.goto("http://localhost:3000")

    # Wait for React to mount
    print("Waiting for root...")
    # Just wait for it to be attached, even if empty, to see if we can get logs
    # But wait_for_selector defaults to visible.
    try:
        page.wait_for_selector("#root", state="attached", timeout=5000)
    except:
        pass

    # Wait a bit more for potential errors
    page.wait_for_timeout(3000)

    print("Taking debug screenshot...")
    page.screenshot(path="/app/verification/debug.png")

    # If we failed before, let's try to see if body classes are applied at least
    print("Checking body classes...")
    body = page.locator("body")
    expect(body).to_have_class(re.compile(r"bg-bg-canvas"))

    print("Done.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            test_theme_load(page)
        except Exception as e:
            print(f"Error: {e}")
            raise e
        finally:
            browser.close()
