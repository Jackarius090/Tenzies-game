export default function Die(props) {
  return (
    <button
      style={props.style}
      id={props.id}
      onClick={() => props.holdDie(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`Die with value ${props.value},
${props.isHeld ? "held" : "not held"}`}
    >
      {props.value}
    </button>
  );
}
