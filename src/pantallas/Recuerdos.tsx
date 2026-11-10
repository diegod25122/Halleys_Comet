import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import Miniatura from '../components/Miniatura';
import Visor from '../components/Visor';
import { RECUERDOS } from '../data/contenido';
import { ANCHO_MAX, colores, comunes, fuentes, MARGEN } from '../theme/estilos';

type Filtro = 'todo' | 'foto' | 'video';

const FILTROS: { id: Filtro; titulo: string }[] = [
  { id: 'todo', titulo: 'Todo' },
  { id: 'foto', titulo: 'Fotos' },
  { id: 'video', titulo: 'Videos' },
];

const ESPACIO = 4;
const FOTOS = RECUERDOS.filter((m) => m.tipo === 'foto').length;
const VIDEOS = RECUERDOS.length - FOTOS;

export default function Recuerdos() {
  const { width } = useWindowDimensions();
  const [filtro, setFiltro] = useState<Filtro>('todo');
  const [abierto, setAbierto] = useState<number | null>(null);

  const lista = useMemo(
    () => (filtro === 'todo' ? RECUERDOS : RECUERDOS.filter((m) => m.tipo === filtro)),
    [filtro],
  );
  const elementos = useMemo(() => lista.map((medio) => ({ medio })), [lista]);

  // Cuadrícula de 3 columnas; el primero ocupa 2x2
  const lado = Math.floor((Math.min(width, ANCHO_MAX) - MARGEN * 2 - ESPACIO * 2) / 3);
  const grande = lado * 2 + ESPACIO;
  const [primero, segundo, tercero, ...resto] = lista;

  return (
    <>
      <ScrollView contentContainerStyle={comunes.pantalla}>
        <View style={styles.cabecera}>
          <Text style={comunes.kicker}>
            {FOTOS} fotos · {VIDEOS} videos
          </Text>
          <Text style={comunes.titulo}>Recuerdos</Text>
        </View>

        <View style={styles.filtros} accessibilityRole="tablist">
          {FILTROS.map((f) => {
            const activo = f.id === filtro;
            return (
              <Pressable
                key={f.id}
                onPress={() => setFiltro(f.id)}
                accessibilityRole="tab"
                accessibilityState={{ selected: activo }}
                style={[styles.filtro, activo && styles.filtroActivo]}
              >
                <Text style={[styles.textoFiltro, activo && styles.textoFiltroActivo]}>
                  {f.titulo}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.galeria}>
          {primero && (
            <View style={styles.fila}>
              <Miniatura
                medio={primero}
                style={{ width: grande, height: grande }}
                onPress={() => setAbierto(0)}
              />
              <View style={styles.columna}>
                {segundo && (
                  <Miniatura
                    medio={segundo}
                    style={{ width: lado, height: lado }}
                    onPress={() => setAbierto(1)}
                  />
                )}
                {tercero && (
                  <Miniatura
                    medio={tercero}
                    style={{ width: lado, height: lado }}
                    onPress={() => setAbierto(2)}
                  />
                )}
              </View>
            </View>
          )}
          <View style={styles.resto}>
            {resto.map((m, i) => (
              <Miniatura
                key={m.id}
                medio={m}
                style={{ width: lado, height: lado }}
                onPress={() => setAbierto(i + 3)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {abierto !== null && (
        <Visor
          key={`${filtro}-${abierto}`}
          elementos={elementos}
          indiceInicial={abierto}
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
  filtros: {
    flexDirection: 'row',
    gap: 8,
  },
  filtro: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colores.linea,
  },
  filtroActivo: {
    backgroundColor: colores.texto,
    borderColor: colores.texto,
  },
  textoFiltro: {
    fontFamily: fuentes.medio,
    fontSize: 13,
    color: colores.suave,
  },
  textoFiltroActivo: {
    color: colores.fondo,
  },
  galeria: {
    gap: ESPACIO,
  },
  fila: {
    flexDirection: 'row',
    gap: ESPACIO,
  },
  columna: {
    gap: ESPACIO,
  },
  resto: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ESPACIO,
  },
});
