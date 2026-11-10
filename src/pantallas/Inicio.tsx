import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';

import type { NombreIcono } from '../components/Boton';
import MiniReproductor from '../components/MiniReproductor';
import {
  CARTAS_CUANDO,
  CUPONES,
  FECHA_INICIO,
  FRASES_DIA,
  IMAGENES,
  RAZONES,
  RECUERDOS,
} from '../data/contenido';
import { colores, comunes, fuentes } from '../theme/estilos';
import { CLAVES, leerJSON } from '../utils/almacen';
import {
  fechaCorta,
  fechaSinAño,
  indiceDelDia,
  proximoMesiversario,
  textoMeses,
  tiempoJuntos,
} from '../utils/fechas';
import { Canjes, cuponDisponible } from './Cupones';

export type Seccion = 'cartas' | 'cupones' | 'carta' | 'sorpresas' | 'rinconcito' | 'razones';

type Props = {
  onAbrirSeccion: (s: Seccion) => void;
  onIrARecuerdos: () => void;
};

const FOTOS = RECUERDOS.filter((m) => m.tipo === 'foto').length;
const VIDEOS = RECUERDOS.length - FOTOS;

function CuentaRegresiva() {
  const prox = proximoMesiversario(FECHA_INICIO);
  return (
    <View style={styles.cuenta}>
      <View style={styles.circulo}>
        {prox.esHoy ? (
          <Ionicons name="heart" size={22} color={colores.acento} />
        ) : (
          <Text style={styles.numeroCirculo}>{prox.faltan}</Text>
        )}
      </View>
      <View style={styles.flex}>
        <Text style={styles.tituloCuenta}>
          {prox.esHoy
            ? `¡Hoy cumplimos ${textoMeses(prox.meses)}!`
            : prox.faltan === 1
              ? 'Falta 1 día'
              : `Faltan ${prox.faltan} días`}
        </Text>
        <Text style={styles.detalle}>
          {prox.esHoy
            ? 'Feliz mesiversario, mi niña'
            : `para nuestros ${textoMeses(prox.meses)} · ${fechaSinAño(prox.fecha)}`}
        </Text>
        <View style={styles.barra}>
          <View style={[styles.relleno, { width: `${prox.progreso * 100}%` }]} />
        </View>
      </View>
    </View>
  );
}

export default function Inicio({ onAbrirSeccion, onIrARecuerdos }: Props) {
  const { dias } = tiempoJuntos(FECHA_INICIO);
  const frase = FRASES_DIA[indiceDelDia(FECHA_INICIO, FRASES_DIA.length)];

  const [leidas, setLeidas] = useState<string[]>([]);
  const [canjes, setCanjes] = useState<Canjes>({});

  useEffect(() => {
    leerJSON<string[]>(CLAVES.cartasLeidas, []).then((v) => Array.isArray(v) && setLeidas(v));
    leerJSON<Canjes>(CLAVES.cupones, {}).then((v) => v && typeof v === 'object' && setCanjes(v));
  }, []);

  const sinLeer = CARTAS_CUANDO.filter((c) => !leidas.includes(c.id)).length;
  const porCanjear = CUPONES.filter((c) => cuponDisponible(c, canjes)).length;

  const secciones: {
    id: Seccion;
    titulo: string;
    detalle: string;
    icono: NombreIcono;
    color: string;
    aviso?: string;
  }[] = [
    {
      id: 'cartas',
      titulo: 'Ábrela cuando…',
      detalle: `${CARTAS_CUANDO.length} cartas`,
      icono: 'mail-unread-outline',
      color: colores.acento,
      aviso: sinLeer > 0 ? `${sinLeer} sin leer` : undefined,
    },
    {
      id: 'cupones',
      titulo: 'Cupones',
      detalle: `${porCanjear} por canjear`,
      icono: 'ticket-outline',
      color: colores.acento2,
    },
    { id: 'carta', titulo: 'La carta', detalle: 'Léela otra vez', icono: 'mail-outline', color: colores.acento },
    { id: 'sorpresas', titulo: 'Sorpresas', detalle: '3 por abrir', icono: 'gift-outline', color: colores.acento2 },
    { id: 'rinconcito', titulo: 'Rinconcito', detalle: 'Para días grises', icono: 'leaf-outline', color: colores.azul },
    {
      id: 'razones',
      titulo: 'Razones',
      detalle: `${RAZONES.length} y un medidor`,
      icono: 'sparkles-outline',
      color: colores.acento,
    },
  ];

  return (
    <ScrollView contentContainerStyle={comunes.pantalla}>
      <View style={styles.saludo}>
        <Text style={comunes.kicker}>Hola, mi niña</Text>
        <Text style={comunes.titulo}>Todo esto es tuyo</Text>
        <Text style={comunes.textoSuave}>
          Llevamos <Text style={styles.dias}>{dias} días</Text> juntos.
        </Text>
      </View>

      <CuentaRegresiva />

      <View style={comunes.tarjeta}>
        <Text style={comunes.kicker}>Mensaje de hoy · {fechaCorta(new Date())}</Text>
        <Text style={styles.frase}>"{frase}"</Text>
        <Text style={styles.manana}>Mañana hay uno nuevo</Text>
      </View>

      <Pressable
        onPress={onIrARecuerdos}
        accessibilityRole="button"
        style={({ pressed }) => [comunes.tarjeta, styles.grande, pressed && styles.presionado]}
      >
        <Image source={IMAGENES.besito} style={styles.fotoGrande} contentFit="cover" />
        <View style={styles.flex}>
          <Text style={styles.tituloTarjeta}>Nuestros recuerdos</Text>
          <Text style={styles.detalle}>
            {FOTOS} fotos · {VIDEOS} videos
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colores.suave} />
      </Pressable>

      <View style={styles.rejilla}>
        {secciones.map((s) => (
          <Pressable
            key={s.id}
            onPress={() => onAbrirSeccion(s.id)}
            accessibilityRole="button"
            style={({ pressed }) => [
              comunes.tarjeta,
              styles.celda,
              s.aviso && styles.celdaNueva,
              pressed && styles.presionado,
            ]}
          >
            <Ionicons name={s.icono} size={24} color={s.color} />
            {s.aviso && <Text style={styles.aviso}>{s.aviso}</Text>}
            <View>
              <Text style={styles.tituloTarjeta}>{s.titulo}</Text>
              <Text style={styles.detalle}>{s.detalle}</Text>
            </View>
          </Pressable>
        ))}
      </View>

      <MiniReproductor />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  saludo: {
    gap: 6,
    marginTop: 8,
    marginBottom: 4,
  },
  dias: {
    fontFamily: fuentes.fuerte,
    color: colores.acento,
  },
  flex: {
    flex: 1,
  },
  cuenta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#2a2557',
    borderWidth: 1,
    borderColor: '#4a3f7a',
  },
  circulo: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: colores.acento,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numeroCirculo: {
    fontFamily: fuentes.titulo,
    fontSize: 24,
    color: colores.acento,
    fontVariant: ['tabular-nums'],
  },
  tituloCuenta: {
    fontFamily: fuentes.titulo,
    fontSize: 18,
    color: colores.texto,
  },
  barra: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    overflow: 'hidden',
    marginTop: 8,
  },
  relleno: {
    height: '100%',
    backgroundColor: colores.acento,
  },
  frase: {
    fontFamily: fuentes.tituloItalica,
    fontSize: 18,
    lineHeight: 26,
    color: colores.texto,
    marginTop: 8,
  },
  manana: {
    fontFamily: fuentes.texto,
    fontSize: 12,
    color: colores.suave,
    marginTop: 8,
  },
  grande: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 12,
  },
  fotoGrande: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  rejilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  celda: {
    flexBasis: '47%',
    flexGrow: 1,
    gap: 22,
    padding: 16,
  },
  celdaNueva: {
    borderColor: colores.acento,
  },
  aviso: {
    position: 'absolute',
    top: 14,
    right: 12,
    fontFamily: fuentes.fuerte,
    fontSize: 10,
    color: colores.sobreAcento,
    backgroundColor: colores.acento,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
  },
  tituloTarjeta: {
    fontFamily: fuentes.medio,
    fontSize: 15,
    color: colores.texto,
  },
  detalle: {
    fontFamily: fuentes.texto,
    fontSize: 12.5,
    color: colores.suave,
    marginTop: 2,
  },
  presionado: {
    opacity: 0.8,
  },
});
