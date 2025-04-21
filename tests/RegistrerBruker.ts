import { Page } from "@playwright/test";

export async function newAccount(page: Page) {
    const rand = Math.floor(Math.random() * 100000);
    const user = {
      username: `test${rand}`,
      password: `Passord${rand}!`
    };
  
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    await page.getByRole('link', { name: 'Register' }).click();

    await page.locator('#customer\\.firstName').fill('testbruker');
    await page.locator('#customer\\.lastName').fill('test');
    await page.locator('#customer\\.address\\.street').fill('HakkebakkeSkogen 23');
    await page.locator('#customer\\.address\\.city').fill('Hakkebakke');
    await page.locator('#customer\\.address\\.state').fill('Eple');
    await page.locator('#customer\\.address\\.zipCode').fill('2300');
    await page.locator('#customer\\.phoneNumber').fill('12345678');
    await page.locator('#customer\\.ssn').fill('1234');
    await page.locator('#customer\\.username').fill(user.username);
    await page.locator('#customer\\.password').fill(user.password);
    await page.locator('#repeatedPassword').fill(user.password);

    await page.getByRole('button', { name: 'Register' }).click();
    console.log(user.username);
    console.log(user.password);

    return user;
  }




  