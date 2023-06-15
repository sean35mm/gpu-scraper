const puppeteer = require('puppeteer')

;(async () => {
	const browser = await puppeteer.launch({ headless: false })
	const page = await browser.newPage()

	// Go to Amazon.com
	await page.goto('https://www.amazon.com')

	// Type 'Nvidia RTX 3070Ti' into the search bar and press Enter
	await page.type(
		'#twotabsearchtextbox',
		'Nvidia RTX 3070Ti',
		'Nvidia RTX 3060Ti',
		'Nvidia RTX 3080'
	)
	await page.keyboard.press('Enter')

	// Wait for search results to load
	await page.waitForNavigation({ waitUntil: 'networkidle0' })

	// Extract the results
	const results = await page.evaluate(() => {
		// This would depend on the page structure, which might change
		return Array.from(
			document.querySelectorAll('span.a-size-medium.a-color-base.a-text-normal')
		).map((el) => ({
			title: el.innerText,
			link: el.parentElement.href,
		}))
	})

	console.log(results)

	await browser.close()
})()

//CUT OFF September 2021 - Amazon updated robots.txt and put mechanisms in place to deter scraping
