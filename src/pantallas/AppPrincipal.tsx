import { useEffect, useState } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BarraPestanas, { Pestana } from '../components/BarraPestanas';
import Botiquin from '../components/Botiquin';
import CartaEscrita from '../components/CartaEscrita';
import Encabezado from '../components/Encabezado';
import Mesiversario from '../components/Mesiversario';
import Sorpresas from '../components/Sorpresas';
import { CARTA_MESIVERSARIO, FECHA_INICIO, TEXTOS_CARTA } from '../data/contenido';
import { comunes } from '../theme/estilos';
import { CLAVES, guardar, leer } from '../utils/almacen';
import { claveDia, proximoMesiversario } from '../utils/fechas';
import { programarMesiversarios } from '../utils/notificaciones';
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
  const [celebrar, setCelebrar] = useState<number | null>(null);

  // Avisos de mesiversario + pantalla de celebración (una vez ese día)
  useEffect(() => {
    void programarMesiversarios(FECHA_INICIO);

    const prox = proximoMesiversario(FECHA_INICIO);
    if (!prox.esHoy) return;
    leer(CLAVES.celebrado).then((ultimo) => {
      if (ultimo !== claveDia()) setCelebrar(prox.meses);
    });
  }, []);

  const terminarCelebracion = (abrirCarta: boolean) => {
    void guardar(CLAVES.celebrado, claveDia());
    setCelebrar(null);
    if (abrirCarta) {
      setCartaInicial(CARTA_MESIVERSARIO);
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

      {celebrar !== null && (
        <Mesiversario
          meses={celebrar}
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
