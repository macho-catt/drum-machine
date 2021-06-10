
const Volume = ({onChange, value}) => {

  return(
    <div className="volume-slider">
      <input type="range" step="0.01" min="0" max="1" value={value} onInput={onChange} />
    </div>
  )
}

export default Volume