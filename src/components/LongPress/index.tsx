import { View } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { GestureDetector, Gesture } from "react-native-gesture-handler";

import { styles } from "./styles";

export function LongPress() {
  const size = useSharedValue(100);
  const longPressActive = useSharedValue(0);

  const longPressGesture = Gesture.LongPress()
    .onTouchesDown(() => {
      size.value = withTiming(size.value + 200, { duration: 500 });
    })
    .onStart(() => {
      longPressActive.value = withTiming(longPressActive.value === 0 ? 1 : 0, {
        duration: 500,
      });
    })
    .onEnd((e, success) => {
      if (success) {
        console.log(`Duração ${e.duration} ms.`);
        size.value = withTiming(100, { duration: 500 });
        longPressActive.value = withTiming(
          longPressActive.value === 1 ? 0 : 1,
          {
            duration: 500,
          }
        );
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    backgroundColor: interpolateColor(
      longPressActive.value,
      [0, 1],
      ["#e76f51", "#264653"]
    ),
  }));
  return (
    <View style={styles.container}>
      <GestureDetector gesture={longPressGesture}>
        <Animated.View style={[styles.blox, animatedStyle]} />
      </GestureDetector>
    </View>
  );
}
