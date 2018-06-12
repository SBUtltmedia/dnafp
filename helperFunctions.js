var microtubeState = [0, 0, 0, 0, 0, 0];
var criteriaPassed;
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
var voltage = 0;
var volume = 0;
var tyty = 0;
var idArray = ["#s0Tube", "#tubeContentMixing3"]
var mix = 0;

function updateVoltage(amount) {
    voltage += amount;
    console.log(score)
}

function animate(selector, delay, method, param) {
    if (testMode) {
        delay = 0
    }
    if (typeof (method) == "function") {
        $(selector).delay(delay).queue(function () {
            method(...param)
            $(this).dequeue();
        })
    } else {
        //console.log(param.length)
        if (typeof (param) == "object") {
            $(selector).delay(delay)[method](...param)
        } else {
            $(selector).delay(delay).queue('fx', function () {
                $(selector)[method](param);
            });
        }
    }
}
var helperFunctions = {
    //step 0
    "liftEnzyme": function () {
        animate("#enzTube", 0, "addClass", "anim_moveEnz")
        //animate("#indicatorArrow1", 0, "addClass", "opClass")
        $("#indicatorArrow1").remove();
    }, //step 1
    "openEnzyme": function () {
        animate("#enzCap", 0, "addClass", "anim_rotateCap")
        //$("#enzCap").addClass("anim_rotateCap");
        //$("#indicatorArrow0").addClass("anim_oscillate");
        //        $("#indicatorArrow0").delay(950).animate({
        //            opacity: '1.0'
        //        });
        //animate("#indicatorArrow0", 0, "removeClass", "opClass")
        //        setTimeout(function () {
        //            // game.nextStep();
        //            updateScore(10);
        //            console.log(game.getCurrentStep().id)
        //        }, 500);
        state["firstStep"] = 45;
    },
    "openEnzymePost": function () {
        //        $("#indicatorArrow0").delay(50).animate({
        //            opacity: '0.0'
        //        });
        console.log("post function")
        animate("#indicatorArrow0", 0, "addClass", "anim_oscillate")
        //animate("#indicatorArrow0", 0, "removeClass", "opClass")
        $("#indicatorArrow0").removeClass("opClass")
        updateScore(10);
        console.log(game.getCurrentStep().id)
    }, //step 2
    "takeEnzyme": function (evt) {
        console.log(game.getCurrentStep().id)
        $("#indicatorArrow0").addClass("opClass")
        animate("#micropipet2", 0, "addClass", "anim_addTip1")
        //$("#micropipet2").addClass("anim_addTip1");
        //$("#tip1").addClass("anim_hideTip1");
        animate("#" + evt.target.id, 0, "addClass", "anim_hideTip1")
        //$("#" + evt.target.id).addClass("anim_hideTip1");
        animate("#pipetteTip1", 0, "addClass", "anim_showTip1")
        //$("#pipetteTip1").addClass("anim_showTip1")
        //        $("#indicatorArrow0").delay(50).animate({
        //            opacity: '0.0'
        //        });
        
        animate("#volumeButton,#volumeInput",5000,"animate",[{opacity: '1.0',top: '-8.9%'},10000]);
        
//        $("#volumeButton").delay(5000).animate({
//            opacity: '1.0'
//        });
//        $("#volumeInput").delay(5000).animate({
//            opacity: '1.0'
//        });
        animate("#view", 5000, zoom, [95, 36, 9.5, 2700])
        // $("#view").delay(5000, [zoom(95, 36, 9.5, 2700)]);
        //        setTimeout(function () {
        //            zoom(95, 36, 9.5, 2700)
        //        }, 5000);
        //        setTimeout(function () {
        //            // game.nextStep();
        //            // updateScore(10);
        //
        //        }, 5000);
    }, //step 3
    "setVolume": function () {
        console.log(game.getCurrentStep().id)
        state["volume"] = $("#volumeInput").val();
    },
    "setVolumePost": function () {
        // game.nextStep();
        updateScore(10);
        console.log(game.getCurrentStep().id)
        console.log("correct volume")
        //HAVE TO BE CONFIRMED
        animate("#volumeButton,#volumeInput",1,"animate",[{opacity: '0.0'}]);
/*
        $("#volumeButton").delay(1).animate({
            opacity: '0.0'
        });
        $("#volumeInput").delay(1).animate({
            opacity: '0.0'
        });
*/
        animate("#view", 0, zoom, [50, 50, 1, 1000])
        //zoom(50, 50, 1, 1000)
        animate("#micropipet2", 1100, "addClass", "anim_lowerPipet")
        //$("micropipet2").addClass("anim_lowerPipet")
        //        $("#micropipet2").animate({
        //            top: -7%
        //        });
        //animate("#pipetteTip1", 1100, "addClass", "anim_lowerTip1")
        //        setTimeout(function () {
        //            $("#micropipet2").addClass("anim_lowerPipet");
        //            $("#tip1").addClass("anim_lowerTip1");
        //        }, 1100);
    }, //step 4
    "openTube": function (evt) {
        //        var tubeIdName = evt.target.id.split("TubeBody")[0]
        //        var tubeNum = parseInt(tubeIdName.split('')[1])
        //        var currentAnimation = microtubeAnimation[microtubeState[tubeNum]]
        //        console.log(currentAnimation)
        //        var selector = "#" + tubeIdName + currentAnimation.target;
        //        $.each(microtubeAnimation, function (index, value) {
        //            $(selector).removeClass(value.name)
        //        })
        state["microtubeState"][0] = 1;
        console.log(state["microtubeState"])
        if (state["microtubeState"][0] == 1) {
            animate("#s0Tube", 0, "addClass", "anim_moveTube")
            animate("#s0Cap", 0, "addClass", "anim_rotateCap")
            state["microtubeState"][0]++;
        }
        //state["microtubeState"][0]++
        console.log(state["microtubeState"])
        //console.log(selector, currentAnimation.name)
        //$(selector).addClass(currentAnimation.name)
        //microtubeState[tubeNum]++
        //microtubeState[tubeNum] %= microtubeAnimation.length;
        //console.log(microtubeState)
    }, //step 5
    "addEnzyme": function () {
        //animate("#tip1", 0, "addClass", "anim_tipToTube1")
        $("#tip1").addClass("anim_tipToTube1");
        //animate("#micropipet2", 0, "addClass", "anim_pipetToTube1")
        //
        //
        //THIS IS A PROBLEM AND I DONT KNOW WHY
        //
        //
        $("#micropipet2").addClass("anim_pipetToTube1");
        //animate("#indicatorArrow2", 0, "addClass", "anim_oscillate2")
        $("#indicatorArrow2").addClass("anim_oscillate2");

        //HAVE TO BE CONFIRMED
        animate("#indicatorArrow2",1800,"animate",[{opacity: '1.0'}]);
/*
        $("#indicatorArrow2").delay(1800).animate({
            opacity: '1.0'
        });
*/
        
        //            setTimeout(function () {
        //                zoom(80, 60, 8, 6000)
        //            }, 1900);
        //        setTimeout(function () {
        //            // game.nextStep();
        //            updateScore(10);
        //            console.log(game.getCurrentStep().id)
        //        }, 2500);
    }, //step 6
    "mixContents": function () {
        animate("#view", 0, zoom, [39, 67, 12, 1050])
        //zoom(39, 67, 12, 1250)

        //HAVE TO BE CONFIRMED
        animate("#zoomOutButton1",4000,"animate",[{opacity: '1.0'}]);
/*
        $("#zoomOutButton1").delay(4000).animate({
            opacity: '1.0'
        });
*/
        
        if (mix == 0) {
            for (i = 0; i <= 14; i++) {
                console.log(i);
                if (i == 1) {
                    $("s0Tube").addClass("opClass")
                    $("#tip1").addClass("opClass")
                }
                if (i % 2 == 1) {
                    $("#s0TubeBody").fadeTo(400, 0);
                    $("#tubeContentMixing3").fadeTo(400, 1);
                    console.log("foo")
                } else if (i % 2 == 0) {
                    $("#s0TubeBody").fadeTo(400, 1);
                    $("#tubeContentMixing3").fadeTo(400, 0);
                    console.log("bar")
                }
                setTimeout(function () {
                    mix = i;
                    console.log(mix)
                }, 3000);
            }
        }

        //HAVE TO BE CONFIRMED
        animate("#zoomOut",9500,"animate",[{opacity: '1.0'}]);        
/*
        $("#zoomOut").delay(950).animate({
            opacity: '1.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#indicatorArrow2",80,"animate",[{opacity: '0.0'}]);                
/*
        $("#indicatorArrow2").delay(80).animate({
            opacity: '0.0'
        });
*/
        
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
        }, 1500);
    },
    "mixContentsPost": function () {
        setTimeout(function () {
            //$("#tubeContentMixing3").remove()
            console.log("done")
        }, 4000)
    }, //step 7
    //
    //
    //
    //
    //
    // How will the animate function deal with .attr?
    //
    //
    //
    "replaceTip": function () {
        //$("#tip1").attr("class","anim_ejectTip");
        //animate("#tip1", 0, zoom, [39, 67, 12, 1250])
        $("#tip1").attr("class", "anim_tipToBin");
        $("#pipetteTip1").attr("class", "anim_hideTip1")
        $("#micropipet2").attr("class", "micropipet anim_pipetToBin");

        //HAVE TO BE CONFIRMED
        animate("#indicatorArrow3",50,"animate",[{opacity: '1.0'}]);
/*
        $("#indicatorArrow3").delay(50).animate({
            opacity: '0.0'
        });
*/
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            //game.setCurrentStep(takeEnzyme)
            console.log(game.getCurrentStep().id)
        }, 1700);
    },
    "closeTube": function (evt) {
        state["microtubeState"][0] = 3;
        console.log(state["microtubeState"])
        if (state["microtubeState"][0] == 3) {
            //animate("#s0Cap", 0, "addClass", "anim_closeCap")
            $("#s0Cap").addClass("anim_closeCap")
            state["microtubeState"][0]++;
            console.log(state["microtubeState"])
        }
        //state["microtubeState"][0]++
    },
    "flickTube": function (evt) {
        state["microtubeState"][0] = 5;
        console.log(state["microtubeState"])
        if (state["microtubeState"][0] == 5) {
            //animate("#s0Tube", 0, "addClass", "anim_flickTube")
            $("#s0Tube").addClass("anim_flickTube")
            state["microtubeState"][0]++;
        }
        //state["microtubeState"][0]++
        console.log(state["microtubeState"])
    },
    "tapTube": function () {
        state["microtubeState"][0] = 7;
        console.log(state["microtubeState"])
        if (state["microtubeState"][0] == 7) {
            //animate("#s0Tube", 0, "addClass", "anim_tapTube")
            $("#s0Tube").addClass("anim_tapTube")
            state["microtubeState"][0]++;
        }
        //state["microtubeState"][0]++
        console.log(state["microtubeState"])
    },
    "tubeRack": function () {
        state["microtubeState"][0] = 9;
        console.log(state["microtubeState"])
        if (state["microtubeState"][0] == 9) {
            animate("#s0Tube", 0, "addClass", "anim_tubeDown")
            
            //HAVE TO BE CONFIRMED
            animate("#s0Tube",0,"animate",[{top: '-8.9%'}]);        
/*
            $("#s0Tube").animate({
                "top": '-8.9%'
            })
*/
            
            state["microtubeState"][0]++;
        }
        //state["microtubeState"][0]++
        console.log(state["microtubeState"])
    }, //step 12
    "pressTube": function (evt) {
        var buttonPress = state[game.getCurrentStep().logic.criteria.variable]
        var buttonNum = betterParseInt(evt.target.id)
        console.log(buttonNum)
        buttonPress[buttonNum]++;
        console.log(buttonPress)
        //animate(currentButton, 0, "addClass", "opClass")
        //$(document.getElementsByClassName("pressButton")[buttonNum]).remove();
        if (buttonPress.indexOf(0) == -1) {
            // if ((jQuery.inArray(0, buttonPress)) == -1) {
        }
    }, //step 13
    "removeLid": function () {
        var top1 = document.getElementsByClassName("topView")

        //        if (top1[9].classList[1] == "opClass") {
        //            console.log("foo")
        //            $("#stainingTray").animate({
        //                opacity: '1.0'
        //            });
        //        }

        //animate("#waterBathLid", 0, "addClass", "anim_removeLid")
        $("#waterBathLid").addClass("anim_removeLid")
        //$("#waterBathLid").addClass("anim_removeLid");
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
        }, 300);
    }, //step 14
    "checkTemp": function () {
        criteriaPassed = true;
        animate("#view", 0, zoom, [65, 21, 10, 1000])
        //zoom(65, 21, 10, 1000)

        //HAVE TO BE CONFIRMED
        animate("#zoomOutButton",1600,"animate",[{opacity: '1.0'}]);        
/*
        $("#zoomOutButton").delay(1600).animate({
            opacity: '1.0'
        });
*/
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
        }, 300);
    }, //
    //
    //
    // How will the animate function deal with .attr?
    //
    //
    //
    //step 15
    "insertRack": function () {
        animate("#tubeBlock", 0, "addClass", "anim_insertRack")
        //$("#tubeBlock").addClass("anim_insertRack");
        $("#s0Tube").attr("class", "microTube anim_insertTube0");
        $("#s1Tube").attr("class", "microTube anim_insertTube1");
        $("#s2Tube").attr("class", "microTube anim_insertTube2");
        $("#s3Tube").attr("class", "microTube anim_insertTube3");
        $("#s4Tube").attr("class", "microTube anim_insertTube4");
        $("#s5Tube").attr("class", "microTube anim_insertTube5");
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
        }, 300);
    }, //
    //
    //
    //
    //step 16
    "closeLid": function () {
        //animate("#waterBathLid", 0, "addClass", "anim_replaceLid")
        $("#waterBathLid").addClass("anim_replaceLid");
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
        }, 500);
        animate("#view", 1000, zoom, [65, 36, 5, 1500])

        //HAVE TO BE CONFIRMED
        animate("#button",1000,"animate",[{opacity: '1.0'}]);        
/*
        $("button").delay(1000).animate({
            opacity: '1.0'
        });
*/
        //        setTimeout(function () {
        //            zoom(65, 36, 5, 1500)
        //            $("button").delay(1).animate({
        //                opacity: '1.0'
        //            });
        //        }, 1000);
    }, //step 17
    "setTimer": function () {
        //if ((game.getCurrentStep().id == "setTimer")){
        var time = $("#timer").val();
        if (time != 45) {
            updateScore(-10);
        }
        if (time == 45) {
            console.log(game.getCurrentStep().id)

            //HAVE TO BE CONFIRMED
            animate("#button,#timer",1,"animate",[{opacity: '0.0'}]);        
/*
            $("button").delay(1).animate({
                opacity: '0.0'
            });
            $("#timer").delay(1).animate({
                opacity: '0.0'
            });
*/
            //zoom(50, 50, 1, 1000)
            animate("#view", 0, zoom, 50, 50, 1, 1000)

            //HAVE TO BE CONFIRMED
            animate("#day1",1000,"animate",[{opacity: '0.0'}]);
/*
            $("#day1").delay(1000).animate({
                opacity: '0.0'
            });
*/
            //            setTimeout(function () {
            //                $("#day1").delay(1).animate({
            //                    opacity: '0.0'
            //                });
            //            }, 1000);
            $('#timerButton').delay(2000).queue(function () {
                $(this).dequeue();
            });

            //            function changeDay() {
            //                animate("#topView", 0, "removeClass", "opClass")
            //                $("#topView").animate({
            //                    opacity: '1.0'
            //                })
            //                animate("#day2", 0, "addClass", "opClass")
            //            }


            //            setTimeout(function () {
            //                //converted to single function in event logic (changeDay)
            //                $("#day2").delay(1).animate({
            //                    opacity: '1.0'
            //                });
            //                $("#day2").addClass("anim_changeDay2");
            //                $("#day1").addClass("anim_changeDay1");
            //                $("#powerSupply").delay(1).animate({
            //                    opacity: '1.0'
            //                });
            //                $("#powerSupplyUp").delay(1).animate({
            //                    opacity: '1.0'
            //                });
            //                $("#powerSupplyDown").delay(1).animate({
            //                    opacity: '1.0'
            //                });
            //                $("#voltage").delay(1).animate({
            //                    opacity: '1.0'
            //                });
            //                $("#gelSideView").delay(1).animate({
            //                    opacity: '1.0'
            //                });
            //            }, 2000);
            setTimeout(function () {
                // game.nextStep();
                updateScore(10);
                console.log(game.getCurrentStep().id)
            }, 2700);
        };
    }, //step 18
    "openDye": function (evt) {
        animate("#loadDye", 0, "addClass", "anim_moveLoadingDye")
        //$("#loadDye").addClass("anim_moveLoadingDye")
        animate("#loadDyeCap", 0, "addClass", "anim_rotateCap")
        //$("#loadDyeCap").addClass("anim_rotateCap")
        console.log(game.getCurrentStep().id)
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
        }, 100);
    }, //step 19
    "takeDye": function () {
        console.log("1234")

        //HAVE TO BE CONFIRMED
        animate("#volumeButton1,#volumeInput1",5000,"animate",[{opacity: '1.0'}]);        
/*
        $("#volumeButton1").delay(5000).animate({
            opacity: '1.0'
        });
        $("#volumeInput1").delay(5000).animate({
            opacity: '1.0'
        });
*/
        $("#micropipet3").animate({
            top: '-=6%'
        });
        $("#holder").css('z-index', '3');
        $(".tip").css('z-index', '3');
        //
        //
        //Figure out
        //
        //
        
        //HAVE TO BE CONFIRMED
        animate("#micropipet3",200,"animate",[{left: '+=5.5%'}]);        
/*
        $("#micropipet3").delay(200).animate({
            left: '+=5.5%'
        });
*/
        $("#micropipet3").delay(200).css('z-index', '1');
        //        setTimeout(function () {
        ////            $("#micropipet3").animate({
        ////                left: '+=5.5%'
        ////            });
        //            $("#micropipet3").css('z-index', '1');
        //        }, 200);

        //HAVE TO BE CONFIRMED
        animate("#micropipet3",600,"animate",[{top: '+=3.3%'}]);        
/*
        $("#micropipet3").delay(600).animate({
            top: '+=3.3%'
        });
*/
        
        //        setTimeout(function () {
        //            $("#micropipet3").animate({
        //                top: '+=3.3%'
        //            });
        //        }, 600);

        //HAVE TO BE CONFIRMED
        animate("#micropipet3",1500,"animate",[{top: '1%',
                                                left: '+=0.9%',
                                                transform: "scale(0.8)"}]);        
/*
        $("#micropipet3").delay(1500).animate({
            top: '1%',
            left: '+=0.9%',
            transform: "scale(0.8)"
        });
*/
        //        setTimeout(function () {
        //            $("#micropipet3").animate({
        //                top: '1%',
        //                left: '+=0.9%',
        //                transform: "scale(0.8)"
        //            });
        //        }, 1500);

        //HAVE TO BE CONFIRMED
        animate("#tip",1500,"animate",[{opacity: '1.0',
                                        top: '22.3%',
                                        left: '+=0.9%', 
                                        transform: "scale(0.8)"}]);        
/*
        $("#tip").delay(1500).animate({
            opacity: '1.0',
            top: '22.3%',
            left: '+=0.9%',
            transform: "scale(0.8)"
        });
*/
        //        setTimeout(function () {
        //            $("#tip").animate({
        //                opacity: '1.0',
        //                top: '22.3%',
        //                left: '+=0.9%',
        //                transform: "scale(0.8)"
        //            });
        //        }, 1500);

        //HAVE TO BE CONFIRMED
        animate("#micropipet3,#tip",2100,"animate",[{top: '+=4.4%'}]);        
/*
        $("#micropipet3").delay(2100).animate({
            top: '+=4.4%'
        });
        $("#tip").delay(2100).animate({
            top: '+=4.4%'
        });

*/
        //        setTimeout(function () {
        //            $("#micropipet3").animate({
        //                top: '+=4.4%'
        //            });
        //        }, 2100);

        //        setTimeout(function () {
        //            $("#tip").animate({
        //                top: '+=4.4%'
        //            });
        //        }, 2100);
        animate("#view", 3000, zoom, [23, 12, 7, 1400])
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            //zoom(23, 12, 7, 1400)
            console.log(game.getCurrentStep().id)
        }, 3000);
    }, //step 20
    "setDyeVolume": function () {
        console.log(game.getCurrentStep().id)
        var volume1 = $("#volumeInput1").val();
        if (volume != 5) {
            alert("Incorrect. Please enter the appropriate volume")
            updateScore(-10);
            console.log("wrong volume")
        }
        if (volume1 == 5) {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
            console.log("correct volume")

            //HAVE TO BE CONFIRMED
            animate("#button,#volumeInput1",1,"animate",[{opacity: '0.0'}]);        
/*
            $("button").delay(1).animate({
                opacity: '0.0'
            });
            $("#volumeInput1").delay(1).animate({
                opacity: '0.0'
            });
*/
            animate("#view", 0, zoom, [50, 50, 1, 1000])
            //zoom(50, 50, 1, 1000)
        }
    }, //step 22
    "addDye": function () {

        //HAVE TO BE CONFIRMED
        animate("#micropipet3,#tip",0,"animate",[{top: '-=4.4%'}]);        
/*
        $("#micropipet3").animate({
            top: '-=4.4%'
        });
        $("#tip").animate({
            top: '-=4.4%'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#micropipet3,#tip",400,"animate",[{left: '+=13.3%',
                                                    top: '+=38%'}]);        
/*
        $("#micropipet3").delay(400).animate({
            left: '+=13.2%',
            top: '+=38%'
        });
        $("#tip").delay(400).animate({
            left: '+=13.3%',
            top: '+=38.8%'
        });
*/

        //        setTimeout(function () {
        //            $("#micropipet3").animate({
        //                left: '+=13.2%',
        //                top: '+=38%'
        //            });
        //        }, 400);
        //        setTimeout(function () {
        //            $("#tip").animate({
        //                left: '+=13.3%',
        //                top: '+=38.8%'
        //            });
        //        }, 400);
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
        }, 600);
    }, //step 23
    "mixContents1": function () {
        animate("#view", 0, zoom, [39, 67, 12, 1250])
        //zoom(39, 67, 12, 1250)

        //HAVE TO BE CONFIRMED
        animate("#zoomOutButton1",4000,"animate",[{opacity: '1.0'}]);        
/*
        $("#zoomOutButton1").delay(4000).animate({
            opacity: '1.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#s0Tube1",1250,"animate",[{opacity: '0.0'}]);        
/*
        $("#s0Tube1").delay(1250).animate({
            opacity: '0.0'
        });
*/
        //            $("#tubeContentMixing2").delay(1250).animate({
        //                opacity: '0.0'
        //            });
        //HAVE TO BE CONFIRMED
        animate("#tubeContentMixing4",1250,"animate",[{opacity: '1.0'}]);
/*
        $("#tubeContentMixing4").delay(1250).animate({
            opacity: '1.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#s0Tube1",12,"animate",[{opacity: '1.0'}]);        
/*
        $("#s0Tube1").delay(12).animate({
            opacity: '1.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#tubeContentMixing4,#s0Tube1",12,"animate",[{opacity: '0.0'}]);        
/*
        $("#tubeContentMixing4").delay(12).animate({
            opacity: '0.0'
        });
        $("#s0Tube1").delay(12).animate({
            opacity: '0.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#tubeContentMixing4,#s0Tube1",12,"animate",[{opacity: '1.0'}]);        
/*
        $("#tubeContentMixing4").delay(12).animate({
            opacity: '1.0'
        });
        $("#s0Tube1").delay(12).animate({
            opacity: '1.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#tubeContentMixing4,#s0Tube1",12,"animate",[{opacity: '0.0'}]);        
/*
        $("#tubeContentMixing4").delay(12).animate({
            opacity: '0.0'
        });
        $("#s0Tube1").delay(12).animate({
            opacity: '0.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#tubeContentMixing4,#s0Tube1",12,"animate",[{opacity: '1.0'}]);        
/*
        $("#tubeContentMixing4").delay(12).animate({
            opacity: '1.0'
        });
        $("#s0Tube1").delay(12).animate({
            opacity: '1.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#tubeContentMixing4,#s0Tube1",12,"animate",[{opacity: '0.0'}]);        
/*
        $("#tubeContentMixing4").delay(12).animate({
            opacity: '0.0'
        });
        $("#s0Tube1").delay(12).animate({
            opacity: '0.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#tubeContentMixing4,#s0Tube1",12,"animate",[{opacity: '1.0'}]);        
/*
        $("#tubeContentMixing4").delay(12).animate({
            opacity: '1.0'
        });
        $("#s0Tube1").delay(12).animate({
            opacity: '1.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#tubeContentMixing4,#s0Tube1",12,"animate",[{opacity: '0.0'}]);        
/*
        $("#tubeContentMixing4").delay(12).animate({
            opacity: '0.0'
        });
        $("#s0Tube1").delay(12).animate({
            opacity: '0.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#tubeContentMixing4,#s0Tube1",12,"animate",[{opacity: '1.0'}]);        
/*
        $("#tubeContentMixing4").delay(12).animate({
            opacity: '1.0'
        });
        $("#s0Tube1").delay(12).animate({
            opacity: '1.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#tubeContentMixing4",12,"animate",[{opacity: '0.0'}]);        
/*
        $("#tubeContentMixing4").delay(12).animate({
            opacity: '0.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#zoomOutButton1a",3800,"animate",[{opacity: '1.0'}]);        
/*
        $("#zoomOutButton1a").delay(3800).animate({
            opacity: '1.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#indicatorArrow2",80,"animate",[{opacity: '0.0'}]);
/*
        $("#indicatorArrow2").delay(80).animate({
            opacity: '0.0'
        });
*/
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
        }, 1500);
    }, //step 24
    "replaceTip1": function () {
        //$("#tip1").attr("class","anim_ejectTip");
        $("#tip").attr("class", "anim_tipToBin");
        $("#micropipet3").attr("class", "micropipet anim_pipetToBin");
        $("#indicatorArrow3").delay(50).animate({
            opacity: '0.0'
        });
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            //game.setCurrentStep(takeEnzyme)
            console.log(game.getCurrentStep().id)
        }, 1700);
    }, //step 29
    "removeComb": function () {
        $("#gelComb").delay(50).animate({
            top: '-=5%'
        });
        $("#gelComb").delay(150).animate({
            opacity: '0.0'
        });
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            //game.setCurrentStep(takeEnzyme)
            console.log(game.getCurrentStep().id)
        }, 300);
    }, //step 30
    "toTop": function () {
        $("#topView").addClass("anim_toTopView1")
        $("#day2").addClass("anim_toTopView2")
        $("#day1").addClass("anim_toTopView2")
        $("#gelTopView").addClass("anim_toTopView1")
        $("#labBenchTop").addClass("anim_toTopView1")
        //$("#tipBoxTop").addClass("anim_tipVisible")

        //HAVE TO BE CONFIRMED
        animate("#tipBoxTop",0,"animate",[{opacity: '1.0'}]);        
/*
        $("#tipBoxTop").animate({
            opacity: '1.0'
        });
*/
        //HAVE TO BE CONFIRMED
        animate("#arrowDown,#arrowUp,#labBenchTop,#gelTopView,#lidSide,#powerSupplyTop,.holderTop,.tipBoxTop,#wasteBinTop,#zoomOutButton2",1,"animate",[{opacity: '1.0'}]);
/*        $("#arrowDown").delay(1).animate({
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
*/
        //HAVE TO BE CONFIRMED
        animate("#zoomOutButton3,#powerSupplyUp,#powerSupplyDown,#tip",1,"animate",[{opacity: '0.0'}]);        
/*
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
*/
        
        setTimeout(function () {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
        }, 300);
    }, //step 31
    "orientGel": function () {
        
        //HAVE TO BE CONFIRMED
        animate("#gelTrayTop,#micropipetTopView,.side",1,"animate",[{opacity: '1.0'}]);
        animate("#arrowDown,#arrowUp",1,"animate",[{opacity: '1.0'}]);
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
            console.log(game.getCurrentStep().id)
        }, 300);
    }, //step 32, 37, 42
    "addTipTop": function () {
        
        //HAVE TO BE CONFIRMED
        animate("#micropipetTopView",0,"animate",[{"left": '31.5%',
                                                   "top": '64%'}]);
/*
        $("#micropipetTopView").animate({
            "left": '31.5%',
            "top": '64%'
        });
*/
    }, //step 33
    "takeHind": function (evt) {
        i
        console.log(evt.target.id)
        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);
        console.log(game.getCurrentStep().id)
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
            console.log("foo")
            // game.nextStep();
            updateScore(10);
        };
        //movePipetTop(wellTop[arrayIndex])
        //     $("#micropipetTopView").animate({top: '${newTop}%;'});     
    }, //step 35,40
    "insertTip": function (evt) {
        var arrayIndex = evt.keyCode - 37;
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
        console.log(game.getCurrentStep().id)
    }, //step 38
    "takeCS": function (evt) {
        console.log(evt.target.id)
        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);
        console.log(game.getCurrentStep().id)
    }, //step 39
    "toLane2": function (evt) {
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
            console.log("foo")
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
        console.log(game.getCurrentStep().id)
    }, //step 43
    "takeS1": function (evt) {
        console.log(evt.target.id)
        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);
        console.log(game.getCurrentStep().id)
    }, //step 44
    "toLane3": function (evt) {
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
            console.log("foo")
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
        console.log(game.getCurrentStep().id)
    }, //step 48
    "takeS2": function (evt) {
        console.log(evt.target.id)
        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);
        console.log(game.getCurrentStep().id)
    }, //step 49
    "toLane4": function (evt) {
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
            console.log("foo")
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
        console.log(game.getCurrentStep().id)
    }, //step 53
    "takeS2": function (evt) {
        console.log(evt.target.id)
        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);
        console.log(game.getCurrentStep().id)
    }, //step 54
    "toLane4": function (evt) {
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
            console.log("foo")
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
        console.log(game.getCurrentStep().id)
    }, //step 58  
    "takeS3": function (evt) {
        console.log(evt.target.id)
        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);
        console.log(game.getCurrentStep().id)
    }, //step 59
    "toLane5": function (evt) {
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
            console.log("foo")
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
        console.log(game.getCurrentStep().id)
    }, //step 63
    "takeS4": function (evt) {
        console.log(evt.target.id)
        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);
        console.log(game.getCurrentStep().id)
    }, //step 64
    "toLane6": function (evt) {
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
            console.log("foo")
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
        console.log(game.getCurrentStep().id)
    }, //step 68
    "takeS5": function (evt) {
        console.log(evt.target.id)
        $("#micropipetTopView").animate({
            "left": '36.5%',
            "top": '15.5%'
        });
        // game.nextStep();
        updateScore(10);
        console.log(game.getCurrentStep().id)
    }, //step 69
    "toLane7": function (evt) {
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
            console.log("foo")
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
        console.log(game.getCurrentStep().id)
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
        //            console.log(game.getCurrentStep().id)
        //        }, 1500);
    }, //step 73
    "setVoltage": function () {
        $("#powerSupplyUp").click(function () {
            updateVoltage(10);
            console.log(voltage);
            $("#voltage").val(voltage);
        });
        $("#powerSupplyDown").click(function () {
            updateVoltage(-10);
            console.log(voltage);
            $("#voltage").val(voltage);
        });
        if (voltage == 100) {
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
            updateVoltage(10);
            console.log(voltage);
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
            updateVoltage(-10);
            console.log(voltage);
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
    "removeLid": function () {
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
        console.log(answer)
    }, //step 79 
    "pickLane": function () {
        var studentAnswer = $("#answerInput").val();
        if (studentAnswer != (answer - 2)) {
            alert("Incorrect. Please select the correct lane")
            updateScore(-50);
            console.log("wrong lane")
        }
        if (studentAnswer == (answer - 2)) {
            // game.nextStep();
            updateScore(10);
            console.log(game.getCurrentStep().id)
            console.log("correct lane")
            endGame("win");
        }
    },

    "timerClicked": function () {
        //if ((game.getCurrentStep().id == "setTimer")){
        var time = $("#timer").val();
        console.log(time)
        if (time != 45) {
            updateScore(-10);
        }
        if (time == 45) {
            console.log(game.getCurrentStep().id)
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
                $("#day2").addClass("anim_changeDay2");
                $("#day1").addClass("anim_changeDay1");
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
                console.log(game.getCurrentStep().id)
            }, 2700);
        };
    },
    "toTopView": function () {
        $("#topView").addClass("anim_toTopView1")
        $("#day2").addClass("anim_toTopView2")
        $("#day1").addClass("anim_toTopView2")
        $("#gelTopView").addClass("anim_toTopView1")
        $("#labBenchTop").addClass("anim_toTopView1")
        //$("#tipBoxTop").addClass("anim_tipVisible")
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
            console.log(game.getCurrentStep().id)
        }, 300);
    }
}
