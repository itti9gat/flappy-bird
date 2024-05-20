import { StatusBar } from "expo-status-bar";
import { Text, TouchableOpacity, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import moving from "./entities/moving";
import { useEffect, useState } from "react";

export default function App() {
  const [running, setRunning] = useState(false);
  const [gameEngine, setGameEngine] = useState(null);
  const [pointScore, setPointScore] = useState(0);

  useEffect(() => {
    setRunning(true);
  }, []);

  let setupGame = entities();

  return (
    <View style={{ flex: 1 }}>
      <GameEngine
        ref={(ref) => setGameEngine(ref)}
        entities={setupGame}
        systems={[moving]}
        running={running}
        onEvent={(e) => {
          switch (e.type) {
            case "game_over":
              setRunning(false);
              gameEngine.stop();
              break;
            case "add_point":
              setPointScore((prev) => prev + 1);
              break;
          }
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#EE00EE",
        }}
      ></GameEngine>
      <Text style={{ fontSize: 70, color: "#FFFFFF", textAlign: "center" }}>
        {pointScore}
      </Text>
      {!running && (
        <TouchableOpacity
          onPress={() => {
            gameEngine.swap(entities());
            setRunning(true);
            setPointScore(0);
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "black",
            opacity: 0.7,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 40,
              }}
            >
              Game Over
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 30,
                marginTop: 10,
              }}
            >
              Your Score: {pointScore}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginTop: 40,
              }}
            >
              Click Here for New Game
            </Text>
          </View>
        </TouchableOpacity>
      )}

      <StatusBar style="auto" hidden={true} />
    </View>
  );
}
