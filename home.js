
async function loadCard () {
const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
const data = await res.json();
console.log(data);
display(data.data)

}

const display = (cards) => {
// console.log(cards);
const allCard = document.getElementById("all-card-container")
allCard.innerHTML = "";

cards.forEach(card => {
    console.log(card);
    const newBtn = document.createElement("div")
    newBtn.innerHTML = `
    <div class="p-4 space-y-3 shadow-lg ">
            <div class="flex justify-between ">
                <img src="./assets/Open-Status.png" alt="">
                <h2 class="bg-[#FEECEC] text-[#EF4444] w-20 rounded-xl flex justify-center items-center  text-[12px] font-medium">${card.priority}</h2>
            </div>
                <h2 class="font-semibold text-md">${card.title}</h2>
                <p class="text-[12px] text-[#64748B]">${card.description}</p>

            <div class="flex gap-4">
                <h2 class="bg-[#FEECEC] text-[#EF4444]  py-2 px-4 rounded-xl flex justify-center items-center  text-[16px] font-medium">${card.id}</h2>
                <p class="bg-[#FFF8DB] text-[#D97706] px-1 rounded-xl flex justify-center items-center  text-[12px] font-medium">help wanted</p>
            </div>

            <hr>

            <div>
            <p class="text-[#64748B] text-[12px]">${card.author}</p>
                <p class="text-[#64748B] text-[12px]">${card.createdAt}</p>
            </div>
        </div>
    `;
    
    allCard.appendChild(newBtn);
});

}

loadCard();



// assignee
// : 
// "john_doe"
// author
// : 
// "comment_cathy"
// createdAt
// : 
// "2024-02-03T08:30:00Z"
// description
// : 
// "Implement a commenting system so users can discuss and collaborate on issues."
// id
// : 
// 35
// labels
// : 
// ['enhancement']
// priority
// : 
// "high"
// status
// : 
// "open"
// title
// : 
// "Add comment system for issues"
// updatedAt
// : 
// "2024-02-03T08:30:00Z"