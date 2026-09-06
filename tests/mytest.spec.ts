import { test, expect } from '@playwright/test';

// 1. Amjilttai nevtreh
test('амжилттай нэвтрэх', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Assertion
  await expect(page.getByText('Products')).toBeVisible();
  await expect(page).toHaveURL(/inventory.html/);

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByText('Logout').click();

  // Logout bolson eseh
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});


// 2. Amjiltgu nevtreh
test('буруу нууц үгээр нэвтрэх', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');

  // Wrong password
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  // Error message
  await expect(
    page.getByText(
      'Epic sadface: Username and password do not match any user in this service'
    )
  ).toBeVisible();

});


test('нэвтэрсний дараа бараа сагслах', async ({ page }) => {

  await page.goto('https://www.saucedemo.com');

  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Products
  await expect(page.getByText('Products')).toBeVisible();

  // Add to cart
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Cart check
  await expect(page.getByText('Your Cart')).toBeVisible();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // Logout
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByText('Logout').click();

  // Logout bolson eseh
  await expect(page).toHaveURL('https://www.saucedemo.com/');
});
