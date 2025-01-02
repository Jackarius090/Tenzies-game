export default function Die(props) {
  return (
    <button
      style={props.style}
      id={props.id}
      onClick={() => props.holdDie(props.id)}
    >
      {props.value}
    </button>
  );
}
