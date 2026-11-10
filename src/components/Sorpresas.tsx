import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

import Aparecer from './Aparecer';
import Boton from './Boton';
import { IMAGENES, LINEAS_TERMINAL } from '../data/contenido';
import { colores, comunes, fuentes } from '../theme/estilos';

const FUENTE_MONO = Platform.select({ ios: 'Courier', default: 'monospace' });

export default function Sorpresas() {
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [lineasTerminal, setLineasTerminal] = useState<string[]>([]);
  const [fotoTerminal, setFotoTerminal] = useState(false);
  const [cartaVisible, setCartaVisible] = useState(false);
  const [vistaVisible, setVistaVisible] = useState(false);

  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const limpiarTemporizadores = () => {
    if (intervaloRef.current) clearInterval(intervaloRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => limpiarTemporizadores, []);

  const iniciarProtocolo = () => {
    limpiarTemporizadores();
    setTerminalVisible(true);
    setLineasTerminal([]);
    setFotoTerminal(false);

    let indice = 0;
    intervaloRef.current = setInterval(() => {
      if (indice < LINEAS_TERMINAL.length) {
        const linea = LINEAS_TERMINAL[indice];
        setLineasTerminal((prev) => [...prev, linea]);
        indice++;
      } else {
        if (intervaloRef.current) clearInterval(intervaloRef.current);
        timeoutRef.current = setTimeout(() => setFotoTerminal(true), 500);
      }
    }, 800);
  };

  return (
    <View style={styles.lista}>
      <Text style={comunes.textoSuave}>Tres sorpresitas. Ábrelas en el orden que quieras.</Text>

      {/* Escáner de belleza */}
      <View style={comunes.tarjeta}>
        <Text style={comunes.kicker}>Sorpresa 1</Text>
        <Text style={[comunes.subtitulo, styles.titulo]}>Escáner de belleza</Text>
        <Boton
          titulo="Ejecutar escáner"
          icono="terminal-outline"
          variante="suave"
          onPress={iniciarProtocolo}
        />
        {terminalVisible && (
          <View style={styles.terminal}>
            {lineasTerminal.map((linea, i) => (
              <Text key={i} style={styles.textoTerminal}>
                {linea}
              </Text>
            ))}
            {fotoTerminal && (
              <Aparecer>
                <Image source={IMAGENES.chiquibebe} style={styles.fotoTerminal} contentFit="cover" />
              </Aparecer>
            )}
          </View>
        )}
      </View>

      {/* Carta legendaria */}
      <View style={comunes.tarjeta}>
        <Text style={comunes.kicker}>Sorpresa 2</Text>
        <Text style={[comunes.subtitulo, styles.titulo]}>Personaje legendario</Text>
        <Boton
          titulo="Desbloquear personaje"
          icono="star-outline"
          variante="suave"
          onPress={() => setCartaVisible(true)}
        />
        {cartaVisible && (
          <Aparecer style={styles.cartaSombra}>
            <LinearGradient
              colors={[colores.dorado, colores.naranja]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.carta}
            >
              <Image source={IMAGENES.soff} style={styles.fotoCarta} contentFit="cover" />
              <Text style={styles.nombreCarta}>SOFÍA</Text>
              <Text style={styles.rareza}>RAREZA: LEGENDARIA ⭐</Text>
              <View style={styles.stats}>
                <Text style={styles.stat}>
                  🧠 <Text style={styles.negrita}>Inteligencia:</Text> La bestia!!
                </Text>
                <Text style={styles.stat}>
                  💘 <Text style={styles.negrita}>Sonrisa:</Text> +1000 de daño crítico a mi corazón
                </Text>
                <Text style={styles.stat}>
                  ✨ <Text style={styles.negrita}>Habilidad Especial:</Text> Hacerme feliz solo con
                  existir
                </Text>
              </View>
            </LinearGradient>
          </Aparecer>
        )}
      </View>

      {/* Vista favorita */}
      <View style={comunes.tarjeta}>
        <Text style={comunes.kicker}>Sorpresa 3</Text>
        <Text style={[comunes.subtitulo, styles.titulo]}>Mi vista favorita</Text>
        <Boton
          titulo="Ver mi vista favorita"
          icono="eye-outline"
          variante="suave"
          onPress={() => setVistaVisible(true)}
        />
        {vistaVisible && (
          <Aparecer style={styles.vista}>
            <Image source={IMAGENES.bbi} style={styles.fotoVista} contentFit="cover" />
            <Text style={styles.textoVista}>
              "Pongo esta foto porque cuando estamos juntos me pierdo tanto viéndote que se me olvida
              sacar el celular para tomar fotos de los dos. Eres preciosa. PD: Ya tenemos foto juntos
              ya la voy a poner :333"
            </Text>
          </Aparecer>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lista: {
    gap: 16,
  },
  titulo: {
    marginTop: 4,
    marginBottom: 14,
  },
  terminal: {
    marginTop: 16,
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 12,
    boxShadow: '0px 0px 15px rgba(0, 255, 0, 0.25)',
  },
  textoTerminal: {
    color: colores.verdeTerminal,
    fontFamily: FUENTE_MONO,
    fontSize: 13,
    lineHeight: 21,
  },
  fotoTerminal: {
    width: 150,
    aspectRatio: 9 / 16,
    alignSelf: 'center',
    marginTop: 15,
    borderWidth: 2,
    borderColor: colores.verdeTerminal,
  },
  cartaSombra: {
    marginTop: 16,
    borderRadius: 16,
    boxShadow: '0px 10px 24px rgba(255, 176, 122, 0.35)',
  },
  carta: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  fotoCarta: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: colores.blanco,
    marginBottom: 15,
  },
  nombreCarta: {
    fontFamily: fuentes.tituloFuerte,
    fontSize: 24,
    color: '#333333',
  },
  rareza: {
    fontFamily: fuentes.fuerte,
    color: colores.blanco,
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginVertical: 10,
  },
  stats: {
    alignSelf: 'stretch',
    gap: 8,
  },
  stat: {
    fontFamily: fuentes.texto,
    fontSize: 15,
    lineHeight: 21,
    color: '#333333',
  },
  negrita: {
    fontFamily: fuentes.fuerte,
  },
  vista: {
    marginTop: 16,
    gap: 14,
  },
  fotoVista: {
    width: '100%',
    aspectRatio: 9 / 16,
    borderRadius: 12,
  },
  textoVista: {
    fontFamily: fuentes.tituloItalica,
    fontSize: 17,
    lineHeight: 25,
    color: colores.texto,
    textAlign: 'center',
  },
});
