import { test, expect } from '@playwright/test';
import { newAccount } from './RegistrerBruker';


let user;

test.beforeEach(async ({page}) => {
    user = await newAccount(page);
    await page.getByRole('link', { name: 'Log Out' }).click();

    //console.log(user.username);
    //console.log(user.password);

    await page.locator('input[name="username"]').fill(user.username);
    await page.locator('input[name="password"]').fill(user.password);
    await page.getByRole('button', { name: 'Log In' }).click();
});

test.afterEach(async ({ page }) => {
    await page.getByRole('link', { name: 'Log Out' }).click();
} );


test('Case 1: Open Account', async ({page}) => {
    await page.getByRole('link', { name: 'Open New Account' }).click();
    //sjekker at h1 teksten er på siden når vi har trykket på den
    
    await expect(page.locator('h1', { hasText: 'Open New Account' })).toBeVisible();
    //her har vi valg brukskonto option 0
    await page.locator('#type').selectOption('0');

    //eksisterende konto overføring fra
    await page.locator('#fromAccountId').selectOption({ index: 0 });
    await page.getByRole('button', { name: 'Open New Account' }).click();

    //denne delen tar konto nummeret slik at vi kan bekrefte at konto er åpnet. 
    const accountIdLocator = page.locator('#newAccountId');
    await expect(accountIdLocator).toBeVisible();
    const accountId = await accountIdLocator.textContent()
    await page.waitForSelector(`text=Your new account number: ${accountId}`);
    await expect(page.getByText(`Your new account number: ${accountId}`)).toBeVisible();

    //navigering til konto oversikt og se om kontonummeret er der.
    await page.getByRole('link', { name: 'Accounts overview' }).click();
    await expect(page.getByRole('link', { name: accountId! })).toBeVisible(); 
    const row = page.locator('table').locator('tr', { hasText: accountId! });
    await expect(row).toContainText('$100.00');
}); 



test('case 2: Request Loan', async ({ page }) => {
    await page.getByRole('link', { name: 'Request Loan' }).click();

    await page.locator('#amount').fill('2000');
    await page.locator('#downPayment').fill('400');
    await page.locator('#fromAccountId').selectOption({ index: 0 });     

    await page.getByRole('button', { name: 'Apply Now' }).click();

    const statusRow = page.locator('table').locator('tr', { hasText: 'Status' });
    await expect(statusRow).toBeVisible();
    await expect(page.getByText('Loan Request Processed')).toBeVisible();

    // Normalize the status content
    const rawStatus = await statusRow.textContent();
    const normalizedStatus = rawStatus?.replace(/\s+/g, ' ').trim(); // removes newlines and multiple spaces

    // Check for approved or denied
    if (normalizedStatus?.toLowerCase().includes('approved')) {
        expect(normalizedStatus).toContain('Approved');
    } else {
        expect(normalizedStatus).toContain('Denied');
    }
});



test('case 3: Transfer funds', async({ page }) => {
    //lager ny konto da vår flytt også oppretter ny kunde bruker
    await page.getByRole('link', { name: 'Open New Account' }).click();
    await page.locator('#type').selectOption('0');
    await page.getByRole('button', { name: 'Open New Account' }).click();

    await page.getByRole('link', { name: 'Transfer Funds'}).click();

    await page.locator('#amount').fill('500');
    await page.locator('#fromAccountId').selectOption({ index: 0 });
    await page.locator('#toAccountId').selectOption({ index: 1 });

    await page.getByRole('button', { name: 'transfer' }).click();
    await expect(page.getByText('Transfer Complete!')).toBeVisible();

}) 



