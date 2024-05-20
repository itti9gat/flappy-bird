import Matter from "matter-js";
import { Dimensions } from "react-native";
import { getPosTube } from "../helper/random";

const dimensionsWidth = Dimensions.get("window").width;
const dimensionsHeight = Dimensions.get("window").height;

const moving = (entities, { touches, time, dispatch }) => {
  let engine = entities.physics.engine;

  touches
    .filter((t) => t.type === "press")
    .forEach((_) => {
      Matter.Body.setVelocity(entities.Bird.body, {
        x: 0,
        y: -5,
      });
    });

  Matter.Engine.update(engine, time.delta);

  for (let idx = 1; idx <= 2; idx++) {
    if (
      entities[`ObstacleTop${idx}`].body.bounds.max.x <= 50 &&
      !entities[`ObstacleTop${idx}`].point
    ) {
      entities[`ObstacleTop${idx}`].point = true;
      dispatch({ type: "add_point" });
    }

    if (entities[`ObstacleTop${idx}`].body.bounds.max.x <= 0) {
      entities[`ObstacleTop${idx}`].point = false;

      const posTube = getPosTube(dimensionsWidth);
      Matter.Body.setPosition(
        entities[`ObstacleTop${idx}`].body,
        posTube.posTop.pos
      );
      Matter.Body.setPosition(
        entities[`ObstacleBottom${idx}`].body,
        posTube.posBottom.pos
      );
    }

    Matter.Body.translate(entities[`ObstacleTop${idx}`].body, {
      x: -3,
      y: 0,
    });
    Matter.Body.translate(entities[`ObstacleBottom${idx}`].body, {
      x: -3,
      y: 0,
    });
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    dispatch({ type: "game_over" });
  });

  return entities;
};

export default moving;
