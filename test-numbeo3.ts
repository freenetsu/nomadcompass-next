import { chromium } from 'playwright';

async function testNumbeo() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  });

  console.log('📍 Testing RANKINGS page for indices...\n');
  await page.goto('https://www.numbeo.com/cost-of-living/rankings_by_country.jsp', { waitUntil: 'networkidle', timeout: 60000 });

  const title = await page.title();
  console.log('Page title:', title);

  const tables = await page.locator('table').all();
  console.log(`\nFound ${tables.length} tables`);

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const text = await table.textContent();
    if (text && (text.includes('Portugal') || text.includes('Cost of Living Index'))) {
      console.log(`\n=== TABLE ${i + 1} ===`);
      const rows = await table.locator('tr').all();
      for (let j = 0; j < Math.min(5, rows.length); j++) {
        const rowText = await rows[j].textContent();
        console.log(`Row ${j + 1}: ${rowText?.trim()}`);
      }
    }
  }

  await browser.close();
}

testNumbeo().catch(console.error);
