import { test, expect } from '@playwright/test';

test('Verify that admin can create a new product when entering only required fields', 
  {
  annotation: {
    type: "TC_GQ_01",
    description: `
      Precondition: 
    - The admin is logged in to the Mephar Website
      
      Test data: 
    - User Name: test30
    - Password: 12345678
    - Product name: Thuốc đau đầu
    - Import price: 20000
    - Selling price: 25000
    - Unit: vỉ
    
      Test steps:
    1. Log into the Mephar system.
    2. Navigate to 'add-package'.
    3. In the add-package section, enter Product name, Import price, Selling price, Unit.
    4. Click 'Luu' button.
    5. Observe

      Expected results:
      - The system save and displays product created under 'products list' page`
  }
  }, async ({ page }) => {
  await page.goto('https://mephar-sit.acdtech.asia/auth/sign-in/');

  //1.The admin is logged in to the Mephar Website
  await page.getByRole('textbox', { name: 'Tên đăng nhập' }).fill('test30');
  await page.getByRole('textbox', { name: 'Mật khẩu' }).fill('12345678');
  await page.getByRole('button', { name: 'Đăng nhập' }).click();

  //2.Navigate to 'add-package'
  await page.getByRole('menuitem', { name: 'Sản phẩm' }).click();
  await page.getByRole('menuitem', { name: 'Danh sách sản phẩm' }).click();
  await page.getByRole('button', { name: 'Thêm mới' }).click();
  await page.getByText('Thêm mới hàng hóa').click();

  //3.Enter Product name, Import price, Selling price, Unit.
  await page.getByRole('textbox', { name: 'Nhập tên hàng hóa' }).fill('Thuốc đau đầu');
  await page.getByRole('textbox', { name: 'Nhập giá vốn' }).fill('2,0000');
  await page.getByRole('textbox', { name: 'Nhập giá bán' }).fill('2,5000');
  await page.getByRole('textbox', { name: 'Tồn kho' }).fill('2500');
  await page.locator("//span[contains(text(),'Tải')]/ancestor::div[@class='font-semibold']/parent::div").click();
  await page.setInputFiles("//input[@type='file']", 'D:/Playwright/Auto_Playwright/Mephar/img/anh2.jpg');
  await page.getByRole('textbox', { name: 'Nhập đơn vị cơ bản' }).fill('vỉ');

  //4. Click 'Luu' button.
  await page.getByRole('button', { name: 'Lưu', exact: true }).click();
  
  //5.Observe
  await expect(page.locator('tbody')).toContainText('2,500');
  await expect(page.locator('tbody')).toContainText('25,000đ');
  await expect(page.locator('tbody')).toContainText('20,000đ');
});


