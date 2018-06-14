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
    microtubeState: [0, 0, 0, 0, 0, 0]
};
var tubeClicks = [0, 0, 0, 0, 0, 0];
//var loadingDyeState = [0];
var pipetteState = [0, 0, 0];
var tips = [18.2, 19, 19.8, 20.6, 21.4, 22.2, 23, 24.8, 25.6, 26.4, 26.8, 27.3]
//var breach = false;
var breach = false;
$(function () {
    loadSVG();
    $('#mainStyle').load("style.css",function(){
        if(testMode){ 
        var mainStyle=  $('#mainStyle').html()
    //console.log(mainStyle)  
          
    mainSplit=mainStyle.split(hash);
        
     mainSplit[0] =  mainSplit[0].replace(/(animation: )([^ ]*) ([^ ]*) (.*)/g,"$1$2 0s $4");
    // mainSplit[0] =  mainSplit[0].replace(/(zoom: )([^ ]*) ([^ ]*) (.*)/g,"$1$2 0s $4");
        
      $('#mainStyle').html(mainSplit[0]+hash+mainSplit[1]); 
        }
        })

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
function moveTipSide(direction) {
    if (game.getCurrentStep().id == "insertTip") {
        breach = false;
        var sideViewWidth = parseFloat($('#sideView').css("width"));
        var sideViewHeight = parseFloat($('#sideView').css("height"));
        //
        var currentTop = parseFloat($('#tipSide').css("top")) / sideViewHeight * 100;
        var currentLeft = parseFloat($('#tipSide').css("left")) / sideViewWidth * 100;
        //var currentTop=parseFloat($('#tipSide').css("top"))/100  
        //var currentLeft=parseFloat($('#tipSide').css("left"))  
        var newLeft = Math.min(90, Math.max(0, (currentLeft - direction[0] * sideTipMoveSpeed)))
        var newTop = Math.min(60, Math.max(0, (currentTop - direction[1] * sideTipMoveSpeed)))
        var checkTop = betterParseInt(newTop);
        var checkLeft = betterParseInt(newLeft);
        $('#tipSide').css("left", newLeft + "%")
        $('#tipSide').css("top", newTop + "%")
        //return [newLeft,newTop] 
        var wellDepth = parseFloat($('#gelWellBoundary').css("height"));
        var wellWidth = parseFloat($('#gelWellBoundary').css("width"));
        var date = new Date();
        if (checkTop > 7) {
            if (!timeInWell) {
                timeInWell = Date.now();
                pollTip()
            }
            //
            if (checkTop > 18 || checkLeft > 43 || checkLeft < 23.5) {
                breach = true;
                $('#tipSide').css("top", "0" + "%")
                //
                timeInWell = null;
                message("Make sure the tip stays within the well!")
            }
        }
    }
}

function pollTip() {
    if (Date.now() - timeInWell < 2500) {
        if (!breach) window.requestAnimationFrame(pollTip);
    } else if (!breach) {
        // game.nextStep();
        updateScore(10);
        timeInWell = null;
    }
}

function continueLoading() {
    for (var i = 1; i <= 3; i++) {
        initEndOptionHover(i);
    }
    for (var i = 1; i <= 3; i++) {
        itemHover(i);
    }
    // Prep challenges
    //    if (gameStarted = true) {
    //        $("#indicatorArrow1").addClass("anim_oscillate");
    //        $("#indicatorArrow1").delay(delayFactor*950).animate({
    //            opacity: '1.0'
    //        });
    //    };
    $("#headerText").bind("DOMSubtreeModified", function () {
        $("#headerText").animate({
            opacity: '0.3'
        });
        $("#headerText").delay(50).animate({
            opacity: '1.0'
        });
        animate("#headerText", 50, "removeClass", "opClass")
    });
    //    $(".tip").click(function () {
    //        var tipNum = betterParseInt(evt.target.id);
    //        var tipLeft = tips[tipNum];
    //        return tipLeft;
    //        
    //    });
    var volumeButton = document.getElementById("volumeButton");
    //Step 0
    //    $("#enzTube").hover(function () {
    //        $("#enzTube").addClass("anim_moveEnz");
    //        //        $("#indicatorArrow1").delay(delayFactor * 50).animate({
    //        //            opacity: '0.0'
    //        //        });
    //        animate("#indicatorArrow1", 50, "addClass", "opClass")
    //    });
    $(".tip").click(function (evt) {
        var tipNum = betterParseInt(evt.target.id);
        var tipLeft = tips[(tipNum - 1)];
        makePipetteTipAnimation(tipLeft);
    });
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
    //Step 1
    //Step 2
    //Step 3
    //Step 5
    //$("#micropipet2").click();
    //Step 6
    //$("#mixContentsButton").click();
    //Step 7
    //$("#ejectButton").click();
    //    $(".microTube").click(function (evt) {
    //        
    //        //Step 4, 7, 8, 9, 10, 11
    //        if ((game.getCurrentStep().id == "openTube") || (game.getCurrentStep().id == "closeTube") || (game.getCurrentStep().id == "flickTube") || (game.getCurrentStep().id == "tapTube") || (game.getCurrentStep().id == "tubeRack")) {
    //            var tubeIdName = evt.target.id.split("TubeBody")[0]
    //            var tubeNum = parseInt(tubeIdName.split('')[1])
    //            var currentAnimation = microtubeAnimation[microtubeState[tubeNum]]
    //            
    //            var selector = "#" + tubeIdName + currentAnimation.target;
    //            $.each(microtubeAnimation, function (index, value) {
    //                $(selector).removeClass(value.name)
    //            })
    //            
    //            $(selector).addClass(currentAnimation.name)
    //            //$("#s0Cap1").addClass("anim_rotateCap");
    //            microtubeState[tubeNum]++
    //                microtubeState[tubeNum] %= microtubeAnimation.length;
    //            
    //            if (microtubeState[tubeNum] != 1) {
    //                //game.nextStep();
    //                updateScore(10);
    //                
    //            }
    //        }
    //    });
    //
    //
    //
    //    $(".microTube").click(function (evt) {
    //        //Step 4, 7, 8, 9, 10, 11
    //        if ((game.getCurrentStep().id == "openTube1") || (game.getCurrentStep().id == "closeTube1") || (game.getCurrentStep().id == "flickTube1") || (game.getCurrentStep().id == "tapTube1") || (game.getCurrentStep().id == "tubeRack1")) {
    //            var tubeIdName = evt.target.id.split("TubeBody")[0]
    //            var tubeNum = parseInt(tubeIdName.split('')[1])
    //            var currentAnimation = microtubeAnimation[microtubeState[tubeNum]]
    //            var selector = "#" + tubeIdName + currentAnimation.target + "1";
    //            $.each(microtubeAnimation, function (index, value) {
    //                $(selector).removeClass(value.name)
    //            })
    //            $(selector).addClass(currentAnimation.name)
    //            //$("#s0Cap1").addClass("anim_rotateCap");
    //            microtubeState[tubeNum]++
    //                microtubeState[tubeNum] %= microtubeAnimation.length;
    //            
    //            if (microtubeState[tubeNum] != 1) {
    //                // game.nextStep();
    //                updateScore(10);
    //                
    //            }
    //        }
    //    });
    //Step12
    $("#tubeBlock").click(function () {
        if (game.getCurrentStep().id != "pressTube") {
            updateScore(-10);
        }
        if (game.getCurrentStep().id == "pressTube") {
            $("#s0Tube").attr("class", "microTube anim_tube0ToBath");
            $("#s1Tube").attr("class", "microTube anim_tube1ToBath");
            $("#s2Tube").attr("class", "microTube anim_tube2ToBath");
            $("#s3Tube").attr("class", "microTube anim_tube3ToBath");
            $("#s4Tube").attr("class", "microTube anim_tube4ToBath");
            $("#s5Tube").attr("class", "microTube anim_tube5ToBath");
            $("#tubeBlock").addClass("anim_moveBlock");
            //            $("#pressButton0").delay(delayFactor * 950).animate({
            //                opacity: '1.0'
            //            });
            animate("#pressButton0", 950, "removeClass", "opClass")
            //            $("#pressButton1").delay(delayFactor * 950).animate({
            //                opacity: '1.0'
            //            });
            animate("#pressButton1", 950, "removeClass", "opClass")
            //            $("#pressButton2").delay(delayFactor * 950).animate({
            //                opacity: '1.0'
            //            });
            animate("#pressButton2", 950, "removeClass", "opClass")
            //            $("#pressButton3").delay(delayFactor * 950).animate({
            //                opacity: '1.0'
            //            });
            animate("#pressButton3", 950, "removeClass", "opClass")
            //            $("#pressButton4").delay(delayFactor * 950).animate({
            //                opacity: '1.0'
            //            });
            animate("#pressButton4", 950, "removeClass", "opClass")
            //            $("#pressButton5").delay(delayFactor * 950).animate({
            //                opacity: '1.0'
            //            });
            animate("#pressButton5", 950, "removeClass", "opClass")
        }
    });
    $("#pressButton0").click(function () {
        $("#s0Tube").addClass("anim_pressTube0");
        //        $("#pressButton0").delay(delayFactor * 50).animate({
        //            opacity: '0.0'
        //        });
        animate("#pressButton0", 50, "addClass", "opClass")
    });
    $("#pressButton1").click(function () {
        $("#s1Tube").addClass("anim_pressTube1");
        //        $("#pressButton1").delay(delayFactor * 50).animate({
        //            opacity: '0.0'
        //        });
        animate("#pressButton1", 50, "addClass", "opClass")
    });
    $("#pressButton2").click(function () {
        $("#s2Tube").addClass("anim_pressTube2");
        //        $("#pressButton2").delay(delayFactor * 50).animate({
        //            opacity: '0.0'
        //        });
        animate("#pressButton2", 50, "addClass", "opClass")
    });
    $("#pressButton3").click(function () {
        $("#s3Tube").addClass("anim_pressTube3");
        //        $("#pressButton3").delay(delayFactor * 50).animate({
        //            opacity: '0.0'
        //        });
        animate("#pressButton3", 50, "addClass", "opClass")
    });
    $("#pressButton4").click(function () {
        $("#s4Tube").addClass("anim_pressTube4");
        //        $("#pressButton4").delay(delayFactor * 50).animate({
        //            opacity: '0.0'
        //        });
        animate("#pressButton4", 50, "addClass", "opClass")
    });
    $("#pressButton5").click(function () {
        $("#s5Tube").addClass("anim_pressTube5");
        //        $("#pressButton5").delay(delayFactor * 50).animate({
        //            opacity: '0.0'
        //        });
        animate("#pressButton5", 50, "addClass", "opClass")
    });
    //Step 13
    // $(".pressButton").click();
    //Step14
    //$("#waterBathLid").click();
    //Step 15
    //$("#waterBathNoLid").click();
    //Step 16
    //$("#tubeBlock").click();
    //Step 17
    //$("#waterBathLid").click();
    //Step 18
    var timerButton = document.getElementById("timerButton");
    //$(timerButton).click(helperFunctions.timerClicked)
    //Step19
    //$(".loadingDye").click();
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
    $("#zoomOutButton1").click(function () {
        zoom(50, 50, 1, 1000)
        $("#zoomOutButton1").animate({
            opacity: '0.0'
        });
    });
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
    $("#zoomOutButton").click(function () {
        zoom(50, 50, 1, 1000)
        $("#zoomOutButton").animate({
            opacity: '0.0'
        });
    });
    $('#pressButton0').addClass('opClass');
    $('#pressButton1').addClass('opClass');
    $('#pressButton2').addClass('opClass');
    $('#pressButton3').addClass('opClass');
    $('#pressButton4').addClass('opClass');
    $('#pressButton5').addClass('opClass');
    $('#zoomOutButton').addClass('opClass');
    $('#zoomOutButton1').addClass('opClass');
    $('#indicatorArrow0').addClass('opClass');
    $('#indicatorArrow1').addClass('opClass');
    $('#indicatorArrow2').addClass('opClass');
    $('#indicatorArrow3').addClass('opClass');
    $('#indicatorArrow4').addClass('opClass');
    $('#indicatorArrow5').addClass('opClass');
    $('#indicatorArrow6').addClass('opClass');
    $('#volumeButton').addClass('opClass');
    $('#volumeInput').addClass('opClass');
    $('#tubeContentMixing2').addClass('opClass');
    $('#tubeContentMixing3').addClass('opClass');
    $('.side').addClass('opClass');
    $('#powerSupply').addClass('opClass');
    $('#powerSupplyUp').addClass('opClass');
    $('#powerSupplyDown').addClass('opClass');
    $('#voltage').addClass('opClass');
    $('#gelSideView').addClass('opClass');
    $('#arrowUp').addClass('opClass');
    $('#arrowDown').addClass('opClass');
    $('#labBenchTop').addClass('opClass');
    $('#gelTopView').addClass('opClass');
    $('#powerSupplyTop').addClass('opClass');
    $('#lidSide').addClass('opClass');
    $('#gelTrayTop').addClass('opClass');
    $('#gelFinalTop').addClass('opClass');
    $('#micropipetTopView').addClass('opClass');
    $('#wasteBinTop').addClass('opClass');
    $('#lidBox').addClass('opClass');
    $('#zoomOutButton2').addClass('opClass');
    $('#zoomOutButton3').addClass('opClass');
    $('#emptyGraduatedCylinder').addClass('opClass');
    $('#stainedGelContainer').addClass('opClass');
    $('#stainingTray').addClass('opClass');
    $('#tipBoxTop').addClass('opClass');
    $('#gelVoltageCover').addClass('opClass');
    $('#volumeButton1').addClass('opClass');
    $('#volumeInput1').addClass('opClass');
    $('#tip').addClass('opClass');
    $('#pipetteTip1').addClass('opClass');
    $('#gel').addClass('opClass');
    $('#answerButton').addClass('opClass');
    $('#answerInput').addClass('opClass');
    $('#tubeContentMixing4').addClass('opClass');
    $('#zoomOutButton1a').addClass('opClass');
    $('.holderTop').addClass('opClass');
    $('.day2').addClass('opClass');
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
//makePipetteTipAnimation((target.position.left));
//makePipetteTipAnimation(Event.target.position.left);
function makePipetteTipAnimation(tipLocation) {
    var keyframeString = `    
@keyframes addTip1 {
    0% {
        left: 14.5%;
        top: 52%;
    }
    8% {
        left: 14.5%;
        top: 44%;
    }
    14% {
        left: ${tipLocation}%;
        top: 44%;
    }
    20% {
        left: ${tipLocation}%;
        top: 47.6%;
    }
    25% {
        left: ${tipLocation}%;
        top: 42%;
    }
    90% {
        left: 83%;
        top: 28%;
    }
    100% {
        left: 86.4%;
        top: 28%;
    }
}
    `
    //
    $('#dynamic-style').html(keyframeString)
}
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
