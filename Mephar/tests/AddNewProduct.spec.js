import { test, expect } from '@playwright/test';
import { threadId } from 'worker_threads';

test('Verify that admin can create a new Merchandise when entering only required fields', 
  {
  annotation: {
    type: "TC_Create_01",
    description: `
      Precondition: 
    - The admin is logged in to the Mephar Website
      
      Test data: 
    - User Name: test30
    - Password: 12345678
    - Product name: Thuốc đau đầu
    - Import price: 20000
    - Selling price: 25000
    - Inventor: 1500
    - Unit: vỉ
    
      Test steps:
    1. Log into the Mephar system.
    2. Navigate to 'add-package'.
    3. In the add-package section, enter Product name, Import price, Selling price, Unit.
    4. Click 'Luu' button.
    5. Observe

      Expected results:
      - The system save and displays product created under 'products list' page
      - The system create Code & Barcode`
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

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator("//span[contains(text(),'Tải')]/ancestor::div[@class='font-semibold']/parent::div").click();
  const fileChooser = await fileChooserPromise;
  // Chọn ảnh (sẽ tự động đóng hộp thoại)
  await fileChooser.setFiles('D:/Playwright/Auto_Playwright/Mephar/img/anh2.jpg');
  await page.waitForTimeout(1000);

  await page.getByRole('textbox', { name: 'Nhập đơn vị cơ bản' }).fill('vỉ');

  //4. Click 'Luu' button.
  await page.getByRole('button', { name: 'Lưu', exact: true }).click();
  
  //5.Observe
  await expect(page.locator("//table//tr[2]/td[3]")).toBeVisible();
  await expect(page.locator('tbody')).toContainText('2,500');
  await expect(page.locator('tbody')).toContainText('25,000đ');
  await expect(page.locator('tbody')).toContainText('20,000đ');
});

test('Verify that admin can create a new Merchandise when entering All fields', 
  {
  annotation: {
    type: "TC_Create_02",
    description: `
      Precondition: 
    - The admin is logged in to the Mephar Website
      
      Test data: 
    - User Name: test30
    - Password: 12345678
    - Code: HH00002
    - BarCode: HH00002
    - Product name: TThuốc dạ dày
    - Summary name: thuốc
    - Gruop: N003
    - Location: TT2
    - Import price: 20000
    - Selling price: 25000
    - Weight: 100
    - Inventor: 200
    - Unit: vỉ
    
      Test steps:
    1. Log into the Mephar system.
    2. Navigate to 'add-package'.
    3. In the add-package section, enter all fields
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

  //3.Enter all fields.
  await page.getByRole('textbox', { name: 'Mã hàng tự động' }).fill('HH00005');
  await page.getByRole('textbox', { name: 'Mã vạch tự động' }).fill('HH00004');
  await page.getByRole('textbox', { name: 'Nhập tên hàng hóa' }).fill('Thuốc dạ dày');
  await page.getByRole('textbox', { name: 'Nhập tên viết tắt' }).fill('thuốc ');
  await page.locator("//span[contains(text(),'Nhóm sản phẩm')]/parent::div").click();
  await page.getByText('N003').click();
  await page.locator("//span[contains(text(),'Vị trí sản phẩm')]/parent::div").click();
  await page.getByText('TT2').click();
  await page.getByRole('textbox', { name: 'Nhập giá vốn' }).fill('2,0000');
  await page.getByRole('textbox', { name: 'Nhập giá bán' }).fill('2,5000');
  await page.getByRole('textbox', { name: 'Nhập trọng lượng' }).fill('100');
  await page.getByRole('textbox', { name: 'Quy cách đóng gói' }).fill('hộp');
  await page.locator("//span[contains(text(),'Nhập tên hãng')]/parent::div").click();
  await page.getByTitle('Bilim Ilac Sanayi Ve Ticaret').click();
  await page.locator("//span[contains(text(),'Nhập tên nước')]/parent::div").click();
  await page.getByText('Litva').click();
  await page.getByRole('textbox', { name: 'Tồn kho' }).fill('200');

  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator("//span[contains(text(),'Tải')]/ancestor::div[@class='font-semibold']/parent::div").click();
  const fileChooser = await fileChooserPromise;
  // Chọn ảnh (sẽ tự động đóng hộp thoại)
  await fileChooser.setFiles('D:/Playwright/Auto_Playwright/Mephar/img/anh2.jpg');
  await page.waitForTimeout(1000);  
  
  await page.getByRole('textbox', { name: 'Nhập đơn vị cơ bản' }).fill('vỉ');
  //4. Click 'Luu' button.
  await page.getByRole('button', { name: 'Lưu', exact: true }).click();
  
  //5.Observe
  await expect(page.locator('//table//tr[2]/td[7]')).toContainText('200');
  await expect(page.locator('//table//tr[2]/td[9]')).toContainText('25,000đ');
  await expect(page.locator('//table//tr[2]/td[10]')).toContainText('20,000đ');
});

test('Verify that admin can not create a new Merchandise when Code&Barcode existed', 
  {
  annotation: {
    type: "TC_Create_03",
    description: `
      Precondition: 
    - The admin is logged in to the Mephar Website
      
      Test data: 
    - User Name: test30
    - Password: 12345678
    - Product name: TThuốc dạ dày
    - Summary name: thuốc
    - Gruop: N003
    - Location: TT2
    - Import price: 20000
    - Selling price: 25000
    - Weight: 100
    - Inventor: 200
    - Unit: vỉ
    
      Test steps:
    1. Log into the Mephar system.
    2. Navigate to 'add-package'.
    3. In the add-package section, enter Code & Barcode existed and required fields
    4. Click 'Luu' button.
    5. Observe

      Expected results:
      - The system can not creat a product under 'products list' page
      - The system display erorr messaage`
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

  //3.Enter all fields.
  await page.getByRole('textbox', { name: 'Mã hàng tự động' }).fill('HH00002');
  await page.getByRole('textbox', { name: 'Mã vạch tự động' }).fill('HH00002');
  await page.getByRole('textbox', { name: 'Nhập tên hàng hóa' }).fill('Thuốc đau đầu');
  await page.getByRole('textbox', { name: 'Nhập giá vốn' }).fill('2,0000');
  await page.getByRole('textbox', { name: 'Nhập giá bán' }).fill('2,5000');
  await page.getByRole('textbox', { name: 'Tồn kho' }).fill('2500');
  await page.getByRole('textbox', { name: 'Nhập đơn vị cơ bản' }).fill('vỉ');
  //4. Click 'Luu' button.
  await page.getByRole('button', { name: 'Lưu', exact: true }).click();
  
  //5.Observe
  await expect(page.locator('body')).toContainText('Mã hàng HH00002 đã tồn tại.');
});
