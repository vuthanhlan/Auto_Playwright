import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://mephar-sit.acdtech.asia/auth/sign-in/');
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).click();
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('test30');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).click();
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('12345678');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await page.getByRole('menuitem', { name: 'Sản phẩm' }).click();
  await page.getByRole('menuitem', { name: 'Danh sách sản phẩm' }).click();
  await page.locator('.ant-table-row > td:nth-child(4)').first().click();
  await page.getByRole('button', { name: 'Xoá' }).click();
  await page.getByRole('button', { name: 'Xóa' }).click();
});