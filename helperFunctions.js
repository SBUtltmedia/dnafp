var microTubeEnum = ["untouched", "opened", "closed", "flicked", "tapped", "returned", "exposed"]
state["microtubeState"] = Array(6).fill(microTubeEnum[0])
var criteriaPassed;
var microtubeAnimation = [{
    target: "Tube",
    name: animdefs["anim_moveTube"]
}, {
    target: "Cap",
    name: animdefs["anim_rotateCap"]
}, {
    target: "Cap",
    name: animdefs["anim_closeCap"]
}, {
    target: "Tube",
    name: animdefs["anim_flickTube"]
}, {
    target: "Tube",
    name: animdefs["anim_tapTube"]
}, {
    target: "Tube",
    name: animdefs["anim_tubeDown"]
}]
var voltage = 0;
var volume = 0;
var tyty = 0;
var idArray = ["#s0Tube", "#tubeContentMixing3"]
var mix = 0;

function updateVoltage(amount) {
    voltage += amount;

}

function zeroTime(def) {

    return def.replace(/ [\d\.]+s/g, " .001s")

}


function animate(selector, delay, method, param) {


    var animateDur = 400;
    if (testMode) {
        delay = 0
        animateDur = .001;
    }


    if ($(selector + ':visible').length == 0) {
        setTimeout(function () {
            $(selector).show();
            $(selector).removeClass("opClass");
            $(selector).css("visibility", "visible");
        }, delay)
    }

    if (method == "css")

    {

        setTimeout(function () {
            $(selector).css(...param);
        }, delay)

        //$(selector).delay(delay).playKeyframe(param, function () {});
    }


    if (method == "keyframe")

    {
        if (testMode) {
            param = zeroTime(param)
        }

        //$(selector).attr("style","")

        setTimeout(function () {
            $(selector).playKeyframe(param, function () {});
        }, delay)

        //$(selector).delay(delay).playKeyframe(param, function () {});
    }

    if (method == "addClass")

    {
        setTimeout(function () {
            $(selector).addClass(param);
        }, delay)
    }
    if (method == "removeClass")

    {
        setTimeout(function () {
            $(selector).removeClass(param);
        }, delay)
    }

    if (method == "animate")

    {

        //$(selector).attr("style","")

        setTimeout(function () {
            $(selector).animate(...param, function () {

                if ($(selector).css("opacity") == 0) {
                    $(selector).css("display", "none")

                }

            });
        }, delay)

        //$(selector).delay(delay).playKeyframe(param, function () {});
    } else if (typeof (method) == "function") {
        if (method.name == "zoom" && testMode) {
            zoomInstant(param[0], param[1], param[2])
        } else {
            $(selector).delay(delay).queue(function () {
                method(...param, testMode)
                $(this).dequeue();
            })
        }


    }
}
var helperFunctions = {
    //step 0
    "liftEnzyme": function () {

        animate("#enzTube", 0, "keyframe", animdefs["anim_moveEnz"])
        $("#indicatorArrow1").remove();
    }, //step 1
    "openEnzyme": function () {
        animate("#enzCap", 0, "keyframe", animdefs["anim_rotateCap"])
        state["firstStep"] = 45;
    },
    "openEnzymePost": function () {
        animate("#indicatorArrow0", 0, "removeClass", "opClass")
        animate("#indicatorArrow0", 0, "keyframe", animdefs["anim_oscillate"])
        updateScore(10);
    }, //step 2
    "takeEnzyme": function (evt) {

        var tipNum = betterParseInt(evt.target.id);
        var tipLeft = tips[(tipNum - 1)];
        // in event
        makePipetteTipAnimation(tipLeft);
        animate("#indicatorArrow0", 0, "addClass", "opClass")
        animate("#micropipet2", 0, "keyframe", animdefs["anim_addTip1"])
        animate("#" + evt.target.id, 0, "keyframe", animdefs["anim_hideTip1"])
        //animate("#tip1", 0, "keyframe", animdefs["anim_mooveTip"])
        animate("#pipetteTip1", 0, "keyframe", animdefs["anim_showTip1"])


        animate("html", 5000, zoom, [95, 36, 9.5, 2700])
        animate("#volumeButton,#volumeInput", 6000, "css", [{
            display: "block",
            opacity: 1
        }]);

    }, //step 3
    "setVolume": function () {

        state["volume"] = $("#volumeInput").val();
    },
    "setVolumePost": function () {
        // game.nextStep();
        updateScore(10);
        animate("#volumeButton,#volumeInput", 1, "animate", [{
            opacity: '0.0'
        }]);
        animate("#view", 0, zoom, [50, 50, 1, 1000])
        animate("#micropipet2", 1100, "keyframe", animdefs["anim_lowerPipet"])
        animate("#indicatorArrow6", 0, "animate", [{
            opacity: '1.0'
        }])
        animate("#indicatorArrow6", 0, "keyframe", animdefs["anim_oscillate4"])
    }, //step 4
    "openTube": function (evt) {


        state["microtubeState"][0] = microTubeEnum[1];


        animate("#s0Tube", 0, "keyframe", animdefs["anim_moveTube"])
        animate("#s0Cap", 0, "keyframe", animdefs["anim_rotateCap"])
        animate("#indicatorArrow6", 0, "animate", [{
            opacity: '0.0'
            }])

    }, //step 5
    "addEnzyme": function () {

        //$("#micropipet2").removeClass(animdefs["anim_addTip1"]);
        animate("#micropipet2", 0, "keyframe", animdefs["anim_pipetToTube1"])
        animate("#indicatorArrow2", 0, "keyframe", animdefs["anim_oscillate2"])
        animate("#indicatorArrow2", 1800, "animate", [{
            opacity: '1.0'
        }]);


    }, //step 6
    "mixContents": function () {
        animate("#view", 0, zoom, [39, 67, 12, 1050])
        animate("#zoomOutButton1", 4000, "animate", [{
            opacity: '1.0'
        }]);
        animate("#s0TubeBody", 0, "keyframe", animdefs["anim_mixs0TubeBody"])
        animate("#tubeContentMixing3", 0, "keyframe", animdefs["anim_mixTubeContent"])

        animate("#zoomOut", 9500, "animate", [{
            opacity: '1.0'
        }]);
        animate("#indicatorArrow2", 80, "animate", [{
            opacity: '0.0'
        }]);
        animate("#indicatorArrow3", 80, "animate", [{
            opacity: '1.0'
        }]);
        animate("#indicatorArrow3", 0, "keyframe", animdefs["anim_oscillate3"]);
    },

    "mixContentsPost": function () {
        $("#zoomOutButton1").click(function () {
            animate("#view", 0, zoom, [50, 50, 1, 1000]);
            animate("#zoomOutButton1", 0, "animate", [{
                opacity: '0.0'
            }]);
        });
        if (testMode) {
            $("#zoomOutButton1").trigger("click")
        }
    }, //step 7

    "replaceTip": function () {
        animate("#pipetteTip1", 2300, "keyframe", animdefs["anim_tipToBin"])
        //animate("#pipetteTip1", 3300, "keyframe", animdefs["anim_hideTip1"]);
        animate("#micropipet2", 0, "keyframe", animdefs["anim_pipetToBin"])

        animate("#indicatorArrow3", 50, "animate", [{
            opacity: '0.0'
        }]);
    },
    "closeTube": function (evt) {
        animate("#s0Cap", 0, "keyframe", animdefs["anim_closeCap"])
        state["microtubeState"][0] = microTubeEnum[2];
    },
    "flickTube": function (evt) {
        animate("#s0Tube", 0, "keyframe", animdefs["anim_flickTube"]);
        state["microtubeState"][0] = microTubeEnum[3];
    },
    "tapTube": function () {
        animate("#s0Tube", 0, "keyframe", animdefs["anim_tapTube"])
        state["microtubeState"][0] = microTubeEnum[4];
    },
    "tubeRack": function () {
        animate("#s0Tube", 0, "keyframe", animdefs["anim_tubeDown"])
        for (i = 0; i <= 5; i++) {
            animate("#s" + i + "Tube", 1000, "keyframe", animdefs["anim_tube" + i + "ToBath"]);
        }
        animate("#tubeBlock", 1000, "keyframe", animdefs["anim_moveBlock"]);
        animate(".pressButton", 2000, "animate", [{
            opacity: '1.0'
            }])
        state["microtubeState"][0] = microTubeEnum[5];

    }, //step 12
    "pressTube": function (evt) {
        var tubeId = evt.target.id.split("_")[1];

        if (testMode) {
            animate(".pressButton", 0, "animate", [{
                opacity: '0.0'
            }]);
            for (i = 0; i <= 5; i++) {
                animate("#s" + i + "Tube", 0, "keyframe", animdefs["anim_pressTube" + i]);
            }
        }
        animate("#s" + tubeId + "Tube", 0, "keyframe", animdefs["anim_pressTube" + tubeId]);
        animate("#pressButton_" + tubeId, 50, "animate", [{
            opacity: '0.0'
        }])
        state["microtubeState"][tubeId] = microTubeEnum[6]
    }, //step 13
    
    "removeLid": function (evt) {
        var top1 = document.getElementsByClassName("topView")
        animate("#waterBathLid", 0, "keyframe", animdefs["anim_removeLid"])

    }, //step 14
    "checkTemp": function () {
        //        criteriaPassed = true;
        animate("#view", 0, zoom, [65, 21, 10, 1000])
        animate("#zoomOutButton", 1600, "animate", [{
            opacity: '1.0'
        }]);
        $("#zoomOutButton").on("click", function () {

            animate("#view", 0, zoom, [50, 50, 1, 1000]);
            animate("#zoomOutButton", 0, "animate", [{
                opacity: '0.0'
            }]);
            $("#zoomOutButton").off();
        });

        if (testMode) {
            $("#zoomOutButton").trigger("click");
        }
    }, //step 15
    "insertRack": function () {
        animate("#tubeBlock", 0, "keyframe", animdefs["anim_insertRack"])
        for (i = 0; i <= 5; i++) {
            animate("#s" + i + "Tube", 0, "addClass", "microTube");
            animate("#s" + i + "Tube", 0, "keyframe", animdefs["anim_insertTube" + i]);
        }
        setTimeout(function () {
            updateScore(10);

        }, 300);
    }, //step 16
    "closeLid": function () {
        animate("#waterBathLid", 0, "keyframe", animdefs["anim_replaceLid"])
        animate("#view", 1000, zoom, [65, 36, 5, 1500])
        animate("#timerButton,#timer", 1000, "removeClass", "opClass");

        // Joochan doesn't understand what #button do.
        animate("#button", 1000, "animate", [{
            opacity: '1.0'
        }]);


    }, //step 17
    "setTimer": function () {
        //if ((game.getCurrentStep().id == "setTimer")){
        state["time"] = $("#timer").val();
    },
    "setTimerPost": function () {

        animate("#button,#timer,#timerButton", 1, "animate", [{
            opacity: '0.0'
        }]);
        animate("#view", 0, zoom, [50, 50, 1, 1000]);
        animate("#day1", 1000, "animate", [{
            opacity: '0.0'
        }]);
        animate("#day2", 2000, "removeClass", "opClass")
        animate("#day2", 2000, "animate", [{
            opacity: '1.0'
        }])
        animate("#day2", 2000, "keyframe", animdefs["anim_changeDay2"])
//        animate("#powerSupply", 2000, "animate", [{
//            opacity: '1.0'
//        }])
//        animate("#powerSupplyUp", 2000, "animate", [{
//            opacity: '1.0'
//        }])
//        animate("#powerSupplyDown", 2000, "animate", [{
//            opacity: '1.0'
//        }])
//        animate("#voltage", 2000, "animate", [{
//            opacity: '1.0'
//        }])

        state["microtubeState"] = Array(6).fill(microTubeEnum[0])

        setTimeout(function () {
            $("#bothDays *").resetKeyframe(function () {});
            animate("#pipetteTip1", 0, "css", [{
                visibility: "hidden"
            }])
        }, 0);

    }, //step 18
    "openDye": function (evt) {
        animate("#loadDye", 0, "keyframe", animdefs["anim_moveLoadingDye"])
        animate("#loadDyeCap", 0, "keyframe", animdefs["anim_rotateCap"])

    }, //step 19
    "openDyePost": function () {
        animate("#indicatorArrow0", 0, "removeClass", "opClass")
        animate("#indicatorArrow0", 0, "keyframe", animdefs["anim_oscillate"])
    },

    "takeDye": function (evt) {

        var tippNum = betterParseInt(evt.target.id);
        var tippLeft = tips[(tippNum - 1)];
        animate("#indicatorArrow0", 0, "addClass", "opClass")

        // in event
        makePipetteTippAnimation(tippLeft);
        animate("#micropipet2", 0, "keyframe", animdefs["anim_addTipp1"])
        animate("#" + evt.target.id, 0, "keyframe", animdefs["anim_hideTipp1"])
        animate("#pipetteTip1", 0, "keyframe", animdefs["anim_showTipp1"])

        $("#holder").css('z-index', '3');

        animate("#volumeButton1,#volumeInput1", 5000, "removeClass", "opClass")
        animate("#volumeButton1,#volumeInput1", 5000, "animate", [{
            opacity: '1.0'
        }]);
        animate("#view", 3000, zoom, [23, 12, 7, 1400])



    }, //step 20
    "setDyeVolume": function () {

        state["volume1"] = $("#volumeInput1").val();
    },
    "setDyeVolumePost": function () {
        updateScore(10);
        animate("#volumeButton1,#volumeInput1", 1, "animate", [{
            opacity: '0.0'
        }]);
        animate("#view", 0, zoom, [50, 50, 1, 1000])
        animate("#indicatorArrow6", 0, "animate", [{
            opacity: '1.0'
        }])
        animate("#indicatorArrow6", 0, "keyframe", animdefs["anim_oscillate4"])
    }, //step 21

    "openTube1": function (evt) {
        helperFunctions.openTube(evt)
    }, //step 22
    "addDye": function () {
        animate("#micropipet2", 0, "keyframe", animdefs["anim_addDyeToTube"])
        animate("#indicatorArrow2", 0, "keyframe", animdefs["anim_oscillate2"])
        animate("#indicatorArrow2", 1800, "animate", [{
            opacity: '1.0'
        }]);

    }, //step 23
    "mixContents1": function () {
        helperFunctions.mixContents()
    },
    "mixContents1Post": function () {
        helperFunctions.mixContentsPost()
    }, //step 24
    "replaceTip1": function () {
        helperFunctions.replaceTip()
    }, //step 25
    "closeTube1": function (evt) {
        helperFunctions.closeTube(evt)
    }, //step 26
    "flickTube1": function (evt) {
        helperFunctions.flickTube(evt)
    }, //step 27
    "tapTube1": function () {
        helperFunctions.tapTube()
    }, //step 28
    "tubeRack1": function () {
        helperFunctions.tubeRack()
    }, //step 29    
    "pressTube1": function (evt) {
        helperFunctions.pressTube(evt)
    }, //step 29

    "removeComb": function () {
        animate("#gelComb", 0, "keyframe", animdefs["anim_removeComb"])
        animate("#gelSideView", 1000, "keyframe", animdefs["anim_toTopView1"])
    }, //step 30
    
    "toTop": function () {
        $("#day2, #day2 *, #loadDyeCap, #gelSideView").hide();
        $("#day1").hide();
        $("#bothDays").hide();
        $("#topView").show();

        $("#gelTopView").show();
        $("#labBenchTop").show();
        $("#labBenchTop").show();

        //$("#tipBoxTop").addClass("anim_tipVisible")

        animate("#tipBoxTop",0,"animate",[{opacity: '1.0'}]);        
       $("#arrowDown,#arrowUp,#labBenchTop,#gelTopView,#lidSide,#powerSupplyTop,.holderTop,.tipBoxTop,#wasteBinTop,#zoomOutButton2").css({opacity: '1.0'}).removeClass("opClass");

       $("#zoomOutButton3,#powerSupplyUp,#powerSupplyDown,#tip").hide();      
    }, //step 31
    "orientGel": function () {

        //HAVE TO BE CONFIRMED
        animate("#gelTrayTop,#micropipetTopView,.side", 1, "animate", [{
            opacity: '1.0'
        }]);
        animate("#arrowDown,#arrowUp", 1, "animate", [{
            opacity: '1.0'
        }]);
        /*
                $("#gelTrayTop").delay(1).animate({
                    opacity: '1.0'
                });
                $("#arrowDown").delay(1).animate({
                    opacity: '0.0'
                });
                $("#arrowUp").delay(1).animate({
                    opacity: '0.0'
                });
                $("#micropipetTopView").delay(1).animate({
                    opacity: '1.0'
                });
                $(".side").delay(1).animate({
                    opacity: '1.0'
                });
        */
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);

        }, 300);
    }, //step 32, 37, 42
    "addTipTop": function () {

        //HAVE TO BE CONFIRMED
        animate("#micropipetTopView", 0, "animate", [{
            "left": '31.5%',
            "top": '64%'
        }]);
        /*
                $("#micropipetTopView").animate({
                    "left": '31.5%',
                    "top": '64%'
                });
        */
    }, //step 33
    "takeHind": function (evt) {
        i

        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);

    }, //step 34
    "toLane1": function (evt) {
        var key = evt.keycode;
        var leftIndex = evt.keyCode - 48;
        var checkLane = (betterParseInt((game.getCurrentStep().id)));
        //var newTop = wellTop[topIndex];
        var newLeft = (8 + (2.5 * (leftIndex - (0.46 * (leftIndex - 1.1)))))
        console.log(newLeft)
        if (checkLane != leftIndex) {
            updateScore(-10);
            alert("Incorrect. Please select the correct lane.")
        }
        if (checkLane == leftIndex) {
            $("#micropipetTopView").animate({
                "left": newLeft + '%',
                "top": '71.6%',
            });

            // game.nextStep();
            updateScore(10);
        };
        //movePipetTop(wellTop[arrayIndex])
        //     $("#micropipetTopView").animate({top: '${newTop}%;'});
    }, //step 35,40
    "insertTip": function (evt) {
        var arrayIndex = evt.keyCode - 37;
          console.log(arrayIndex)
        if (arrayIndex > -1 && arrayIndex < 4) moveTipSide(directionsForSideTipMovement[arrayIndex])
    }, //step 36
    "disposeTip": function () {
        $("#micropipetTopView").animate({
            "left": '35%',
            "top": '76%'
        });
        $('#tipSide').css("top", "0" + "%")
        // game.nextStep();
        updateScore(10);

    }, //step 38
    "takeCS": function (evt) {

        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);

    }, //step 39
    "toLane2": function (evt) {
        var key = evt.keycode;
        var leftIndex = evt.keyCode - 48;
        var checkLane = (betterParseInt((game.getCurrentStep().id)));
        //var newTop = wellTop[topIndex];
        var newLeft = (8 + (2.5 * (leftIndex - (0.46 * (leftIndex - 1.1)))))

        if (checkLane != leftIndex) {
            updateScore(-10);
            alert("Incorrect. Please select the correct lane.")
        }
        if (checkLane == leftIndex) {
            $("#micropipetTopView").animate({
                "left": newLeft + '%',
                "top": '71.6%',
            });

            // game.nextStep();
            updateScore(10);
        };
        //movePipetTop(wellTop[arrayIndex])
        //     $("#micropipetTopView").animate({top: '${newTop}%;'});
    }, //step 41
    "disposeTip1": function () {
        $("#micropipetTopView").animate({
            "left": '35%',
            "top": '76%'
        });
        $('#tipSide').css("top", "0" + "%")
        // game.nextStep();
        updateScore(10);

    }, //step 43
    "takeS1": function (evt) {

        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);

    }, //step 44
    "toLane3": function (evt) {
        var key = evt.keycode;
        var leftIndex = evt.keyCode - 48;
        var checkLane = (betterParseInt((game.getCurrentStep().id)));
        //var newTop = wellTop[topIndex];
        var newLeft = (8 + (2.5 * (leftIndex - (0.46 * (leftIndex - 1.1)))))

        if (checkLane != leftIndex) {
            updateScore(-10);
            alert("Incorrect. Please select the correct lane.")
        }
        if (checkLane == leftIndex) {
            $("#micropipetTopView").animate({
                "left": newLeft + '%',
                "top": '71.6%',
            });

            // game.nextStep();
            updateScore(10);
        };
        //movePipetTop(wellTop[arrayIndex])
        //     $("#micropipetTopView").animate({top: '${newTop}%;'});
    }, //step 46
    "disposeTip2": function () {
        $("#micropipetTopView").animate({
            "left": '35%',
            "top": '76%'
        });
        $('#tipSide').css("top", "0" + "%")
        // game.nextStep();
        updateScore(10);

    }, //step 48
    "takeS2": function (evt) {

        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);

    }, //step 49
    "toLane4": function (evt) {
        var key = evt.keycode;
        var leftIndex = evt.keyCode - 48;
        var checkLane = (betterParseInt((game.getCurrentStep().id)));
        //var newTop = wellTop[topIndex];
        var newLeft = (8 + (2.5 * (leftIndex - (0.46 * (leftIndex - 1.1)))))

        if (checkLane != leftIndex) {
            updateScore(-10);
            alert("Incorrect. Please select the correct lane.")
        }
        if (checkLane == leftIndex) {
            $("#micropipetTopView").animate({
                "left": newLeft + '%',
                "top": '71.6%',
            });

            // game.nextStep();
            updateScore(10);
        };
        //movePipetTop(wellTop[arrayIndex])
        //     $("#micropipetTopView").animate({top: '${newTop}%;'});
    }, //step 51
    "disposeTip3": function () {
        $("#micropipetTopView").animate({
            "left": '35%',
            "top": '76%'
        });
        $('#tipSide').css("top", "0" + "%")
        // game.nextStep();
        updateScore(10);

    }, //step 53
    "takeS2": function (evt) {

        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);

    }, //step 54
    "toLane4": function (evt) {
        var key = evt.keycode;
        var leftIndex = evt.keyCode - 48;
        var checkLane = (betterParseInt((game.getCurrentStep().id)));
        //var newTop = wellTop[topIndex];
        var newLeft = (8 + (2.5 * (leftIndex - (0.46 * (leftIndex - 1.1)))))

        if (checkLane != leftIndex) {
            updateScore(-10);
            alert("Incorrect. Please select the correct lane.")
        }
        if (checkLane == leftIndex) {
            $("#micropipetTopView").animate({
                "left": newLeft + '%',
                "top": '71.6%',
            });

            // game.nextStep();
            updateScore(10);
        };
        //movePipetTop(wellTop[arrayIndex])
        //     $("#micropipetTopView").animate({top: '${newTop}%;'});
    }, //step 56
    "disposeTip3": function () {
        $("#micropipetTopView").animate({
            "left": '35%',
            "top": '76%'
        });
        $('#tipSide').css("top", "0" + "%")
        // game.nextStep();
        updateScore(10);

    }, //step 58
    "takeS3": function (evt) {

        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);

    }, //step 59
    "toLane5": function (evt) {
        var key = evt.keycode;
        var leftIndex = evt.keyCode - 48;
        var checkLane = (betterParseInt((game.getCurrentStep().id)));
        //var newTop = wellTop[topIndex];
        var newLeft = (8 + (2.5 * (leftIndex - (0.46 * (leftIndex - 1.1)))))

        if (checkLane != leftIndex) {
            updateScore(-10);
            alert("Incorrect. Please select the correct lane.")
        }
        if (checkLane == leftIndex) {
            $("#micropipetTopView").animate({
                "left": newLeft + '%',
                "top": '71.6%',
            });

            // game.nextStep();
            updateScore(10);
        };
        //movePipetTop(wellTop[arrayIndex])
        //     $("#micropipetTopView").animate({top: '${newTop}%;'});
    }, //step 61
    "disposeTip4": function () {
        $("#micropipetTopView").animate({
            "left": '35%',
            "top": '76%'
        });
        $('#tipSide').css("top", "0" + "%")
        // game.nextStep();
        updateScore(10);

    }, //step 63
    "takeS4": function (evt) {

        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);

    }, //step 64
    "toLane6": function (evt) {
        var key = evt.keycode;
        var leftIndex = evt.keyCode - 48;
        var checkLane = (betterParseInt((game.getCurrentStep().id)));
        //var newTop = wellTop[topIndex];
        var newLeft = (8 + (2.5 * (leftIndex - (0.46 * (leftIndex - 1.1)))))

        if (checkLane != leftIndex) {
            updateScore(-10);
            alert("Incorrect. Please select the correct lane.")
        }
        if (checkLane == leftIndex) {
            $("#micropipetTopView").animate({
                "left": newLeft + '%',
                "top": '71.6%',
            });

            // game.nextStep();
            updateScore(10);
        };
        //movePipetTop(wellTop[arrayIndex])
        //     $("#micropipetTopView").animate({top: '${newTop}%;'});
    }, //step 66
    "disposeTip5": function () {
        $("#micropipetTopView").animate({
            "left": '35%',
            "top": '76%'
        });
        $('#tipSide').css("top", "0" + "%")
        // game.nextStep();
        updateScore(10);

    }, //step 68
    "takeS5": function (evt) {

        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);

    }, //step 69
    "toLane7": function (evt) {
        var key = evt.keycode;
        var leftIndex = evt.keyCode - 48;
        var checkLane = (betterParseInt((game.getCurrentStep().id)));
        //var newTop = wellTop[topIndex];
        var newLeft = (8 + (2.5 * (leftIndex - (0.46 * (leftIndex - 1.1)))))

        if (checkLane != leftIndex) {
            updateScore(-10);
            alert("Incorrect. Please select the correct lane.")
        }
        if (checkLane == leftIndex) {
            $("#micropipetTopView").animate({
                "left": newLeft + '%',
                "top": '71.6%',
            });

            // game.nextStep();
            updateScore(10);
        };
        //movePipetTop(wellTop[arrayIndex])
        //     $("#micropipetTopView").animate({top: '${newTop}%;'});
    }, //step 71
    "disposeTip6": function () {
        $("#micropipetTopView").animate({
            "left": '35%',
            "top": '76%'
        });
        $('#tipSide').css("top", "0" + "%")
        // game.nextStep();
        updateScore(10);

    }, //step 72
    "clickLid": function () {
        $("#lidSide").animate({
            opacity: '0.0'
        });
        $("#lidBox").animate({
            opacity: '1.0'
        });
        $("#micropipetTopView").animate({
            opacity: '0.0',
            zindex: -1
        });
        //$("#gelVoltageCover").show()
        $('#lidSide').delay(2000).queue(function () {
            changeDay();
            $(this).dequeue();
        });
        //        setTimeout(function () {
        //            $("#gelVoltageCover").animate({
        //                opacity: '1.0'
        //            });
        //            $("#powerSupplyUp").animate({
        //                opacity: '1.0'
        //            });
        //            $("#powerSupplyDown").animate({
        //                opacity: '1.0'
        //            });
        //            $("#gelVoltageCover").css('zIndex', '5000');
        //            // game.nextStep();
        //            updateScore(10);
        //            
        //        }, 1500);
    }, //step 73
    "setVoltage": function () {
        if (voltage == 100 || testMode) {

            criteriaPassed = true;
        }
        $("#powerSupplyUp").click(function () {
            updateVoltage(10);;
            $("#voltage").val(voltage);
        });
        $("#powerSupplyDown").click(function () {
            updateVoltage(-10);;
            $("#voltage").val(voltage);
        });
        if (voltage == 100 || testMode) {
            criteriaPassed = true;
        }
    },
    "setVoltagePost": function () {
        $("#gelVoltageCover").animate({
            opacity: '0.0'
        });
        $("#gelVoltageCover").delay(500).hide();
        //            setTimeout(function () {
        //                $("#gelVoltageCover").hide();
        //            }, 500);
        //        }
        $("#powerSupplyUp").click(function () {
            updateVoltage(10);;
            $("#voltage").val(voltage);
            if (voltage == 100) {
                // game.nextStep();
                $("#gelVoltageCover").animate({
                    opacity: '0.0'
                });
                setTimeout(function () {
                    $("#gelVoltageCover").hide();
                }, 500);
            }
        });
        $("#powerSupplyDown").click(function () {
            updateVoltage(-10);;
            $("#voltage").val(voltage);
            if (voltage == 100) {
                // game.nextStep();
                $("#gelVoltageCover").animate({
                    opacity: '0.0'
                });
                setTimeout(function () {
                    $("#gelVoltageCover").hide();
                }, 500);
            }
        });
    }, //step 74
    "removeLidAgain": function () {
        $("#lidSide").animate({
            opacity: '1.0'
        });
        $("#lidBox").animate({
            opacity: '0.0'
        });
        $("#tipBoxTop").animate({
            opacity: '0.0',
        });
        $("#tipBoxTop").hide();
        $("#stainingTray").animate({
            opacity: '1.0'
        });
        $("#gelFinalTop").animate({
            opacity: '1.0'
        });
        $("#lidBox").delay(1).animate({
            zindex: -2
        });
    }, //step 75
    "removeGel": function () {
        $("#gelTrayTop").delay(1).animate({
            top: '+=8%',
            left: '+=18%',
        });
        $("#gelFinalTop").delay(1).animate({
            top: '+=8%',
            left: '+=18%',
        });
    }, //step 76
    "nudgeGel": function () {
        $("#gelFinalTop").delay(1).animate({
            top: '-=14%',
            left: '+=0.5%',
        });
        $("#gelTrayTop").delay(1).animate({
            opacity: '0.0'
        });
    }, //step 77
    "stainGel": function () {
        $("#graduatedCylinder").attr("class", " anim_pourStain");
        $("#emptyGraduatedCylinder").attr("class", " anim_stain2");
        $("#stainingTraySide").attr("class", " anim_stain1");
    }, //step 78
    "examineGel": function () {
        $("#gel").delay(50).animate({
            opacity: '1.0'
        });
        $("#gel").css({
            opacity: 1.0,
            visibility: "visible"
        }).animate({
            opacity: 1
        }, 200)
        $("#answerButton").delay(1).animate({
            opacity: '1.0'
        });
        $("#answerInput").delay(1).animate({
            opacity: '1.0'
        });

    }, //step 79
    "pickLane": function () {
        var studentAnswer = $("#answerInput").val();
        if (studentAnswer != (answer - 2)) {
            alert("Incorrect. Please select the correct lane")
            updateScore(-50);

        }
        if (studentAnswer == (answer - 2)) {
            // game.nextStep();
            updateScore(10);


            endGame("win");
        }
    },

    "timerClicked": function () {
        //if ((game.getCurrentStep().id == "setTimer")){
        var time = $("#timer").val();

        if (time != 45) {
            updateScore(-10);
        }
        if (time == 45) {

            $("button").delay(1).animate({
                opacity: '0.0'
            });
            $("#timer").delay(1).animate({
                opacity: '0.0'
            });
            zoom(50, 50, 1, 1000)
            setTimeout(function () {
                $("#day1").delay(1).animate({
                    opacity: '0.0'
                });
            }, 1000);
            setTimeout(function () {
                $("#day2").delay(1).animate({
                    opacity: '1.0'
                });
                animate("#day2", 0, "keyframe", animdefs["anim_changeDay2"])
                animate("#day1", 0, "keyframe", animdefs["anim_changeDay1"])
                $("#powerSupply").delay(1).animate({
                    opacity: '1.0'
                });
                $("#powerSupplyUp").delay(1).animate({
                    opacity: '1.0'
                });
                $("#powerSupplyDown").delay(1).animate({
                    opacity: '1.0'
                });
                $("#voltage").delay(1).animate({
                    opacity: '1.0'
                });
                $("#gelSideView").delay(1).animate({
                    opacity: '1.0'
                });
            }, 2000);
            setTimeout(function () {
                // game.nextStep();
                updateScore(10);

            }, 2700);
        };
    },
    "toTopView": function () {
        animate("#topView", 0, "keyframe", animdefs["anim_toTopView1"])
        animate("#day2", 0, "keyframe", animdefs["anim_toTopView2"])
        animate("#day1", 0, "keyframe", animdefs["anim_toTopView2"])
        animate("#gelTopView", 0, "keyframe", animdefs["anim_toTopView1"])
        animate("#labBenchTop", 0, "keyframe", animdefs["anim_toTopView1"])
        //$("#tipBoxTop").addClass(animdefs["anim_tipVisible"])

        $("#tipBoxTop").animate({
            opacity: '1.0'
        });
        $("#arrowDown").delay(1).animate({
            opacity: '1.0'
        });
        $("#arrowUp").delay(1).animate({
            opacity: '1.0'
        });
        $("#labBenchTop").delay(1).animate({
            opacity: '1.0'
        });
        $("#gelTopView").delay(1).animate({
            opacity: '1.0'
        });
        $("#lidSide").delay(1).animate({
            opacity: '1.0'
        });
        $("#powerSupplyTop").delay(1).animate({
            opacity: '1.0'
        });
        $('.holderTop').delay(1).animate({
            opacity: '1.0'
        });
        $(".tipBoxTop").delay(1).animate({
            opacity: '1.0'
        });
        $("#wasteBinTop").delay(1).animate({
            opacity: '1.0'
        });
        $("#zoomOutButton2").delay(1).animate({
            opacity: '1.0'
        });
        $("#zoomOutButton3").delay(1).animate({
            opacity: '0.0'
        });
        $("#powerSupplyUp").delay(1).animate({
            opacity: '0.0'
        });
        $("#powerSupplyDown").delay(1).animate({
            opacity: '0.0'
        });
        $("#tip").delay(1).animate({
            opacity: '0.0'
        });
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);

        }, 300);
    }
}
