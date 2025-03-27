import { test, expect } from '@playwright/test';

// go into parabank for each test cases. 
test.beforeEach(async ({page}) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').fill('AhmedPlaywright');
    await page.locator('input[name="password"]').fill('Balong1091!');
    await page.getByRole('button', { name: 'Log In' }).click();
});

test.afterEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Log Out' }).click();

} )

// test case 1 create an new Account.
test('Open Account', async ({page}) => {
    await page.getByRole('link', { name: 'Open New Account' }).click();
    await page.locator('#type').selectOption('0');
    await page.getByRole('button', { name: 'Open New Account' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: 'Accounts overview' }).click();

});


//test case 2: Request a Loan
test('Request Loan', async ({page}) => {
    await page.getByRole('link', { name: 'Request Loan' }).click();
    await page.locator('#amount').fill('2000');
    await page.locator('#downPayment').fill('400');
    await page.getByRole('button', { name: 'Apply Now' }).click();

}); 