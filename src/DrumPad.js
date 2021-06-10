import React, { useRef } from 'react'

const DrumPad = ({ className, id, audio1Id, bankAudio1, audio2Id, bankAudio2, onClick, pressedPad}) => {
  const activeStyle = {
    backgroundColor: "orange",
    boxShadow: "0px 0px 0px",
    marginTop: 3,
  }
  const inactiveStyle = {
    backgroundColor: "gray",
  }
  
  // If pressedPad matches the button, the style of the pad changes to signify a button click
  const styleRef = useRef();
  if (pressedPad === id){
    styleRef.current = activeStyle;
  }
  else {
    styleRef.current = inactiveStyle;
  }

  return(
    <div className="drum-pad no-copy" id={id} onClick={onClick} onMouseDown="return false" style={styleRef.current}>
      {id}
      <audio id={audio1Id} src={bankAudio1} />
      <audio id={audio2Id} src={bankAudio2} />
    </div>
  )
}

export default DrumPad