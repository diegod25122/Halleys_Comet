import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import { colores } from '../theme/estilos';
import { useMiniatura } from '../utils/miniaturas';

/** Imagen de un video (celular): un cuadro sacado del propio video. */
export default function MiniaturaVideo({ fuente }: { fuente: number }) {
  const miniatura = useMiniatura(fuente, true);

  if (!miniatura) {
    // Mientras se genera (o si falla), un degradado en lugar de un cuadro vacío
    return (
      <LinearGradient
        colors={[colores.superficie2, colores.acento2, colores.acento]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, styles.degradado]}
      />
    );
  }

  return (
    <Image source={miniatura} style={StyleSheet.absoluteFill} contentFit="cover" transition={200} />
  );
}

const styles = StyleSheet.create({
  degradado: {
    opacity: 0.55,
  },
});
