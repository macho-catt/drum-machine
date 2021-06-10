import React, { useState, useEffect, useRef } from 'react'
import DrumPad from './DrumPad.js'
import Switch from './Switch.js'
import Screen from './Screen.js'
import Volume from './Volume.js'
import soundfile1 from './audio/clap-808.wav'
import soundfile2 from './audio/crash-acoustic.wav'
import soundfile3 from './audio/hihat-acoustic01.wav'
import soundfile4 from './audio/kick-acoustic01.wav'
import soundfile5 from './audio/kick-dry.wav'
import soundfile6 from './audio/openhat-acoustic01.wav'
import soundfile7 from './audio/ride-acoustic02.wav'
import soundfile8 from './audio/snare-acoustic01.wav'
import soundfile9 from './audio/tom-acoustic01.wav'

import soundfile10 from './audio/clap-slapper.wav'
import soundfile11 from './audio/crash-noise.wav'
import soundfile12 from './audio/hihat-reso.wav'
import soundfile13 from './audio/kick-gritty.wav'
import soundfile14 from './audio/kick-heavy.wav'
import soundfile15 from './audio/openhat-analog.wav'
import soundfile16 from './audio/perc-laser.wav'
import soundfile17 from './audio/snare-modular.wav'
import soundfile18 from './audio/tom-fm.wav'

const App = () => {
  
  const pads = [
    {
      drumKey: 'Q',
      bankAudio1Name: "Clap",
      bankAudio1: soundfile1,
      bankAudio2Name: "ClapSlapper",
      bankAudio2: soundfile10
    },
    {
      drumKey: 'W',
      bankAudio1Name: "Crash",
      bankAudio1: soundfile2,
      bankAudio2Name: "CrashNoise",
      bankAudio2: soundfile11
    },
    {
      drumKey: 'E',
      bankAudio1Name: "HiHat",
      bankAudio1: soundfile3,
      bankAudio2Name: "HiHatReso",
      bankAudio2: soundfile12
    },
    {
      drumKey: 'A',
      bankAudio1Name: "Kick1",
      bankAudio1: soundfile4,
      bankAudio2Name: "KickGritty",
      bankAudio2: soundfile13
    },
    {
      drumKey: 'S',
      bankAudio1Name: "Kick2",
      bankAudio1: soundfile5,
      bankAudio2Name: "KickHeavy",
      bankAudio2: soundfile14
    },
    {
      drumKey: 'D',
      bankAudio1Name: "OpenHat",
      bankAudio1: soundfile6,
      bankAudio2Name: "OpenHatAnalog",
      bankAudio2: soundfile15
    },
    {
      drumKey: 'Z',
      bankAudio1Name: "Ride",
      bankAudio1: soundfile7,
      bankAudio2Name: "PercLaser",
      bankAudio2: soundfile16
    },
    {
      drumKey: 'X',
      bankAudio1Name: "Snare",
      bankAudio1: soundfile8,
      bankAudio2Name: "SnareModular",
      bankAudio2: soundfile17
    },
    {
      drumKey: 'C',
      bankAudio1Name: "Tom",
      bankAudio1: soundfile9,
      bankAudio2Name: "TomFM",
      bankAudio2: soundfile18
    },
  ]

  const [display, setDisplay] = useState('');
  const [bank, setBank] = useState(false);
  const [bankAudio, setBankAudio] = useState(null);
  const [powerOn, setPowerOn] = useState(false);
  const [volume, setVolume] = useState(1);
  const [pressedPad, setPressedPad] = useState(null);
  const powerRef = useRef();
  const bankRef = useRef();

  // Adjust volume when power is on
  const volumeAdjust = (event) => {
    if (powerOn){
      setVolume(event.target.value);
      setDisplay(`Volume: ${event.target.value * 100}`);
    }
  }

  // Only play audio from pad clicks and update display if power is on
  const handlePadClick = (event) => {
    let clickedPad = pads.filter(pad => Object.values(pad).includes(event.target.id));
    
    if (powerOn && !bank){
      activatePad(clickedPad[0]["drumKey"]);
      setDisplay(clickedPad[0]["bankAudio1Name"]);
      setBankAudio(document.getElementById(clickedPad[0]["bankAudio1Name"]));
    }
    else if (powerOn && bank){
      activatePad(clickedPad[0]["drumKey"]);
      setDisplay(clickedPad[0]["bankAudio2Name"]);
      setBankAudio(document.getElementById(clickedPad[0]["bankAudio2Name"]));
    }
  }

  // Toggles power on and off
  const handlePowerClick = () => {
    if (!powerOn){
      setDisplay("Powering on...");
      setTimeout(() => setDisplay(''), 1000);
    }
    else{
      setDisplay("Powering off...");
      setTimeout(() => setDisplay(''), 1000);
    }
    setPowerOn(!powerOn);
    powerRef.current = !powerOn;
  }

  // Toggles audio bank if power is on
  const handleBankClick = () => {
    if (powerOn){
      if (!bank){
        setDisplay("Bank2");
      }
      else{
        setDisplay("Bank1");
      }
      setBank(!bank);
      bankRef.current = !bank;
    }
  }

  // When a pad is pressed, change style to signify button press
  const activatePad = (pad) => {
    setPressedPad(pad);
    setTimeout(() => {
      setPressedPad(null);
    }, 100);
  }

  // When bankAudio state updates with a non-null value, play audio
  useEffect(() => {
    if (bankAudio){
      bankAudio.currentTime = 0;
      bankAudio.play();
      bankAudio.volume = volume;
      setBankAudio(null);
    }
  }, [bankAudio])

  // When keyboard button is pressed, play audio and update display if power is on
  const handleKeyDown = ({key}) => {

    let clickedPad = pads.filter(pad => Object.values(pad).includes(key.toUpperCase()));

    // Use ref to keep track of changing states powerOn and bank
    if (clickedPad.length !== 0 && powerRef.current && !bankRef.current){
      activatePad(clickedPad[0]["drumKey"]);
      setDisplay(clickedPad[0]["bankAudio1Name"]);
      setBankAudio(document.getElementById(clickedPad[0]["bankAudio1Name"]));
    }
    else if (clickedPad.length !== 0 && powerRef.current && bankRef.current){
      activatePad(clickedPad[0]["drumKey"]);
      setDisplay(clickedPad[0]["bankAudio2Name"]);
      setBankAudio(document.getElementById(clickedPad[0]["bankAudio2Name"]));
    }
    
  }

  // Initialize event listeners on first render only
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    //document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
     // document.addEventListener('keyup', handleKeyUp);
    }
  }, [])

  return(
    <div className="container">
      <div id="drum-machine">
        <div id="pad">
          {pads.map(pad => 
            <DrumPad 
              id={pad["drumKey"]} 
              key={pad["drumKey"]} 
              pressedPad={pressedPad}
              audio1Id={pad["bankAudio1Name"]}
              bankAudio1={pad["bankAudio1"]}
              audio2Id={pad["bankAudio2Name"]}
              bankAudio2={pad["bankAudio2"]}
              onClick={handlePadClick} 
            />
          )}
        </div>

        <div id="drum-control">
          <Switch 
            position="top" 
            name="Power" 
            onClick={handlePowerClick} 
            toggle={powerOn}     
          />
          <Screen display={display} />
          <Volume value={volume} onInput={volumeAdjust} onChange={volumeAdjust} />
          <Switch 
            position="bottom" 
            name="Bank" 
            onClick={handleBankClick}
            toggle={bank}
          />
        </div>
      </div>
    </div>
  )
}

export default App