import { StyleSheet } from 'react-native';

/** Paleta "Noche de cometa": cielo nocturno con la luz cálida del cometa. */
export const colores = {
  fondo: '#0d1230',
  fondoAlto: '#1c2560',
  superficie: '#171e45',
  superficie2: '#1f2858',
  linea: '#2a3262',
  texto: '#f4efe7',
  suave: '#a3a7c7',
  acento: '#ffb07a',
  acento2: '#ff7a93',
  sobreAcento: '#1a1430',
  azul: '#8fb8ff',
  azulOscuro: '#5f8fe0',
  azulFondo: 'rgba(143, 184, 255, 0.10)',
  dorado: '#ffd700',
  naranja: '#ffaa00',
  verdeTerminal: '#00ff00',
  negro: '#05070f',
  blanco: '#ffffff',
} as const;

/** Nombres de las fuentes cargadas en App.tsx (Fraunces para títulos, DM Sans para textos). */
export const fuentes = {
  titulo: 'Fraunces_400Regular',
  tituloItalica: 'Fraunces_400Regular_Italic',
  tituloFuerte: 'Fraunces_600SemiBold',
  texto: 'DMSans_400Regular',
  medio: 'DMSans_500Medium',
  fuerte: 'DMSans_700Bold',
} as const;

export const MARGEN = 20;

/** Ancho máximo del contenido: en tablet o navegador la app se ve centrada, como en un celular. */
export const ANCHO_MAX = 520;

export const comunes = StyleSheet.create({
  pantalla: {
    paddingHorizontal: MARGEN,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 18,
  },
  kicker: {
    fontFamily: fuentes.fuerte,
    fontSize: 11,
    letterSpacing: 2.2,
    textTransform: 'uppercase',
    color: colores.acento,
  },
  tituloGrande: {
    fontFamily: fuentes.titulo,
    fontSize: 36,
    lineHeight: 42,
    color: colores.texto,
  },
  titulo: {
    fontFamily: fuentes.titulo,
    fontSize: 28,
    lineHeight: 34,
    color: colores.texto,
  },
  subtitulo: {
    fontFamily: fuentes.titulo,
    fontSize: 20,
    lineHeight: 26,
    color: colores.texto,
  },
  texto: {
    fontFamily: fuentes.texto,
    fontSize: 15,
    lineHeight: 23,
    color: colores.texto,
  },
  textoSuave: {
    fontFamily: fuentes.texto,
    fontSize: 14,
    lineHeight: 21,
    color: colores.suave,
  },
  tarjeta: {
    backgroundColor: colores.superficie,
    borderColor: colores.linea,
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
  },
});
