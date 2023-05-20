import puppeteer from "puppeteer";

async function Run() {
  var city = "lyon";
  var prompt = "evenements " + city;
  // Instancier le navigateur
  const browser = await puppeteer.launch({ headless: false });
  // Créer une page
  const page = await browser.newPage();
  // Redimentionner la page dans le navigateur
  await page.setViewport({ width: 2000, height: 1024 });
  // Ouvrir la page dans le navigateur
  await page.goto("https://www.google.fr/search?q=evenements+lyon");

  // Wait and click on first result
  const searchResultSelector = "#L2AGLb";
  await page.waitForSelector(searchResultSelector);
  await page.click(searchResultSelector);

  //   try {
  //     // Attendre que l'élément avec la classe "ct5Ked" soit présent dans la page

  //     await page.waitForSelector(".MJfuMd", { visible: true, timeout: 5000 });

  //     // Sélectionner les éléments avec la classe "ct5Ked"
  //     const elements = await page.$$(".MJfuMd");

  //     console.log(elements);
  //   } catch (error) {
  //     console.error("Erreur lors de l'attente de l'élément .MJfuMd :", error);
  //   }

  //   try {
  //     // Attendre que les éléments soient chargés
  //     await page.waitForXPath('//div[contains(@class, "MJfuMd")]', {
  //       visible: true,
  //       timeout: 5000,
  //     });

  //     // Récupérer les éléments avec une expression XPath
  //     const elements = await page.$x('//div[contains(@class, "MJfuMd")]');

  //     console.log(elements);
  //   } catch (error) {
  //     console.error("Erreur lors de l'attente des éléments .vrdfdd :", error);
  //   }

  // Récupérer tous les liens (balises <a>) de la page
  const titles = await page.$$("div.bVj5Zb");
  const adress = await page.$$("div.TCYkdd");
  const dates = await page.$$("div.t3gkGd");
  console.log(titles);
  const len = titles.length;

  // Afficher le texte et l'URL de chaque lien

  for (let i = 0; i < len; i++) {
    const titles = await page.$$("div.bVj5Zb");
    const adress = await page.$$("div.TCYkdd");
    const dates = await page.$$("div.t3gkGd");
    console.log(
      await titles[i].evaluate((node) => node.textContent),
      await adress[i].evaluate((node) => node.textContent),
      await dates[i].evaluate((node) => node.textContent)
    );
    console.log(titles[i]);
    // titles[i].click();
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }
  //   for (const title of titles) {

  //     const text = await link.evaluate((node) => node.textContent);
  //     // const url = await link.evaluate((node) => node.href);
  //     console.log(text);
  //   }

  // console.log(JSON.stringify(container[0]));
}

Run();
