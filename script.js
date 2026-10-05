let bots = [
    { name: "GPT-5.6 Sol", status: "Online", tasks: 150, profit: "$500" },
    { name: "Midjourney", status: "Online", tasks: 80, profit: "$300" },
    { name: "Claude Code 4.7 Opus", status: "Offline", tasks: 0, profit: "$500" }
];

let tableBody = document.getElementById("agentTableBody");

for (let i = 0; i < bots.length; i++) {
    let bot = bots[i];
    let statusClass = bot.status.toLowerCase();
    tableBody.innerHTML += `
        <tr>
            <td>${bot.name}</td>
            <td><span class="status-${statusClass}">${bot.status}</span></td>
            <td>${bot.tasks}</td>
            <td>${bot.profit}</td>
        </tr>
    `;
}

// ping update
function updatePing() {
    let r = Math.random();
    let ping = Math.floor(r * r * 13) + 18;
    let el = document.getElementById("pingValue");

    el.classList.remove("text-green", "text-orange", "text-red");

    if (ping <= 22) {
        el.classList.add("text-green");
    } else if (ping <= 27) {
        el.classList.add("text-orange");
    } else {
        el.classList.add("text-red");
    }

    el.textContent = ping + " ms";
}

updatePing();
setInterval(updatePing, 2000);

// theme
let themeBtn = document.getElementById("themeToggle");
let html = document.documentElement;

themeBtn.onclick = function () {
    if (html.getAttribute("data-theme") === "dark") {
        html.setAttribute("data-theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
    }
};

// lang
let langBtn = document.getElementById("langToggle");
let lang = "ru";

langBtn.onclick = function () {
    if (lang === "ru") {
        lang = "en";
        langBtn.textContent = "RU";
    } else {
        lang = "ru";
        langBtn.textContent = "EN";
    }

    let items = document.querySelectorAll("[data-ru]");
    for (let i = 0; i < items.length; i++) {
        items[i].textContent = items[i].getAttribute("data-" + lang);
    }
    
    buildSlaChart(lang);
};

// csat chart
let csatCanvas = document.getElementById("csatChart");

new Chart(csatCanvas, {
    type: "doughnut",
    data: {
        labels: ["Score", "Rest"],
        datasets: [{
            data: [97, 3],
            backgroundColor: ["#3b82f6", "rgba(148, 163, 184, 0.2)"],
            borderWidth: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "78%",
        plugins: {
            legend: { display: false }
        }
    }
});

// sla chart
let slaCanvas = document.getElementById("slaChart");
let days = {
    ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
    en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
};
let slaChart = null;

function buildSlaChart(lang) {
    if (slaChart) {
        slaChart.destroy();
    }

    let darkNow = document.documentElement.getAttribute("data-theme") === "dark";

    slaChart = new Chart(slaCanvas, {
        type: "bar",
        data: {
            labels: days[lang],
            datasets: [{
                label: "tasks",
                data: [180, 240, 195, 310, 275, 160, 220],
                backgroundColor: "#3b82f6",
                borderRadius: 8,
                barThickness: 32
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                x: {
                    ticks: { color: darkNow ? "#f8fafc" : "#0f172a" },
                    grid: { display: false }
                },
                y: {
                    ticks: { color: darkNow ? "#f8fafc" : "#0f172a" },
                    grid: { color: darkNow ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }
                }
            }
        }
    });
}

buildSlaChart(lang);
