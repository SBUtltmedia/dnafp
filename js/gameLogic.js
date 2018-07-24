// Game object
var game;
var hash;
var delayFactor = 1;
var criteriaPassed = false;
var UNLOCK_EVERYTHING = false;
var userNetID = "";
var firstName = "";
var netID = "";
var logic = {};
// Stats
var stats = {
    modeWins: [0, 0, 0]
    , challengeStates: [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    , unlocks: [false, false, false]
};

function message(text) {
    console.log("error")
    showOverlay()
    $('#results div,p').css({
        visibility: "hidden"
    });
    var messageBox = $("<div></div>");
    messageBox.attr("id", "messageBox");
    var message = $("<div></div>");
    message.attr("id", "message");
    message.html(text);
    messageBox.append(message);
    var button = $("<div>ok</div>");
    button.attr("id", "button");
    button.attr("class", "rounded stripes endOptionUnlocked");
    messageBox.append(button)
    $('#results').append(messageBox)
    $('#button').on("click", function () {
        $('#messageBox').remove();
        hideMenu();
    });
}
var modes = [
    {
        "title": "Trial Mode"
        , "unlockedDescription": "Read the lab manual, then complete the game based on the guided steps."
        , "lockedDescription": "Locked, do something to unlock Mode 1."
    }
    , {
        "title": "Coming soon!"
        , "lockedDescription": "Coming soon!"
    }
    , {
        "title": "Coming soon!"
        , "unlockedDescription": "Coming soon!"
        , "lockedDescription": "Coming soon!"
    }
];
// Set this to true to enable step skipping: click the active step object to complete it
var skipEnabled = false;
/*
    newGame: this function is called to start a new game with the specified parameters
    you can specify whatever parameters you like in the "props" object (current game mode, etc)
    also specify code that should be run when a new game starts
*/
function newGame(props) {
    // Create a new game object
    game = new Game(props);
    loadSteps();
    enterStepObjects();
    game.start();
    updateSteps();
    hideMenu();
    console.log("hit")
    animate("#indicatorArrow1", 50, "removeClass", "opClass");
    animate("#indicatorArrow1",0,"keyframe", animdefs["anim_oscillate1"])
    //
}

function stepFunction() {
    var currentStep = game.getCurrentStep();
    currentStep.logic.eventFunction();
}

function jumpToStep(stepName) {
    var whileCount = 0
    var stepList=[];
    var currentStep = game.getCurrentStep();
    //console.log(stopId, testMode, game.getCurrentStep().id, stopId)
    while (game.getCurrentStep().id != stepName && whileCount < 100) {
        console.log(testMode)
        console.log(game.getCurrentStep().id, stepName);
        criteriaPassed = true;
        currentStep = game.getCurrentStep();
//        if (game.getCurrentStep().id == "setVolume") {
//            console.log("foo")
//            animate("#view", 0, zoom, [50, 50, 1, 100])
//            $("#volumeInput").remove();
//            $("#volumeButton").remove();
//            game.nextStep();
//        }
        console.log(currentStep)
        startStep(currentStep)
        endStep(currentStep)
        whileCount++;
        $('#messageBox').remove();
        //endStep(currentStep);
        //game.nextStep();
        stepList.push(game.getCurrentStep().id)
    }
console.log(game.getCurrentStep())
      testMode = false;

    startStep(game.getCurrentStep())
 
//     setTimeout(function(){
//
//     testMode = false;
//
//},1000)
   // animate("#view", 0, zoom, [50, 50, 1, 100])

}

/*
    endGame: the "result" parameter should take the value of "win" or "lose"
    when the player wins, call endGame("win"); when they lose, call endGame("lose")
*/
function endGame(result) {
    gameStarted = false;
    postData();
    refreshHighScores();
    // Show the menu
    showMenu();
}

function failGame(error, correct) {
    $("#endErrorText1").text("You " + error);
    if (correct == "") {
        if (game.getCurrentStep() != null) {
            $("#endErrorText3").text(game.getCurrentStep().getFeedbackText() + ".");
        }
    }
    else {
        $("#endErrorText3").text(correct + ".");
    }
    if (game.getCurrentStep() != null) {
        game.getCurrentStep().fail();
    }
}
/*
    startStep: this function is called whenever a step starts
    this is the "set-up" phase for a particular step
    specify code that should be executed when a step starts (animations, etc)
*/
function startStep(step) {
//    if (game.getCurrentStep().id == "liftEnzyme") {
//        animate("#indicatorArrow1", 50, "removeClass", "opClass")
//    }
    
    
    var s = jQuery.extend(true, {}, step);
    //WORK FROM HERE
//    var arrowSelector = s.indicatorSelector || s.logic.eventSelector;
//    var $sl=  $(arrowSelector)
//    var forIndiArrowLeft = $sl.offsetLeft + $sl.width/2
//    var forIndiArrowTop = $sl.offsetTop
//    var forIndiArrowBot = $sl.offsetTop + $sl.height
//    if (s.logic.criteria && !(s.logic.criteria.variable in state)) 
//        {
//        state[s.logic.criteria.variable] ="";   
//            
//        }
    
    
//      animate(s.indicatorSelector||s.logic.eventSelector, 0, "keyframe", animdefs["anim_"])
//     $(s.pulseSelector||s.logic.eventSelector).playKeyframe(animdefs["anim_pulse"])
    //WORK UPTO THIS POINT
    
    $("#headerText").text(s.longText);
    $("#footerText").text(s.bottomText);
    var composite = function (evt) {
        evt.preventDefault();
        s.logic.eventFunction(evt)

        if (testMode && s.logic && s.logic.criteria) {
            state[s.logic.criteria.variable] = s.logic.criteria.value
        }


        
        if ((s.logic.criteria && isEqual(state[s.logic.criteria.variable], s.logic.criteria.value)) || !s.logic.criteria) {
            console.log("moving to next step", testMode,s.logic)
            $(s.logic.eventSelector).off()
            if (s.logic.postEventFunction) {
                console.log("calling "+s.logic)
                s.logic.postEventFunction()
            }
            game.nextStep()
                //$("#headerText").fadeTo(300, 0.25);
        }
        else if (s.logic.criteria.messageWrong) {
            state[s.logic.criteria.variable] = undefined;
            message(s.logic.criteria.messageWrong)
        }
    }

      $(s.logic.eventSelector).on(s.logic.eventType, composite);

    if (testMode) {
        $(s.logic.eventSelector).trigger(s.logic.eventType);
        $(s.logic.eventSelector).off();

    }

}

function isEqual(a, b) {
    if (a.length && b.length && a.length == b.length) {
        for (i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
        return true;
    }
    return a == b;
}
/*
    endStep: this function is called whenever a step ends
    this is the "clean-up" phase for a particular step
    specify code that should be executed when a step ends (animations, etc)
*/
function endStep(step) {
    
      // $(step.logic.eventSelector).resetKeyframe(function(){})
    
}
/*
    loadStartMenu: this function shows the menu at the start of the game
*/
function loadStartMenu() {
    // Set the header text
    $("#headerText").text("DNA Fingerprinting");
    // Set end text to welcome message
    //$("#endText").text(studentData.gameRecord.length > 0 ? "Welcome back!" : "Hello there!");
    // Set subtext to instructions
    $("#endSubText").text("Select a game mode to begin.");
    // Show subtext
    $("#endSubText").css({
        opacity: 1
    });
    // Hide error text
    $(".endErrorText").css({
        opacity: 0
    });
    // Show data report if user is admin
    if (isAdmin(userNetID)) {
        $("#dataReport").css({
            "opacity": 1
        });
    }
    else {
        $("#dataReport").css({
            "opacity": 0
        });
    }
    // High scores
    refreshHighScores();
    showMenu();
}

function refreshHighScores() {
    //    for (var i = 0; i < 3; i++) {
    //        if (studentData.unlocks[i]) {
    //            $("#scoreBox" + (i + 1)).text("Completed.");
    //        }
    //        else {
    //            $("#scoreBox" + (i + 1)).text("");
    //        }
    //    }
}

function showMenu() {
    showOverlay();
    if (showingChallenges) {
        $("#challengeButton").removeClass("anim_exitChButton");
        $("#challengeButton").addClass("anim_enterChButton2");
    }
    else {
        $("#challengeButton").removeClass("anim_exitChButton");
        $("#challengeButton").addClass("anim_enterChButton");
    }
    $("#challengeScreen").removeClass("anim_exitChallenges");
    $("#challengeScreen").addClass("anim_enterChallenges");
}

function showOverlay() {
    lockModes();
    enableClicks(true);
    // Make overlay visible
    $("#overlay").css({
        'opacity': 1
        , 'z-index': 100
    });
    // Show results screen
    $("#results").removeClass("anim_exitResults");
    $("#results").addClass("anim_enterResults");
    $("#overlayBG").removeClass("anim_fadeOutBG");
    $("#overlayBG").addClass("anim_fadeInBG");
}

function hideMenu() {
    // Make overlay invisible after it fades out
    setTimeout(function () {
        $("#overlay").css({
            'opacity': 0
            , 'z-index': -100
        });
    }, 500);
    // Hide results screen
    $("#results").removeClass("anim_enterResults");
    $("#results").addClass("anim_exitResults");
    $("#overlayBG").removeClass("anim_fadeInBG");
    $("#overlayBG").addClass("anim_fadeOutBG");
    $("#challengeButton").removeClass("anim_enterChButton");
    $("#challengeButton").removeClass("anim_enterChButton2");
    $("#challengeButton").addClass("anim_exitChButton");
    $("#challengeScreen").removeClass("anim_enterChallenges");
    $("#challengeScreen").addClass("anim_exitChallenges");
}

function lockModes() {
    for (var i = 0; i < 3; i++) {
        $("#endOptionText" + (i + 1)).text(modes[i].title);
    }
    unlockMode(0);
    //    for (var i = 1; i < 3; i++) {
    //        if (studentData.unlocks[i - 1] || UNLOCK_EVERYTHING) {
    //            unlockMode(i);
    //        }
    //        else {
    //            lockMode(i);
    //        }
    //    }
}

function unlockMode(i) {
    // Unlock
    $("#endOptionDescText" + (i + 1)).text(modes[i].unlockedDescription);
    $("#endOption" + (i + 1)).removeClass("endOptionLocked");
    $("#endOption" + (i + 1)).addClass("endOptionUnlocked");
}

function lockMode(i) {
    // Lock
    $("#endOptionDescText" + (i + 1)).text(modes[i].lockedDescription);
    $("#endOption" + (i + 1)).removeClass("endOptionUnlocked");
    $("#endOption" + (i + 1)).addClass("endOptionLocked");
}
