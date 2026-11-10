import { useEffect, useState } from 'react';
import { createVideoPlayer, VideoThumbnail } from 'expo-video';

const cache = new Map<number, VideoThumbnail | null>();
let cola: Promise<unknown> = Promise.resolve();

/**
 * Saca una imagen del video para usarla de miniatura.
 * Se hacen de una en una (en cola) para no abrir muchos videos a la vez.
 */
function obtenerMiniatura(fuente: number): Promise<VideoThumbnail | null> {
  if (cache.has(fuente)) return Promise.resolve(cache.get(fuente) ?? null);

  const tarea = cola.then(async () => {
    if (cache.has(fuente)) return cache.get(fuente) ?? null;
    const player = createVideoPlayer(fuente);
    try {
      const [miniatura] = await player.generateThumbnailsAsync([0.5], { maxWidth: 480 });
      cache.set(fuente, miniatura ?? null);
      return miniatura ?? null;
    } catch {
      // En web no existe esta función: se muestra el fondo de color
      cache.set(fuente, null);
      return null;
    } finally {
      player.release();
    }
  });
  cola = tarea.catch(() => null);
  return tarea;
}

export function useMiniatura(fuente: number, activo: boolean): VideoThumbnail | null {
  const [miniatura, setMiniatura] = useState<VideoThumbnail | null>(
    () => cache.get(fuente) ?? null,
  );

  useEffect(() => {
    if (!activo) return;
    let vivo = true;
    obtenerMiniatura(fuente).then((m) => {
      if (vivo) setMiniatura(m);
    });
    return () => {
      vivo = false;
    };
  }, [fuente, activo]);

  return miniatura;
}
