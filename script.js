// ===============================
// SMART MARKET CALCULATOR
// SCRIPT PART - 1
// ===============================

// Inputs
const priceKg = document.getElementById("priceKg");
const weight = document.getElementById("weight");
const unit = document.getElementById("unit");

// Buttons
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");
const themeBtn = document.getElementById("themeBtn");

// Result
const totalPrice = document.getElementById("totalPrice");
const calculationText = document.getElementById("calculationText");

// Quick Weight Buttons
const quickBtns = document.querySelectorAll(".quickBtn");

// ===============================
// QUICK WEIGHT BUTTONS
// ===============================

quickBtns.forEach(button => {

    button.addEventListener("click", () => {

        weight.value = button.dataset.weight;
        unit.value = "gram";

    });

});

// ===============================
// CALCULATE PRICE
// ===============================


// ===============================
// RESET
// ===============================

resetBtn.addEventListener("click", () => {

    priceKg.value = "";
    weight.value = "";
    unit.value = "gram";

    totalPrice.innerText = "₹0.00";

    calculationText.innerText =
        "Enter values and click Calculate.";

});

// ===============================
// DARK MODE
// ===============================

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.innerText = "☀️ Light Mode";

    } else {

        themeBtn.innerText = "🌙 Dark Mode";

    }

});
// =====================================
// PART 5A
// Reverse Calculator + Shopping List +
// History (Local Storage)
// =====================================

// Reverse Calculator
const amount = document.getElementById("amount");
const reverseBtn = document.getElementById("reverseBtn");
const reverseOutput = document.getElementById("reverseOutput");

// Shopping
const itemPrice = document.getElementById("itemPrice");
const addItem = document.getElementById("addItem");
const shoppingList = document.getElementById("shoppingList");
const grandTotal = document.getElementById("grandTotal");

// History
const historyBox = document.getElementById("history");

let shoppingItems = [];

// ==============================
// HISTORY FUNCTIONS
// ==============================

function loadHistory(){

    const data = JSON.parse(localStorage.getItem("marketHistory")) || [];

    if(data.length===0){
        historyBox.innerHTML="No history available.";
        return;
    }

    historyBox.innerHTML="";

    data.forEach(item=>{

        const p=document.createElement("p");

        p.innerHTML=item;

        historyBox.appendChild(p);

    });

}

function saveHistory(text){

    let data=JSON.parse(localStorage.getItem("marketHistory")) || [];

    data.unshift(text);

    if(data.length>10){
        data.pop();
    }

    localStorage.setItem("marketHistory",JSON.stringify(data));

    loadHistory();

}

loadHistory();


// ==============================
// UPDATE CALCULATE BUTTON
// (Replace your old Calculate event)
// ==============================

calculateBtn.addEventListener("click",()=>{

    let price=parseFloat(priceKg.value);

    let qty=parseFloat(weight.value);

    if(isNaN(price)||isNaN(qty)){

        alert("Please enter valid values.");

        return;

    }

    let kgWeight;

    if(unit.value==="gram"){

        kgWeight=qty/1000;

    }else{

        kgWeight=qty;

    }

    let result=price*kgWeight;

    totalPrice.innerHTML="₹"+result.toFixed(2);

    calculationText.innerHTML=
    `${qty} ${unit.value} × ₹${price}/Kg = <b>₹${result.toFixed(2)}</b>`;

    saveHistory(
        `${qty} ${unit.value} @ ₹${price}/Kg = ₹${result.toFixed(2)}`
    );

});


// ==============================
// REVERSE CALCULATOR
// ==============================

reverseBtn.addEventListener("click",()=>{

    let total=parseFloat(amount.value);

    let price=parseFloat(priceKg.value);

    if(isNaN(total)||isNaN(price)){

        alert("Enter Amount and Price/Kg");

        return;

    }

    let kg=total/price;

    let gram=kg*1000;

    reverseOutput.innerHTML=
    `${gram.toFixed(0)} Gram <br> (${kg.toFixed(3)} Kg)`;

});


// ==============================
// SHOPPING LIST
// ==============================

function updateShopping(){

    shoppingList.innerHTML="";

    let total=0;

    shoppingItems.forEach((value,index)=>{

        total+=value;

        const li=document.createElement("li");

        li.innerHTML=`
            ₹${value.toFixed(2)}
            <button onclick="deleteItem(${index})">
            ❌
            </button>
        `;

        shoppingList.appendChild(li);

    });

    grandTotal.innerHTML="₹"+total.toFixed(2);

}

addItem.addEventListener("click",()=>{

    let value=parseFloat(itemPrice.value);

    if(isNaN(value)){

        alert("Enter Item Price");

        return;

    }

    shoppingItems.push(value);

    itemPrice.value="";

    updateShopping();

});

function deleteItem(index){

    shoppingItems.splice(index,1);

    updateShopping();

}