import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colores, fuentes } from '../theme/estilos';

type Props = {
  textos: readonly string[];
  /** Espera antes de empezar a escribir (ms). */
  retrasoInicial?: number;
  /** Tiempo entre letra y letra (ms). */
  velocidad?: number;
  /** Pausa al terminar cada párrafo (ms). */
  pausaParrafo?: number;
  /** Si es true, se muestra toda la carta de una vez. */
  mostrarTodo?: boolean;
  /** Avisa qué párrafo se está escribiendo (empieza en 0). */
  onProgreso?: (parrafo: number) => void;
  onTerminar: () => void;
};

/** Cuántos párrafos del final son la firma (se ven en cursiva y con el color del cometa). */
const PARRAFOS_FIRMA = 2;

export default function CartaEscrita({
  textos,
  retrasoInicial = 2500,
  velocidad = 45,
  pausaParrafo = 800,
  mostrarTodo = false,
  onProgreso,
  onTerminar,
}: Props) {
  const [parrafos, setParrafos] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [terminada, setTerminada] = useState(false);

  // Guardamos la última versión de los callbacks para no reiniciar el efecto
  const onTerminarRef = useRef(onTerminar);
  const onProgresoRef = useRef(onProgreso);
  useEffect(() => {
    onTerminarRef.current = onTerminar;
    onProgresoRef.current = onProgreso;
  }, [onTerminar, onProgreso]);

  const yaTermino = useRef(false);
  const terminar = () => {
    if (yaTermino.current) return;
    yaTermino.current = true;
    setTerminada(true);
    onProgresoRef.current?.(textos.length - 1);
    onTerminarRef.current();
  };

  // Efecto máquina de escribir
  useEffect(() => {
    if (mostrarTodo) {
      setParrafos([...textos]);
      terminar();
      return;
    }

    // Array.from separa por caracteres reales, así los emojis no se rompen a la mitad
    const letras = textos.map((t) => Array.from(t));

    // Momento (en ms desde que empieza) en que arranca cada párrafo
    const inicios: number[] = [];
    let acumulado = retrasoInicial;
    for (const linea of letras) {
      inicios.push(acumulado);
      acumulado += linea.length * velocidad + pausaParrafo;
    }
    const duracionTotal = acumulado - pausaParrafo;

    // En vez de esperar letra por letra, cada tic calcula cuántas letras ya deberían verse
    // según el tiempo que pasó. Así, si el celular o el navegador pausan los temporizadores
    // un momento, la carta se pone al día sola y nunca se queda trabada.
    const comienzo = Date.now();
    let mostradas = -1;
    let parrafoAvisado = -1;

    const tic = () => {
      const t = Date.now() - comienzo;
      const visibles: string[] = [];
      let total = 0;
      for (let i = 0; i < letras.length; i++) {
        if (t < inicios[i]) break;
        const n = Math.min(letras[i].length, Math.floor((t - inicios[i]) / velocidad) + 1);
        visibles.push(letras[i].slice(0, n).join(''));
        total += n;
      }

      if (total !== mostradas) {
        mostradas = total;
        setParrafos(visibles);
      }
      const actual = visibles.length - 1;
      if (actual >= 0 && actual !== parrafoAvisado) {
        parrafoAvisado = actual;
        onProgresoRef.current?.(actual);
      }
      if (t >= duracionTotal) {
        clearInterval(intervalo);
        setParrafos([...textos]);
        terminar();
      }
    };

    const intervalo = setInterval(tic, Math.min(velocidad, 40));
    return () => clearInterval(intervalo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textos, retrasoInicial, velocidad, pausaParrafo, mostrarTodo]);

  // Cursor parpadeante
  useEffect(() => {
    if (terminada) return;
    const id = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(id);
  }, [terminada]);

  const cursor = !terminada && (
    <Text style={{ color: cursorVisible ? colores.acento : 'transparent' }}> |</Text>
  );

  const inicioFirma = textos.length - PARRAFOS_FIRMA;

  return (
    <View style={styles.contenedor}>
      {parrafos.length === 0 ? (
        <Text style={styles.parrafo}>{cursor}</Text>
      ) : (
        parrafos.map((p, indice) => (
          <Text
            key={indice}
            style={[styles.parrafo, indice >= inicioFirma && styles.firma]}
          >
            {p}
            {indice === parrafos.length - 1 && cursor}
          </Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    padding: 20,
    backgroundColor: colores.superficie,
    borderColor: colores.linea,
    borderWidth: 1,
    borderRadius: 18,
    gap: 18,
  },
  parrafo: {
    fontFamily: fuentes.texto,
    fontSize: 16.5,
    lineHeight: 27,
    color: colores.texto,
  },
  firma: {
    fontFamily: fuentes.tituloItalica,
    fontSize: 18,
    lineHeight: 26,
    color: colores.acento,
    textAlign: 'right',
  },
});
