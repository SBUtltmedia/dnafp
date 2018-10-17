var microTubeEnum = ["untouched", "opened", "closed", "flicked", "tapped", "returned", "exposed"]
var tipTrayRows = 8,
    tipTrayCols = 12;
state["microtubeState"] = Array(6).fill(microTubeEnum[0])
state["tipTray"] = Array(tipTrayRows * tipTrayCols).fill(0)
state["TipPosition"] = false
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

    if (method == "removeClass") {
        setTimeout(function () {
            $(selector).removeClass(param);
        }, delay)
    }

    if (method == "attr")

    {
        setTimeout(function () {
            $(selector).attr(param[0], param[1]);
        }, delay)
    }

    if (method == "animate")

    {
        if (testMode) {
            $(selector).css(...param)
        } else {
            setTimeout(function () {
                $(selector).animate(...param, function () {



                    if ($(selector).css("opacity") == 0) {
                        $(selector).css("display", "none")

                    }

                });
            }, delay)
        }
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
      animate("#micropipet2", 1000, "keyframe", animdefs["anim_PrepPipet"])
      animate("html", 3000, zoom, [25, 46, 9.5, 1000])
      animate("#volumeButton,#volumeInput", 4000, "removeClass", "opClass")
      animate("#volumeButton,#volumeInput", 4000, "css", [{
          display: "block",
          opacity: 1
      }]);
    }, //step 2

    "setVolume": function () {
        state["volume"] = $("#volumeInput").val();
    },
    "setVolumePost": function () {
        animate("#volumeButton,#volumeInput", 1, "animate", [{
            opacity: '0.0'
            }])
        animate("#view", 0, zoom, [25, 46, 1, 1000])
        animate("#micropipet2", 1100, "keyframe", animdefs["anim_lowerPipet"])

        animate("#indicatorArrow0", 2000, "removeClass", "opClass")
        animate("#indicatorArrow0", 2000, "keyframe", animdefs["anim_oscillate"])
    },



    "takeEnzyme": function (evt) {

        var tipNum = betterParseInt(evt.target.id);
        var tipLeft = tips[(tipNum - 1)];
        // in event
        makePipetteTipAnimation(tipLeft);
        animate("#indicatorArrow6", 3000, "animate", [{
            opacity: '1.0'
        }])
        animate("#indicatorArrow6", 3000, "keyframe", animdefs["anim_oscillate4"])
        animate("#indicatorArrow0", 0, "addClass", "opClass")
        animate("#micropipet2", 0, "keyframe", animdefs["anim_addTip1"])
        animate("#" + evt.target.id, 0, "keyframe", animdefs["anim_hideTip1"])
        //animate("#tip1", 0, "keyframe", animdefs["anim_mooveTip"])
        animate("#pipetteTip1", 0, "keyframe", animdefs["anim_showTip1"])


    }, //step 3
   //step 4
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
        }])
        animate("#enzTube", 1500, "keyframe", animdefs["anim_moveEnzBack"])
        animate("#enzCap", 1000, "keyframe", animdefs["anim_closeCap"])


    }, //step 6
    "mixContents": function () {
        animate("#view", 0, zoom, [39, 67, 12, 1050])
        animate("#zoomOutButton1", 4000, "animate", [{
            opacity: '1.0'
        }]);
        // $("#svgfluid").animate(
        //   {y: 70 },
        //   {duration: 1000,
        //     step: function(now) { $(this).attr("y", now); }
        // });
        for(i=1; i < 4; i++){
            animate("#svgfluid",1000*i+500,"animate",[{"y": 70 },{duration: 500,step: function(now) { $(this).attr("y", now); }}]);
            animate("#svgfluid",1000*(i+1),"animate",[{"y": 35.6 },{duration: 500,step: function(now) { $(this).attr("y", now); }}]);
        };

        //animate("#s0TubeBody", 0, "keyframe", animdefs["anim_mixs0TubeBody"])
        //animate("#tubeContentMixing3", 0, "keyframe", animdefs["anim_mixTubeContent"])

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
        var tubeId = evt.currentTarget.id.split("_")[1];
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
    }, //step 16
    "closeLid": function () {
        animate("#waterBathLid", 0, "keyframe", animdefs["anim_replaceLid"])
        animate("#view", 1000, zoom, [65, 36, 5, 1500])
        animate("#timerButton,#timer", 1000, "removeClass", "opClass");

        // Joochan doesn't understand what #button do.


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

        state["microtubeState"] = Array(6).fill(microTubeEnum[0])

        setTimeout(function () {
            $("#bothDays *").resetKeyframe(function () {});
            animate("#pipetteTip1", 0, "animate", [{
                opacity: '0.0'
            }])
            animate(".openButton", 0, "animate", [{
                opacity: '0.0'
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
        setTimeout(function () {
            animate("#pipetteTip1", 0, "animate", [{
                opacity: '1.0'
            }])
        }, 0)
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
        animate("#s0Tube", 0, "keyframe", animdefs["anim_tubeDown"])
        for (i = 0; i <= 5; i++) {
            animate("#s" + i + "Tube", 1000, "keyframe", animdefs["anim_tube" + i + "ToBath"]);
        }
        animate("#tubeBlock", 1000, "keyframe", animdefs["anim_moveBlock"]);
        $('.pressButton button').html("Open")

        animate(".pressButton", 2000, "animate", [{
            opacity: '1.0',
            display: "block"
            }])
        state["microtubeState"][0] = microTubeEnum[5];
    }, //step 29
    "pressTube1": function (evt) {
        var tubeId = evt.currentTarget.id.split("_")[1];

        if (testMode) {
            animate(".pressButton", 0, "animate", [{
                opacity: '0.0'
            }]);
            for (i = 0; i <= 5; i++) {
                animate("#s" + i + "Tube", 0, "keyframe", animdefs["anim_rotateCap"]);
            }
        }
        animate("#s" + tubeId + "Cap", 100, "keyframe", animdefs["anim_rotateCap"]);
        animate("#pressButton_" + tubeId, 0, "animate", [{
            opacity: '0.0'
            }])
        console.log(evt.currentTarget.id)
        state["microtubeState"][tubeId] = microTubeEnum[6]
    }, //step 29

    "removeComb": function () {
        animate("#gelComb", 0, "keyframe", animdefs["anim_removeComb"])
        animate("#gelSideView", 1000, "removeClass", "opClass")
    }, //step 30

    "toTop": function () {
        $("#day2, #day2 *").hide();
        animate("#gelSideView", 1000, "addClass", "opClass")

        $("#day1").hide();
        $("#bothDays").hide();
        $("#topView").show();


        //$("#tipBoxTop").addClass("anim_tipVisible")

        animate("#tipBoxTop", 0, "animate", [{
            opacity: '1.0'
        }]);
        $("#arrowDown,#arrowUp,#labBenchTop,#gelTopView,#lidSide,#powerSupplyTop,.holderTop,.tipBoxTop,#wasteBinTop,#gelFinalTop").css({
            opacity: '1.0',
            visibility: "visible"
        }).removeClass("opClass");

        //       $("#zoomOutButton3,#powerSupplyUp,#powerSupplyDown,#tip").hide();
    }, //step 31
    "orientGel": function () {
        animate("#arrowDown,#arrowUp", 1, "animate", [{
            opacity: '0.0'
        }]);

    }, //step 32, 37, 42
    "addTipTop": function (evt) {
        var totalRows = 8;
        var totalCols = 16;
        if (testMode) {
            var tip = state["tipTray"].indexOf(0)
            var column = tip % tipTrayCols
            var row = Math.floor(tip / tipTrayCols);
            var currentSelector = "tip" + column + "_" + row
        } else {
            var currentSelector = evt.currentTarget.id;
            var [column, row] = currentSelector.split("tip")[1].split("_")
        }
        console.log(row, column, state["tipTray"], currentSelector)
        var selector = "#" + currentSelector + " ellipse,#" + currentSelector + " circle";
        animate(selector, 500, "attr", ["class", ".st3"])
        var topMost = 56.6,
            leftMost = 31.2,
            rowHeight = 1.1,
            colWidth = .78
        var microPipetTopViewLeft = leftMost + (colWidth * column)
        var microPipetTopViewTop = topMost + (rowHeight * row)
        animate("#micropipetTopView", 0, "animate", [{ //TopMost left:31.2%, 56.6% left= +=.78%,, top= +=1.1%
            "left": microPipetTopViewLeft + '%',
            "top": microPipetTopViewTop + '%'
        }]);
        state["tipTray"][column + (row * tipTrayRows)] = 1;;
    }, //step 33

    "takeMicTube": function (evt) {
        state["tubePicked"] = parseInt(evt.currentTarget.id.split("_")[1]);
    }, //step 34
    "takeMicTubePost": function () {
        var tubePickedIndex = state["tubePicked"]
        var tubeTopPosition = 17
        var tubeTopAdd = 4.5
        var tubeTop = tubeTopPosition + tubeTopAdd * tubePickedIndex

        animate("#micropipetTopView", 0, "animate", [{
            "left": '36.7%',
            "top": tubeTop + '%'
            }]);
        animate("html", 1000, zoom, [10, 74, 6, 1000])
    }, //step 34

    "toLane": function (evt) {
        state["lanePicked"] = parseInt(evt.currentTarget.id.split("_")[1]);
    },
    "toLanePost": function () {
        var laneIndex = state["lanePicked"]
        var laneLeftPosition = 10.3
        var laneLeftAdd = 1.4
        var laneLeft = laneLeftPosition + laneLeftAdd * laneIndex
        animate("#micropipetTopView", 0, "animate", [{
            "left": laneLeft + '%', //+=1.4%
            "top": '71.6%',
        }]);

        animate("html", 1000, zoom, [10, 74, 1, 500]) //zoomout
        animate(".side", 1200, "removeClass", "opClass")
        animate(".side", 1000, "css", [{
            opacity: '1'
        }])

    }, //step 35,40
    "insertTip": function (evt) {
        var sideViewWidth = parseFloat($('#sideView').css("width"));
        var sideViewHeight = parseFloat($('#sideView').css("height"));
        var currentBot = parseFloat($('#pipetteTip1').css("bottom")) / sideViewHeight * 100;
        var currentLeft = parseFloat($('#pipetteTip1').css("left")) / sideViewWidth * 100;
        state["TipPosition"] = false
        if (currentBot < 52) {
            if (currentBot < 12 || currentLeft > 67.8 || currentLeft < 19.5) {
                message("Make sure the tip is not breaching the wall!")
            } else if (currentBot > 40) {
                message("Make sure the tip stays deep enough within the well!")
            }
                else if (currentBot < 15) {

                message("Your tip is going too deep into the well. Don't risk it to breach the wall!")
            } else {
                state["TipPosition"] = true

            }
            if(state["TipPosition"] == false){
            $('#pipetteTip1').css("top", "-80%")
                $('#pipetteTip1').css("left", "42%")
            }
        }
    }, //step 36

    "insertTipPost": function () {
        //$("#svgfluid").attr({y:86})
        animate("#svgfluid", 0, "animate", [{
            y: "83.6"
        }])
        animate("#gelWellBoundary", 400, "css", [{
           "background-image": "radial-gradient(red, green, blue)"
        }])

        animate(".side", 5000, "css", [{
            opacity: '0'
        }])
        setTimeout(function () {
            $('#pipetteTip1').css("top", "-80%")
            $('#pipetteTip1').css("left", "42%")
        }, 5000)
    },

    "disposeTip": function () {
        animate("#micropipetTopView", 0, "animate", [{
            "left": '35%',
            "top": '76%'
            }]);
    }, //step 72

    "clickLid": function () {
        animate("#lidSide, #micropipetTopView", 0, "animate", [{
            opacity: '0.0'
        }])
        animate("#lidSide, #micropipetTopView", 0, "css", [{
            display: "none"
        }])
        animate("#lidBox, .gelVoltage", 0, "removeClass", "opClass")
        animate("#lidBox, #gelVoltageCover, #powerSupplyUp, #powerSupplyDown, #voltage", 0, "animate", [{
            opacity: '1.0',
            }])
        $("#gelVoltageCover, #powerSupplyUp, #powerSupplyDown, #voltage").show()

    }, //step 73
    "setVoltage": function (evt) {
        if ("powerSupplyUp" == evt.currentTarget.id){
            updateVoltage(10);;
            $("#voltage").html(voltage);
        } else{
            updateVoltage(-10);;
            $("#voltage").html(voltage);
        }
        state["voltage"] = voltage

    },
    "setVoltagePost": function () {
        animate("#gelVoltageCover", 1000, "animate", [{
            opacity: '0.0',
            display: "none"
        }])
    }, //step 74
    "removeGelLid": function () {
        animate("#lidSide, #stainingTray", 0, "removeClass", "opClass")
        animate("#lidSide, #stainingTray", 0, "animate", [{
            display: "show",
            opacity: '1.0',

        }])
     $("#lidSide, #stainingTray").css({display:"block"});
        animate("#lidBox, #tipBoxTop, #wasteBinTop", 0, "animate", [{
            opacity: '0.0',
        }])
        animate("#lidBox, #tipBoxTop, #wasteBinTop", 0, "addClass", "opClass")
    }, //step 75
    "removeGel": function () {
        animate("#gelFinalTop", 0, "animate", [{
            top: '73.5%',
            left: '30.1%',
        }])
    }, //step 76
    "nudgeGel": function () {
        animate("#gelFinalTop", 0, "animate", [{
            top: '58.5%',
            left: '30.6%',
        }])

        animate("#topView, #topView *", 0, "animate", [{
            opacity: '0.0'
        }])
        animate("#topView, #topView *", 0, "addClass", "opClass")
        $("#day2 *, #day2, #bothDays, #bothDays *").resetKeyframe(function () {});
        animate("#graduatedCylinder, #stainingTraySide", 0, "removeClass", "opClass")
        $("#day2, #bothDays, #graduatedCylinder, #stainingTraySide").show()
        animate("#waterBathNoLid, #waterBathLid, #gelComb, #wasteBasket, #shelf1, #loadDyeCap", 0, "addClass", "opClass")


//        animate("#day2, #day2 *, #bothDays, #bothDays *", 0, "removeClass", "opClass")
//        animate("#day2, #day2 *, #bothDays, #bothDays *", 0, "animate", [{
//            opacity: '1.0',
//        }])
//        animate("#day2, #day2 *, #bothDays, #bothDays *", 0, "css", [{
//            display: "block",
//        }])


    }, //step 77
    "stainGel": function () {
        animate("#graduatedCylinder", 0, "keyframe", animdefs["anim_pourStain"])
        animate("#emptyGraduatedCylinder", 3000, "css", [{
         opacity: '1.0'
        }])
        animate("#emptyGraduatedCylinder,#stainedGel", 0, "removeClass", "opClass")
        animate("#emptyGraduatedCylinder,#stainedGel", 0, "css", [{
            opacity: '0.0'
        }])
        animate("#stainingTraySide", 3000, "addClass", "opClass")
        animate("#stainedGel", 1000, "keyframe", animdefs["anim_slowFadeIn"])

    }, //step 78
    "examineGel": function () {
        var contents = $("#gelFinalTop").contents();
        $("#gelFinalTop").empty();
        $("#gel").append(contents);
         loadSVGLogic();
        animate("#gel, #gel *", 0, "removeClass", "opClass")

        $("#gel, #gel *").css({
            opacity: 1.0,
            visibility: "visible",
            display:"block"
        }).animate({
            opacity: 1
        }, 200)
//        $("#answerButton").delay(1).animate({
//            opacity: '1.0'
//        });
//        $("#answerInput").delay(1).animate({
//            opacity: '1.0'
//        });

    }, //step 79
    "pickLane": function (evt) {
        var studentAnswer = evt.currentTarget.id.split("_")[1];
                console.log(evt.currentTarget.id);
                        console.log(answer);
        state["lanePickedNumber"] = studentAnswer
    },
    "pickLanePost": function () {
        animate("#day2, #day2 *", 1000, "animate", [{
            opacity: '0.0'
        }]);
        animate("#day2, #day2 *", 1000, "addClass", "opClass")

        animate("#day1", 2000, "removeClass", "opClass")
        animate("#day1", 2000, "animate", [{
            opacity: '1.0'
        }])
    }

}
