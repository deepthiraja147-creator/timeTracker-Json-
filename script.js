const container = document.querySelector(".container");

let dashboardData = [];
let currentPeriod = "daily";

fetch("data.json")
.then(response => response.json())
.then(data=>{

dashboardData = data;

createCards();

updateCards(currentPeriod);

});

function createCards(){

dashboardData.forEach(activity=>{

const card=document.createElement("div");

card.className="card";

card.innerHTML=`

<div class="card-top"
style="
background:${activity.color};
background-image:url('${activity.icon}');
background-repeat:no-repeat;
background-position:right 20px top -8px;
">
</div>

<div class="card-content">

<div class="row">

<h3>${activity.title}</h3>

<span>•••</span>

</div>

<h2 class="hours"></h2>

<p class="previous"></p>

</div>

`;

container.appendChild(card);

});

}

function updateCards(period){

const cards=document.querySelectorAll(".card");

cards.forEach((card,index)=>{

const activity=dashboardData[index];

card.querySelector(".hours").textContent=
activity.timeframes[period].current+"hrs";

let previousLabel="";

if(period==="daily") previousLabel="Yesterday";

if(period==="weekly") previousLabel="Last Week";

if(period==="monthly") previousLabel="Last Month";

card.querySelector(".previous").textContent=
`${previousLabel} - ${activity.timeframes[period].previous}hrs`;

});

}

const buttons=document.querySelectorAll(".period");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

buttons.forEach(btn=>btn.classList.remove("active"));

button.classList.add("active");

currentPeriod=button.dataset.period;

updateCards(currentPeriod);

});

});