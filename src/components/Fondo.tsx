import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { colores } from '../theme/estilos';

// Estrellas fijas (posiciones pseudo-aleatorias, siempre las mismas)
const ESTRELLAS = Array.from({ length: 46 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  return {
    left: `${r(1) * 100}%` as const,
    top: `${r(2) * 75}%` as const,
    tamano: r(3) > 0.85 ? 2.2 : 1.3,
    opacidad: 0.3 + r(4) * 0.5,
  };
});

/** Cielo nocturno con estrellas, detrás de todas las pantallas. */
function Fondo() {
  return (
    <View style={[StyleSheet.absoluteFill, styles.capa]}>
      <LinearGradient
        colors={[colores.fondoAlto, colores.fondo, colores.fondo]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFill}
      />
      {ESTRELLAS.map((e, i) => (
        <View
          key={i}
          style={[
            styles.estrella,
            {
              left: e.left,
              top: e.top,
              width: e.tamano,
              height: e.tamano,
              borderRadius: e.tamano,
              opacity: e.opacidad,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  capa: {
    pointerEvents: 'none',
  },
  estrella: {
    position: 'absolute',
    backgroundColor: colores.blanco,
  },
});

export default memo(Fondo);
