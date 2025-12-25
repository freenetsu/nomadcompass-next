import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load homepage successfully", async ({ page }) => {
    await page.goto("/");

    // Vérifier le titre
    await expect(page).toHaveTitle(/NomadCompass/);

    // Vérifier le header
    await expect(
      page.getByRole("heading", { name: /NomadCompass/ }),
    ).toBeVisible();

    // Vérifier les boutons principaux
    await expect(
      page.getByRole("link", { name: /Commencer l'analyse/ }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /Voir le dashboard/ }),
    ).toBeVisible();
  });

  test("should navigate to questionnaire", async ({ page }) => {
    await page.goto("/");

    // Cliquer sur "Commencer l'analyse"
    await page.getByRole("link", { name: /Commencer l'analyse/ }).click();

    // Vérifier navigation vers questionnaire
    await expect(page).toHaveURL(/\/questionnaire/);
    await expect(
      page.getByRole("heading", { name: /Questionnaire/ }),
    ).toBeVisible();
  });

  test("should navigate to dashboard", async ({ page }) => {
    await page.goto("/");

    // Cliquer sur "Voir le dashboard"
    await page.getByRole("link", { name: /Voir le dashboard/ }).click();

    // Vérifier navigation vers dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });
});
