const { describe } = require("node:test");
const { test, expect, beforeEach } = require("playwright/test");

describe("Note app", () => {

  // // Isolate the commonly used steps of testing
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test("front page can be opened", async ({ page }) => {
    // await page.goto('http://localhost:5173')
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();
    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2024"
      )
    ).toBeVisible();
  });

  test('user can log in', async ({ page }) => {
    // await page.goto('http://localhost:5173')
    await page.getByRole('button', { name: 'log in'}).click()
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('salainen')

    await page.getByRole('button', {name: 'login'}).click()

    await expect(page.getByText('Matti Luukainen logged in')).toBeVisible()
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.goto('http://localhost:5173')
      await page.getByRole('button', { name: 'log in'}).click()
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'login'}).click()
    })

    test('a new note can be created', async ({ page }) => {

      await page.getByRole('button', { name: 'new note'}).click()
      await page.getByRole('textbox').fill('a note created by playwright')
      await page.getByRole('button', { name: 'save' }).click()
      await expect(page.getByText('a note created by playwright')).toBeVisible()
    })
  })
});
