//Asset counts
var cookieCount = 0;
var grannyCount = 0;

//Asset prices
var grannyPrice = 10;


function cookieClicked(element){
    element.width = 275;
    setTimeout(function(){
        element.width = 300;
    }, 10);
    
    addToCookieCount(1);
}

function addToCookieCount(amount){
    cookieCount += amount;
    updateCookieDisplay();
}

function updateCookieDisplay(){
    $("#cookie-display").text(cookieCount);
}

function buyGranny(){
    if (cookieCount >= grannyPrice) {
        cookieCount -= grannyPrice;
        grannyPrice += 5;
        grannyCount++;
        $("#granny-display").text(grannyCount);
        $("#granny-price").text(grannyPrice);
        updateCookieDisplay();
    }
}

function calculatePassiveIncome(){
    var total = 0;
    total += grannyCount;
    addToCookieCount(total);
}


$(document).ready(function() { 
    setInterval(function(){
        calculatePassiveIncome(); 
    }, 1000);
});