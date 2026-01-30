from playwright.sync_api import sync_playwright

def verify_theme():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("console", lambda msg: print(f"Browser Console: {msg.text}"))
        page.on("pageerror", lambda exc: print(f"Browser Error: {exc}"))

        try:
            page.goto("http://localhost:3000/")
            # Wait a bit explicitly to see if logs appear
            page.wait_for_timeout(2000)

            page.wait_for_selector("#root", state="attached")

            # Take screenshot regardless of state
            page.screenshot(path="verification/theme_verification.png")
            print("Screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_theme()
