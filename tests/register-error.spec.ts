import { test, expect } from '@playwright/test';

// Feature: User Registration Error Messages
// Scenario: Display error messages for each mandatory field

test('register-error', async ({ page }) => {
  // Given I am on the registration page
  await page.goto('https://demo.nopcommerce.com/');

  // When I click on the "Register" button without filling in the required fields
  await page.click('text=Register');
  await page.click('button[type="submit"]#register-button');

  // Then I should see error messages for each mandatory field
  const requiredFields = ['FirstName', 'LastName', 'Email', 'Password', 'ConfirmPassword'];
  const requiredMessages = ['First name is required.', 'Last name is required.', 'Email is required.', 'Password is required.', 'Password is required.'];

  // And the error messages should inform me of the requirements for each field
  for (let i = 0; i < requiredFields.length; i++) {
    const errorMessage: string | null = await page.textContent(`span#${requiredFields[i]}-error`);
    if (!errorMessage) {
      console.error(`No error message found for the field ${requiredFields[i]}!`);
    } else if (errorMessage.includes(requiredMessages[i])) {
      console.log(`Error found for the field ${requiredFields[i]}: ${errorMessage}`);
    } else {
      console.warn(`Unexpected error found for the field ${requiredFields[i]}: ${errorMessage}`);
    }
  }

  // When I fill in the password field with a short password
  await page.fill('input#Password', '12');
  await page.fill('input#ConfirmPassword', '12');

  // Then I should see an error message for the password length requirement
  const passwordRuleErrorMessage: string | null = await page.textContent('span#Password-error');
  if (passwordRuleErrorMessage && passwordRuleErrorMessage.includes('Password must meet the following rules: must have at least 6 characters')) {
    console.log('Error found for the field Password: Password must have at least 6 characters');
  }

  // When I fill in the password and confirm password fields with different values
  await page.fill('input#Password', '12345678');
  await page.fill('input#ConfirmPassword', '12345679');

  // Then I should see an error message indicating that the passwords do not match
  const passwordMismatchErrorMessage: string | null = await page.textContent('span#ConfirmPassword-error');
  if (passwordMismatchErrorMessage && passwordMismatchErrorMessage.includes('The password and confirmation password do not match.')) {
    console.log('Error found for the field ConfirmPassword: The password and confirmation password do not match.');
  }

  // When I fill in the email field with an invalid email
  await page.fill('input#Email', 'joao.silva');

  // Then I should see an error message indicating that the email is invalid
  await page.click('button[type="submit"]#register-button');
  const emailErrorMessage: string | null = await page.textContent('span#Email-error');
  if (emailErrorMessage && emailErrorMessage.includes('Wrong email')) {
    console.log('Error found for the field Email: Wrong email');
  }
});
