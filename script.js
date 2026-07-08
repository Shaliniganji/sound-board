const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const volumeSlider = document.getElementById("volume");

const frequencies = {

    sound1:261.63, // Sa
    sound2:293.66, // Re
    sound3:329.63, // Ga
    sound4:349.23, // Ma
    sound5:392.00, // Pa
    sound6:440.00, // Dha
    sound7:493.88, // Ni

    sound8:523.25, // Sa'
    sound9:587.33, // Re'
    sound10:659.25, // Ga'
    sound11:698.46, // Ma'
    sound12:783.99  // Pa'

};

let playing=[];

function playNote(frequency){

    if(audioContext.state==="suspended"){
        audioContext.resume();
    }

    const oscillator=audioContext.createOscillator();
    const gainNode=audioContext.createGain();

    oscillator.type="triangle";

    oscillator.frequency.value=frequency;

    gainNode.gain.value=volumeSlider.value;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime+0.8
    );

    oscillator.stop(audioContext.currentTime+0.8);

    playing.push(oscillator);

}

document.querySelectorAll(".soundboard button").forEach(button=>{

    button.addEventListener("click",()=>{

        playNote(frequencies[button.dataset.sound]);

    });

});

document.getElementById("stopAll").addEventListener("click",()=>{

    playing.forEach(sound=>{

        try{

            sound.stop();

        }catch(e){}

    });

    playing=[];

});