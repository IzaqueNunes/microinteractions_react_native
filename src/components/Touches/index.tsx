import { View, Pressable } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolateColor,
} from "react-native-reanimated";

import { styles } from "./styles";

export function Touches() {
  const position = useSharedValue(100);
  const doubleTapActive = useSharedValue(0);

  function onPressIn() {
    position.value = withSpring(150);
  }

  function onPressOut() {
    position.value = withSpring(100);
  }

  const onGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      console.log("TOCOU 2x");
      doubleTapActive.value = withTiming(doubleTapActive.value === 0 ? 1 : 0, {
        duration: 500,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    width: position.value,
    height: position.value,
    backgroundColor: interpolateColor(
      doubleTapActive.value,
      [0, 1],
      ["#e76f51", "#264653"]
    ),
  }));

  return (
    <View style={styles.container}>
      <GestureDetector gesture={onGesture}>
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
          <Animated.View style={[styles.blox, animatedStyle]} />
        </Pressable>
      </GestureDetector>
    </View>
  );
}
