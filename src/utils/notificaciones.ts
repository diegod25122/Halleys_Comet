import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import { sumarMeses, textoMeses, tiempoJuntos } from './fechas';

const CANAL = 'mesiversario';
/** Cuántos mesiversarios por delante se dejan programados. */
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

/**
 * Programa en el celular los avisos de los próximos mesiversarios:
 * uno el día antes (8 p. m.) y otro el mismo día (8 a. m.).
 * No necesita internet. La primera vez pide permiso para mandar avisos.
 */
export async function programarMesiversarios(inicio: Date): Promise<void> {
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

    const ahora = Date.now();
    const mesesActuales = tiempoJuntos(inicio).meses;

    for (let k = Math.max(1, mesesActuales); k <= mesesActuales + MESES_ADELANTE; k++) {
      const dia = sumarMeses(inicio, k);

      const elMismoDia = new Date(dia);
      elMismoDia.setHours(8, 0, 0, 0);

      const elDiaAntes = new Date(dia);
      elDiaAntes.setDate(elDiaAntes.getDate() - 1);
      elDiaAntes.setHours(20, 0, 0, 0);

      if (elDiaAntes.getTime() > ahora) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Mañana es nuestro día ☄️',
            body: `Mañana cumplimos ${textoMeses(k)} juntos.`,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: elDiaAntes,
            channelId: CANAL,
          },
        });
      }

      if (elMismoDia.getTime() > ahora) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: `Hoy cumplimos ${textoMeses(k)} ☄️`,
            body: 'Te dejé algo especial en la app. Ábrela cuando puedas.',
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: elMismoDia,
            channelId: CANAL,
          },
        });
      }
    }
  } catch {
    // Si el celular no deja programar avisos, la app sigue funcionando igual
  }
}
