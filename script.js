let breakIncrementButton = document.getElementById('break-increment');
let breakDecrementButton = document.getElementById('break-decrement');
let sessionIncrementButton = document.getElementById('session-increment');
let sessionDecrementButton = document.getElementById('session-decrement');
let startStopButton = document.getElementById('start_stop');
let resetButton = document.getElementById('reset');
let breakLength = document.getElementById('break-length');
let sessionLength = document.getElementById('session-length');
let timeLeft = document.getElementById('time-left');    
let timer;
let timerStatus = "begin" //begin counting stopped
let timerLabel = document.getElementById('timer-label');
let timePaused = "0";


startStopButton.addEventListener("click", () => {
    if (timerStatus === "begin" || timerStatus === "counting" || timerStatus === "stopped"){
        cronometerRun();
    } else {
        breakTime();
    }
})



function cronometerRun(){
    if (timerStatus === "begin"){
        
        //start the timer
        console.log('start stop button');
        timerStatus = "counting"
        
        if (timePaused === "0") {
            timeLeft.innerText = sessionLength.innerText + ":00"; 
            //timeLeft.innerText = "00:05"; //changed for a test
        } else {
            timeLeft.innerText = timePaused;
        }
        timer = setInterval(() => {
            timeLeft.innerText = decrementTime(timeLeft.innerText);
            if (timeLeft.innerText === "0-1:59"){
                clearInterval(timer);
                timerLabel.innerText = "Break time";
                timePaused = "0";
                timerStatus = "breakBegin"
                breakTime();
            }
        }, 200); //update every 1000 miliseconds

    } else if (timerStatus == "counting"){
        //stop the timer
        timerStatus = "stopped";
        clearInterval(timer);

    } else if (timerStatus == "stopped"){
        timerStatus = "begin"
        timePaused = timeLeft.innerText;
        cronometerRun();
    }
}

function breakTime(){

    if (timerStatus === "breakBegin") {

        timerStatus = "breakCounting"

        timeLeft.innerText = breakLength.innerText + ":00";
        //timeLeft.innerText = "0:05" //changed for a test
        
        timer = setInterval(() => {
            timeLeft.innerText = decrementTime(timeLeft.innerText);
            if (timeLeft.innerText === "0-1:59"){
                clearInterval(timer);
                timerLabel.innerText = "Session";
                timerStatus = "begin";
                cronometerRun();
            }
        }, 1000); //update every 1000 miliseconds
    } else if (timerStatus === "breakCounting"){
        timerStatus = "stopped";
        clearInterval(timer);
    } else if (timerStatus === "breakStopped"){
        timerStatus = "breakBegin"
        timePaused = timeLeft.innerText;
        cronometerRun();
    }

}



resetButton.addEventListener("click", () => {
    clearInterval(timer);
    timeLeft.innerText = "25:00"; //changed for a test 
    sessionLength.innerText = "25";
    breakLength.innerText = "5";
    sessionLength.innerText = "25";
    timerLabel.innerText = "Session";
    console.log('reset button clicked');


    //timeLeft.innerText = "00:05";
    breakLength.innerText = "5"; // changed for a test 
})


function decrementTime(timeString){
    let timeDisplay = timeString.split(":")
    let minuteDisplay = parseInt(timeDisplay[0]);
    let secondDisplay = parseInt(timeDisplay[1]);

    secondDisplay -= 1;

    if (secondDisplay === -1){
        secondDisplay = 59;
        minuteDisplay -= 1;
    }

    if (secondDisplay <= 9){
        secondDisplay = "0" + secondDisplay;
    }
    if (minuteDisplay <= 9){
        minuteDisplay = "0" + minuteDisplay;
    }

    return minuteDisplay + ":" + secondDisplay; 
}


breakIncrementButton.addEventListener("click", () => {
    if (parseInt(breakLength.innerText) < 60){
        breakLength.innerText = parseInt(breakLength.innerText) + 1;
    } else {
        true;
    }
})

breakDecrementButton.addEventListener("click", () => {
    if (parseInt(breakLength.innerText) > 1){
        breakLength.innerText = parseInt(breakLength.innerText) - 1;
    } else {
        true;
    }
})

sessionIncrementButton.addEventListener("click", () => {
    if(parseInt(sessionLength.innerText) < 60){
        sessionLength.innerText = parseInt(sessionLength.innerText) + 1; 
        timeLeft.innerText = sessionLength.innerText + ":00"
    } else {
        true;
    }
})

sessionDecrementButton.addEventListener("click", () => {
    if (parseInt(sessionLength.innerText) > 1){
        sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
        timeLeft.innerText = sessionLength.innerText + ":00"
    } else {
        true;
    }
})




