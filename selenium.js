const { Builder, By, Key, until } = require('selenium-webdriver')

;(async function example() {
	let driver = await new Builder().forBrowser('chrome').build()
	try {
		await driver.get('https://www.amazon.com')
		await driver
			.findElement(By.id('twotabsearchtextbox'))
			.sendKeys('Nvidia RTX 3070Ti', Key.RETURN)
		await driver.wait(until.titleContains('Nvidia RTX 3070Ti'), 1000)

		let titles = await driver.findElements(
			By.css('span.a-size-medium.a-color-base.a-text-normal')
		)
		let links = await driver.findElements(
			By.css('a.a-link-normal.a-text-normal')
		)

		let results = []
		for (let i = 0; i < titles.length; i++) {
			let title = await titles[i].getText()
			let link = await links[i].getAttribute('href')
			results.push({ title, link })
		}

		console.log(results)
	} finally {
		await driver.quit()
	}
})()
