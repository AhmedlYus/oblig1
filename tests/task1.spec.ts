
import { test, expect } from '@playwright/test';

test('contact', async ({ page }) => {
  const name = 'Ahmed'
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', {name: 'Contact Us'}).click();
  await page.locator('#name').fill(name);
  await page.locator('#email').fill('test@ahmed.no');
  await page.locator('#phone').fill('12345678');
  await page.locator('#message').fill('test ahmed');
  await page.getByRole('button', { name: 'Send to Customer Care' }).click();

  await expect(page.getByText(`Thank you ${name}`)).toBeVisible();


});
