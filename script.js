const botsArrow = [
  { name: "GPT-5.6 Sol", status: "Online", tasks: 150, profit: "$500" },
  { name: "Midjourney", status: "Online", tasks: 80, profit: "$300" },
  { name: "Claude Code 4.7 Opus", status: "Offline", tasks: 0, profit: "$500" }
];

function renderBots(botsArray) {
  const tableBody = document.getElementById("agentTableBody");
  tableBody.innerHTML = "";

  botsArray.forEach(bot => {
    const rowHtml = `
      <tr>
        <td>${bot.name}</td>
        <td><span class="status-${bot.status.toLowerCase()}">${bot.status}</span></td>
        <td>${bot.tasks}</td>
        <td>${bot.profit}</td>
      </tr>
    `;
    tableBody.innerHTML += rowHtml;
  });
}

renderBots(botsArrow);


function updatePing() {
  const random = Math.random();
  const ping = Math.floor(random * random * 13) + 18;
  const element = document.getElementById("pingValue");

  element.classList.remove("text-green", "text-orange", "text-red");

  if (ping <= 22) {
    element.classList.add("text-green");
  } else if (ping <= 27) {
    element.classList.add("text-orange");
  } else {
    element.classList.add("text-red");
  }

  element.textContent = ping + " ms";
}

updatePing();
setInterval(updatePing, 2000);


const themeBtn = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

themeBtn.addEventListener("click", function() {
  if (htmlElement.getAttribute("data-theme") === "dark") {
    htmlElement.setAttribute("data-theme", "light");
  } else {
    htmlElement.setAttribute("data-theme", "dark");
  }
});


let currentLang = "ru";
const langBtn = document.getElementById("langToggle");

langBtn.addEventListener("click", function() {
  if (currentLang === "ru") {
    currentLang = "en";
    langBtn.textContent = "RU";
  } else {
    currentLang = "ru";
    langBtn.textContent = "EN";
  }

  const textElements = document.querySelectorAll("[data-ru]");
  textElements.forEach(el => {
    el.textContent = el.dataset[currentLang];
  });
});
