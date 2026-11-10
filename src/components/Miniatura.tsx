import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';

import type { Medio } from '../data/contenido';
import { colores } from '../theme/estilos';
import MiniaturaVideo from './MiniaturaVideo';

type Props = {
  medio: Medio;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  radio?: number;
};

/** Cuadrito de una foto o video. Los videos muestran un cuadro del video y un botón ▶. */
export default function Miniatura({ medio, onPress, style, radio = 8 }: Props) {
  const esVideo = medio.tipo === 'video';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="imagebutton"
      accessibilityLabel={esVideo ? 'Ver video' : 'Ver foto'}
      style={({ pressed }) => [
        styles.base,
        { borderRadius: radio },
        pressed && styles.presionado,
        style,
      ]}
    >
      {esVideo ? (
        <MiniaturaVideo fuente={medio.fuente} />
      ) : (
        <Image
          source={medio.fuente}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          transition={200}
        />
      )}
      {esVideo && (
        <View style={styles.capaVideo}>
          <View style={styles.play}>
            <Ionicons name="play" size={14} color={colores.sobreAcento} style={styles.iconoPlay} />
          </View>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
    backgroundColor: colores.superficie2,
  },
  presionado: {
    opacity: 0.8,
  },
  capaVideo: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(5, 7, 15, 0.15)',
  },
  play: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconoPlay: {
    marginLeft: 2,
  },
});
