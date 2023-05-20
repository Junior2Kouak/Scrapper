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
  const container = await page.waitForSelector("div > .KKHQ8c");

  console.log(container);
}

Run();
