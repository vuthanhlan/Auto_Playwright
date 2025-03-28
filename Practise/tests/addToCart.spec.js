import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://pos.mephar.com/auth/sign-in/');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).click();
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('HuongLan');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).click();
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('12345678');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await page.getByText('Chợ').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Chợ' }).click();
  const page1 = await page1Promise;
  await page1.locator('.ant-btn').first().click();
  await page1.locator('span').filter({ hasText: /^1$/ }).click();
  await expect(page1.locator('[id="__next"]')).toContainText('1');
  await expect(page1.locator('div').filter({ hasText: /^189,500đ189,500đ$/ }).getByRole('textbox')).toBeVisible();
  await page1.locator('.flex > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(4)').click();
  await page1.getByRole('button', { name: 'Close' }).click();
  await page1.locator('div').filter({ hasText: /^189,500đ189,500đ$/ }).getByRole('img').click();
  await page1.getByRole('button', { name: 'Xóa' }).click();
});