$(document).ready(function () {
    $("#urls").html(navbarModule.buildNavbarElements());
});


var navbarModule = (function () {
    var beginElement = "<li><a href=\"";
    var beginActiveElement = "<li class=\"active\"><a href=\"";
    var closeElement = "</a></li>";

    var names = [
    "Home",
    "P5JS",
    "Phaser",
    "Unity"
    ];

    var urls = [
    "/",
    "/p5js/",
    "/phaser/",
    /unity/
    ];

    function buildNavbarElement(name, url) {
        let path = window.location.pathname.slice(0, window.location.pathname.slice(1).indexOf("/") + 2);
        if (path == url)
            return beginActiveElement + url + "\">" + name + closeElement;
        else
            return beginElement + url + "\">" + name + closeElement;
    }

    function buildNavbarElements() {
        let allNavbarElements = "";
        for (var i = 0; i < names.length; i++)
            allNavbarElements += buildNavbarElement(names[i], urls[i]) + "\n";
        return allNavbarElements;
    }

    return {
        buildNavbarElements: buildNavbarElements
    };
})();
