import { Modal, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Aparecer from './Aparecer';
import Boton from './Boton';
import CorazonesFlotantes from './CorazonesFlotantes';
import Fondo from './Fondo';
import { FECHA_INICIO } from '../data/contenido';
import { colores, comunes, fuentes } from '../theme/estilos';
import { fechaLarga, fechaSinAño, tiempoJuntos } from '../utils/fechas';

type Props = {
  meses: number;
  onAbrirCarta: () => void;
  onCerrar: () => void;
};

/** Pantalla de celebración que aparece el día del mesiversario. */
export default function Mesiversario({ meses, onAbrirCarta, onCerrar }: Props) {
  const insets = useSafeAreaInsets();
  const { dias } = tiempoJuntos(FECHA_INICIO);
  const enAños = meses % 12 === 0;
  const numero = enAños ? meses / 12 : meses;
  const unidad = enAños ? (numero === 1 ? 'año' : 'años') : numero === 1 ? 'mes' : 'meses';

  return (
    <Modal visible animationType="fade" onRequestClose={onCerrar} statusBarTranslucent>
      <View style={styles.raiz}>
        <Fondo />
        <CorazonesFlotantes
          emoji="🎉"
          intervalo={260}
          tamanoMin={18}
          tamanoExtra={18}
          duracionMin={3}
          duracionExtra={2}
        />
        <CorazonesFlotantes
          emoji="💖"
          intervalo={420}
          tamanoMin={16}
          tamanoExtra={20}
          duracionMin={3}
          duracionExtra={3}
        />
        <Aparecer style={[styles.contenido, { paddingBottom: insets.bottom + 24 }]}>
          <Text style={comunes.kicker}>{fechaSinAño(new Date())}</Text>
          <Text style={styles.linea}>Hoy cumplimos</Text>
          <Text style={styles.numero}>{numero}</Text>
          <Text style={styles.linea}>
            <Text style={styles.italica}>{unidad}</Text> juntos
          </Text>
          <Text style={[comunes.textoSuave, styles.centrado]}>
            {dias} días desde el {fechaLarga(FECHA_INICIO)}. Gracias por cada uno de ellos.
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
    maxWidth: 280,
    marginBottom: 10,
  },
  boton: {
    marginTop: 8,
  },
});
