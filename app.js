document.addEventListener("DOMContentLoaded", function () {
    const bells = new Audio('ring.mp3'); 
    const music = new Audio('lofi.mp3');
    music.volume = 0.5;
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

            // Reproducir música lo-fi al iniciar el temporizador
            music.play();
            music.loop = true; // Repetir la música mientras dure el temporizador

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
            // Detener música lo-fi y reproducir música de campanilla
            music.pause(); 
            music.currentTime = 0; // Reiniciar la música lo-fi

            bells.play(); // Reproducir el sonido de campanilla

            clearInterval(myInterval); // Detener el temporizador
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
        clearInterval(myInterval); // Detiene el temporizador
        session.textContent = "25"; // Restablece a 25:00 (puedes cambiarlo)
        secondDiv.textContent = "00";
        circle.style.strokeDashoffset = "0"; // Resetea la barra de progreso
        music.pause(); // Detener la música lo-fi
        music.currentTime = 0; // Reiniciar la música lo-fi
        state = true;
    }

    startBtn.addEventListener('click', appTimer);
    setTimeBtn.addEventListener('click', setTime);
    resetBtn.addEventListener('click', resetTimer);
});
