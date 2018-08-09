$(document).ready(function () {
    var navbar = $(`
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
                <a class="navbar-brand" href="/">MWitkovsky</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul id="urls" class="nav navbar-nav">
                </ul>
            </div>
        </div>
    </nav>
    `);
    navbar.find("#urls").html(navbarModule.buildNavbarElements());
    $("body").prepend(navbar);
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
        var path = window.location.pathname.slice(0, window.location.pathname.slice(1).indexOf("/") + 2);
        if (path == url)
            return beginActiveElement + url + "\">" + name + closeElement;
        else
            return beginElement + url + "\">" + name + closeElement;
    }

    function buildNavbarElements() {
        var allNavbarElements = "";
        for (var i = 0; i < names.length; i++)
            allNavbarElements += buildNavbarElement(names[i], urls[i]) + "\n";
        return allNavbarElements;
    }

    return {
        buildNavbarElements: buildNavbarElements
    };
})();
