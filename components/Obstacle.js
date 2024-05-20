import Matter from "matter-js";
import { View } from "react-native";

const Obstacle = (props) => {
  const xBody = Math.floor(props.body.position.x - props.size.width / 2);
  const yBody = Math.floor(props.body.position.y - props.size.height / 2);

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
  const initialObstacle = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: label, isStatic: true }
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    pos,
    size,
    renderer: <Obstacle />,
  };
};
