import { View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { styles } from "./styles";

export function Rotation() {
  const rotation = useSharedValue(0);

  const ratationGesture = Gesture.Rotation().onUpdate((e) => {
    rotation.value = e.rotation;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${(rotation.value / Math.PI) * 180}deg` }],
  }));
  return (
    <View style={styles.container}>
      <GestureDetector gesture={ratationGesture}>
        <Animated.View style={[styles.blox, animatedStyle]} />
      </GestureDetector>
    </View>
  );
}
