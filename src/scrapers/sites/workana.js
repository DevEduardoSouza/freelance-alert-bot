export const workanaConfig = {
    name: "workana",
    url: "https://www.workana.com/jobs?category=it-programming&language=pt",
    projectsSelector: ".project-item.js-project:not(.project-item-featured)",
    shouldIgnoreProject: (element) => element.querySelector(".label-max") !== null,
    parseProject: (element) => ({
      title: element.querySelector("h2.project-title span span").getAttribute("title").trim(),
      date: element.querySelector("h5.date.visible-xs strong").textContent.trim(),
      budget: element.querySelector(".project-actions.floating .budget .values span").textContent.trim(),
      url: `https://www.workana.com${element.querySelector("h2.project-title span a").getAttribute("href").trim()}`,
      description: element.querySelector("div.html-desc.project-details span").innerHTML.trim().split("<br>")[0],
      nameSite: "Workana",
    }),
  };
  