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
  await page.getByRole('button', { name: 'Thêm mới' }).click();
  await page.getByText('Thêm mới hàng hóa').click();
  await page.getByRole('textbox', { name: 'Nhập tên hàng hóa' }).click();
  await page.getByRole('textbox', { name: 'Nhập tên hàng hóa' }).fill('Thuốc đau đầu');
  await page.getByRole('textbox', { name: 'Nhập giá vốn' }).click();
  await page.getByRole('textbox', { name: 'Nhập giá vốn' }).fill('2,0000');
  await page.getByRole('textbox', { name: 'Nhập giá bán' }).click();
  await page.getByRole('textbox', { name: 'Nhập giá bán' }).fill('2,5000');
  await page.getByRole('textbox', { name: 'Tồn kho' }).click();
  await page.getByRole('textbox', { name: 'Tồn kho' }).fill('2500');
  await page.locator("//span[contains(text(),'Tải')]/ancestor::div[@class='font-semibold']/parent::div").click();
  await page.setInputFiles("//input[@type='file']", 'D:/Playwright/Auto_Playwright/Mephar/img/anh2.jpg');
  await page.getByRole('textbox', { name: 'Nhập đơn vị cơ bản' }).click();
  await page.getByRole('textbox', { name: 'Nhập đơn vị cơ bản' }).fill('vỉ');
  await page.getByRole('button', { name: 'Lưu', exact: true }).click();
  await page.getByRole('cell', { name: '2,500' }).first().click({
    button: 'right'
  });
  await expect(page.locator('tbody')).toContainText('2,500');
  await expect(page.locator('tbody')).toContainText('25,000đ');
  await expect(page.locator('tbody')).toContainText('20,000đ');
});