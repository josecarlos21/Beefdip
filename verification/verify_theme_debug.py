from playwright.sync_api import sync_playwright

def verify_theme():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Capture console logs
        page.on("console", lambda msg: print(f"Console: {msg.text}"))
        page.on("pageerror", lambda err: print(f"Page Error: {err}"))

        try:
            page.goto("http://localhost:3000")
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(3000)

            # Take a screenshot
            page.screenshot(path="verification/screenshot_theme_debug.png", full_page=True)
            print("Screenshot taken.")
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_theme()
