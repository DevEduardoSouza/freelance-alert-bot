import { firefox } from "playwright";

export const getHtmlPage = async (url) => {
  try {
    const browser = await firefox.launch({ headless: true });
    const context = await browser.newContext({
      timezoneId: "America/Sao_Paulo",
      geolocation: { latitude: -23.5505, longitude: -46.6333 },
      permissions: ["geolocation"],
      locale: "pt-BR",
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    });
    const page = await context.newPage();

    await context.clearCookies();
    await page.goto(url, { waitUntil: "networkidle" });

    const html = await page.content();
    await browser.close();
    return html;
  } catch (error) {
    console.error("Error fetching page:", error);
    throw error;
  }
};
