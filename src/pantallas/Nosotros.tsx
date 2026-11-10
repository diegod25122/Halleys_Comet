import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Miniatura from '../components/Miniatura';
import Visor, { ElementoVisor } from '../components/Visor';
import { CANCION, FECHA_INICIO, Hito, HITOS, NOMBRES, PLANES } from '../data/contenido';
import { colores, comunes, fuentes } from '../theme/estilos';
import { CLAVES, guardar, leer } from '../utils/almacen';
import { fechaLarga, tiempoJuntos } from '../utils/fechas';

function elementosDe(hito: Hito): ElementoVisor[] {
  return hito.medios.map((medio) => ({
    medio,
    etiqueta: hito.fecha,
    texto: hito.texto ?? hito.titulo,
  }));
}

function MediosHito({ hito, onAbrir }: { hito: Hito; onAbrir: (i: number) => void }) {
  const n = hito.medios.length;
  if (n === 1) {
    return (
      <Miniatura
        medio={hito.medios[0]}
        radio={12}
        style={styles.medioUnico}
        onPress={() => onAbrir(0)}
      />
    );
  }
  return (
    <View style={styles.mediosFila}>
      {hito.medios.map((m, i) => (
        <Miniatura
          key={m.id}
          medio={m}
          radio={10}
          style={[styles.medioVarios, { aspectRatio: n === 2 ? 3 / 4 : 2 / 3 }]}
          onPress={() => onAbrir(i)}
        />
      ))}
    </View>
  );
}

export default function Nosotros() {
  const { dias, semanas, meses } = tiempoJuntos(FECHA_INICIO);
  const [cumplidos, setCumplidos] = useState<string[]>([]);
  const [abierto, setAbierto] = useState<{ hito: Hito; indice: number } | null>(null);

  useEffect(() => {
    leer(CLAVES.planes).then((v) => {
      if (!v) return;
      try {
        const lista = JSON.parse(v);
        if (Array.isArray(lista)) setCumplidos(lista.filter((x) => typeof x === 'string'));
      } catch {
        // dato dañado: empezamos de cero
      }
    });
  }, []);

  const alternarPlan = (id: string) => {
    setCumplidos((prev) => {
      const nuevo = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      void guardar(CLAVES.planes, JSON.stringify(nuevo));
      return nuevo;
    });
  };

  const hechos = PLANES.filter((p) => cumplidos.includes(p.id)).length;

  return (
    <>
      <ScrollView contentContainerStyle={comunes.pantalla}>
        <View style={styles.cabecera}>
          <Text style={comunes.kicker}>
            {NOMBRES.el} & {NOMBRES.ella}
          </Text>
          <Text style={comunes.titulo}>Nosotros</Text>
        </View>

        {/* Contador */}
        <View style={[comunes.tarjeta, styles.contador]}>
          <Text style={comunes.textoSuave}>Llevamos juntos</Text>
          <Text style={styles.numeroDias}>{dias}</Text>
          <Text style={comunes.textoSuave}>
            {dias === 1 ? 'día' : 'días'} · desde el {fechaLarga(FECHA_INICIO)}
          </Text>
          <View style={styles.trio}>
            <View style={styles.dato}>
              <Text style={styles.datoNumero}>{semanas}</Text>
              <Text style={styles.datoTexto}>semanas</Text>
            </View>
            <View style={styles.dato}>
              <Text style={styles.datoNumero}>{meses}</Text>
              <Text style={styles.datoTexto}>{meses === 1 ? 'mes' : 'meses'}</Text>
            </View>
            <View style={styles.dato}>
              <Text style={styles.datoNumero}>{HITOS.length}</Text>
              <Text style={styles.datoTexto}>momentos</Text>
            </View>
          </View>
        </View>

        {/* Canción */}
        <View style={[comunes.tarjeta, styles.cancion]}>
          <View style={styles.disco}>
            <View style={styles.centroDisco} />
          </View>
          <View style={styles.flex}>
            <Text style={styles.tituloCancion}>{CANCION.titulo}</Text>
            <Text style={comunes.textoSuave}>{CANCION.artista} · nuestra canción</Text>
            <Text style={styles.fraseCancion}>"{CANCION.frase}"</Text>
          </View>
        </View>

        {/* Línea del tiempo */}
        <View style={styles.seccion}>
          <Text style={comunes.kicker}>Nuestra historia</Text>
          <Text style={comunes.subtitulo}>Desde el primer día</Text>
        </View>
        <View style={styles.tiempo}>
          <View style={styles.linea} />
          {HITOS.map((hito) => (
            <View key={hito.titulo} style={styles.hito}>
              <View style={styles.punto} />
              <Text style={styles.fecha}>{hito.fecha}</Text>
              <Text style={styles.tituloHito}>{hito.titulo}</Text>
              {hito.texto && <Text style={comunes.textoSuave}>{hito.texto}</Text>}
              <MediosHito hito={hito} onAbrir={(indice) => setAbierto({ hito, indice })} />
            </View>
          ))}
          <View style={styles.hito}>
            <View style={[styles.punto, styles.puntoHoy]} />
            <Text style={styles.fecha}>Hoy</Text>
            <Text style={styles.tituloHito}>Y lo que falta por vivir…</Text>
          </View>
        </View>

        {/* Planes */}
        <View style={styles.seccion}>
          <Text style={comunes.kicker}>Nos falta</Text>
          <Text style={comunes.subtitulo}>Cosas por hacer juntos</Text>
        </View>
        <View style={styles.progreso}>
          <View style={styles.barra}>
            <View style={[styles.relleno, { width: `${(hechos / PLANES.length) * 100}%` }]} />
          </View>
          <Text style={styles.datoTexto}>
            {hechos} de {PLANES.length}
          </Text>
        </View>
        <View style={styles.planes}>
          {PLANES.map((plan) => {
            const hecho = cumplidos.includes(plan.id);
            return (
              <Pressable
                key={plan.id}
                onPress={() => alternarPlan(plan.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: hecho }}
                style={({ pressed }) => [styles.plan, pressed && styles.presionado]}
              >
                <View style={[styles.casilla, hecho && styles.casillaHecha]}>
                  {hecho && <Ionicons name="checkmark" size={14} color={colores.sobreAcento} />}
                </View>
                <Text style={[styles.textoPlan, hecho && styles.textoPlanHecho]}>
                  {plan.texto}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={[comunes.textoSuave, styles.ayuda]}>
          Toca un plan para marcarlo cuando lo cumplamos.
        </Text>
      </ScrollView>

      {abierto && (
        <Visor
          elementos={elementosDe(abierto.hito)}
          indiceInicial={abierto.indice}
          onCerrar={() => setAbierto(null)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cabecera: {
    gap: 4,
    marginTop: 8,
  },
  flex: {
    flex: 1,
  },
  contador: {
    alignItems: 'center',
    backgroundColor: colores.superficie2,
  },
  numeroDias: {
    fontFamily: fuentes.titulo,
    fontSize: 64,
    lineHeight: 72,
    color: colores.acento,
    fontVariant: ['tabular-nums'],
  },
  trio: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
    alignSelf: 'stretch',
  },
  dato: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  datoNumero: {
    fontFamily: fuentes.fuerte,
    fontSize: 17,
    color: colores.texto,
    fontVariant: ['tabular-nums'],
  },
  datoTexto: {
    fontFamily: fuentes.medio,
    fontSize: 11,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colores.suave,
  },
  cancion: {
    flexDirection: 'row',
    gap: 14,
    alignItems: 'center',
  },
  disco: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#262626',
    borderWidth: 6,
    borderColor: '#1b1b1b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centroDisco: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colores.acento,
  },
  tituloCancion: {
    fontFamily: fuentes.fuerte,
    fontSize: 15,
    color: colores.texto,
  },
  fraseCancion: {
    fontFamily: fuentes.tituloItalica,
    fontSize: 14,
    lineHeight: 20,
    color: colores.texto,
    marginTop: 6,
  },
  seccion: {
    gap: 4,
    marginTop: 14,
  },
  tiempo: {
    paddingLeft: 26,
    gap: 28,
  },
  linea: {
    position: 'absolute',
    left: 6,
    top: 8,
    bottom: 8,
    width: 2,
    borderRadius: 1,
    backgroundColor: colores.linea,
  },
  hito: {
    gap: 6,
  },
  punto: {
    position: 'absolute',
    left: -26,
    top: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: colores.acento,
    backgroundColor: colores.fondo,
  },
  puntoHoy: {
    backgroundColor: colores.acento,
    boxShadow: '0px 0px 10px rgba(255, 176, 122, 0.7)',
  },
  fecha: {
    fontFamily: fuentes.fuerte,
    fontSize: 11,
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    color: colores.acento,
  },
  tituloHito: {
    fontFamily: fuentes.titulo,
    fontSize: 19,
    lineHeight: 25,
    color: colores.texto,
  },
  medioUnico: {
    width: '100%',
    aspectRatio: 4 / 5,
    marginTop: 4,
  },
  mediosFila: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  medioVarios: {
    flex: 1,
  },
  progreso: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  barra: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: colores.linea,
    overflow: 'hidden',
  },
  relleno: {
    height: '100%',
    backgroundColor: colores.acento,
  },
  planes: {
    gap: 8,
  },
  plan: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 14,
    backgroundColor: colores.superficie,
    borderWidth: 1,
    borderColor: colores.linea,
  },
  casilla: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colores.suave,
    alignItems: 'center',
    justifyContent: 'center',
  },
  casillaHecha: {
    backgroundColor: colores.acento,
    borderColor: colores.acento,
  },
  textoPlan: {
    flex: 1,
    fontFamily: fuentes.texto,
    fontSize: 15,
    color: colores.texto,
  },
  textoPlanHecho: {
    color: colores.suave,
    textDecorationLine: 'line-through',
  },
  ayuda: {
    textAlign: 'center',
    fontSize: 12.5,
  },
  presionado: {
    opacity: 0.8,
  },
});
