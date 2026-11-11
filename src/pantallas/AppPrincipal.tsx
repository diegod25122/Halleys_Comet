import { useEffect, useState } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BarraPestanas, { Pestana } from '../components/BarraPestanas';
import Botiquin from '../components/Botiquin';
import CartaEscrita from '../components/CartaEscrita';
import Compromiso from '../components/Compromiso';
import Encabezado from '../components/Encabezado';
import Mesiversario from '../components/Mesiversario';
import Novedades from '../components/Novedades';
import Sorpresas from '../components/Sorpresas';
import {
  CARTA_COMPROMISO,
  CARTA_MESIVERSARIO,
  FECHA_COMPROMISO,
  FECHA_INICIO,
  TEXTOS_CARTA,
  VERSION_ACTUAL,
} from '../data/contenido';
import { comunes } from '../theme/estilos';
import { CLAVES, guardar, leer } from '../utils/almacen';
import { claveDia, proximoMesiversario } from '../utils/fechas';
import { programarAvisos } from '../utils/notificaciones';

type Celebracion =
  | { tipo: 'mesiversario' | 'compromiso'; meses: number }
  | { tipo: 'novedades' };
import Cartas from './Cartas';
import Cupones from './Cupones';
import Inicio, { Seccion } from './Inicio';
import Nosotros from './Nosotros';
import Razones from './Razones';
import Recuerdos from './Recuerdos';

const TITULOS: Record<Seccion, string> = {
  cartas: 'Ábrela cuando…',
  cupones: 'Cupones de amor',
  carta: 'La carta',
  sorpresas: 'Sorpresas',
  rinconcito: 'Tu rinconcito',
  razones: 'Razones',
};

const nada = () => {};

function ContenidoSeccion({ seccion, cartaInicial }: { seccion: Seccion; cartaInicial?: string }) {
  switch (seccion) {
    case 'cartas':
      return <Cartas cartaInicial={cartaInicial} />;
    case 'cupones':
      return <Cupones />;
    case 'razones':
      return <Razones />;
    case 'carta':
      return (
        <ScrollView contentContainerStyle={comunes.pantalla}>
          <CartaEscrita textos={TEXTOS_CARTA} mostrarTodo onTerminar={nada} />
        </ScrollView>
      );
    case 'sorpresas':
      return (
        <ScrollView contentContainerStyle={comunes.pantalla}>
          <Sorpresas />
        </ScrollView>
      );
    case 'rinconcito':
      return (
        <ScrollView contentContainerStyle={comunes.pantalla}>
          <Botiquin />
        </ScrollView>
      );
  }
}

/** La app después del recorrido: pestañas Inicio / Recuerdos / Nosotros y sus secciones. */
export default function AppPrincipal() {
  const [pestana, setPestana] = useState<Pestana>('inicio');
  const [seccion, setSeccion] = useState<Seccion | null>(null);
  const [cartaInicial, setCartaInicial] = useState<string | undefined>();
  /** Ventanas pendientes (novedades y celebraciones de hoy); se muestran de una en una. */
  const [celebraciones, setCelebraciones] = useState<Celebracion[]>([]);
  const celebrar = celebraciones[0];

  // Avisos + pantallas de celebración (cada una, una sola vez ese día)
  useEffect(() => {
    void programarAvisos(FECHA_INICIO, FECHA_COMPROMISO);

    let cancelado = false;
    const hoy = claveDia();
    const mesiversario = proximoMesiversario(FECHA_INICIO);
    const compromiso = proximoMesiversario(FECHA_COMPROMISO);

    Promise.all([
      leer(CLAVES.versionVista),
      mesiversario.esHoy ? leer(CLAVES.celebrado) : Promise.resolve(hoy),
      compromiso.esHoy ? leer(CLAVES.compromisoCelebrado) : Promise.resolve(hoy),
    ]).then(([versionVista, ultimoMesiversario, ultimoCompromiso]) => {
      if (cancelado) return;
      const pendientes: Celebracion[] = [];
      // Primero lo nuevo de la actualización: así entiende las pantallas que vienen después
      if (versionVista !== VERSION_ACTUAL.version) {
        pendientes.push({ tipo: 'novedades' });
      }
      if (ultimoMesiversario !== hoy) {
        pendientes.push({ tipo: 'mesiversario', meses: mesiversario.meses });
      }
      if (ultimoCompromiso !== hoy) {
        pendientes.push({ tipo: 'compromiso', meses: compromiso.meses });
      }
      setCelebraciones(pendientes);
    });
    return () => {
      cancelado = true;
    };
  }, []);

  const terminarCelebracion = (abrirCarta: boolean) => {
    if (!celebrar) return;
    if (celebrar.tipo === 'novedades') {
      void guardar(CLAVES.versionVista, VERSION_ACTUAL.version);
      setCelebraciones((cola) => cola.slice(1));
      return;
    }
    const esCompromiso = celebrar.tipo === 'compromiso';
    void guardar(esCompromiso ? CLAVES.compromisoCelebrado : CLAVES.celebrado, claveDia());
    setCelebraciones((cola) => cola.slice(1));
    if (abrirCarta) {
      setCartaInicial(esCompromiso ? CARTA_COMPROMISO : CARTA_MESIVERSARIO);
      setSeccion('cartas');
    }
  };

  const abrirSeccion = (s: Seccion) => {
    setCartaInicial(undefined);
    setSeccion(s);
  };

  // Botón "atrás" de Android: cierra la sección o vuelve a Inicio
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (seccion) {
        setSeccion(null);
        return true;
      }
      if (pestana !== 'inicio') {
        setPestana('inicio');
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [seccion, pestana]);

  return (
    <View style={styles.raiz}>
      {seccion ? (
        <SafeAreaView style={styles.raiz} edges={['top', 'bottom']}>
          <Encabezado titulo={TITULOS[seccion]} onVolver={() => setSeccion(null)} />
          <View style={styles.raiz}>
            <ContenidoSeccion seccion={seccion} cartaInicial={cartaInicial} />
          </View>
        </SafeAreaView>
      ) : (
        <>
          <SafeAreaView style={styles.raiz} edges={['top']}>
            {pestana === 'inicio' && (
              <Inicio onAbrirSeccion={abrirSeccion} onIrARecuerdos={() => setPestana('recuerdos')} />
            )}
            {pestana === 'recuerdos' && <Recuerdos />}
            {pestana === 'nosotros' && <Nosotros />}
          </SafeAreaView>
          <BarraPestanas actual={pestana} onCambiar={setPestana} />
        </>
      )}

      {celebrar?.tipo === 'novedades' && (
        <Novedades
          version={VERSION_ACTUAL}
          recienActualizada
          onCerrar={() => terminarCelebracion(false)}
        />
      )}
      {celebrar?.tipo === 'mesiversario' && (
        <Mesiversario
          meses={celebrar.meses}
          onAbrirCarta={() => terminarCelebracion(true)}
          onCerrar={() => terminarCelebracion(false)}
        />
      )}
      {celebrar?.tipo === 'compromiso' && (
        <Compromiso
          meses={celebrar.meses}
          onAbrirCarta={() => terminarCelebracion(true)}
          onCerrar={() => terminarCelebracion(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
  },
});
