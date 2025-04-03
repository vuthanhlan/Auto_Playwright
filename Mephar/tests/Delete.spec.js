import { test, expect } from '@playwright/test';
import { time } from 'console';

test('Verify that admin can delete a product successfully', 
  {
  annotation: {
    type: "TC_Delete_01",
    description: `
      Precondition: 
    - The admin is logged in to the Mephar Website
      
      Test data: 
    - Product name: Thuốc đau đầu
    
      Test steps:
    1. Log into the Mephar system.
    2. Navigate to 'products list'.
    3. In the products list section, choose a product to delete.
    4. Click 'Xoa' button.
    5. Confirm delete--> click "Xoa" button
    6. Observe

      Expected results:
      - The system remover deleted product from 'products list' page`
  }
  }, async ({ page }) => {
  await page.goto('https://mephar-sit.acdtech.asia/auth/sign-in/');
  const PRODUCT_ID = 'HH000000032'; // Thay bằng ID của sản phẩm cần xóa

//1. Log into the Mephar system.
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('test30');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('12345678');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
//2. Navigate to 'products list'.
  await page.getByRole('menuitem', { name: 'Sản phẩm' }).click();
  await page.getByRole('menuitem', { name: 'Danh sách sản phẩm' }).click();
  // Xác minh sản phẩm tồn tại trước khi xóa
  const productLocator = page.locator(`//td[contains(text(),'${PRODUCT_ID}')]`);
  await expect(productLocator).toBeVisible();

//3. In the products list section, choose a product to delete.
  await productLocator.click();
//4. Click 'Xoa' button.
  await page.getByRole('button', { name: 'Xoá' }).click();
//5. Confirm delete--> click "Xoa" button
const confirmButton= page.getByRole('button', { name: 'Xóa' });
if(await confirmButton.isVisible()){
  await confirmButton.click();
}
await expect(productLocator).not.toBeVisible();
});


test('verify that admin cannot delete product when product has order', 
  {
  annotation: {
    type: "TC_Delete_02",
    description: `
      Precondition: 
    - The admin is logged in to the Mephar Website
      
      Test data: 
    - Product name: Thuốc đau đầu
    
      Test steps:
    1. Log into the Mephar system.
    2. Navigate to 'products list'.
    3. In the products list section, choose a product to delete.
    4. Click 'Xoa' button.
    5. Confirm delete--> click "Xoa" button
    6. Observe

      Expected results:
      - admin cannot delete product when product has order`
  }
  }, async ({ page }) => {
    
  await page.goto('https://mephar-sit.acdtech.asia/auth/sign-in/');
  const PRODUCT_ID = 'HH000000001'; // Thay bằng ID của sản phẩm cần xóa

//1. Log into the Mephar system.
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('test30');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('12345678');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
//2. Navigate to 'products list'.
  await page.getByRole('menuitem', { name: 'Sản phẩm' }).click();
  await page.getByRole('menuitem', { name: 'Danh sách sản phẩm' }).click();
  // Xác minh sản phẩm tồn tại trước khi xóa
  const productLocator = page.locator(`//td[contains(text(),'${PRODUCT_ID}')]`);
  await expect(productLocator).toBeVisible();

//3. In the products list section, choose a product to delete.
  await productLocator.click();
//4. Click 'Xoa' button.
  await page.getByRole('button', { name: 'Xoá' }).click();
//5. Confirm delete--> click "Xoa" button
  const confirmButton= page.getByRole('button', { name: 'Xóa' });
  if(await confirmButton.isVisible()){
    await confirmButton.click();
  }
  await expect(page.locator('body')).toContainText('Sản phẩm đang được sử dụng ở nhập hàng, không thể xóa');
  
});