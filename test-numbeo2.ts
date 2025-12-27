import { chromium } from 'playwright';

async function testNumbeo() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  });

  console.log('📍 Navigating to Numbeo...');
  await page.goto('https://www.numbeo.com/cost-of-living/in/Lisbon', { waitUntil: 'networkidle', timeout: 60000 });

  console.log('\n🔍 Looking for specific table with indices...');

  // Try to find the table with indices
  const tables = await page.locator('table').all();
  console.log(`Found ${tables.length} tables\n`);

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];
    const text = await table.textContent();
    if (text && text.includes('Index')) {
      console.log(`\n=== TABLE ${i + 1} (contains "Index") ===`);
      console.log(text.substring(0, 300));
      console.log('...\n');
    }
  }

  console.log('\n🎯 Looking for priceValue elements specifically...');
  const priceValues = await page.locator('.priceValue').all();
  console.log(`Found ${priceValues.length} price values\n`);

  for (let i = 0; i < Math.min(10, priceValues.length); i++) {
    const val = await priceValues[i].textContent();
    console.log(`priceValue ${i + 1}: ${val}`);
  }

  await browser.close();
}

testNumbeo().catch(console.error);
