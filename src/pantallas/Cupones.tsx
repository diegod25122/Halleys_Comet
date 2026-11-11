import { ComponentProps, useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Boton from '../components/Boton';
import { Cupon, CUPONES, LimiteCupon, NOMBRES } from '../data/contenido';
import { colores, comunes, fuentes } from '../theme/estilos';
import { CLAVES, guardarJSON, leerJSON } from '../utils/almacen';
import { claveDia, claveMes, desdeClaveDia, fechaCorta, inicioSemana } from '../utils/fechas';

type NombreIcono = ComponentProps<typeof Ionicons>['name'];

/** Para cada cupón, los días en que se canjeó ("2026-11-10"). */
export type Canjes = Record<string, string[]>;

const ETIQUETA: Record<LimiteCupon, string> = {
  cuandoQuieras: 'Cuando quieras',
  semanal: '1 vez a la semana',
  mensual: '1 vez al mes',
  unico: 'Solo una vez',
};

const AVISO: Record<LimiteCupon, string> = {
  cuandoQuieras: 'Puedes usarlo todas las veces que quieras.',
  semanal: 'Después podrás usarlo otra vez la próxima semana (se renueva cada lunes).',
  mensual: 'Después podrás usarlo otra vez el próximo mes.',
  unico: 'Solo se puede usar una vez, así que úsalo bien jeje.',
};

export function cuponDisponible(cupon: Cupon, canjes: Canjes): boolean {
  const usados = canjes[cupon.id] ?? [];
  if (cupon.limite === 'unico') return usados.length === 0;
  if (cupon.limite === 'mensual') return !usados.some((d) => d.startsWith(claveMes()));
  if (cupon.limite === 'semanal') {
    const lunes = claveDia(inicioSemana());
    return !usados.some((d) => d >= lunes);
  }
  return true;
}

function detalleCanje(cupon: Cupon, canjes: Canjes): string | null {
  const usados = canjes[cupon.id] ?? [];
  const ultimo = usados[usados.length - 1];
  if (!ultimo) return null;
  const fecha = fechaCorta(desdeClaveDia(ultimo));
  if (cupon.limite === 'unico') return `Canjeado el ${fecha}`;
  if (cupon.limite === 'mensual' && !cuponDisponible(cupon, canjes)) {
    const hoy = new Date();
    const proximo = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 1);
    return `Canjeado el ${fecha} · vuelve el ${fechaCorta(proximo)}`;
  }
  if (cupon.limite === 'semanal' && !cuponDisponible(cupon, canjes)) {
    const lunes = inicioSemana();
    const proximo = new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate() + 7);
    return `Canjeado el ${fecha} · vuelve el ${fechaCorta(proximo)}`;
  }
  return usados.length === 1 ? `Canjeado 1 vez` : `Canjeado ${usados.length} veces`;
}

function Ticket({
  cupon,
  grande = false,
  apagado = false,
  sello = false,
  detalle,
}: {
  cupon: Cupon;
  grande?: boolean;
  apagado?: boolean;
  sello?: boolean;
  detalle?: string | null;
}) {
  return (
    <View style={[styles.ticket, apagado && styles.apagado]}>
      <View style={[styles.talon, grande && styles.talonGrande, apagado && styles.talonApagado]}>
        <Ionicons
          name={cupon.icono as NombreIcono}
          size={grande ? 28 : 22}
          color={apagado ? colores.suave : colores.sobreAcento}
        />
      </View>
      <View style={styles.cuerpo}>
        <Text style={[styles.tituloCupon, grande && styles.tituloGrande, sello && styles.tachado]}>
          {cupon.titulo}
        </Text>
        <Text style={styles.nota}>{cupon.nota}</Text>
        <View style={styles.filaEtiqueta}>
          <Text style={styles.etiqueta}>{ETIQUETA[cupon.limite]}</Text>
          {detalle && <Text style={styles.detalle}>{detalle}</Text>}
        </View>
      </View>
      {sello && <Text style={styles.sello}>CANJEADO</Text>}
    </View>
  );
}

/** Cupones de amor que ella puede canjear. */
export default function Cupones() {
  const insets = useSafeAreaInsets();
  const [canjes, setCanjes] = useState<Canjes>({});
  const [elegido, setElegido] = useState<Cupon | null>(null);
  const [recienCanjeado, setRecienCanjeado] = useState(false);

  useEffect(() => {
    leerJSON<Canjes>(CLAVES.cupones, {}).then((v) => {
      if (v && typeof v === 'object') setCanjes(v);
    });
  }, []);

  const canjear = () => {
    if (!elegido) return;
    setCanjes((prev) => {
      const nuevo = { ...prev, [elegido.id]: [...(prev[elegido.id] ?? []), claveDia()] };
      void guardarJSON(CLAVES.cupones, nuevo);
      return nuevo;
    });
    setRecienCanjeado(true);
  };

  const cerrar = () => {
    setElegido(null);
    setRecienCanjeado(false);
  };

  const disponibles = CUPONES.filter((c) => cuponDisponible(c, canjes)).length;

  return (
    <>
      <ScrollView contentContainerStyle={comunes.pantalla}>
        <Text style={comunes.textoSuave}>
          {disponibles} por canjear · toca uno para usarlo
        </Text>
        <View style={styles.lista}>
          {CUPONES.map((c) => {
            const disponible = cuponDisponible(c, canjes);
            return (
              <Pressable
                key={c.id}
                onPress={() => disponible && setElegido(c)}
                disabled={!disponible}
                accessibilityRole="button"
                accessibilityState={{ disabled: !disponible }}
                style={({ pressed }) => pressed && styles.presionado}
              >
                <Ticket
                  cupon={c}
                  apagado={!disponible}
                  sello={!disponible}
                  detalle={detalleCanje(c, canjes)}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <Modal
        visible={elegido !== null}
        transparent
        animationType="fade"
        onRequestClose={cerrar}
        statusBarTranslucent
      >
        <Pressable style={styles.velo} onPress={cerrar} accessibilityLabel="Cerrar" />
        {elegido && (
          <View style={[styles.hojaInferior, { paddingBottom: insets.bottom + 20 }]}>
            {!recienCanjeado ? (
              <>
                <Text style={comunes.kicker}>Canjear cupón</Text>
                <Ticket cupon={elegido} grande />
                <Text style={comunes.textoSuave}>
                  {AVISO[elegido.limite]} Cuando lo canjees, enséñale esta pantalla a {NOMBRES.el}.
                </Text>
                <Boton titulo="Canjear ahora" icono="checkmark-circle" onPress={canjear} />
                <Boton titulo="Todavía no" variante="secundario" onPress={cerrar} />
              </>
            ) : (
              <>
                <Text style={styles.listo}>¡Canjeado! 💖</Text>
                <Ticket cupon={elegido} grande sello detalle={`Hoy, ${fechaCorta(new Date())}`} />
                <Text style={comunes.textoSuave}>
                  Enséñale esta pantalla a {NOMBRES.el}. Ahora le toca cumplir jeje.
                </Text>
                <Boton titulo="Listo" onPress={cerrar} />
              </>
            )}
          </View>
        )}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  lista: {
    gap: 10,
  },
  presionado: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  ticket: {
    flexDirection: 'row',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colores.superficie2,
    borderWidth: 1,
    borderColor: colores.linea,
  },
  apagado: {
    opacity: 0.5,
  },
  talon: {
    width: 58,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colores.acento,
  },
  talonGrande: {
    width: 76,
  },
  talonApagado: {
    backgroundColor: colores.linea,
  },
  cuerpo: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    gap: 3,
    borderLeftWidth: 2,
    borderLeftColor: 'rgba(255, 255, 255, 0.25)',
    borderStyle: 'dashed',
  },
  tituloCupon: {
    fontFamily: fuentes.medio,
    fontSize: 15,
    lineHeight: 20,
    color: colores.texto,
  },
  tituloGrande: {
    fontFamily: fuentes.titulo,
    fontSize: 20,
    lineHeight: 26,
  },
  tachado: {
    textDecorationLine: 'line-through',
  },
  nota: {
    fontFamily: fuentes.texto,
    fontSize: 13,
    color: colores.suave,
  },
  filaEtiqueta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginTop: 6,
  },
  etiqueta: {
    fontFamily: fuentes.fuerte,
    fontSize: 10.5,
    letterSpacing: 0.4,
    color: colores.acento,
    backgroundColor: 'rgba(255, 176, 122, 0.14)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    overflow: 'hidden',
  },
  detalle: {
    fontFamily: fuentes.texto,
    fontSize: 11.5,
    color: colores.suave,
  },
  sello: {
    position: 'absolute',
    right: 12,
    top: 12,
    fontFamily: fuentes.fuerte,
    fontSize: 10,
    letterSpacing: 1.5,
    color: colores.acento2,
    borderWidth: 1.5,
    borderColor: colores.acento2,
    borderRadius: 4,
    paddingHorizontal: 5,
    paddingVertical: 2,
    transform: [{ rotate: '-10deg' }],
  },
  velo: {
    flex: 1,
    backgroundColor: 'rgba(5, 7, 15, 0.75)',
  },
  hojaInferior: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 520,
    backgroundColor: colores.superficie,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: colores.linea,
    paddingTop: 22,
    paddingHorizontal: 20,
    gap: 14,
  },
  listo: {
    fontFamily: fuentes.titulo,
    fontSize: 26,
    color: colores.acento,
  },
});
