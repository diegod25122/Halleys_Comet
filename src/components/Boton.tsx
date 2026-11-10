import { ComponentProps } from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { colores, fuentes } from '../theme/estilos';

export type NombreIcono = ComponentProps<typeof Ionicons>['name'];

type Props = Omit<PressableProps, 'style' | 'children'> & {
  titulo: string;
  /** principal: relleno de color · secundario: solo borde · suave: fondo de tarjeta */
  variante?: 'principal' | 'secundario' | 'suave';
  /** Color de fondo para la variante principal (por defecto, el acento). */
  color?: string;
  colorTexto?: string;
  icono?: NombreIcono;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Boton({
  titulo,
  variante = 'principal',
  color = colores.acento,
  colorTexto,
  icono,
  style,
  textStyle,
  disabled,
  ...resto
}: Props) {
  const fondo =
    variante === 'principal' ? color : variante === 'suave' ? colores.superficie2 : 'transparent';
  const texto = colorTexto ?? (variante === 'principal' ? colores.sobreAcento : colores.texto);

  return (
    <Pressable
      {...resto}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        { backgroundColor: fondo },
        variante === 'secundario' && styles.borde,
        pressed && styles.presionado,
        disabled && styles.desactivado,
        style,
      ]}
    >
      {icono && <Ionicons name={icono} size={18} color={texto} />}
      <Text style={[styles.texto, { color: texto }, textStyle]}>{titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  borde: {
    borderWidth: 1,
    borderColor: colores.linea,
  },
  presionado: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  desactivado: {
    opacity: 0.45,
  },
  texto: {
    fontFamily: fuentes.fuerte,
    fontSize: 15,
    textAlign: 'center',
  },
});
