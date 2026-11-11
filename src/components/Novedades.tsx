import { ComponentProps } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Aparecer from './Aparecer';
import Boton from './Boton';
import { Version } from '../data/contenido';
import { colores, comunes, fuentes } from '../theme/estilos';

type NombreIcono = ComponentProps<typeof Ionicons>['name'];

type Props = {
  version: Version;
  /** true: la app se acaba de actualizar · false: ella la abrió desde Inicio */
  recienActualizada?: boolean;
  onCerrar: () => void;
};

/** Ventana "¡Nueva versión!" con la lista de lo nuevo. */
export default function Novedades({ version, recienActualizada = false, onCerrar }: Props) {
  return (
    <Modal visible transparent animationType="fade" onRequestClose={onCerrar} statusBarTranslucent>
      <View style={styles.velo}>
        <Aparecer style={styles.tarjeta}>
          <View style={styles.cometa}>
            <Text style={styles.emoji}>☄️</Text>
          </View>
          <Text style={[comunes.kicker, styles.centrado]}>
            {recienActualizada ? '¡Se actualizó tu app!' : 'Novedades'}
          </Text>
          <Text style={styles.version}>Versión {version.version}</Text>
          <Text style={styles.titulo}>{version.titulo}</Text>
          <Text style={[comunes.textoSuave, styles.centrado]}>{version.fecha}</Text>

          <ScrollView style={styles.lista} contentContainerStyle={styles.listaContenido}>
            {version.novedades.map((n) => (
              <View key={n.texto} style={styles.fila}>
                <View style={styles.icono}>
                  <Ionicons name={n.icono as NombreIcono} size={16} color={colores.acento} />
                </View>
                <Text style={styles.texto}>{n.texto}</Text>
              </View>
            ))}
          </ScrollView>

          <Boton titulo={recienActualizada ? '¡Qué lindo! Ver la app' : 'Cerrar'} onPress={onCerrar} />
        </Aparecer>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  velo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(5, 7, 15, 0.75)',
  },
  tarjeta: {
    width: '100%',
    maxWidth: 440,
    maxHeight: '88%',
    gap: 6,
    padding: 22,
    borderRadius: 24,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.acento,
    boxShadow: '0px 0px 24px rgba(255, 176, 122, 0.25)',
  },
  cometa: {
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 176, 122, 0.12)',
    marginBottom: 6,
  },
  emoji: {
    fontSize: 32,
    lineHeight: 40,
  },
  centrado: {
    textAlign: 'center',
  },
  version: {
    fontFamily: fuentes.titulo,
    fontSize: 30,
    lineHeight: 36,
    color: colores.acento,
    textAlign: 'center',
  },
  titulo: {
    fontFamily: fuentes.tituloItalica,
    fontSize: 19,
    lineHeight: 25,
    color: colores.texto,
    textAlign: 'center',
  },
  lista: {
    flexGrow: 0,
    marginVertical: 12,
  },
  listaContenido: {
    gap: 12,
  },
  fila: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  icono: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 176, 122, 0.12)',
  },
  texto: {
    flex: 1,
    fontFamily: fuentes.texto,
    fontSize: 14,
    lineHeight: 21,
    color: colores.texto,
  },
});
