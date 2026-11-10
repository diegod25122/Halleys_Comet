import { useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Aparecer from '../components/Aparecer';
import Boton from '../components/Boton';
import CorazonesFlotantes from '../components/CorazonesFlotantes';
import { colores, comunes, fuentes, MARGEN } from '../theme/estilos';

type Props = {
  onEntrar: () => void;
};

type Tamano = { ancho: number; alto: number };

export default function Pregunta({ onEntrar }: Props) {
  const [dijoSi, setDijoSi] = useState(false);
  const [posicionNo, setPosicionNo] = useState<{ x: number; y: number } | null>(null);

  const zona = useRef<Tamano>({ ancho: 0, alto: 0 });
  const botonNo = useRef<Tamano>({ ancho: 0, alto: 0 });

  const medir = (destino: { current: Tamano }) => (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    destino.current = { ancho: width, alto: height };
  };

  // En el celular no hay "hover": el botón huye apenas lo tocas (onPressIn)
  const escapar = () => {
    const maxX = Math.max(0, zona.current.ancho - botonNo.current.ancho);
    const maxY = Math.max(0, zona.current.alto - botonNo.current.alto);
    setPosicionNo({
      x: Math.floor(Math.random() * maxX),
      y: Math.floor(Math.random() * maxY),
    });
  };

  return (
    <SafeAreaView style={styles.raiz} edges={['top', 'bottom']}>
      {!dijoSi ? (
        <View style={styles.contenido}>
          <Text style={comunes.kicker}>Una última pregunta</Text>
          <Text style={styles.pregunta}>
            Después de todo esto… ¿ute también <Text style={styles.acento}>me ama</Text>? 🥺
          </Text>

          <View style={styles.zonaBotones} onLayout={medir(zona)}>
            <Boton titulo="Chii, te amo" icono="heart" onPress={() => setDijoSi(true)} />
            <Boton
              titulo="Noup"
              variante="secundario"
              style={[
                styles.botonNo,
                posicionNo && { position: 'absolute', left: posicionNo.x, top: posicionNo.y },
              ]}
              onLayout={medir(botonNo)}
              onPressIn={escapar}
              onPress={escapar}
            />
          </View>
        </View>
      ) : (
        <View style={[styles.contenido, styles.centro]}>
          <Aparecer style={styles.final}>
            <Text style={styles.corazon}>💖</Text>
            <Text style={styles.mensajeSi}>Yo lo sabía. Te amo muchísimo mashhhh :3</Text>
            <Text style={[comunes.textoSuave, styles.centrado]}>
              Te preparé algunas cosas más. Están todas aquí, para que vuelvas cuando quieras.
            </Text>
            <Boton
              titulo="Ver todo lo que preparé para ti"
              icono="sparkles"
              onPress={onEntrar}
              style={styles.botonEntrar}
            />
          </Aparecer>
        </View>
      )}

      {dijoSi && (
        <CorazonesFlotantes
          emoji="💖"
          intervalo={180}
          tamanoMin={18}
          tamanoExtra={26}
          duracionMin={2}
          duracionExtra={2}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
  },
  contenido: {
    flex: 1,
    paddingHorizontal: MARGEN + 4,
    justifyContent: 'center',
    gap: 18,
  },
  centro: {
    alignItems: 'center',
  },
  pregunta: {
    fontFamily: fuentes.titulo,
    fontSize: 34,
    lineHeight: 42,
    color: colores.texto,
  },
  acento: {
    fontFamily: fuentes.tituloItalica,
    color: colores.acento,
  },
  zonaBotones: {
    height: 240,
    marginTop: 12,
    gap: 14,
    alignItems: 'flex-start',
  },
  botonNo: {
    paddingHorizontal: 30,
  },
  final: {
    alignItems: 'center',
    gap: 16,
  },
  corazon: {
    fontSize: 56,
  },
  mensajeSi: {
    fontFamily: fuentes.titulo,
    fontSize: 28,
    lineHeight: 36,
    color: colores.acento,
    textAlign: 'center',
  },
  centrado: {
    textAlign: 'center',
    maxWidth: 300,
  },
  botonEntrar: {
    marginTop: 10,
  },
});
