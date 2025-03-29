import { test, expect } from '@playwright/test';

// go into parabank for each test cases. 
/* 
Møter stadig på en error hvor passordet og brukernavet ikke er riktig
selv om dette er det passordet og bruker er riktig, laget flere kontoer og feilen skjer stadig
har sjekket at alt fungerer step by step med og lage ny konto for hver case når --debug kjører. 
 */

test.beforeEach(async ({page}) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.locator('input[name="username"]').fill('ah123');
    await page.locator('input[name="password"]').fill('ah1234!');
    await page.getByRole('button', { name: 'Log In' }).click();
});

test.afterEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Log Out' }).click();
} );

/* test case 1 create an new bank account.
-   after login find the open new account button navigate to it. 
-   select account type
-   find and click open new account
-   check if account is made.
*/
test('Open Account', async ({page}) => {
    await page.getByRole('link', { name: 'Open New Account' }).click();
    await page.locator('#type').selectOption('0');
    await page.getByRole('button', { name: 'Open New Account' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('link', { name: 'Accounts overview' }).click();
    await expect(page.getByText('Account Opened!')).toBeVisible();

});


/*test case 2: Request a Loan
-   navigate to request loan
-   fill in amount
-   fill in downpayment
-   apply for loan. 
-   ps: all the loans ive tried have been rejected.
*/
test('Request Loan', async ({page}) => {
    await page.getByRole('link', { name: 'Request Loan' }).click();
    await page.locator('#amount').fill('2000');
    await page.locator('#downPayment').fill('400');
    await page.getByRole('button', { name: 'Apply Now' }).click();
    await expect(page.getByText('Status')).toBeVisible();


}); 

/*test case 3: tranfer funds
-   navigate to tranfer
-   fill amount
-   select account
-   select recving account
-   transfer money
*/

test('Transfer funds', async({ page }) => {
    await page.getByRole('link', { name: 'Transfer Funds'}).click();
    await page.locator('#amount').fill('500');
    await page.locator('#fromAccountId').selectOption({ index: 0 });
    await page.locator('#toAccountId').selectOption({ index: 1 });
    await page.getByRole('button', { name: 'transfer' }).click();
    await expect(page.getByText('Transfer Complete!')).toBeVisible();

})
