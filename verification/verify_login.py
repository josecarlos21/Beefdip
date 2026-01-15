from playwright.sync_api import sync_playwright

def test_login_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        page.on("console", lambda msg: print(f"Console: {msg.text}"))

        try:
            # Check theme.js
            response = page.goto("http://localhost:3000/theme.js")
            if response.ok:
                print("theme.js loaded successfully")
                # print(response.text()[:100])
            else:
                print(f"theme.js failed: {response.status}")

            page.goto("http://localhost:3000")
            page.wait_for_timeout(2000)

            page.screenshot(path="verification/login_debug_2.png")
            print("Screenshot taken")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    test_login_page()
