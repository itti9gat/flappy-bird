import Matter from "matter-js";
import React from "react";
import { View } from "react-native";

const Bird = (props) => {
  const xBody = props.body.position.x - props.size.width / 2;
  const yBody = props.body.position.y - props.size.height / 2;

  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 5,
        borderColor: props.color,
        boderStyle: "solid",
        backgroundColor: props.color,
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
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: label }
  );

  Matter.World.add(world, initialBird);

  return {
    body: initialBird,
    color,
    pos,
    size,
    renderer: <Bird />,
  };
};
