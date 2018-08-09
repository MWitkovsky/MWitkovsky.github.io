var rotator = (function () {
    var currentIntervals = [];

    function rotateElement (element, rotateSpeed) {
        if (!(element instanceof jQuery)) {
            element = $(element);
        }
        var currDegrees = 0;
        currentIntervals.push(setInterval(function () {
            currDegrees += rotateSpeed;
            if (currDegrees >= 360) {
                currDegrees -= 360;
            }
            element.css({'transform': 'rotate('+ currDegrees +'deg)'});
        }, 1000/60));
    }

    function clearAll () {
        currentIntervals.forEach(function (e) {
            clearInterval(e);
        });
    }

    return {
        rotateElement: rotateElement,
        clearAll: clearAll
    };
})();
