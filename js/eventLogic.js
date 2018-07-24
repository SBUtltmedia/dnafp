// Clicky stuff here
var isAdminVar;
var hash = location.hash.split("#")[1];

if (hash) {
    testMode = true;
}
var criteriaPassed;
var sideTipMoveSpeed = 0.6;
var directionsForSideTipMovement = [[1, 0], [0, 1], [-1, 0], [0, -1]]
var gameStarted = false;
var start = new Date;
var score = 0;
var voltage = 0;
var answer = Math.floor(Math.random() * 6 + 3);
var tip = 0;
var timeInWell;
var wellTop = [55, 57.9, 60.3, 62.6, 65, 67.1, 69.3]
var tipBoxTop = [1, 2, 3, 4, 5, 6, 7]

var microtubeAnimation = [{
    target: "Tube",
    name: "anim_moveTube"
}, {
    target: "Cap",
    name: "anim_rotateCap"
}, {
    target: "Cap",
    name: "anim_closeCap"
}, {
    target: "Tube",
    name: "anim_flickTube"
}, {
    target: "Tube",
    name: "anim_tapTube"
}, {
    target: "Tube",
    name: "anim_tubeDown"
}]
//var loadingDyeAnimation = [{
//    target: "Tube"
//    , name: "anim_moveLoadingDye1"
//}, {
//    target: "Cap"
//    , name: "anim_rotateCap"
//}, {
//    target: "Cap"
//    , name: "anim_closeCap"
//}, {
//    target: "Tube"
//    , name: "anim_returnLoadingDye1"
//}]
var pipetteAnimation = [{
    name: "anim_pipetToTube1"
}, {
    name: "anim_pipetToTube2"
}, {
    name: "anim_pipetToTube3"
}, {
    name: "anim_pipetToTube4"
}, {
    name: "anim_pipetToTube5"
}, {
    name: "anim_pipetToTube6"
}]
var tipAnimation = [{
    name: "anim_tipToTube1"
}, {
    name: "anim_tipToTube2"
}, {
    name: "anim_tipToTube3"
}, {
    name: "anim_tipToTube4"
}, {
    name: "anim_tipToTube5"
}, {
    name: "anim_tipToTube6"
}]
var destinationTube = [{
    name: "s0"
}, {
    name: "s1"
}, {
    name: "s2"
}, {
    name: "s3"
}, {
    name: "s4"
}, {
    name: "s5"
}]
//var flickAnimation = [{
//        name: "anim_flickTube"
//}]
//var microtubeState = [0, 0, 0, 0, 0, 0];
var state = {
    firstStep: 23,
    buttonPress: [0, 0, 0, 0, 0, 0],
    microtubeState: [0, 0, 0, 0, 0, 0],
    TipPosition: false
};
var tubeClicks = [0, 0, 0, 0, 0, 0];
//var loadingDyeState = [0];
var pipetteState = [0, 0, 0];
var tips = [18.2, 19, 19.8, 20.6, 21.4, 22.2, 23, 24.8, 25.6, 26.4, 26.8, 27.3]
//var breach = false;
var breach = false;
$(function () {
    loadSVG();
    $('#tipSide').draggable();
    $('#gelWellBoundary').droppable({tolerance: "touch"});
    
//    
//    $.get("img/gelWithLane.svg", function (data) {
//        console.log(data)
//        $("#gelFinalTop").html(new XMLSerializer().serializeToString(data.documentElement));
//    })

                 enableOptionButtons();
    // Resize window on page load to ensure proper sizing of elements
    resizeWindow();
    //makePipetteTipAnimation();
    // Create event listeners for menu button clicks and start game
    $(document).keydown(function (objEvent) {
        if (objEvent.keyCode == 9) { //tab pressed
            objEvent.preventDefault(); // stops its action
        }
    });
    $.ajax({
        url: "info.php",
        dataType: "json"
    }).done(function (data) {
        netID = data.name;
        firstName = data.firstname;
        getStudentData = data.studentData;
        userNetID = data.name;
        isAdminVar = data.isAdmin;
        // Special Case
        studentData = getStudentData;
        stats = data.stats;
        getAllData();
        enableOptionButtons();
    }).fail(function () {
        newStudentData();
        continueLoading();
    });
animate("#indicatorArrow1", 50, "removeClass", "opClass")
});




function enableOptionButtons() {
    $("#endOption1").click(function () {
        if (!gameStarted) {
            gameStarted = true;
            // When menu button 1 is clicked
            props = {
                "mode": 1
            }
            newGame(props);
            //
            //
            $("#indicatorArrow1").addClass("anim_oscillate1");
            //            $("#indicatorArrow1").delay(delayFactor * 550).animate({
            //                opacity: '1.0'
            //            });
        }
    });
    $("#endOption2").click(function () {
        if (!gameStarted) {
            // When menu button 2 is clicked
            if (studentData.unlocks[0] || UNLOCK_EVERYTHING) {
                gameStarted = true;
                props = {
                    "mode": 2
                }
                newGame(props);
            }
        }
    });
    $("#endOption3").click(function () {
        if (!gameStarted) {
            // When menu button 3 is clicked
            if ((studentData.unlocks[1] || UNLOCK_EVERYTHING) && false) {
                gameStarted = true;
                props = {
                    "mode": 3
                }
                newGame(props);
            }
        }
    });
}

function getDate() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    if (s < 10) {
        s = "0" + s;
    }
    $("h1").text(h + " : " + m + " : " + s);
    setTimeout(function () {
        getDate()
    }, 500);
};
//Monitor game score
function updateScore(amount) {
    score += amount;
}
//Change voltage
function updateVoltage(amount) {
    voltage += amount;
}

function tipSelect(number) {
    tip += number;
}
//$("html").on("keydown", function (evt) {
//    var arrayIndex = evt.keyCode - 37;
//    if (arrayIndex > -1 && arrayIndex < 4) moveTipSide(directionsForSideTipMovement[arrayIndex])
//})
//function moveTipSide(direction) {
//   
//        breach = false;
//        var sideViewWidth = parseFloat($('#sideView').css("width"));
//        var sideViewHeight = parseFloat($('#sideView').css("height"));
//        //
//        var currentTop = parseFloat($('#tipSide').css("top")) / sideViewHeight * 100;
//        var currentLeft = parseFloat($('#tipSide').css("left")) / sideViewWidth * 100;
//        //var currentTop=parseFloat($('#tipSide').css("top"))/100
//        //var currentLeft=parseFloat($('#tipSide').css("left"))
//        var newLeft = Math.min(90, Math.max(0, (currentLeft - direction[0] * sideTipMoveSpeed)))
//        var newTop = Math.min(60, Math.max(0, (currentTop - direction[1] * sideTipMoveSpeed)))
//        var checkTop = betterParseInt(newTop);
//        var checkLeft = betterParseInt(newLeft);
//        $('#tipSide').css("left", newLeft + "%")
//        $('#tipSide').css("top", newTop + "%")
//        //return [newLeft,newTop]
//        var wellDepth = parseFloat($('#gelWellBoundary').css("height"));
//        var wellWidth = parseFloat($('#gelWellBoundary').css("width"));
//        var date = new Date();
//        if (checkTop > 7) {
//            if (!timeInWell) {
//                timeInWell = Date.now();
//                pollTip()
//            }
//            //
//            if (checkTop > 18 || checkLeft > 43 || checkLeft < 23.5) {
//                breach = true;
//                $('#tipSide').css("top", "0" + "%")
//                //
//                timeInWell = null;
//                message("Make sure the tip stays within the well!")
//       
//        }
//    }
//}
//
//function pollTip() {
//    if (Date.now() - timeInWell < 2500) {
//        if (!breach) window.requestAnimationFrame(pollTip);
//    } else if (!breach) {
//        // game.nextStep();
//        updateScore(10);
//        timeInWell = null;
//    }
//}

function continueLoading() {
    for (var i = 1; i <= 3; i++) {
        initEndOptionHover(i);
    }
    for (var i = 1; i <= 3; i++) {
        itemHover(i);
    }

    $("#headerText").bind("DOMSubtreeModified", function () {
        $("#headerText").animate({
            opacity: '0.3'
        });
        $("#headerText").delay(50).animate({
            opacity: '1.0'
        });
        animate("#headerText", 50, "removeClass", "opClass")
    });

    var volumeButton = document.getElementById("volumeButton");
/*    $(".tip").on("click",function (evt) {
        var tipNum = betterParseInt(evt.target.id);
        var tipLeft = tips[(tipNum - 1)];
        makePipetteTipAnimation(tipLeft);
    });*/

    //
    //Back button in progress
    //
    var goBack = localStorage.setItem("backCount", 0)
    var current = window.location.href.split("#")[0]
    $("#backButton").click(function () {
        var hash = "#"
        var prevStep = game.getPreviousStep().id
        var tag = hash + prevStep
        var back = current + tag
        console.log(game.getPreviousStep().id)
        localStorage.setItem('url', back)
        window.location.href = localStorage.getItem('url')
        var backNum = parseInt(localStorage.getItem('backCount'))
        backNum++;
        console.log(backNum)
        localStorage.setItem("backCount", backNum)
        document.location.reload();

    });
    //Step 17
    //$("#waterBathLid").click();
    //Step 18
    var timerButton = document.getElementById("timerButton");
    //Step 20
    //$(".tip").click();
    //Step 21
    var volumeButton1 = document.getElementById("volumeButton1");
    //$("button").click();
    //Step 22
    //$("#micropipet3").click();
    //Step 23
    //$("#mixContentsButton1").click();
    $("#zoomOutButton1a").click(function () {
        zoom(50, 50, 1, 1000)
        $("#zoomOutButton1a").animate({
            opacity: '0.0'
        });
    });
//    $("#zoomOutButton1").click(function () {
//        zoom(50, 50, 1, 1000)
//        $("#zoomOutButton1").animate({
//            opacity: '0.0'
//        });
//    });
    $("#csTop").click(function () {
        if ((game.getCurrentStep().id == "takeCS")) {
            $("#micropipetTopView").animate({
                "left": '36.5%',
                "top": '21.5%'
            });
            // game.nextStep();
            updateScore(10);
        }
    });
    $("#s1Top").click(function () {
        if ((game.getCurrentStep().id == "takeS1")) {
            $("#micropipetTopView").animate({
                "left": '36.5%',
                "top": '26%'
            });
            // game.nextStep();
            updateScore(10);
        }
    });
    $("#s2Top").click(function () {
        if ((game.getCurrentStep().id == "takeS2")) {
            $("#micropipetTopView").animate({
                "left": '36.5%',
                "top": '30.5%'
            });
            // game.nextStep();
            updateScore(10);
        }
    });
    $("#s3Top").click(function () {
        if ((game.getCurrentStep().id == "takeS3")) {
            $("#micropipetTopView").animate({
                "left": '36.5%',
                "top": '35%'
            });
            // game.nextStep();
            updateScore(10);
        }
    });
    $("#s4Top").click(function () {
        if ((game.getCurrentStep().id == "takeS4")) {
            $("#micropipetTopView").animate({
                "left": '36.5%',
                "top": '39.5%'
            });
            // game.nextStep();
            updateScore(10);
        }
    });
    $("#s5Top").click(function () {
        if ((game.getCurrentStep().id == "takeS5")) {
            $("#micropipetTopView").animate({
                "left": '36.5%',
                "top": '44%'
            });
            // game.nextStep();
            updateScore(10);
        }
    });
    $("#zoomOutButton2").click(function () {
        if ((game.getCurrentStep().id == "stainGel")) {
            $(".side").addClass("anim_toTopView2")
            $(".topView").addClass("anim_toTopView2")
            $(".holderTop").addClass("anim_toTopView2")
            $("day1").addClass("anim_toTopView2")
            $("#zoomOutButton2").animate({
                opacity: '0.0'
            });
            $(".day2").attr("class", " anim_toFrontView");
        }
    });
    $("#zoomOutButton3").click(function () {
        zoom(50, 50, 1, 100)
        $("#zoomOutButton3").animate({
            opacity: '0.0'
        });
    });
    var answerButton = document.getElementById("answerButton");
    $("#arrowUp").click(function () {
        message("Incorrect. Please ensure the wells of the gel are on the cathode (-) side.")
        updateScore(-10);
    });
    $("#micropipet0").click(function () {
        $("#micropipet0").addClass("anim_movePipet");
    });

   ['#pressButton_0',
   '#pressButton_1',
   '#pressButton_2',
   '#pressButton_3',
   '#pressButton_4',
   '#pressButton_5',
   '#zoomOutButton',
   '#zoomOutButton1',
   '#indicatorArrow0',
   '#indicatorArrow1',
   '#indicatorArrow2',
   '#indicatorArrow3',
   '#indicatorArrow4',
   '#indicatorArrow5',
   '#indicatorArrow6',
   '#volumeButton',
   '#volumeInput',
   '#tubeContentMixing2',
   '#tubeContentMixing3',
   '.side',
   '#timerButton',
   '#timer',
   '#powerSupply',
   '#powerSupplyUp',
   '#powerSupplyDown',
   '#voltage',
   '#gelSideView',
   '#arrowUp',
   '#arrowDown',
   '#labBenchTop',
   '#gelTopView',
   '#powerSupplyTop',
   '#lidSide',
   '#gelTrayTop',
   '#gelFinalTop',
   '#micropipetTopView',
   '#wasteBinTop',
   '#lidBox',
   '#zoomOutButton2',
   '#zoomOutButton3',
   '#emptyGraduatedCylinder',
   '#stainedGelContainer',
   '#stainingTray',
   '#tipBoxTop',
   '#gelVoltageCover',
   '#volumeButton1',
   '#volumeInput1',
   '#tip',
   '#pipetteTip1',
   '#gel',
   '#answerButton',
   '#answerInput',
   '#tubeContentMixing4',
   '#volumeButton2',
   '#zoomOutButton1a',
   '.holderTop',
   '.day2'].forEach(function(item){
       
       $(item).addClass("opClass")
       
   })
    loadStartMenu();
}

function itemLabel() {}

function spinElement(id) {
    $(id).addClass("anim_littleSpin");
    setTimeout(function () {
        $(id).removeClass("anim_littleSpin");
    }, 1000);
}

function newStudentData(netID) {
    // New student data object
    studentData = {
        "netID": netID,
        "gameRecord": [],
        "highScores ": [0, 0, 0],
        "unlocks": [false, false, false]
    };
}
/*
    Post data to the server!
    ALL HAIL KING SERVER
*/
function postData() {
    str = JSON.stringify(["finished"]);
    // var str = JSON.stringify(studentData);
    // var str2 = JSON.stringify(stats);
    $.ajax({
        type: "POST",
        url: "writer.php",
        data: {
            'studentData': str
            //    , 'stats': str2
        }
    }).done(function (msg) {}).fail(function () {});
}

function isAdmin(name) {
    return isAdminVar;
}

function initEndOptionHover(id) {
    $("#endOption" + id).hover(function () {
        // Mouse over cell
        $("#endOptionDesc" + id).removeClass("anim_exitEndOptionDesc");
        $("#endOptionDesc" + id).addClass("anim_enterEndOptionDesc");
    }, function () {
        // Leave cell
        $("#endOptionDesc" + id).removeClass("anim_enterEndOptionDesc");
        $("#endOptionDesc" + id).addClass("anim_exitEndOptionDesc");
    });
}

function itemHover(evt) {
    var id = betterParseInt(evt.target.id)
    $("#itemLabel" + id).hover(function () {
        // Mouse over cell
        $("#itemButton" + id).removeClass("anim_exitEndOptionDesc");
        $("#itemButton" + id).addClass("anim_enterEndOptionDesc");
    }, function () {
        // Leave cell
        $("#itemButton" + id).removeClass("anim_enterEndOptionDesc");
        $("#itemButton" + id).addClass("anim_exitEndOptionDesc");
    });
}
// Better than parseInt() in that it detects the first integer in a string even if it starts with something that is not a number.  Still returns NaN if no integers are found.
function betterParseInt(s) {
    var str = s + "";
    while (isNaN(parseInt(str)) && str.length > 0) {
        str = str.substring(1, str.length);
    }
    return parseInt(str);
}

function getAllData() {
    $.ajax({
        url: "info_allScores.php",
        dataType: "json"
    }).done(function (data) {
        allData = data;
        continueLoading();
    }).fail(function () {});
}

function enableClicks(bool) {
    if (bool) {
        $("body").css("pointer-events", "auto");
    } else {
        $("body").css("pointer-events", "none");
    }
}


function makePipetteTipAnimation(tipLocation) {
        
$.keyframe.define([{ name:'addTip1',        
     '0%':{
        left: '14.5%',
        top: '52%',
},
    '8%':{
        left: '14.5%',
        top: '44%',
},
    '14%':{
        left:tipLocation+"%",
        top: '44%',
},
    '20%':{
        left: tipLocation+"%",
        top: '47.6%',
},
    '25%':{
        left: tipLocation+"%",
        top: '42%',
},                
    '90%':{
        left: '86.4%',
        top: '28%',
},
    '100%':{
        left: '86.4%',
        top: '28%',
},
},])
}

function makePipetteTippAnimation(tipLocation) {
        
$.keyframe.define([{ name:'addTipp1',        
     '0%':{
        left: '14.5%',
        top: '52%',
},
    '8%':{
        left: '14.5%',
        top: '44%',
},
    '14%':{
        left:tipLocation+"%",
        top: '44%',
},
    '20%':{
        left: tipLocation+"%",
        top: '47.6%',
},
    '25%':{
        left: tipLocation+"%",
        top: '42%',
},                
    '90%':{
        left: '20.9%',
        top: '1%',
        transform: "scale(0.8)"
},
    '100%':{
        left: '20.9%',
        top: '5.4%',
},
},])
}

//===============TRYING TO MAKE SOME KEYFRAMES
/*
function makeArrowOscillatingUp(objectLeft,obejectTop) {

$.keyframe.define([{ name:'oscillateUp',
     '0%':{
        left: objectLeft+"%",
        top: (objectTop + 4) + "%",
},
    '50%':{
        left: objectLeft+"%",
        top: (objectTop + 9) + "%",
},
    '100%':{
        left: objectLeft+"%",
        top: (objectTop + 4) + "%",
},
},])
}

function makeArrowOscillatingDown(objectLeft,obejectTop) {

$.keyframe.define([{ name:'oscillateUp',
     '0%':{
        left: objectLeft+"%",
        top: (objectTop - 4) + "%",
},
    '50%':{
        left: objectLeft+"%",
        top: (objectTop - 9) + "%",
},
    '100%':{
        left: objectLeft+"%",
        top: (objectTop - 4) + "%",
},
},])
}
=====================================*/

//function findTipLeft(evt) {
//    var tipNum = betterParseInt(evt.target.id);
//    var tipLeft = tips[tipNum];
//    return tipLeft;
//
//}
function setLane(laneNum, weightArray) {
    weightArray.forEach(function (val, idx) {
        $("#gel svg #Lane" + laneNum + " #weight" + idx).attr('transform', 'translate(0 ' + val[0] + ') scale(1, ' + val[1] + ')');
    })
}
for (var i = 1; i <= 20; i++) {
    itemHover(i);
}

function itemHover(i) {
    $("#itemLabel" + i).hover(function () {
        $("#itemLabel" + i).removeClass("anim_quickFadeOut");
        $("#itemLabel" + i).addClass("anim_quickFadeIn");
    }, function () {
        $("#itemLabel" + i).removeClass("anim_quickFadeIn");
        $("#itemLabel" + i).addClass("anim_quickFadeOut");
    });
}

function displayVoltageCover() {
    $("#gelVoltageCover").animate({
        opacity: '1.0'
    });
    $("#powerSupplyUp").animate({
        opacity: '1.0'
    });
    $("#powerSupplyDown").animate({
        opacity: '1.0'
    });
    $("#gelVoltageCover").css('zIndex', '5000');
}
