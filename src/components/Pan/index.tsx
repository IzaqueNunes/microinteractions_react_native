import { View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { styles } from "./styles";

export function Pan() {
  const position = useSharedValue(0);

  const ratationGesture = Gesture.Pan()
    .minPointers(2)
    .onUpdate((e) => {
      position.value = e.translationX;

      if (e.translationX > 0) {
        console.log("INDO PRA DIREITA");
      } else {
        console.log("INDO PRA ESQUERDA");
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={ratationGesture}>
        <Animated.View style={[styles.blox, animatedStyle]} />
      </GestureDetector>
    </View>
  );
}
