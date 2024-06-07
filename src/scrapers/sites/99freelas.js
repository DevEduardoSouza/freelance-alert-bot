export const freelasConfig = {
    name: "99freelas",
    url: "https://www.99freelas.com.br/projects?categoria=web-mobile-e-software",
    projectsSelector: ".with-flag.result-item:not(.destaque)",
    shouldIgnoreProject: (element) => false,
    parseProject: (element) => ({
      title: element.getAttribute("data-nome").trim(),
      date: element.querySelector(".item-text.information .datetime").textContent.trim(),
      url: `https://www.99freelas.com.br${element.querySelector(".title a").getAttribute("href").trim()}`,
      description: element.querySelector(".item-text.description.formatted-text").textContent.trim(),
      nameSite: "99freelas",
    }),
  };
  