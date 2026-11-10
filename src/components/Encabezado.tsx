import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colores, fuentes, MARGEN } from '../theme/estilos';

type Props = {
  titulo: string;
  onVolver: () => void;
};

/** Barra superior de las secciones que se abren desde Inicio. */
export default function Encabezado({ titulo, onVolver }: Props) {
  return (
    <View style={styles.barra}>
      <Pressable
        onPress={onVolver}
        accessibilityRole="button"
        accessibilityLabel="Volver"
        hitSlop={10}
        style={styles.lado}
      >
        <Ionicons name="chevron-back" size={22} color={colores.texto} />
      </Pressable>
      <Text style={styles.titulo} numberOfLines={1}>
        {titulo}
      </Text>
      <View style={styles.lado} />
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: MARGEN - 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colores.linea,
  },
  lado: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fuentes.titulo,
    fontSize: 18,
    color: colores.texto,
  },
});
