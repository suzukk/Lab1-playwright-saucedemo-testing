import { test, expect } from '@playwright/test';

// 1. Амжилттай нэвтрэх
test('амжилттай нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Assertions
  await expect(page.getByText('Products')).toBeVisible();
  await expect(page).toHaveURL(/inventory.html/);

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  // Logout болсон эсэхийг шалгах
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});


// 2. Амжилтгүй нэвтрэх
test('буруу нууц үгээр нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Wrong password
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  // Error message assertion
  await expect(
    page.getByText(
      'Epic sadface: Username and password do not match any user in this service'
    )
  ).toBeVisible();
});


// 3. Нэвтэрсний дараа бараа сагслах
test('нэвтэрсний дараа бараа сагслах', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Products assertion
  await expect(page.getByText('Products')).toBeVisible();

  // Add first product to cart
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Open cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Cart assertions
  await expect(page.getByText('Your Cart')).toBeVisible();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  // Logout болсон эсэхийг шалгах
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
