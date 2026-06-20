// ======================================
// MARKETS
// ======================================

const MARKETS = {

    california: {
        name: "CALIFORNIA",
        template: "assets/california-template.jpg",

        position: {
            marketX: 540,
            marketY: 240,

            dateX: 540,
            dateY: 330,

            resultX: 540,
            resultY: 620
        },

        style: {
            marketColor: "#e3a729",
            dateColor: "#ebb427",
            resultColor: "#ffea00",

            marketFont: "bold 96px Arial",
            dateFont: "bold 46px Arial",
            resultFont: "bold 205px Verdana"
        }
    }

};

// ======================================
// ELEMENTS
// ======================================

const canvas =
document.getElementById("posterCanvas");

const ctx =
canvas.getContext("2d");

const marketSelect =
document.getElementById("marketSelect");

const marketNameInput =
document.getElementById("marketName");

const dateInput =
document.getElementById("dateInput");

const resultInput =
document.getElementById("resultInput");

const fetchBtn =
document.getElementById("fetchBtn");

const generateBtn =
document.getElementById("generateBtn");

const downloadBtn =
document.getElementById("downloadBtn");

const liveMarket =
document.getElementById("liveMarket");

const liveResult =
document.getElementById("liveResult");

const liveDate =
document.getElementById("liveDate");

const lastUpdate =
document.getElementById("lastUpdate");

let templateImage =
new Image();

// ======================================
// INIT
// ======================================

window.onload = () => {

    populateMarkets();

    loadTemplate();

};

// ======================================
// PASARAN
// ======================================

function populateMarkets() {

    marketSelect.innerHTML = "";

    Object.keys(MARKETS)
        .forEach(key => {

            const option =
            document.createElement("option");

            option.value = key;

            option.textContent =
            MARKETS[key].name;

            marketSelect.appendChild(option);

        });

    marketNameInput.value =
    MARKETS[
        marketSelect.value
    ].name;

}

// ======================================
// TEMPLATE
// ======================================

function loadTemplate() {

    const market =
    marketSelect.value;

    templateImage.onload =
    generatePoster;

    templateImage.src =
    MARKETS[market].template;

}

// ======================================
// GENERATE
// ======================================

function generatePoster() {

    if(!templateImage.complete) return;

    const market =
    MARKETS[
        marketSelect.value
    ];

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.drawImage(
        templateImage,
        0,
        0,
        canvas.width,
        canvas.height
    );

    const marketName =
    marketNameInput.value ||
    market.name;

    const date =
    dateInput.value ||
    "20 JUNI 2026";

    const result =
    resultInput.value ||
    "0000";

    // PASARAN

    ctx.textAlign = "center";

    ctx.fillStyle =
    market.style.marketColor;

    ctx.font =
    market.style.marketFont;

    ctx.fillText(
        marketName,
        market.position.marketX,
        market.position.marketY
    );

    // DATE

    ctx.fillStyle =
    market.style.dateColor;

    ctx.font =
    market.style.dateFont;

    ctx.fillText(
        date,
        market.position.dateX,
        market.position.dateY
    );

    // RESULT

    ctx.fillStyle =
    market.style.resultColor;

    ctx.strokeStyle =
    "#000";

    ctx.lineWidth = 8;

    ctx.font =
    market.style.resultFont;

    ctx.strokeText(
        result,
        market.position.resultX,
        market.position.resultY
    );

    ctx.fillText(
        result,
        market.position.resultX,
        market.position.resultY
    );

    updateStatus();

}

// ======================================
// STATUS
// ======================================

function updateStatus() {

    liveMarket.innerText =
    marketNameInput.value;

    liveResult.innerText =
    resultInput.value || "-";

    liveDate.innerText =
    dateInput.value || "-";

    lastUpdate.innerText =
    new Date()
    .toLocaleTimeString("id-ID");

}

// ======================================
// DOWNLOAD
// ======================================

function downloadPoster() {

    const link =
    document.createElement("a");

    link.download =
    "california-result.jpg";

    link.href =
    canvas.toDataURL(
        "image/jpeg",
        1
    );

    link.click();

}

// ======================================
// EVENTS
// ======================================

generateBtn.addEventListener(
    "click",
    generatePoster
);

downloadBtn.addEventListener(
    "click",
    downloadPoster
);

marketSelect.addEventListener(
    "change",
    () => {

        marketNameInput.value =
        MARKETS[
            marketSelect.value
        ].name;

        loadTemplate();

    }
);

marketNameInput.addEventListener(
    "input",
    generatePoster
);

dateInput.addEventListener(
    "input",
    generatePoster
);

resultInput.addEventListener(
    "input",
    generatePoster
);
