
import { test, expect } from '@playwright/test';

/* task1 contact
- go into website.
- find the contact us button and click.
- fill inn information.
- send form.
- except a message.
*/

test('contact', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', {name: 'Contact Us'}).click();
  await page.locator('#name').fill('test Ahmed');
  await page.locator('#email').fill('test@ahmed.no');
  await page.locator('#phone').fill('12345678');
  await page.locator('#message').fill('test ahmed');
  await page.getByRole('button', { name: 'Send to Customer Care' }).click();

  await expect(page.getByText('A Customer Care')).toBeVisible();


});
