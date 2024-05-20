import { Dimensions } from "react-native";

const dimensionsWidth = Dimensions.get("window").width;
const dimensionsHeight = Dimensions.get("window").height;
const spaceBox = 200;

export const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
  // return Math.floor(Math.random() * max) + min;
};

export const getPosTube = (offsetWidth = 0) => {
  let max = dimensionsHeight / 2;
  let min = max - 200;

  const rand = randomNumber(min, max);

  const tubeTopHeight = rand;
  const tubeBottomHeight = dimensionsHeight - rand - spaceBox;

  const posTop = {
    pos: {
      x: dimensionsWidth + offsetWidth - 25,
      y: -dimensionsHeight / 2 + tubeTopHeight,
    },
    size: { width: 50, height: dimensionsHeight },
  };
  const posBottom = {
    pos: {
      x: dimensionsWidth + offsetWidth - 25,
      y: dimensionsHeight + dimensionsHeight / 2 - tubeBottomHeight,
    },
    size: { width: 50, height: dimensionsHeight },
  };

  return { posTop, posBottom };
};
