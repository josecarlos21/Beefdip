from playwright.sync_api import sync_playwright, expect

def verify_theme(page):
    page.goto("http://localhost:3000/dashboard")
    page.wait_for_load_state("networkidle")

    # Debug: print content
    print(page.content())

    page.screenshot(path="verification/dashboard_theme.png")
    expect(page.get_by_text("Vallarta", exact=False)).to_be_visible()

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_theme(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
