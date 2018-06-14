function loadSteps() {
    var volumeButton = document.getElementById("volumeButton");
    //var microtubeState = [0, 0, 0, 0, 0, 0];
    var microtubeAnimation = [{
        target: "Tube"
        , name: "anim_moveTube"
}, {
        target: "Cap"
        , name: "anim_rotateCap"
}, {
        target: "Cap"
        , name: "anim_closeCap"
}, {
        target: "Tube"
        , name: "anim_flickTube"
}, {
        target: "Tube"
        , name: "anim_tapTube"
}, {
        target: "Tube"
        , name: "anim_tubeDown"
}]
    var timerButton = document.getElementById("timerButton");
    var volumeButton1 = document.getElementById("volumeButton1");
    var sideTipMoveSpeed = 0.6;
    var directionsForSideTipMovement = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    var stepText = [
        {
            "id": "group1"
            , "shortText": "Transfer the enzyme mix"
            , "steps": [
                {
                    "id": "liftEnzyme"
                    , "shortText": "Enzyme mix"
                    , "longText": "Hover over the tube containing the enzyme mix"
                    , "bottomText": "Remove the enzyme mix from the ice"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#enzTube"
                        , "eventType": "mouseenter"
                        , "eventFunction": helperFunctions.liftEnzyme
                        , "postEventFunction": helperFunctions.liftEnzymePost
                    }
                }

                , {
                    "id": "openEnzyme"
                    , "shortText": "Open enzyme mix"
                    , "longText": "Click on the tube containing the enzyme mix"
                    , "bottomText": "Open the enzyme mix"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#enzTube"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.openEnzyme
                        , "postEventFunction": helperFunctions.openEnzymePost
                    }
                }

                , {
                    "id": "takeEnzyme"
                    , "shortText": "Use micropipette"
                    , "longText": "Click on any tip to place it on the pipette"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        //"eventSelector": "#tip1",
                        "eventSelector": ".tip"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.takeEnzyme
                    }
                }
                 , {
                    "id": "setVolume"
                    , "shortText": "Enter volume"
                    , "longText": "Enter the correct volume (in microliters) of fluid to remove"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#volumeButton"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.setVolume
                        , "postEventFunction": helperFunctions.setVolumePost
                        , "criteria": {
                            "variable": "volume"
                            , "value": 10
                            , "messageWrong": "Incorrect, please enter the approriate volume!"
                        }
                    }
                }
                , {
                    "id": "openTube"
                    , "shortText": "Open reaction tube"
                    , "longText": "Click on the reaction tube to open it"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#s0TubeBody"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.openTube
                        , "criteria": {
                            "variable": "microtubeState"
                            , "value": [2, 0, 0, 0, 0, 0]
                        }
                    }
                }
                , {
                    "id": "addEnzyme"
                        //                    , "shortText": "Add enzyme mix"
                        //                    , "longText": "Click on the micropipette to add the enzyme mix to the reaction tube"
                        
                    , "shortText": "Add enzyme mix"
                    , "longText": "Pipet 10 µl of enzyme mix into the very bottom of the tube"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#micropipet2"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.addEnzyme
                    }
                }
                , {
                    "id": "mixContents"
                    , "shortText": "Mix the Contents"
                    , "longText": "Pipet up and down carefully to mix well"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#mixContentsButton"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.mixContents
                        , "postEventFunction": helperFunctions.mixContentsPost
                    }
                }
                , {
                    "id": "replaceTip"
                    , "shortText": "Replace tip"
                    , "longText": "Zoom out and discard the tip. Return the pipette to the rack."
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#ejectButton"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.replaceTip
                    }
                }
                ]
        }
        , {
            "id": "group2"
            , "shortText": "Consolidate contents"
            , "steps": [
                {
                    "id": "closeTube"
                    , "shortText": "Close tube cap"
                    , "longText": "Click on the reaction tube to close the cap"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#s0TubeBody"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.closeTube
                        , "criteria": {
                            "variable": "microtubeState"
                            , "value": [4, 0, 0, 0, 0, 0]
                        }
                    }
                }
                , {
                    "id": "flickTube"
                    , "shortText": "Gently flick tube"
                    , "longText": "Click on the tube to gently flick it"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#s0TubeBody"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.flickTube
                        , "criteria": {
                            "variable": "microtubeState"
                            , "value": [6, 0, 0, 0, 0, 0]
                        }
                    }
                }
                , {
                    "id": "tapTube"
                    , "shortText": "Tap tube on lab bench"
                    , "longText": "Click on the tube to tap it on the lab bench, ensuring all contents are at the bottom"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#s0TubeBody"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.tapTube
                        , "criteria": {
                            "variable": "microtubeState"
                            , "value": [8, 0, 0, 0, 0, 0]
                        }
                    }
                }
            ]
        }, {
            "id": "group3"
            , "shortText": "Incubate the samples"
            , "steps": [
                {
                    "id": "tubeRack"
                    , "shortText": "Tubes in floating rack"
                    , "longText": "Click on each tube to place it in the floating rack"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#s0TubeBody"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.tubeRack
                        , "criteria": {
                            "variable": "microtubeState"
                            , "value": [10, 0, 0, 0, 0, 0]
                        }
                    }
                }
                , {
                    "id": "pressTube"
                    , "shortText": "Expose tube bottoms"
                    , "longText": "Click on the floating rack and push each tube down to expose bottoms to the water"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": ".pressButton"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.pressTube
                        , "criteria": {
                            "variable": "buttonPress"
                            , "value": [1, 1, 1, 1, 1, 1]
                        }
                    }
                }
                , {
                    "id": "removeLid"
                    , "shortText": "Remove lid"
                    , "longText": "Click on the water bath lid to remove it"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#waterBathLid"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.removeLid
                    }
                }, {
                    "id": "checkTemp"
                    , "shortText": "Check temperature"
                    , "longText": "Click on the thermometer to check if it is at 37 degrees Celsius"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#waterBathNoLid"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.checkTemp
                    }
                }, {
                    "id": "insertRack"
                    , "shortText": "Insert floating rack"
                    , "longText": "Zoom out, then click on the microtube holder to place it in the incubator"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#tubeBlock"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.insertRack
                    }
                }, {
                    "id": "closeLid"
                    , "shortText": "Close incubator"
                    , "longText": "Click on the lid to close the incubator"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#waterBathLid"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.closeLid
                    }
                }, {
                    "id": "setTimer"
                    , "shortText": "Set timer"
                    , "longText": "Incubate the tubes for 45 min at 37°C"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#timerButton"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.setTimer
                        , "criteria": {
                            "variable": "time"
                            , "value": 45
                        }
                    }
                }
            ]
        }, {
            "id": "group4"
            , "shortText": "Add Loading Dye"
            , "steps": [
                {
                    "id": "openDye"
                    , "shortText": "Open loading dye"
                    , "longText": "Click on the loading dye tube to open it"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": ".loadingDye"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.openDye
                    }
                }
                , {
                    "id": "takeDye"
                    , "shortText": "Use micropipette"
                    , "longText": "Click on the next tip to add it to the micropipette"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": ".tip"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.takeDye
                    }
                }
                , {
                    "id": "setDyeVolume"
                    , "shortText": "Enter volume"
                    , "longText": "Enter the correct volume (in microliters)"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#volumeButton2"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.setDyeVolume
                        , "postEventFunction": helperFunctions.setDyeVolumePost
                        , "criteria": {
                            "variable": "volume1"
                            , "value": 5
                            , "messageWrong": "Incorrect, please enter the approriate volume!"
                        }
                    }
                }, {
                    "id": "openTube1"
                    , "shortText": "Open reaction tube"
                    , "longText": "Click on the reaction tube to open it"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#s0TubeBody1"
                        , "eventType": "click"
                        , "eventFunction":function (){}
                        , "criteria": {
                            "variable": "microtubeState"
                            , "value": [12, 0, 0, 0, 0, 0]
                        }
                    }
                }
                , {
                    "id": "addDye"
                    , "shortText": "Add enzyme mix"
                    , "longText": "Click on the micropipette to add the loading dye to the reaction tube"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#micropipet3"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.addDye
                    }
                }, {
                    "id": "mixContents1"
                    , "shortText": "Mix the Contents"
                    , "longText": "Pipette rapidly up and down to mix contents"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#mixContentsButton1"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.mixContents1
                    }
                }, {
                    "id": "replaceTip1"
                    , "shortText": "Replace tip"
                    , "longText": "Zoom out and discard the tip"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#ejectButton1"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.replaceTip1
                    }
                }
                 , {
                    "id": "closeTube1"
                    , "shortText": "Close tube cap"
                    , "longText": "Click on the reaction tube to close the cap"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#s0Tube1"
                        , "eventType": "click"
                        , "eventFunction":  function(){}//helperFunctions.closeTube1
                        , "criteria": {
                            "variable": "microtubeState"
                            , "value": [14, 0, 0, 0, 0, 0]
                        }
                    }
                }
                , {
                    "id": "flickTube1"
                    , "shortText": "Gently flick tube"
                    , "longText": "Click on the tube to gently flick it"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#s0TubeBody"
                        , "eventType": "click"
                        , "eventFunction": function(){}
                        , "criteria": {
                            "variable": "microtubeState"
                            , "value": [16, 0, 0, 0, 0, 0]
                        }
                    }
                }
                , {
                    "id": "tapTube1"
                    , "shortText": "Tap tube on lab bench"
                    , "longText": "Click on the tube to tap it on the lab bench, ensuring all contents are at the bottom"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#s0TubeBody"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.openTube
                        , "criteria": {
                            "variable": "microtubeState"
                            , "value": [18, 0, 0, 0, 0, 0]
                        }
                    }
                }
                , {
                    "id": "tubeRack1"
                    , "shortText": "Tubes in floating rack"
                    , "longText": "Click on each tube to place it in the floating rack"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#s0TubeBody"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.openTube
                        , "criteria": {
                            "variable": "microtubeState"
                            , "value": [20, 0, 0, 0, 0, 0]
                        }
                    }
                }
            ]
        }, {
            "id": "group5"
            , "shortText": "Prepare gel"
            , "steps": [
                {
                    "id": "removeComb"
                    , "shortText": "Remove Comb"
                    , "longText": "Click on the gel comb to remove it"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#gelComb"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.removeComb
                    }
                }
                , {
                    "id": "toTop"
                    , "shortText": "Place gel tray"
                    , "longText": "Click on the gel electrophoresis chamber"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#gelSideView"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.toTop
                    }
                }
                , {
                    "id": "orientGel"
                    , "shortText": "Orient gel"
                    , "longText": "Click on one of the arrows to select the direction you'd like the wells to face in the electrophoresis chamber"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#arrowDown"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.orientGel
                    }
                }
//                , {
//                    "id": "pourBuffer"
//                    , "shortText": "Pour Buffer"
//                    , "longText": "Pour electrophoresis buffer into the chamber until it just covers the wells"
//                    , "feedbackText": "complete the third step"
//                }
            ]
        }, {
            "id": "group6"
            , "shortText": "Load HindIII into gel"
            , "steps": [
                {
                    "id": "addTipTop"
                    , "shortText": "Place tip"
                    , "longText": "Click on any tip in the tip box to add it to the pipette"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#tipBoxTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.addTipTop
                    }
                }
                , {
                    "id": "takeHind"
                    , "shortText": "DNA size marker"
                    , "longText": "Remove 10 uL of HindIII DNA size marker (grey tube)"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#ladderTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.takeHind
                    }
                }
                , {
                    "id": "toLane1"
                    , "shortText": "Put in Lane 1"
                    , "longText": "Press the number key of the corresponding lane to move the pipette. The leftmost lane is lane 1"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keypress"
                        , "eventFunction": helperFunctions.toLane1, //                        "criteria": {
                        //                            "variable": "checkLane",
                        //                            "value": leftIndex
                        //                        }
                    }
                }
                , {
                    "id": "insertTip"
                    , "shortText": "Insert tip"
                    , "longText": "Use the arrow keys to control the position of the tip in the well. Be sure not to breach the walls!"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keydown"
                        , "eventFunction": helperFunctions.insertTip
                    }
                }
                , {
                    "id": "disposeTip"
                    , "shortText": "Dispose of tip"
                    , "longText": "Click on the waste bin to dispose of the tip"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#wasteBinTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.disposeTip
                    }
                }

            ]
        }, {
            "id": "group7"
            , "shortText": "Load CS DNA into gel"
            , "steps": [
                {
                    "id": "addTipTop1"
                    , "shortText": "Place tip"
                    , "longText": "Click on a tip in the tip box to add it to the pipette"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#tipBoxTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.addTipTop
                    }
                }
                , {
                    "id": "takeCS"
                    , "shortText": "Crime Suspect DNA"
                    , "longText": "Remove 10 uL of crime suspect DNA"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#csTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.takeCS
                    }
                }
                , {
                    "id": "toLane2"
                    , "shortText": "Put in Lane 2"
                    , "longText": "Press the number key of the appropriate lane. The leftmost lane is lane 1"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keypress"
                        , "eventFunction": helperFunctions.toLane2
                    }
                }
                , {
                    "id": "insertTip"
                    , "shortText": "Insert tip"
                    , "longText": "Use the arrow keys to insert the tip into the well. Be sure not to breach the walls!"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keydown"
                        , "eventFunction": helperFunctions.insertTip
                    }
                }
                , {
                    "id": "disposeTip1"
                    , "shortText": "Dispose of tip"
                    , "longText": "Click on the waste bin to dispose of the tip"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#wasteBinTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.disposeTip1
                    }
                }
            ]
        }, {
            "id": "group8"
            , "shortText": "Load S1 DNA into gel"
            , "steps": [
                {
                    "id": "addTipTop2"
                    , "shortText": "Place tip"
                    , "longText": "Click on a tip in the tip box to add it to the pipette"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#tipBoxTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.addTipTop
                    }
                }
                , {
                    "id": "takeS1"
                    , "shortText": "Suspect 1 DNA"
                    , "longText": "Remove 10 uL of suspect 1 DNA"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#s1Top"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.takeS1
                    }
                }
                , {
                    "id": "toLane3"
                    , "shortText": "Put in Lane 3"
                    , "longText": "Press the number key of the appropriate lane. The leftmost lane is lane 1"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keypress"
                        , "eventFunction": helperFunctions.toLane3
                    }
                }
                , {
                    "id": "insertTip"
                    , "shortText": "Insert tip"
                    , "longText": "Use the arrow keys to insert the tip into the well. Be sure not to breach the walls!"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keydown"
                        , "eventFunction": helperFunctions.insertTip
                    }
                }
                , {
                    "id": "disposeTip2"
                    , "shortText": "Dispose of tip"
                    , "longText": "Click on the waste bin to dispose of the tip"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#wasteBinTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.disposeTip2
                    }
                }
            ]
        }, {
            "id": "group9"
            , "shortText": "Load S2 DNA into gel"
            , "steps": [
                {
                    "id": "addTipTop3"
                    , "shortText": "Place tip"
                    , "longText": "Click on a tip in the tip box to add it to the pipette"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#tipBoxTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.addTipTop
                    }
                }
                , {
                    "id": "takeS2"
                    , "shortText": "Suspect 2 DNA"
                    , "longText": "Remove 10 uL of suspect 2 DNA"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#s2Top"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.takeS2
                    }
                }
                , {
                    "id": "toLane4"
                    , "shortText": "Put in Lane 4"
                    , "longText": "Press the number key of the appropriate lane. The leftmost lane is lane 1"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keypress"
                        , "eventFunction": helperFunctions.toLane4
                    }
                }
                , {
                    "id": "insertTip"
                    , "shortText": "Insert tip"
                    , "longText": "Use the arrow keys to insert the tip into the well. Be sure not to breach the walls!"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keydown"
                        , "eventFunction": helperFunctions.insertTip
                    }
                }
                , {
                    "id": "disposeTip3"
                    , "shortText": "Dispose of tip"
                    , "longText": "Click on the waste bin to dispose of the tip"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#wasteBinTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.disposeTip3
                    }
                }
            ]
        }, {
            "id": "group10"
            , "shortText": "Load S3 DNA into gel"
            , "steps": [
                {
                    "id": "addTipTop4"
                    , "shortText": "Place tip"
                    , "longText": "Click on a tip in the tip box to add it to the pipette"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#tipBoxTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.addTipTop
                    }
                }
                , {
                    "id": "takeS3"
                    , "shortText": "Suspect 3 DNA"
                    , "longText": "Remove 10 uL of suspect 3 DNA"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#s3Top"
                        , "eventType": "click"
                        , "eventFunction": function (){}
                    }
                }
                , {
                    "id": "toLane5"
                    , "shortText": "Put in Lane 5"
                    , "longText": "Press the number key of the appropriate lane. The leftmost lane is lane 1"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keypress"
                        , "eventFunction": helperFunctions.toLane5
                    }
                }
                , {
                    "id": "insertTip"
                    , "shortText": "Insert tip"
                    , "longText": "Use the arrow keys to insert the tip into the well. Be sure not to breach the walls!"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keydown"
                        , "eventFunction": helperFunctions.insertTip
                    }
                }
                , {
                    "id": "disposeTip4"
                    , "shortText": "Dispose of tip"
                    , "longText": "Click on the waste bin to dispose of the tip"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#wasteBinTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.disposeTip4
                    }
                }
            ]
        }, {
            "id": "group11"
            , "shortText": "Load S4 DNA into gel"
            , "steps": [
                {
                    "id": "addTipTop5"
                    , "shortText": "Place tip"
                    , "longText": "Click on a tip in the tip box to add it to the pipette"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#tipBoxTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.addTipTop
                    }
                }
                , {
                    "id": "takeS4"
                    , "shortText": "Suspect 4 DNA"
                    , "longText": "Remove 10 uL of suspect 4 DNA"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#s4Top"
                        , "eventType": "click"
                        , "eventFunction": function(){} //helperFunctions.takesS4
                    }
                }
                , {
                    "id": "toLane6"
                    , "shortText": "Put in Lane 6"
                    , "longText": "Press the number key of the appropriate lane. The leftmost lane is lane 1"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keypress"
                        , "eventFunction": helperFunctions.toLane6
                    }
                }
                , {
                    "id": "insertTip"
                    , "shortText": "Insert tip"
                    , "longText": "Use the arrow keys to insert the tip into the well. Be sure not to breach the walls!"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keydown"
                        , "eventFunction": helperFunctions.insertTip
                    }
                }
                , {
                    "id": "disposeTip5"
                    , "shortText": "Dispose of tip"
                    , "longText": "Click on the waste bin to dispose of the tip"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#wasteBinTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.disposeTip5
                    }
                }
            ]
        }, {
            "id": "group12"
            , "shortText": "Load S5 DNA into gel"
            , "steps": [
                {
                    "id": "addTipTop6"
                    , "shortText": "Place tip"
                    , "longText": "Click on a tip in the tip box to add it to the pipette"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#tipBoxTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.addTipTop
                    }
                }
                , {
                    "id": "takeS5"
                    , "shortText": "Suspect 5 DNA"
                    , "longText": "Remove 10 uL of suspect 5 DNA"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#s5Top"
                        , "eventType": "click"
                        , "eventFunction": function() {}//helperFunctions.takesS5
                    }
                }
                , {
                    "id": "toLane7"
                    , "shortText": "Put in Lane 7"
                    , "longText": "Press the number key of the appropriate lane. The leftmost lane is lane 1"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keypress"
                        , "eventFunction": helperFunctions.toLane7
                    }
                }
                , {
                    "id": "insertTip"
                    , "shortText": "Insert tip"
                    , "longText": "Use the arrow keys to insert the tip into the well. Be sure not to breach the walls!"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "html"
                        , "eventType": "keydown"
                        , "eventFunction": helperFunctions.insertTip
                    }
                }
                , {
                    "id": "disposeTip6"
                    , "shortText": "Dispose of tip"
                    , "longText": "Click on the waste bin to dispose of the tip"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#wasteBinTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.disposeTip6
                    }
                }
            ]
        }, {
            "id": "group13"
            , "shortText": "Gel Electrophoresis"
            , "steps": [
                {
                    "id": "lidOnBox"
                    , "shortText": "Place lid on the gel box"
                    , "longText": "Click on the lid to place it on the gel electrophoresis chamber"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#lidSide"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.clickLid
                    }
                }
                , {
                    "id": "setVoltage"
                    , "shortText": "Set the voltage"
                    , "longText": "Click on the arrows to set the power to 100 volts. Allow the gel to run for 30-40 minutes."
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#powerSupplyUp #powerSupplyDown"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.setVoltage
                        , "postEventFunction": helperFunctions.setVoltagePost
                        , "criteria": {
                            "variable": "voltage"
                            , "value": 100
                        }
                    }
                }
                , {
                    "id": "removeGelLid"
                    , "shortText": "Remove Lid"
                    , "longText": "Click on the lid to remove it from the gel chamber"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#lidBox"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.removeGelLid
                    }
                }
                , {
                    "id": "removeGel"
                    , "shortText": "Remove gel"
                    , "longText": "Click on the staining tray to remove the gel from the gel chamber"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#stainingTray"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.removeGel
                    }
                }
                , {
                    "id": "nudgeGel"
                    , "shortText": "Nudge gel"
                    , "longText": "Click on the gel to nudge it onto the staining tray"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#gelFinalTop"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.nudgeGel
                    }
                }
            ]
        }, {
            "id": "group14"
            , "shortText": "Stain and analyze"
            , "steps": [
                {
                    "id": "stainGel"
                    , "shortText": "Stain the gel"
                    , "longText": "Click on the zoom out button. Then click on the graduated cylinder to stain the gel"
                    , "feedbackText": "complete the first step"
                    , "logic": {
                        "eventSelector": "#graduatedCylinder"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.stainGel
                    }
                }
                , {
                    "id": "examineGel"
                    , "shortText": "Examine the gel"
                    , "longText": "Click on the stained gel to examine it"
                    , "feedbackText": "complete the second step"
                    , "logic": {
                        "eventSelector": "#stainingTraySide"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.examineGel
                    }
                }
                , {
                    "id": "pickLane"
                    , "shortText": "Pick correct lane"
                    , "longText": "Which suspect's DNA matches the sample found at the crime scene? (Enter 1,2,3,4, or 5)"
                    , "feedbackText": "complete the third step"
                    , "logic": {
                        "eventSelector": "#answerButton"
                        , "eventType": "click"
                        , "eventFunction": helperFunctions.pickLane
                    }
                }
            ]
        }



    ];
    processSteps(stepText);
}
// Don't touch this
function processSteps(stepText) {
    var stepCount = -1;
    var groupCount = -1;
    for (i in stepText) {
        groupCount++;
        var newGroup = new StepGroup(stepText[i].id, stepText[i].shortText, "#group" + groupCount, "#groupIcon" + groupCount);
        game.addGroup(newGroup);
        for (j in stepText[i].steps) {
            var cur = stepText[i].steps[j];
            stepCount++;
            var newStep = new Step(cur, "#step" + stepCount, "#icon" + stepCount);
            game.addStep(newStep);
            newGroup.addStep(newStep);
        }
    }
    game.linkSteps();
    updateSteps();
}