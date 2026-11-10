import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native';

type DatosCorazon = {
  id: number;
  izquierda: number;
  tamano: number;
  duracion: number;
};

type Props = {
  emoji: string;
  /** Cada cuántos ms nace un corazón nuevo. */
  intervalo: number;
  tamanoMin: number;
  tamanoExtra: number;
  /** Duración en segundos: duracionMin + aleatorio(0..duracionExtra). */
  duracionMin: number;
  duracionExtra: number;
};

type PropsCorazon = {
  datos: DatosCorazon;
  emoji: string;
  alto: number;
  onFin: (id: number) => void;
};

const Corazon = memo(function Corazon({ datos, emoji, alto, onFin }: PropsCorazon) {
  const progreso = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progreso, {
      toValue: 1,
      duration: datos.duracion,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => onFin(datos.id));
  }, [datos, onFin, progreso]);

  // Misma idea que @keyframes subirLoco del CSS original
  const translateY = progreso.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -alto * 0.6, -alto * 1.2],
  });
  const translateX = progreso.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 30, -30] });
  const scale = progreso.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1.2, 0.8] });
  const opacity = progreso.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.8, 0.5, 0] });

  return (
    <Animated.Text
      style={[
        styles.corazon,
        {
          left: datos.izquierda,
          fontSize: datos.tamano,
          opacity,
          transform: [{ translateY }, { translateX }, { scale }],
        },
      ]}
    >
      {emoji}
    </Animated.Text>
  );
});

export default function CorazonesFlotantes({
  emoji,
  intervalo,
  tamanoMin,
  tamanoExtra,
  duracionMin,
  duracionExtra,
}: Props) {
  const { width, height } = useWindowDimensions();
  const [corazones, setCorazones] = useState<DatosCorazon[]>([]);
  const siguienteId = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      const nuevo: DatosCorazon = {
        id: siguienteId.current++,
        izquierda: Math.random() * width,
        tamano: tamanoMin + Math.random() * tamanoExtra,
        duracion: (duracionMin + Math.random() * duracionExtra) * 1000,
      };
      setCorazones((prev) => [...prev, nuevo]);
    }, intervalo);
    return () => clearInterval(id);
  }, [intervalo, width, tamanoMin, tamanoExtra, duracionMin, duracionExtra]);

  const quitar = useCallback((id: number) => {
    setCorazones((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return (
    <View style={[StyleSheet.absoluteFill, styles.capa]}>
      {corazones.map((c) => (
        <Corazon key={c.id} datos={c} emoji={emoji} alto={height} onFin={quitar} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  capa: {
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  corazon: {
    position: 'absolute',
    bottom: -50,
  },
});
