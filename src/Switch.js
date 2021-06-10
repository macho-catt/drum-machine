
const Switch = (props) => {
  // Toggles switch visual
  let innerClassName = props.toggle
    ?  'inner-right'
    :  'inner';

  return(
    <div className={`switch-container ${props.position}`}>
      <div className="title no-copy">
        {props.name}
      </div>
      <div className="slider" onClick={props.onClick}>
        <div className={innerClassName}>
        </div>
      </div>
    </div>
  )
}

export default Switch