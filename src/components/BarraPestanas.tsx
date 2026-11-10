import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NombreIcono } from './Boton';
import { colores, fuentes } from '../theme/estilos';

export type Pestana = 'inicio' | 'recuerdos' | 'nosotros';

const PESTANAS: { id: Pestana; titulo: string; icono: NombreIcono; iconoActivo: NombreIcono }[] = [
  { id: 'inicio', titulo: 'Inicio', icono: 'home-outline', iconoActivo: 'home' },
  { id: 'recuerdos', titulo: 'Recuerdos', icono: 'images-outline', iconoActivo: 'images' },
  { id: 'nosotros', titulo: 'Nosotros', icono: 'heart-outline', iconoActivo: 'heart' },
];

type Props = {
  actual: Pestana;
  onCambiar: (p: Pestana) => void;
};

export default function BarraPestanas({ actual, onCambiar }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.barra, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {PESTANAS.map((p) => {
        const activa = p.id === actual;
        const color = activa ? colores.acento : colores.suave;
        return (
          <Pressable
            key={p.id}
            onPress={() => onCambiar(p.id)}
            accessibilityRole="tab"
            accessibilityState={{ selected: activa }}
            style={styles.item}
          >
            <Ionicons name={activa ? p.iconoActivo : p.icono} size={22} color={color} />
            <Text style={[styles.texto, { color }]}>{p.titulo}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: colores.superficie,
    borderTopWidth: 1,
    borderTopColor: colores.linea,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  texto: {
    fontFamily: fuentes.medio,
    fontSize: 11,
  },
});
