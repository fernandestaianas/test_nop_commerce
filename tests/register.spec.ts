import { test, expect } from '@playwright/test';

// Feature: Register on the nopCommerce
// Scenario: User registers on the website

test('register', async ({ page }) => {
  // Given I am on the homepage

  await page.goto('https://demo.nopcommerce.com/');

  // When I click on the "Register" link
  // Then I should be taken to the registration page
  await page.click('text=Register');

  // And I fill out the registration form
  // When I check the "Male" gender option
  await page.check('input#gender-male');

  // And I fill in the first name with "João"
  await page.fill('input#FirstName', 'João');

  // And I fill in the last name with "Silva"
  await page.fill('input#LastName', 'Silva');

  // And I select the day of birth as "12"
  await page.selectOption('select[name="DateOfBirthDay"]', '12');

  // And I select the month of birth as "7"
  await page.selectOption('select[name="DateOfBirthMonth"]', '7');

  // And I select the year of birth as "1980"
  await page.selectOption('select[name="DateOfBirthYear"]', '1980');

  // Generate a timestamp to make the email unique
  const timestamp = new Date().getTime();
  // Construct the email address
  const email = `joao.silva${timestamp}@example.com`;

  console.log('E-mail: ' + email + ' to be registered!');

  // And I fill in the email with "joao.silva${timestamp}@example.com"
  await page.fill('input#Email', email);

  // And I fill in the company name with "João Company S/A"
  await page.fill('input#Company', 'João Company S/A');

  // And I fill in the password with "123456"
  await page.fill('input#Password', '123456');

  // And I confirm the password with "123456"
  await page.fill('input#ConfirmPassword', '123456');

  // When I click on the registration button
  await page.click('button[type="submit"]#register-button');

  // Then I should see a success message
  await page.waitForTimeout(2000);

  // And I should see the success message
  await page.waitForSelector('div.result');
  const successMessage: string | null = await page.textContent('div.result');

  if (successMessage && successMessage.includes('Your registration completed')) {
    console.log('Successful registration!');
  } else {
    console.log('Failed registration!');
  }
});
