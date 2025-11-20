import {
  test,
  // expect
} from '@playwright/test'

test.describe('Vue App', () => {
  /**
   * Tests as demo
   */
  // test('should display the counter with DDD architecture', async ({ page }) => {
  //   await page.goto('/')
  //   // Verify the heading is visible
  //   const heading = page.getByRole('heading', { name: /vite \+ vue/i })
  //   await expect(heading).toBeVisible()
  //   // Verify DDD architecture message is displayed
  //   await expect(page.getByText(/DDD architecture/i)).toBeVisible()
  // })
  // test('should increment counter when + button is clicked', async ({ page }) => {
  //   await page.goto('/')
  //   // Find the counter display
  //   const counterDisplay = page.locator('.counter-display')
  //   await expect(counterDisplay).toBeVisible()
  //   await expect(counterDisplay).toHaveText('0')
  //   // Find and click the increment button (+)
  //   const incrementButton = page.getByRole('button', { name: '+' })
  //   await incrementButton.click()
  //   await expect(counterDisplay).toHaveText('1')
  //   await incrementButton.click()
  //   await expect(counterDisplay).toHaveText('2')
  // })
  // test('should decrement counter when - button is clicked', async ({ page }) => {
  //   await page.goto('/')
  //   const counterDisplay = page.locator('.counter-display')
  //   const incrementButton = page.getByRole('button', { name: '+' })
  //   const decrementButton = page.getByRole('button', { name: '-' })
  //   // Increment to 3
  //   await incrementButton.click()
  //   await incrementButton.click()
  //   await incrementButton.click()
  //   await expect(counterDisplay).toHaveText('3')
  //   // Decrement to 2
  //   await decrementButton.click()
  //   await expect(counterDisplay).toHaveText('2')
  // })
  // test('should not decrement below zero', async ({ page }) => {
  //   await page.goto('/')
  //   const counterDisplay = page.locator('.counter-display')
  //   const decrementButton = page.getByRole('button', { name: '-' })
  //   // Wait for elements to be visible
  //   await expect(counterDisplay).toBeVisible()
  //   await expect(decrementButton).toBeVisible()
  //   // Verify initial state is 0
  //   await expect(counterDisplay).toHaveText('0')
  //   // Verify decrement button is disabled at 0
  //   await expect(decrementButton).toBeDisabled()
  //   // Counter should remain at 0
  //   await expect(counterDisplay).toHaveText('0')
  // })
  // test('should reset counter when reset button is clicked', async ({ page }) => {
  //   await page.goto('/')
  //   const counterDisplay = page.locator('.counter-display')
  //   const incrementButton = page.getByRole('button', { name: '+' })
  //   const resetButton = page.getByRole('button', { name: /reset/i })
  //   // Increment to 5
  //   for (let i = 0; i < 5; i++) {
  //     await incrementButton.click()
  //   }
  //   await expect(counterDisplay).toHaveText('5')
  //   // Reset
  //   await resetButton.click()
  //   await expect(counterDisplay).toHaveText('0')
  // })
})
