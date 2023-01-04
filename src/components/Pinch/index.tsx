import { View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { styles } from "./styles";

export function Pinch() {
  const scale = useSharedValue(1);

  const ratationGesture = Gesture.Pinch().onUpdate((e) => {
    scale.value = e.scale;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={ratationGesture}>
        <Animated.View style={[styles.blox, animatedStyle]} />
      </GestureDetector>
    </View>
  );
}
