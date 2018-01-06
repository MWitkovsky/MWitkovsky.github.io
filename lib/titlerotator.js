$(document).ready(function(){
    var title = $("title"),
        titleText = title.text(),
        fillIn = (16-(titleText.length))/2,
        i = fillIn;
    
    while (i > 0){
        titleText = "-"+titleText;
        --i;
    }
    i = fillIn;
    while (i > 0){
        titleText += "-";
        --i;
    }
    
    title.text(titleText);
    setInterval(function(){
        titleText = titleText.substr(1, titleText.length-1) + titleText[0]
        title.text(titleText);
    }, 333);
});