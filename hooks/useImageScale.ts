import { useRef } from "react";
import { Animated } from "react-native";

export function useImageScale() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const imageScale = scrollY.interpolate({
    inputRange: [-100, 0],
    outputRange: [1.2, 1],
    extrapolate: 'clamp',
  });

  return { scrollY, imageScale };
}