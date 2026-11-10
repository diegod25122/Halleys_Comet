import { useCallback, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';

import Aparecer from '../components/Aparecer';
import Boton from '../components/Boton';
import CartaEscrita from '../components/CartaEscrita';
import MiniReproductor from '../components/MiniReproductor';
import { IMAGENES, TEXTOS_CARTA } from '../data/contenido';
import { colores, comunes, MARGEN } from '../theme/estilos';

type Props = {
  onContinuar: () => void;
};

/** La carta que se escribe sola. Tocándola, se muestra completa. */
export default function Carta({ onContinuar }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const seguirAbajo = useRef(true);
  const [parte, setParte] = useState(0);
  const [mostrarTodo, setMostrarTodo] = useState(false);
  const [terminada, setTerminada] = useState(false);

  const terminar = useCallback(() => {
    seguirAbajo.current = false;
    setTerminada(true);
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 150);
  }, []);

  return (
    <SafeAreaView style={styles.raiz} edges={['top', 'bottom']}>
      <View style={styles.cabecera}>
        <View style={styles.pasos}>
          {TEXTOS_CARTA.map((_, i) => (
            <View key={i} style={[styles.paso, i <= parte && styles.pasoActivo]} />
          ))}
        </View>
        <Text style={comunes.kicker}>
          Carta · parte {parte + 1} de {TEXTOS_CARTA.length}
        </Text>
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[comunes.pantalla, styles.contenido]}
        onContentSizeChange={() => {
          // Mientras se escribe la carta, la pantalla sigue al texto
          if (seguirAbajo.current) scrollRef.current?.scrollToEnd({ animated: false });
        }}
        onScrollBeginDrag={() => {
          // Si ella sube para releer, dejamos de bajar solos
          if (!terminada) seguirAbajo.current = false;
        }}
      >
        <View style={styles.fotoFila}>
          <Image source={IMAGENES.chiquita} style={styles.foto} contentFit="cover" />
          <Text style={[comunes.textoSuave, styles.pieFoto]}>
            Fotito de la chica de mis sueños (es la más linda que conozco)
          </Text>
        </View>

        <Pressable
          onPress={() => setMostrarTodo(true)}
          disabled={terminada}
          accessibilityHint="Muestra la carta completa"
        >
          <CartaEscrita
            textos={TEXTOS_CARTA}
            mostrarTodo={mostrarTodo}
            onProgreso={setParte}
            onTerminar={terminar}
          />
        </Pressable>

        {!terminada ? (
          <Text style={[comunes.textoSuave, styles.centrado]}>
            Toca la carta si quieres verla completa
          </Text>
        ) : (
          <Aparecer>
            <Boton titulo="Continuar" icono="arrow-forward" onPress={onContinuar} />
          </Aparecer>
        )}
      </ScrollView>

      <View style={styles.reproductor}>
        <MiniReproductor />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
  },
  cabecera: {
    paddingHorizontal: MARGEN,
    paddingTop: 12,
    paddingBottom: 6,
    gap: 10,
  },
  pasos: {
    flexDirection: 'row',
    gap: 5,
  },
  paso: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: colores.linea,
  },
  pasoActivo: {
    backgroundColor: colores.acento,
  },
  contenido: {
    paddingBottom: 24,
  },
  fotoFila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  foto: {
    width: 84,
    height: 108,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colores.acento,
  },
  pieFoto: {
    flex: 1,
    fontStyle: 'italic',
  },
  centrado: {
    textAlign: 'center',
  },
  reproductor: {
    paddingHorizontal: MARGEN,
    paddingBottom: 8,
  },
});
