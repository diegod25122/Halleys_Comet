import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import { sumarMeses, textoMeses, tiempoJuntos } from './fechas';

const CANAL = 'mesiversario';
/**
 * Cuántos meses por delante se dejan programados.
 * iPhone permite máximo 64 avisos programados: con 2 fechas × 2 avisos × 13 meses son 52.
 */
const MESES_ADELANTE = 12;

if (Platform.OS !== 'web') {
  // Si la app está abierta cuando llega el aviso, igual se muestra
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

type Textos = {
  /** El día antes a las 8 p. m. */
  antes: (meses: number) => { title: string; body: string };
  /** El mismo día a las 8 a. m. */
  mismoDia: (meses: number) => { title: string; body: string };
};

async function programar(fecha: Date, content: { title: string; body: string }) {
  if (fecha.getTime() <= Date.now()) return;
  await Notifications.scheduleNotificationAsync({
    content,
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: fecha,
      channelId: CANAL,
    },
  });
}

/** Programa los avisos de los próximos meses contados desde `inicio`. */
async function programarCadaMes(inicio: Date, textos: Textos) {
  const mesesActuales = tiempoJuntos(inicio).meses;

  for (let k = Math.max(1, mesesActuales); k <= mesesActuales + MESES_ADELANTE; k++) {
    const dia = sumarMeses(inicio, k);

    const elDiaAntes = new Date(dia);
    elDiaAntes.setDate(elDiaAntes.getDate() - 1);
    elDiaAntes.setHours(20, 0, 0, 0);

    const elMismoDia = new Date(dia);
    elMismoDia.setHours(8, 0, 0, 0);

    await programar(elDiaAntes, textos.antes(k));
    await programar(elMismoDia, textos.mismoDia(k));
  }
}

/**
 * Programa en el celular los avisos de los próximos mesiversarios y de los meses
 * de compromiso: uno el día antes (8 p. m.) y otro el mismo día (8 a. m.).
 * No necesita internet. La primera vez pide permiso para mandar avisos.
 */
export async function programarAvisos(inicio: Date, compromiso: Date): Promise<void> {
  if (Platform.OS === 'web') return;

  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(CANAL, {
        name: 'Mesiversarios',
        importance: Notifications.AndroidImportance.HIGH,
      });
    }

    const permiso = await Notifications.getPermissionsAsync();
    let concedido = permiso.granted;
    if (!concedido && permiso.canAskAgain) {
      concedido = (await Notifications.requestPermissionsAsync()).granted;
    }
    if (!concedido) return;

    // Se reprograman siempre desde cero, así nunca quedan avisos repetidos
    await Notifications.cancelAllScheduledNotificationsAsync();

    await programarCadaMes(inicio, {
      antes: (k) => ({
        title: 'Mañana es nuestro día ☄️',
        body: `Mañana cumplimos ${textoMeses(k)} juntos.`,
      }),
      mismoDia: (k) => ({
        title: `Hoy cumplimos ${textoMeses(k)} ☄️`,
        body: 'Te dejé algo especial en la app. Ábrela cuando puedas.',
      }),
    });

    await programarCadaMes(compromiso, {
      antes: (k) => ({
        title: 'Mañana es un día especial 💍',
        body: `Mañana cumplimos ${textoMeses(k)} comprometidos.`,
      }),
      mismoDia: (k) => ({
        title: `Hoy cumplimos ${textoMeses(k)} comprometidos 💍`,
        body: 'Te dejé algo especial en la app. Ábrela cuando puedas.',
      }),
    });
  } catch {
    // Si el celular no deja programar avisos, la app sigue funcionando igual
  }
}
