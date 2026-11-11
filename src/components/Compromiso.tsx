import { Modal, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Aparecer from './Aparecer';
import Boton from './Boton';
import CorazonesFlotantes from './CorazonesFlotantes';
import Fondo from './Fondo';
import { FECHA_COMPROMISO } from '../data/contenido';
import { colores, comunes, fuentes } from '../theme/estilos';
import { fechaLarga, fechaSinAño, tiempoJuntos } from '../utils/fechas';

type Props = {
  meses: number;
  onAbrirCarta: () => void;
  onCerrar: () => void;
};

/** Pantalla de celebración que aparece el 10 de cada mes (los meses que llevamos comprometidos). */
export default function Compromiso({ meses, onAbrirCarta, onCerrar }: Props) {
  const insets = useSafeAreaInsets();
  const { dias } = tiempoJuntos(FECHA_COMPROMISO);
  const enAños = meses % 12 === 0;
  const numero = enAños ? meses / 12 : meses;
  const unidad = enAños ? (numero === 1 ? 'año' : 'años') : numero === 1 ? 'mes' : 'meses';

  return (
    <Modal visible animationType="fade" onRequestClose={onCerrar} statusBarTranslucent>
      <View style={styles.raiz}>
        <Fondo />
        <CorazonesFlotantes
          emoji="💍"
          intervalo={380}
          tamanoMin={18}
          tamanoExtra={16}
          duracionMin={3}
          duracionExtra={2}
        />
        <CorazonesFlotantes
          emoji="✨"
          intervalo={300}
          tamanoMin={14}
          tamanoExtra={16}
          duracionMin={3}
          duracionExtra={3}
        />
        <Aparecer style={[styles.contenido, { paddingBottom: insets.bottom + 24 }]}>
          <Text style={comunes.kicker}>{fechaSinAño(new Date())}</Text>
          <Text style={styles.anillo}>💍</Text>
          <Text style={styles.linea}>Hoy cumplimos</Text>
          <Text style={styles.numero}>{numero}</Text>
          <Text style={styles.linea}>
            <Text style={styles.italica}>{unidad}</Text> comprometidos
          </Text>
          <Text style={[comunes.textoSuave, styles.centrado]}>
            {dias} días desde que te di el anillo, el {fechaLarga(FECHA_COMPROMISO)}. Te volvería a
            elegir cada uno de ellos.
          </Text>
          <Boton
            titulo="Abrir mi carta de hoy"
            icono="mail-open-outline"
            onPress={onAbrirCarta}
            style={styles.boton}
          />
          <Boton titulo="Cerrar" variante="secundario" onPress={onCerrar} />
        </Aparecer>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
    gap: 10,
  },
  anillo: {
    fontSize: 44,
    lineHeight: 52,
  },
  linea: {
    fontFamily: fuentes.titulo,
    fontSize: 24,
    color: colores.texto,
  },
  italica: {
    fontFamily: fuentes.tituloItalica,
    color: colores.acento,
  },
  numero: {
    fontFamily: fuentes.titulo,
    fontSize: 120,
    lineHeight: 130,
    color: colores.acento,
  },
  centrado: {
    textAlign: 'center',
    maxWidth: 300,
    marginBottom: 10,
  },
  boton: {
    marginTop: 8,
  },
});
