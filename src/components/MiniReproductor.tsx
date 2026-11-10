import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAudioPlayerStatus } from 'expo-audio';

import { CANCION, IMAGENES } from '../data/contenido';
import { useMusica } from '../contexto/Musica';
import { colores, fuentes } from '../theme/estilos';

/** Barrita con la canción de fondo, para pausarla o volver a ponerla. */
export default function MiniReproductor() {
  const { musica } = useMusica();
  const estado = useAudioPlayerStatus(musica);
  const progreso = estado.duration > 0 ? Math.min(1, estado.currentTime / estado.duration) : 0;

  const alternar = () => {
    if (estado.playing) musica.pause();
    else musica.play();
  };

  return (
    <View style={styles.caja}>
      <Image source={IMAGENES.besito} style={styles.portada} contentFit="cover" />
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={1}>
          {CANCION.titulo}
        </Text>
        <Text style={styles.artista} numberOfLines={1}>
          {CANCION.artista}
        </Text>
        <View style={styles.barra}>
          <View style={[styles.relleno, { width: `${progreso * 100}%` }]} />
        </View>
      </View>
      <Pressable
        onPress={alternar}
        accessibilityRole="button"
        accessibilityLabel={estado.playing ? 'Pausar canción' : 'Reproducir canción'}
        hitSlop={8}
        style={styles.boton}
      >
        <Ionicons
          name={estado.playing ? 'pause' : 'play'}
          size={16}
          color={colores.sobreAcento}
          style={!estado.playing && styles.iconoPlay}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: 16,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.linea,
  },
  portada: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
  titulo: {
    fontFamily: fuentes.fuerte,
    fontSize: 13,
    color: colores.texto,
  },
  artista: {
    fontFamily: fuentes.texto,
    fontSize: 11,
    color: colores.suave,
  },
  barra: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colores.linea,
    overflow: 'hidden',
    marginTop: 4,
  },
  relleno: {
    height: '100%',
    backgroundColor: colores.acento,
  },
  boton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colores.acento,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconoPlay: {
    marginLeft: 2,
  },
});
