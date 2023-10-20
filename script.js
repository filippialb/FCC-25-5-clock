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


startStopButton.addEventListener("click", () => {
    if (timerStatus === "begin" || timerStatus === "stopped"){
        
        //start the timer
        console.log('start stop button');
        timerStatus = "counting"
        timer = setInterval(() => {
            timeLeft.innerText = decrementTime(timeLeft.innerText);
        }, 1000);
        if (timeLeft.innerText === "0:00"){
            clearInterval(timer);
        }
    } else if (timerStatus == "counting"){
        //stop the timer
        timerStatus = "stopped";
        clearInterval(timer);
    }
})


function breakTime() {
    timerLabel.innerText = "Break"
}


resetButton.addEventListener("click", () => {
    clearInterval(timer);
    //timeLeft.innerText = "25:00";
    timeLeft.innerText = "00:05";
    breakLength.innerText = "5";
    sessionLength.innerText = "25";
    console.log('reset button clicked');
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
    if (parseInt(breakLength.innerText) > 0){
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
    if (parseInt(sessionLength.innerText) > 0){
        sessionLength.innerText = parseInt(sessionLength.innerText) - 1;
        timeLeft.innerText = sessionLength.innerText + ":00"
    } else {
        true;
    }
})