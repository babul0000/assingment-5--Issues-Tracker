
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

const modalContainer = document.getElementById("modal-container")



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
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues`)
const data = await res.json();
allData = data.data;
hideLoading();
switchTab("all")
// openModal(data.data)
// search(data.data)
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
newHeader.className = "flex justify-between items-center w-full ";
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
                        <img class="w-3 h-3 " src="./assets/Ellipse 2.png" alt="">
                    <p class="font-medium text-[16px] tet-[#1F2937]">open</p>
                </div>
                <div class="flex items-center gap-1">
                <img class="w-3 h-3 " src="./assets/Ellipse 2 (1).png" alt="">
                    <p class="font-medium text-[16px] tet-[#1F2937]">closed</p>
                </div>
            </div>
`;

headerContainer.appendChild(newHeader);

    // ata diye main card gula k display te show korano hoyche 
cards.forEach(card => {

    const statusIcon = card.status === "open" ? "./assets/Open-Status.png" : "./assets/Closed-Status .png";

    
    let priorityClass = "";
    if (card.priority.toLowerCase() === "high") {
        priorityClass = "bg-[#FEECEC] text-[#EF4444]"; 
    } else if (card.priority.toLowerCase() === "medium") {
        priorityClass = "bg-[#FFF6D1] text-[#F59E0B]";
    } else {
        priorityClass = "bg-[#EEEFF2] text-[#9CA3AF]"; 
    }
    
    // card er border gula color korar jonno ay code
    const borderColor = card.status === "open" ? "border-[#22C55E]" : "border-[#8B5CF6]";


    const newBtn = document.createElement("div")
    newBtn.className = "h-full";
    newBtn.innerHTML = `
        <div onclick="handleModalOpen(${card.id})" class="p-4 flex flex-col shadow-lg h-full rounded-md border-t-4 ${borderColor} cursor-pointer hover:bg-slate-50 transition">
            
            <div class="flex justify-between items-center mb-3">
                <img src="${statusIcon}" alt="${card.status}" class="w-6 h-6">
                <h2 class="${priorityClass} px-3 py-1 rounded-xl text-[10px] font-bold uppercase">
                    ${card.priority}
                </h2>
            </div>
        
            <h2 class="font-semibold text-md mb-2 line-clamp-1">${card.title}</h2>
            <p class="line-clamp-2 text-[12px] text-[#64748B] mb-4">${card.description}</p>
        
            <div class="mt-auto">
                <hr class="border-t border-gray-200 mb-3">
                <div class="flex justify-between items-center">
                    <p class="text-[#64748B] text-[12px] font-semibold">${card.author}</p>
                    <p class="text-[#64748B] text-[12px]">${new Date(card.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    `;
    
    allCardContainer.appendChild(newBtn);
});

}

// modal section ta daynamic vabe dekhanor jonno ay function ta kora hyche
//  r atar funcon name ta display er vitore thaka all card er btn a onclick hisabe add kora hyche
function handleModalOpen(id) {
    const post = allData.find(item => item.id == id);
    if(post) {
        openModal(post); 
    }
}
// ata diye daynamic vabe modal ta display kora hyche 
function openModal(post) {


    modalContainer.showModal();
    modalContainer.innerHTML = "";

    const modalBtn = document.createElement("div");
    modalBtn.innerHTML = `
    <div class="modal-box space-y-4 w-10/12 md:w-12/12 p-7">

                <div class="" >
                    <h2 class="text-[#1F2937] text-[24px] font-bold">${post.title}</h2>
                    <div class="flex items-center space-x-3">
                        <button class="bg-[#00A96E] px-2 py-1 rounded-full text-white">${post.status}</button>
                        <p class="text-[#64748B] text-[12px] ">${post.author}</p>
                        <p class="text-[#64748B] text-[12px] ">${new Date(post.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>

                <div class="flex gap-2">
            ${post.labels?.map(label => `
                <span class="bg-[#FEECEC] text-[#EF4444] py-1 px-2 rounded-full text-[12px] font-medium border border-[#FEECEC]">
                    ${label}
                </span>
            `).join('') || ''}
        </div>
                
                <div> 
                    <p class="text-[#64748B] text-[16px] ">${post.description}</p>
                </div>

                <div class=" bg-slate-100 p-3 flex justify-center items-center shadow-sm rounded-sm">
                    <div class="flex-1">
                        <h3 class="text-[#64748B] text-[16px] ">Assignee:</h3>
                        <h3 class="text-[#1F2937] text-[16px] font-semibold">${post.assignee}</h3>
                    </div>

                    <div class="flex-1">
                        <h3 class="text-[#64748B] text-[16px]  rounded-full  font-medium ">Priority:</h3>
                        <button class="py-1 px-2 bg-[#EF4444] rounded-full text-white">${post.priority}</button>
                    </div>
                </div>


                

            <div class="modal-action">
                <form method="dialog">
                <button class="btn btn-primary">Close</button>
                </form>
            </div>
            </div>
    `;

    modalContainer.appendChild(modalBtn);

}

loadCard();

// ata diye search er kaj kora hoyche
document.getElementById("search-btn").addEventListener("click", () => {
    const input = document.getElementById("input-btn");
    const searchValue = input.value.trim().toLowerCase();

    
    const searchResult = allData.filter(item => 
        item.title.toLowerCase().includes(searchValue)
    );

    display(searchResult);
});
