const cheerio = require('cheerio')
const puppeteer = require('puppeteer');

const pinterest = (query) => new Promise((resolve, reject) => {
         (async () => {
              let url = ['https://id.pinterest.com/search/pins/?q=' + query]
         const browser = await puppeteer.launch({
              headless: true,
              defaultViewport: null
            });
         const page = await browser.newPage();
         await page.goto(url[0]);          
         const bodyHandle = await page.$('body')  
         const html = await page.evaluate(body => body.innerHTML, bodyHandle);
         await bodyHandle.dispose();
         const $ = cheerio.load(html)
         const img = '#__PWS_ROOT__ > div > div > div > div > div > section > div > div > div > div > div > div > div > div > a > img'
         let images = []
         $(img).get().map((rest) => {
              images.push($(rest).attr('src'))
         })
         await browser.close();
         let ress = ({
            status: true,
            creator: "Tanaka-Kun",
            images
            })
         resolve(ress)
         })()
    })

module.exports = pinterest