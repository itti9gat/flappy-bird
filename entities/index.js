import Matter from "matter-js";

import Bird from "../components/Bird";
import Floor from "../components/Floor";
import Obstacle from "../components/Obstacle";

import { Dimensions } from "react-native";
import { getPosTube } from "../helper/random";

const dimensionsWidth = Dimensions.get("window").width;
const dimensionsHeight = Dimensions.get("window").height;

export default () => {
  let engine = Matter.Engine.create({ enableSleeping: false });

  let world = engine.world;

  engine.gravity.y = 0.4;

  let posTubeA = getPosTube(0);
  let posTubeB = getPosTube(dimensionsWidth);

  return {
    physics: { engine, world },
    Bird: Bird(
      world,
      "bird",
      "green",
      { x: dimensionsWidth / 4, y: dimensionsHeight / 2 - 50 },
      { width: 50, height: 50 }
    ),
    ObstacleTop1: Obstacle(
      world,
      "ObstacleTop1",
      "blue",
      posTubeA.posTop.pos,
      posTubeA.posTop.size
    ),
    ObstacleBottom1: Obstacle(
      world,
      "ObstacleBottom1",
      "orange",
      posTubeA.posBottom.pos,
      posTubeA.posBottom.size
    ),
    ObstacleTop2: Obstacle(
      world,
      "ObstacleTop2",
      "orange",
      posTubeB.posTop.pos,
      posTubeB.posTop.size
    ),
    ObstacleBottom2: Obstacle(
      world,
      "ObstacleBottom2",
      "blue",
      posTubeB.posBottom.pos,
      posTubeB.posBottom.size
    ),
    Floor: Floor(
      world,
      "floor",
      "brown",
      { x: 0, y: dimensionsHeight - 25 },
      { width: dimensionsWidth, height: 50 }
    ),
  };
};
