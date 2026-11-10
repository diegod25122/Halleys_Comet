import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Aparecer from '../components/Aparecer';
import Boton from '../components/Boton';
import { CARTAS_CUANDO, CartaCuando, NOMBRES } from '../data/contenido';
import { ANCHO_MAX, comunes, fuentes, MARGEN } from '../theme/estilos';
import { CLAVES, guardarJSON, leerJSON } from '../utils/almacen';

const PAPEL = '#fbf3ea';
const SOLAPA = '#efe1d2';
const TINTA = '#3a2a2a';
const LACRE = '#c8304e';
const ESPACIO = 12;

function Sobre({
  carta,
  leida,
  ancho,
  onAbrir,
}: {
  carta: CartaCuando;
  leida: boolean;
  ancho: number;
  onAbrir: () => void;
}) {
  const alto = Math.round(ancho / 1.3);
  return (
    <Pressable
      onPress={onAbrir}
      accessibilityRole="button"
      accessibilityLabel={`Ábrela cuando ${carta.cuando}${leida ? ', leída' : ''}`}
      style={({ pressed }) => [
        styles.sobre,
        { width: ancho, height: alto },
        leida && styles.sobreLeido,
        pressed && styles.presionado,
      ]}
    >
      {/* Solapa triangular del sobre */}
      <View
        style={[
          styles.solapa,
          {
            borderLeftWidth: ancho / 2,
            borderRightWidth: ancho / 2,
            borderTopWidth: alto * 0.55,
          },
        ]}
      />
      <View style={[styles.sello, { top: alto * 0.55 - 14, left: ancho / 2 - 14 }, leida && styles.selloLeido]}>
        <Ionicons
          name={leida ? 'checkmark' : 'heart'}
          size={13}
          color={leida ? '#2f8a5b' : '#ffd9dd'}
        />
      </View>
      <Text style={styles.cuandoSobre} numberOfLines={2}>
        …{carta.cuando}
      </Text>
    </Pressable>
  );
}

type Props = {
  /** Si viene, esa carta se abre directamente (por ejemplo, el día del mesiversario). */
  cartaInicial?: string;
};

/** Sobres "Ábrela cuando…": cartas cortas para momentos concretos. */
export default function Cartas({ cartaInicial }: Props) {
  const { width } = useWindowDimensions();
  const [leidas, setLeidas] = useState<string[]>([]);
  const [abierta, setAbierta] = useState<string | null>(cartaInicial ?? null);

  useEffect(() => {
    leerJSON<string[]>(CLAVES.cartasLeidas, []).then((v) => {
      if (Array.isArray(v)) setLeidas((prev) => Array.from(new Set([...v, ...prev])));
    });
  }, []);

  // Al abrir una carta, queda marcada como leída
  useEffect(() => {
    if (!abierta) return;
    setLeidas((prev) => {
      if (prev.includes(abierta)) return prev;
      const nuevo = [...prev, abierta];
      void guardarJSON(CLAVES.cartasLeidas, nuevo);
      return nuevo;
    });
  }, [abierta]);

  const carta = CARTAS_CUANDO.find((c) => c.id === abierta);

  if (carta) {
    return (
      <ScrollView contentContainerStyle={comunes.pantalla}>
        <Aparecer key={carta.id} style={styles.hoja}>
          <Text style={styles.kickHoja}>Ábrela cuando {carta.cuando}</Text>
          <Text style={styles.tituloHoja}>{carta.titulo}</Text>
          <Text style={styles.textoHoja}>{carta.texto}</Text>
          <Text style={styles.firma}>{NOMBRES.el}</Text>
        </Aparecer>
        <Boton
          titulo="Volver a los sobres"
          icono="mail-outline"
          variante="secundario"
          onPress={() => setAbierta(null)}
        />
      </ScrollView>
    );
  }

  const ancho = Math.floor((Math.min(width, ANCHO_MAX) - MARGEN * 2 - ESPACIO) / 2);
  const leidasValidas = CARTAS_CUANDO.filter((c) => leidas.includes(c.id)).length;

  return (
    <ScrollView contentContainerStyle={comunes.pantalla}>
      <Text style={comunes.textoSuave}>
        {leidasValidas} de {CARTAS_CUANDO.length} leídas · elige la que necesites hoy
      </Text>
      <View style={styles.rejilla}>
        {CARTAS_CUANDO.map((c) => (
          <Sobre
            key={c.id}
            carta={c}
            leida={leidas.includes(c.id)}
            ancho={ancho}
            onAbrir={() => setAbierta(c.id)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rejilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ESPACIO,
  },
  sobre: {
    backgroundColor: PAPEL,
    borderRadius: 10,
    overflow: 'hidden',
    boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.35)',
  },
  sobreLeido: {
    opacity: 0.55,
  },
  presionado: {
    transform: [{ scale: 0.97 }],
  },
  solapa: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: SOLAPA,
  },
  sello: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: LACRE,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
  },
  selloLeido: {
    backgroundColor: '#e3efe7',
  },
  cuandoSobre: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 8,
    fontFamily: fuentes.tituloItalica,
    fontSize: 14,
    lineHeight: 17,
    color: TINTA,
    textAlign: 'center',
  },
  hoja: {
    backgroundColor: PAPEL,
    borderRadius: 14,
    padding: 24,
    gap: 14,
    boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.45)',
    transform: [{ rotate: '-0.6deg' }],
    marginTop: 8,
  },
  kickHoja: {
    fontFamily: fuentes.fuerte,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: LACRE,
  },
  tituloHoja: {
    fontFamily: fuentes.titulo,
    fontSize: 26,
    lineHeight: 32,
    color: TINTA,
  },
  textoHoja: {
    fontFamily: fuentes.texto,
    fontSize: 16,
    lineHeight: 27,
    color: TINTA,
  },
  firma: {
    fontFamily: fuentes.tituloItalica,
    fontSize: 20,
    color: LACRE,
    textAlign: 'right',
    marginTop: 6,
  },
});
