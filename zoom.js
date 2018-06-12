var currentZoom = {
    "left": 50
    , "top": 50
    , "scale": 1
}

function zoomInstant(left, top, scale) {
    $("#view").css({
        "transform-origin": left + "% " + top + "%"
        , "transform": "scale(" + scale + ")"
    });
}

function zoom(newLeft, newTop, newScale, duration) {
    console.log(testMode)
    if (testMode) {
        zoomInstant(newLeft, newTop, newScale);
    }
    else {
        $(currentZoom).animate({
            "left": newLeft
            , "top": newTop
            , "scale": newScale
        }, {
            duration: duration
            , step: function () {
                zoomInstant(newLeft, newTop, this.scale);
            }
            , easing: "linear"
            , complete: function () {
                zoomInstant(newLeft, newTop, newScale);
            }
        });
    }
}