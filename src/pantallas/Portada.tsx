import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Boton from '../components/Boton';
import { IMAGENES, NOMBRES } from '../data/contenido';
import { colores, comunes, fuentes, MARGEN } from '../theme/estilos';

type Props = {
  onAbrir: () => void;
};

export default function Portada({ onAbrir }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.raiz}>
      <Image source={IMAGENES.portada} style={StyleSheet.absoluteFill} contentFit="cover" />
      <LinearGradient
        colors={['rgba(13, 18, 48, 0.25)', 'rgba(13, 18, 48, 0.55)', colores.fondo]}
        locations={[0, 0.45, 0.82]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.contenido, { paddingBottom: insets.bottom + 36 }]}>
        <Text style={comunes.kicker}>Para {NOMBRES.ella}</Text>
        <Text style={styles.titulo}>
          Mi cometa{'\n'}
          <Text style={styles.italica}>Halley</Text>
        </Text>
        <Text style={styles.nota}>
          El Halley pasa cerca de la Tierra una vez cada 76 años. Tú llegaste mucho antes.
        </Text>
        <View style={styles.botones}>
          <Boton titulo="Abrir carta" icono="mail-open-outline" onPress={onAbrir} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: MARGEN + 4,
    gap: 14,
  },
  titulo: {
    fontFamily: fuentes.titulo,
    fontSize: 52,
    lineHeight: 56,
    color: colores.texto,
  },
  italica: {
    fontFamily: fuentes.tituloItalica,
    color: colores.acento,
  },
  nota: {
    fontFamily: fuentes.texto,
    fontSize: 15,
    lineHeight: 22,
    color: colores.texto,
    opacity: 0.85,
    maxWidth: 300,
  },
  botones: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
});
