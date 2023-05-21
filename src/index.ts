import puppeteer from "puppeteer";

async function Run({ city = "Lyon"}) {
  // Instancier le navigateur
  const browser = await puppeteer.launch({ headless: false });
  // Créer une page
  const page = await browser.newPage();
  // Redimentionner la page dans le navigateur
  await page.setViewport({ width: 2000, height: 1024 });
  // Ouvrir la page dans le navigateur
  await page.goto("https://www.google.fr/search?q=evenements+" + city);

  // Wait and click on first result
  const searchResultSelector = "#L2AGLb";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);


    const eventsHref = await page.$$("a.ct5Ked");
    const eventsHrefArray = await Promise.all(
      eventsHref.map((link) => link.evaluate((node) => node.href))
    );
  
  var results = []
  console.log(eventsHrefArray)
  for (let i = 0; i < eventsHrefArray.length; i++) {
    page.goto(eventsHrefArray[i]);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const data = await page.evaluate(async () => {
        const title = document.querySelector('.vk_h')?.textContent;
        const date = document.querySelector('.vk_sh span')?.textContent;
        const organiser ={
          url: document.querySelector('.VECn4b')?.querySelector('a')?.href,
          name: document.querySelector('.VECn4b')?.querySelector('a')?.textContent,
          
        } 
        const address = document.querySelector('.VECn4b')?.querySelector('.vk_gy')?.textContent;

        const ticketInfo = {
          url: document.querySelectorAll('.VECn4b')[1]?.querySelector('a')?.href,
          name: document.querySelectorAll('.VECn4b')[1]?.querySelector('a')?.textContent

        } 
        return {
            title,
            date,
            organiser,
            address,
            ticketInfo
            // url,
        };
      });
      console.log(data);
      results.push(data)
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    catch (error) {
      console.log("🚀 ~ file: index.ts:67 ~ Run ~ error:", error)
    }
  }
  await browser.close();
  console.log("🚀 ~ file: index.ts:56 ~ Run ~ results:", results)
  return results;

}
console.log("🚀 ~ file: index.ts:62 ~ Run({}):", Run({}))
