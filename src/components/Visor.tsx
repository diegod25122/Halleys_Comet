import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { Image } from 'expo-image';
import { useVideoPlayer, VideoView } from 'expo-video';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { Medio } from '../data/contenido';
import { useMusica } from '../contexto/Musica';
import { colores, comunes, fuentes } from '../theme/estilos';

export type ElementoVisor = {
  medio: Medio;
  etiqueta?: string;
  texto?: string;
};

type Props = {
  elementos: readonly ElementoVisor[];
  indiceInicial: number;
  onCerrar: () => void;
};

function PaginaVideo({ medio, activo }: { medio: Medio; activo: boolean }) {
  const player = useVideoPlayer(medio.fuente, (p) => {
    p.loop = true;
  });

  useEffect(() => {
    if (activo) player.play();
    else player.pause();
  }, [activo, player]);

  return (
    <VideoView
      player={player}
      style={StyleSheet.absoluteFill}
      contentFit="contain"
      nativeControls
    />
  );
}

/** Pantalla completa para ver fotos y videos, deslizando de lado a lado. */
export default function Visor({ elementos, indiceInicial, onCerrar }: Props) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { pausarPorVideo, reanudarTrasVideo } = useMusica();
  const [activo, setActivo] = useState(indiceInicial);

  const actual = elementos[activo];

  // La canción se pausa mientras se ve un video y vuelve al pasar a una foto o al cerrar
  useEffect(() => {
    if (actual?.medio.tipo === 'video') pausarPorVideo();
    else reanudarTrasVideo();
  }, [actual, pausarPorVideo, reanudarTrasVideo]);

  useEffect(() => () => reanudarTrasVideo(), [reanudarTrasVideo]);

  const alDeslizar = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const indice = Math.round(e.nativeEvent.contentOffset.x / width);
      setActivo(Math.min(elementos.length - 1, Math.max(0, indice)));
    },
    [elementos.length, width],
  );

  return (
    <Modal visible animationType="fade" onRequestClose={onCerrar} statusBarTranslucent>
      <View style={styles.raiz}>
        <FlatList
          data={elementos}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={indiceInicial}
          getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
          onMomentumScrollEnd={alDeslizar}
          keyExtractor={(e) => e.medio.id}
          windowSize={3}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          renderItem={({ item, index }) => (
            <View style={{ width, height }}>
              {item.medio.tipo === 'video' ? (
                Math.abs(index - activo) <= 1 && (
                  <PaginaVideo medio={item.medio} activo={index === activo} />
                )
              ) : (
                <Image
                  source={item.medio.fuente}
                  style={StyleSheet.absoluteFill}
                  contentFit="contain"
                />
              )}
            </View>
          )}
        />

        <View style={[styles.barraArriba, { paddingTop: insets.top + 10 }]}>
          <Text style={styles.contador}>
            {activo + 1} de {elementos.length}
          </Text>
          <Pressable
            onPress={onCerrar}
            accessibilityRole="button"
            accessibilityLabel="Cerrar"
            hitSlop={12}
            style={styles.cerrar}
          >
            <Ionicons name="close" size={20} color={colores.blanco} />
          </Pressable>
        </View>

        {(actual?.etiqueta || actual?.texto) && (
          <View
            style={[
              styles.pie,
              { paddingBottom: insets.bottom + (actual.medio.tipo === 'video' ? 90 : 24) },
            ]}
          >
            {actual.etiqueta && <Text style={comunes.kicker}>{actual.etiqueta}</Text>}
            {actual.texto && <Text style={styles.textoPie}>{actual.texto}</Text>}
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: colores.negro,
  },
  barraArriba: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    pointerEvents: 'box-none',
  },
  contador: {
    fontFamily: fuentes.medio,
    fontSize: 13,
    color: colores.suave,
    fontVariant: ['tabular-nums'],
  },
  cerrar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pie: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 40,
    gap: 6,
    backgroundColor: 'rgba(5, 7, 15, 0.6)',
    pointerEvents: 'none',
  },
  textoPie: {
    fontFamily: fuentes.texto,
    fontSize: 15,
    lineHeight: 22,
    color: colores.texto,
  },
});
