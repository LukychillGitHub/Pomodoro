document.addEventListener("DOMContentLoaded", function () {
    const bells = new Audio('./sounds/bell.wav'); 
    const startBtn = document.querySelector('.btn-start'); 
    const setTimeBtn = document.querySelector('.btn-set-time'); 
    const resetBtn = document.querySelector('.btn-reset');
    const timeInput = document.querySelector('#timeInput');
    const session = document.querySelector('.minutes'); 
    const secondDiv = document.querySelector('.seconds');
    const circle = document.querySelector('.progress-ring-circle');

    let myInterval; 
    let state = true;
    let totalSeconds;
    let initialTotalSeconds;

    const circleCircumference = 565.48; 
    circle.style.strokeDasharray = circleCircumference;
    circle.style.strokeDashoffset = "0"; 

    function appTimer() {
        if (state) {
            state = false;
            
            let sessionAmount = Number.parseInt(session.textContent);
            initialTotalSeconds = sessionAmount * 60;
            totalSeconds = initialTotalSeconds;

            if (isNaN(totalSeconds) || totalSeconds <= 0) {
                alert("Por favor ingresa un tiempo válido.");
                state = true;
                return;
            }

            myInterval = setInterval(updateSeconds, 1000);
        } else {
            alert('La sesión ya ha comenzado.');
        }
    }

    function updateSeconds() {
        if (totalSeconds > 0) {
            totalSeconds--;

            let minutesLeft = Math.floor(totalSeconds / 60);
            let secondsLeft = totalSeconds % 60;

            session.textContent = `${minutesLeft}`;
            secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;

            let progress = (totalSeconds / initialTotalSeconds) * circleCircumference;
            circle.style.strokeDashoffset = circleCircumference - progress;
        }

        if (totalSeconds === 0) {
            bells.play();
            clearInterval(myInterval);
        }
    }

    function setTime() {
        let newTime = parseInt(timeInput.value);

        if (!isNaN(newTime) && newTime > 0) {
            session.textContent = newTime;
            secondDiv.textContent = "00"; 
            totalSeconds = newTime * 60; 
            initialTotalSeconds = totalSeconds;
            circle.style.strokeDashoffset = "0"; 
            state = true;
        } else {
            alert("Ingrese un número válido.");
        }
    }

    function resetTimer() {
        clearInterval(myInterval); 
        session.textContent = "25"; 
        secondDiv.textContent = "00";
        circle.style.strokeDashoffset = "0"; 
        state = true;
    }

    startBtn.addEventListener('click', appTimer);
    setTimeBtn.addEventListener('click', setTime);
    resetBtn.addEventListener('click', resetTimer);
});
