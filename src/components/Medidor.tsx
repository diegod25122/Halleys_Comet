import { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import Boton from './Boton';
import { NOMBRES } from '../data/contenido';
import { colores, comunes, fuentes } from '../theme/estilos';

type Estado = 'listo' | 'calculando' | 'colapso';

type Props = {
  onColapso: () => void;
};

export default function Medidor({ onColapso }: Props) {
  const [estado, setEstado] = useState<Estado>('listo');
  const [amor, setAmor] = useState(0);
  const escala = useRef(new Animated.Value(1)).current;
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const latidoRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(
    () => () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
      latidoRef.current?.stop();
    },
    [],
  );

  const calcularAmor = () => {
    setEstado('calculando');
    let valor = 0;

    intervaloRef.current = setInterval(() => {
      valor += Math.floor(Math.random() * 150) + 50;
      setAmor(valor);

      if (valor > 100) {
        escala.setValue(1 + valor / 20000);
      }

      if (valor > 15000) {
        if (intervaloRef.current) clearInterval(intervaloRef.current);
        setEstado('colapso');

        // Latido rapidísimo (0.1s) como en el CSS original
        const latido = Animated.loop(
          Animated.sequence([
            Animated.timing(escala, { toValue: 1.3, duration: 50, useNativeDriver: true }),
            Animated.timing(escala, { toValue: 1, duration: 50, useNativeDriver: true }),
          ]),
        );
        latidoRef.current = latido;
        latido.start();

        setTimeout(onColapso, 100);
      }
    }, 40);
  };

  const tituloBoton =
    estado === 'listo'
      ? 'Calcular Amor 💖'
      : estado === 'calculando'
        ? 'Procesando datos...'
        : 'Sistema colapsado 💀';

  return (
    <View style={[comunes.tarjeta, styles.seccion]}>
      <Text style={comunes.kicker}>La máquina de la verdad</Text>
      <Text style={comunes.subtitulo}>Medidor de compatibilidad científica</Text>
      <Text style={comunes.textoSuave}>Veamos qué dice el sistema...</Text>

      <View style={styles.nombres}>
        <View style={styles.cajaNombre}>
          <Text style={styles.nombre}>{NOMBRES.el}</Text>
        </View>
        <Text style={styles.mas}>+</Text>
        <View style={styles.cajaNombre}>
          <Text style={styles.nombre}>{NOMBRES.ella}</Text>
        </View>
      </View>

      <Boton
        titulo={tituloBoton}
        color={colores.acento2}
        disabled={estado !== 'listo'}
        onPress={calcularAmor}
      />

      {estado !== 'listo' && (
        <View style={styles.resultado}>
          <Animated.Text
            style={[
              styles.numero,
              { color: amor > 100 ? colores.acento2 : colores.acento },
              { transform: [{ scale: escala }] },
            ]}
          >
            {estado === 'colapso' ? '+99999%' : `${amor}%`}
          </Animated.Text>

          {estado === 'colapso' && (
            <Text style={styles.error}>
              ⚠️ ERROR 404: CAPACIDAD EXCEDIDA.{'\n'}Demasiado amor para este servidor. 💥
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  seccion: {
    gap: 8,
    borderStyle: 'dashed',
    borderColor: colores.acento2,
  },
  nombres: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },
  cajaNombre: {
    width: 110,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colores.acento2,
    borderRadius: 12,
    backgroundColor: colores.superficie2,
    alignItems: 'center',
  },
  nombre: {
    fontFamily: fuentes.fuerte,
    fontSize: 16,
    color: colores.texto,
  },
  mas: {
    fontFamily: fuentes.titulo,
    fontSize: 28,
    marginHorizontal: 15,
    color: colores.suave,
  },
  resultado: {
    alignItems: 'center',
    marginTop: 12,
  },
  numero: {
    fontFamily: fuentes.tituloFuerte,
    fontSize: 46,
    marginVertical: 20,
    fontVariant: ['tabular-nums'],
  },
  error: {
    fontFamily: fuentes.fuerte,
    color: colores.acento2,
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
});
