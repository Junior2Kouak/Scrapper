import puppeteer from "puppeteer";

async function Run({ city = "marseille"}) {
  var prompt = "evenements " + city;
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

  const titles = await page.$$("div.bVj5Zb");
  const adress = await page.$$("div.TCYkdd");
  const dates = await page.$$("div.t3gkGd");
  console.log(titles);
  const len = titles.length;

  // Afficher le texte et l'URL de chaque lien
  // const eventsHref = await page.$$("a.ct5Ked");
  // for (let i = 0; i < len; i++) {
  //   const url = await eventsHref[i].evaluate((node) => node.href);
  //   console.log(url);
  // }
    const eventsHref = await page.$$("a.ct5Ked");
    const eventsHrefArray = await Promise.all(
      eventsHref.map((link) => link.evaluate((node) => node.href))
    );
  console.log(eventsHrefArray);
  console.log(eventsHrefArray.length);
  console.log("🚀 ~ file: index.ts:59 ~ Run ~ eventsHref:", eventsHref)


  for (let i = 0; i < len; i++) {
    page.goto(eventsHrefArray[i]);
    // titles[i].click();
    try {

    
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const data = await page.evaluate(() => {
      const title = document.querySelector('.vk_h')?.textContent;
      const date = document.querySelector('.vk_sh span')?.textContent;
      const organiser = document.querySelector('.VF0Pj VECn4b div a')?.textContent;
      const address = document.querySelector('.VF0Pj VECn4b .vk_gy')?.textContent;
      const url = document.querySelector('.VECn4b a')?.textContent;

      return {
          title,
          date,
          organiser,
          address,
          url,
      };
  });
  console.log(data)
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
  }
 catch (error) {
  console.log("🚀 ~ file: index.ts:67 ~ Run ~ error:", error)
  
}


  // console.log(JSON.stringify(container[0]));
}}
Run({});
