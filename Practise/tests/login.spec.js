import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/');
  await page.locator('#login2').click();
  await page.locator('#loginusername').click();
  await page.locator('#loginusername').fill('yourtest01');
  await page.locator('#loginpassword').click();
  await page.locator('#loginpassword').fill('123456789');
  await page.getByRole('button', { name: 'Log in' }).dblclick();
});