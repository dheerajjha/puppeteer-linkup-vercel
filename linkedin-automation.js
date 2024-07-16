const { chromium } = require('playwright');

(async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: true }); // Set headless: true for headless mode
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Go to LinkedIn login page
  await page.goto('https://www.linkedin.com/login');

  // Log in
  await page.fill('input#username', 'contact.dheeraj.jha@gmail.com');
  await page.fill('input#password', 'Flower1!!');
  await page.click('button[type="submit"]');

  // Wait for navigation to the home page
  await page.waitForNavigation();

  // Go to the messaging page
  await page.goto('https://www.linkedin.com/messaging/');

  // Wait for the messaging section to load
  await page.waitForSelector('.msg-conversation-listitem');

  // Click on the first chat
  const firstChat = await page.$('.msg-conversation-listitem');
  await firstChat.click();

  // Wait for the message input box to appear
  await page.waitForSelector('div.msg-form__contenteditable');

  // Type the message
  await page.type('div.msg-form__contenteditable', 'Headless');

  // Send the message
  await page.click('button[type="submit"]');

  // Close the browser
  await browser.close();
})();
