import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Easing, StyleProp, ViewStyle } from 'react-native';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** Equivale a la animación CSS "aparecerCarta": crece de 0.5 a 1 mientras aparece. */
export default function Aparecer({ children, style }: Props) {
  const progreso = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progreso, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [progreso]);

  const escala = progreso.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });

  return (
    <Animated.View style={[style, { opacity: progreso, transform: [{ scale: escala }] }]}>
      {children}
    </Animated.View>
  );
}
