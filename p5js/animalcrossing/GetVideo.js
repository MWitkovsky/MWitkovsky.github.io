var autoplayArg = "?start=0?autoplay=1&loop=1&playlist=";
var baseUrl = "https://www.youtube.com/embed/"
var urls = {
    0: "As6_i8RoKP0",
    1: "M-Odurf9p84",
    2: "KXoMlIl-BDU",
    4: "CGQDIlcG6XE",
    5: "_9qtwCR4ne4",
    6: "Fa1kI36DJkg",
    7: "7KUkdsYov9o",
    8: "ABWIKf7Hpxc",
    9: "wxd56GLRxa0",
    10: "Yo54a3XNKxc",
    11: "GQ7e9AVU8jU",
    12: "_1YpXECC7MY",
    13: "Wetsvj-IdgI",
    14: "iVKIiSjbp7c",
    15: "wZZzub_WFXU",
    16: "1_7fXiXTSyo",
    17: "WUwtchWkzVc",
    18: "ujditZ3wdaM",
    19: "Dg0lkBjssZs",
    20: "9AZ-1S_o5o0",
    21: "RKPjKC8bs14",
    22: "KYjFqcTNzM0",
    23: "qw8FTCaAFSM",
};
var currentHour;

$(document).ready(function () {
    checkTime();
    setInterval("checkTime()", 1000);
});

function loadVideo(hour24){
    $("#video").attr("src", baseUrl+urls[hour24]+autoplayArg+urls[hour24]);
}

function checkTime(){
    if(new Date().getHours() != currentHour){
        currentHour = new Date().getHours();
        loadVideo(currentHour);
    }
}