import React, {useEffect, useState} from "react";

const GuitarTuner = () => {
    const [minSignal, setMinSignal] = useState(0.025);

    useEffect(() => {
        const minSignalSlider = document.getElementById('min-signal-slider');
        minSignalSlider.addEventListener('input', handleMinSignalChange);
    
        return () => {
          minSignalSlider.removeEventListener('input', handleMinSignalChange);
        };
    }, []);

    const handleMinSignalChange = (event) => {
        const newMinSignal = parseFloat(event.target.value);
        setMinSignal(newMinSignal);
    };

    useEffect(() => {
        let pitch = 440;
        let guitarTuner = document.getElementById('guitar-tuner');
        guitarTuner?.setAttribute('shadowed', 'true');
    
        let pitchUp = document.getElementById('pitch-up');
        pitchUp.onclick = setPitchUp;

        let pitchDown = document.getElementById('pitch-down');
        pitchDown.onclick = setPitchDown;

        let mute = document.getElementById('mute');
        mute.onclick = toggleMute;

        let minSignal = document.getElementById('min-signal-slider');
        minSignal.onchange = setMinSignal;
        
        guitarTuner.setAttribute('min-signal', 0.001);
        let minSignalValue = document.getElementById('min-signal-value');
        minSignalValue.innerText = 0.001;
    
        let muted = false;
        function toggleMute() {
            muted = !muted;
            guitarTuner?.setAttribute('mute', muted.toString());
        }
    
        function setPitchUp() {
            pitch++;
            guitarTuner?.setAttribute('chamber_pitch', pitch.toString());
        }
    
        function setPitchDown() {
            pitch--;
            guitarTuner?.setAttribute('chamber_pitch', pitch.toString());
        }
        function setMinSignal() {
            let minSigValue = document.getElementById('min-signal-slider')
            minSignalValue.innerText = minSigValue.value;
            guitarTuner.setAttribute('min_signal', minSigValue.value);
        }
    }, [])
 

  return (
    <>
      <div className="main-section" style={{textAlign: "center", marginTop:'10%'}}>
        <div style={{display: "flex", marginBottom:'10px',marginLeft: '-185px'}}>
          <span id="pitch-down" className="pitch-tune"><button type="button" style={{marginLeft: '880px'}}>-</button></span>
          <span className="pitch-tune">pitch</span>
          <span id="pitch-up" className="pitch-tune" style={{marginLeft: '0px', width: 'initial'}}><button type="button">+</button></span>
        </div>

        <span id="mute" className="pitch-tune"> <button type="button">mic[on/off]</button></span>

        <guitar-tuner id="guitar-tuner" />
        {/* <guitar-tuner shadowed='true'></guitar-tuner> */}
        <div>
        <p id="min-signal" className="min-signal">
        Min.Signal:
          <input
            type="range"
            min="0.001"
            max="0.1"
            value={minSignal}
            step="0.001"
            className="slider"
            id="min-signal-slider"
          />
          <span id="min-signal-value">{minSignal}</span>
        </p>
        {/* <p id="threshold" class="threshold">Threshold:<input type="range" min="0.00005" max="0.025" value="0.00025" step="0.00005" class="slider" id="threshold-slider" /><span id="threshold-value">0.025</span></p> */}
    </div>
      </div>
      
      
    </>
  );
};

export default GuitarTuner;
