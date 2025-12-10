import { test, expect } from "@playwright/test";

test("list services", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.screenshot({
    path: "test-results/screenshots/canvas.png"
  });
});
