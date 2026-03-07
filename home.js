
let allData = [];


const currentTab = "all";

const active = ["btn", "btn-primary"];
const inactive = ["btn", "bg-slate-100", "text-black", "px-2.5", "py-2", "shadow-md"];
const allCardContainer = document.getElementById("all-card-container")

const allContainer = document.getElementsByClassName("all-container")
const headerContainer = document.getElementById("header-container")
// const openContainer = document.getElementById("open-container")
// const closedContainer = document.getElementById("closed-container")

const loadingSpinner = document.getElementById("loading-spinner")

function switchTab(tab) {
    let filteredData = [];
    // console.log(tab);
    const tabs = ["all", "open", "close"];

    for (const ta of tabs) {
        const tabBtn = document.getElementById("btn-" + ta)
        if(tabBtn) {
            if (ta == tab) {
            
            tabBtn.classList.remove( ... inactive);
            tabBtn.classList.add( ... active);
            
        } else{
            tabBtn.classList.add( ... inactive);
            tabBtn.classList.remove( ... active);
            
            
        }
        }

        
    }
    
    if(tab === "all") {
        filteredData = allData;
        // allContainer.classList.remove("hidden");
    }else if(tab === "open") {
        // openContainer.classList.remove("hidden")
        filteredData = allData.filter(item => item.status === "open")
    }else {
        filteredData = allData.filter(item => item.status === "closed" || item.status === "close");
    }
        
    display(filteredData);
}

// switchTab(currentTab);
async function loadCard () {
    showLoading();
    // loadingSpinner.classList.remove("hidden")
    // loadingSpinner.classList.add("flex")
try {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await res.json();
allData = data.data;
hideLoading();
switchTab("all")
// loadingSpinner.classList.add("hidden");
// loadingSpinner.classList.remove("flex");
// // console.log(data);
// allData(data.data)
// display(data.data)
// display(allData)
} catch (error) {
    console.error("loading problem", error);
    hideLoading();
}
// WebGL2RenderingContext("all")

}




function showLoading() {
loadingSpinner.classList.remove("hidden")
loadingSpinner.classList.add("flex");

    allCardContainer.innerHTML = ""; 
    headerContainer.innerHTML = "";

}

function hideLoading() {
loadingSpinner.classList.add("hidden");
loadingSpinner.classList.remove("flex");
}

// api theke data niye ase display te dekhano 


// const render = (filter) => 

const display = (cards) => {

    allCardContainer.innerHTML = ""; 
    headerContainer.innerHTML = "";
// console.log(cards);
// const allCard = document.getElementById("all-card-container")
// allCard.innerHTML = "";

// const openCount = cards.filter(card => card.status === "open")
// const closeCount = cards.filter(card => card.status === "close")

// ata diye display heading ta daynamic vabe show kora hyche 

// const headerContainer = document.getElementById("header-container")
const newHeader = document.createElement("div")
newHeader.className = "flex justify-between items-center w-full";
newHeader.innerHTML = `
                <div class="flex gap-3">
                    <img class="bg-[#ECE4FF] p-1 rounded-full w-10 h-10" src="./assets/Aperture.png" alt="">
                <div>
                    <h2 class="font-semibold text-xl"><span>${cards.length}</span> Issues</h2>
                    <p class="text-[#64748B] text-sm ">Track and manage your project issues</p>
                </div>
                </div>
            <div class="md:flex gap-3">
                <div class="flex items-center gap-1">
                        <img class="w-3 h-3 " src="./assets/Ellipse 2 (1).png" alt="">
                    <p class="font-medium text-[16px] tet-[#1F2937]">open</p>
                </div>
                <div class="flex items-center gap-1">
                    <img class="w-3 h-3 " src="./assets/Ellipse 2.png" alt="">
                    <p class="font-medium text-[16px] tet-[#1F2937]">closed</p>
                </div>
            </div>
`;

headerContainer.appendChild(newHeader);

    // ata diye main card gula k display te show korano hoyche 
cards.forEach(card => {
    console.log(card);
    const newBtn = document.createElement("div")
    newBtn.innerHTML = `
    <div class="p-4 space-y-3 shadow-lg h-full">
            <div class="flex justify-between ">
                <img src="./assets/Open-Status.png" alt="">
                <h2 class="bg-[#FEECEC] text-[#EF4444] w-20 rounded-xl flex justify-center items-center  text-[12px] font-medium">${card.priority}</h2>
            </div>
                <h2 class="font-semibold text-md">${card.title}</h2>
                <p class="line-clamp-2 text-[12px] text-[#64748B]">${card.description}</p>

            <div class="flex gap-2">
                ${card.labels[0] ? ` <h2 class="bg-[#FEECEC] text-[#EF4444]  py-2 px-4 rounded-full flex justify-center items-center  text-[12px] font-medium">${card.labels[0]}</h2>` : ''}
                ${card.labels[1] ? `<p class="bg-[#FFF8D6] text-[#D97706] px-2 rounded-full flex justify-center items-center text-[12px] font-medium">${card.labels[1]}</p>` : ''}
            </div>

            <hr>

            <div>
            <p class="text-[#64748B] text-[12px]">${card.author}</p>
            <p class="text-[#64748B] text-[12px]">${new Date(card.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    `;
    
    allCardContainer.appendChild(newBtn);
});

}

loadCard();



