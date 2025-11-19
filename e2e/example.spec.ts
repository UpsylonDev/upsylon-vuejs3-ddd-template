import { test, expect } from '@playwright/test';

test.describe('Vue App', () => {
  test('should have interactive counter button', async ({ page }) => {
    await page.goto('/');

    // Find the counter button by its text content
    const counterButton = page.getByRole('button', { name: /count is/i });

    // Verify button exists
    await expect(counterButton).toBeVisible();

    // Get initial count
    const initialText = await counterButton.textContent();
    expect(initialText).toContain('count is');

    // Click the button
    await counterButton.click();

    // Verify count increased
    const updatedText = await counterButton.textContent();
    expect(updatedText).not.toBe(initialText);
  });
});
