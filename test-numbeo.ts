import { chromium } from 'playwright';

async function testNumbeo() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  });

  console.log('📍 Navigating to Numbeo...');
  await page.goto('https://www.numbeo.com/cost-of-living/in/Lisbon', { timeout: 60000 });

  console.log('📸 Taking screenshot...');
  await page.screenshot({ path: '/tmp/numbeo-test.png', fullPage: true });

  console.log('📄 Getting page title...');
  const title = await page.title();
  console.log('Page title:', title);

  console.log('\n🔍 Looking for data elements...');
  const tableCount = await page.locator('table').count();
  console.log('Number of tables found:', tableCount);

  const priceValueCount = await page.locator('.priceValue').count();
  console.log('Number of .priceValue elements:', priceValueCount);

  const costOfLivingRow = await page.locator('tr:has-text("Cost of Living Index")').count();
  console.log('Cost of Living Index rows found:', costOfLivingRow);

  console.log('\n📋 Page content sample:');
  const bodyText = await page.locator('body').textContent();
  console.log(bodyText?.substring(0, 500));

  console.log('\n✅ Screenshot saved to /tmp/numbeo-test.png');

  await browser.close();
}

testNumbeo().catch(console.error);
