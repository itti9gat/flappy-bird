import Matter from "matter-js";
import { View } from "react-native";

const Floor = (props) => {
  const xBody = props.pos.x / 2;
  const yBody = props.pos.y - props.size.height / 2;

  return (
    <View
      style={{
        backgroundColor: props.color,
        boderStyle: "solid",
        position: "absolute",
        left: xBody,
        top: yBody,
        width: props.size.width,
        height: props.size.height,
      }}
    ></View>
  );
};

export default (world, label, color, pos, size) => {
  const initialFloor = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: label, isStatic: true }
  );

  Matter.World.add(world, initialFloor);

  return {
    body: initialFloor,
    color,
    pos,
    size,
    renderer: <Floor />,
  };
};
