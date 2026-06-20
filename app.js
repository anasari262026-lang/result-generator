// =====================================
// ELEMENTS
// =====================================

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

// =====================================
// IMAGE
// =====================================

let templateImage =
new Image();

// =====================================
// START
// =====================================

window.addEventListener(
    "load",
    init
);

function init(){

    populateMarkets();

    loadTemplate();

}

// =====================================
// PASARAN
// =====================================

function populateMarkets(){

    marketSelect.innerHTML = "";

    Object.keys(MARKETS)
        .forEach(key => {

            const option =
            document.createElement("option");

            option.value = key;

            option.textContent =
            MARKETS[key].name;

            marketSelect.appendChild(
                option
            );

        });

    const selected =
    MARKETS[
        marketSelect.value
    ];

    marketNameInput.value =
    selected.name;

}

// =====================================
// LOAD TEMPLATE
// =====================================

function loadTemplate(){

    const market =
    MARKETS[
        marketSelect.value
    ];

    templateImage.onload =
    () => {

        generatePoster();

    };

    templateImage.src =
    market.template;

}

// =====================================
// GENERATE
// =====================================

function generatePoster(){

    if(
        !templateImage.complete
    ){
        return;
    }

    const marketKey =
    marketSelect.value;

    const marketConfig =
    MARKETS[
        marketKey
    ];

    const marketName =
    marketNameInput.value ||
    marketConfig.name;

    const date =
    dateInput.value ||
    "20 JUNI 2026";

    const result =
    resultInput.value ||
    "0000";

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

    // ===================
    // PASARAN
    // ===================

    ctx.save();

    ctx.textAlign =
    "center";

    ctx.fillStyle =
    marketConfig.style.marketColor;

    ctx.font =
    marketConfig.style.marketFont;

    ctx.fillText(
        marketName,
        marketConfig.position.marketX,
        marketConfig.position.marketY
    );

    ctx.restore();

    // ===================
    // DATE
    // ===================

    ctx.save();

    ctx.textAlign =
    "center";

    ctx.fillStyle =
    marketConfig.style.dateColor;

    ctx.font =
    marketConfig.style.dateFont;

    ctx.fillText(
        date,
        marketConfig.position.dateX,
        marketConfig.position.dateY
    );

    ctx.restore();

    // ===================
    // RESULT
    // ===================

    ctx.save();

    ctx.textAlign =
    "center";

    ctx.fillStyle =
    marketConfig.style.resultColor;

    ctx.strokeStyle =
    "#000";

    ctx.lineWidth =
    8;

    ctx.font =
    marketConfig.style.resultFont;

    ctx.strokeText(
        result,
        marketConfig.position.resultX,
        marketConfig.position.resultY
    );

    ctx.fillText(
        result,
        marketConfig.position.resultX,
        marketConfig.position.resultY
    );

    ctx.restore();

    updateStatus();

}

// =====================================
// STATUS
// =====================================

function updateStatus(){

    liveMarket.innerText =
    marketNameInput.value;

    liveResult.innerText =
    resultInput.value;

    liveDate.innerText =
    dateInput.value;

    lastUpdate.innerText =
    new Date()
    .toLocaleTimeString(
        "id-ID"
    );

}

// =====================================
// DOWNLOAD
// =====================================

function downloadPoster(){

    const market =
    marketSelect.value;

    const result =
    resultInput.value || "0000";

    const link =
    document.createElement("a");

    link.download =
    `${market}-${result}.jpg`;

    link.href =
    canvas.toDataURL(
        "image/jpeg",
        1
    );

    document.body.appendChild(
        link
    );

    link.click();

    document.body.removeChild(
        link
    );

}

// =====================================
// FETCH RESULT
// =====================================

function fetchResult(){

    alert(
        "Realtime API belum dihubungkan.\nTahap berikutnya kita buat API EdgeOne."
    );

}

// =====================================
// EVENTS
// =====================================

marketSelect.addEventListener(
    "change",
    () => {

        const market =
        MARKETS[
            marketSelect.value
        ];

        marketNameInput.value =
        market.name;

        loadTemplate();

    }
);

generateBtn.addEventListener(
    "click",
    generatePoster
);

downloadBtn.addEventListener(
    "click",
    downloadPoster
);

fetchBtn.addEventListener(
    "click",
    fetchResult
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