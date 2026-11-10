import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';

import Aparecer from './Aparecer';
import Boton from './Boton';
import { FRASES_CONSUELO, SONIDOS } from '../data/contenido';
import { useMusica } from '../contexto/Musica';
import { colores, comunes, fuentes } from '../theme/estilos';
import { indiceAleatorioDistinto } from '../utils/azar';

const DURACION_FASE = 4000; // 4s inhalar + 4s exhalar

function Respiracion() {
  const escala = useRef(new Animated.Value(0.8)).current;
  const [fase, setFase] = useState<'Inhala...' | 'Exhala...'>('Inhala...');

  useEffect(() => {
    let activo = true;

    const ciclo = () => {
      if (!activo) return;
      setFase('Inhala...');
      Animated.timing(escala, {
        toValue: 1.3,
        duration: DURACION_FASE,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!activo || !finished) return;
        setFase('Exhala...');
        Animated.timing(escala, {
          toValue: 0.8,
          duration: DURACION_FASE,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }).start(({ finished: terminado }) => {
          if (terminado) ciclo();
        });
      });
    };

    ciclo();
    return () => {
      activo = false;
      escala.stopAnimation();
    };
  }, [escala]);

  return (
    <View style={styles.zonaRespirar}>
      <Text style={[comunes.textoSuave, styles.centrado]}>
        Sigue el círculo. Inhala cuando crezca, exhala cuando se encoja.
      </Text>
      <Animated.View style={[styles.circuloSombra, { transform: [{ scale: escala }] }]}>
        <LinearGradient colors={[colores.azul, colores.azulOscuro]} style={styles.circulo}>
          <Text style={styles.textoCirculo}>{fase}</Text>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}

/** El rinconcito seguro: frases de consuelo, respiración y el audio con mi voz. */
export default function Botiquin() {
  const { musica } = useMusica();
  const [frase, setFrase] = useState<string | null>(null);
  const fraseAnterior = useRef(-1);
  const [respirando, setRespirando] = useState(false);

  const voz = useAudioPlayer(SONIDOS.vozMotivacion);
  const estadoVoz = useAudioPlayerStatus(voz);
  const [sonandoVoz, setSonandoVoz] = useState(false);

  // Cuando termina el audio, se oculta el mensaje y la música vuelve a su volumen
  useEffect(() => {
    if (sonandoVoz && estadoVoz.didJustFinish) {
      setSonandoVoz(false);
      musica.volume = 1;
    }
  }, [estadoVoz.didJustFinish, sonandoVoz, musica]);

  // Si se sale de la sección con el audio sonando, la música recupera su volumen
  useEffect(
    () => () => {
      musica.volume = 1;
    },
    [musica],
  );

  const fraseEmergencia = () => {
    const indice = indiceAleatorioDistinto(FRASES_CONSUELO.length, fraseAnterior.current);
    fraseAnterior.current = indice;
    setFrase(FRASES_CONSUELO[indice]);
  };

  const reproducirAudioSecreto = () => {
    musica.volume = 0.14;
    void voz.seekTo(0);
    voz.play();
    setSonandoVoz(true);
  };

  return (
    <View style={styles.lista}>
      <View style={[comunes.tarjeta, styles.intro]}>
        <Text style={[comunes.kicker, styles.kickerAzul]}>Para los días grises</Text>
        <Text style={comunes.subtitulo}>Tu rinconcito seguro</Text>
        <Text style={comunes.textoSuave}>
          Siempre que sientas que tu mundo se derrumba y veas que no estoy cerca, usa este refugio
          emocional y tómalo como si estuvieras conmigo.
        </Text>
        <Text style={comunes.textoSuave}>
          Es un pedacito de lo que siento por ti y de cuánto me preocupo por ti.
        </Text>
      </View>

      <View style={comunes.tarjeta}>
        <Boton
          titulo="Botón de emergencia"
          icono="heart-half-outline"
          color={colores.azul}
          onPress={fraseEmergencia}
        />
        {frase && (
          <Aparecer key={frase}>
            <Text style={styles.textoEmergencia}>"{frase}"</Text>
          </Aparecer>
        )}
      </View>

      <View style={comunes.tarjeta}>
        <Boton
          titulo={respirando ? 'Terminar' : 'Respira conmigo'}
          icono="leaf-outline"
          color={colores.azul}
          onPress={() => setRespirando((r) => !r)}
        />
        {respirando && <Respiracion />}
      </View>

      <View style={comunes.tarjeta}>
        <Boton
          titulo="Escucha esto"
          icono="mic-outline"
          color={colores.azul}
          onPress={reproducirAudioSecreto}
        />
        {sonandoVoz && <Text style={styles.mensajeAudio}>Reproduciendo mi voz... ❤️</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lista: {
    gap: 14,
  },
  intro: {
    gap: 8,
    backgroundColor: colores.azulFondo,
    borderColor: 'rgba(143, 184, 255, 0.3)',
  },
  kickerAzul: {
    color: colores.azul,
  },
  centrado: {
    textAlign: 'center',
  },
  textoEmergencia: {
    fontFamily: fuentes.tituloItalica,
    fontSize: 18,
    lineHeight: 27,
    color: colores.texto,
    textAlign: 'center',
    marginTop: 18,
  },
  zonaRespirar: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 30,
    gap: 40,
  },
  circuloSombra: {
    width: 150,
    height: 150,
    borderRadius: 75,
    boxShadow: '0px 0px 24px rgba(143, 184, 255, 0.5)',
  },
  circulo: {
    flex: 1,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoCirculo: {
    fontFamily: fuentes.fuerte,
    color: colores.sobreAcento,
    fontSize: 18,
  },
  mensajeAudio: {
    fontFamily: fuentes.medio,
    color: colores.azul,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 14,
  },
});
