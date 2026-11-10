import { createContext, ReactNode, useCallback, useContext, useMemo, useRef } from 'react';
import { useAudioPlayer } from 'expo-audio';

type Reproductor = ReturnType<typeof useAudioPlayer>;

type ValorMusica = {
  musica: Reproductor;
  /** Pausa la canción mientras suena un video (si estaba sonando). */
  pausarPorVideo: () => void;
  /** Vuelve a poner la canción si la pausó un video. */
  reanudarTrasVideo: () => void;
};

const ContextoMusica = createContext<ValorMusica | null>(null);

export function ProveedorMusica({
  musica,
  children,
}: {
  musica: Reproductor;
  children: ReactNode;
}) {
  const pausadaPorVideo = useRef(false);

  const pausarPorVideo = useCallback(() => {
    if (musica.playing) {
      musica.pause();
      pausadaPorVideo.current = true;
    }
  }, [musica]);

  const reanudarTrasVideo = useCallback(() => {
    if (pausadaPorVideo.current) {
      pausadaPorVideo.current = false;
      musica.play();
    }
  }, [musica]);

  const valor = useMemo(
    () => ({ musica, pausarPorVideo, reanudarTrasVideo }),
    [musica, pausarPorVideo, reanudarTrasVideo],
  );

  return <ContextoMusica.Provider value={valor}>{children}</ContextoMusica.Provider>;
}

export function useMusica(): ValorMusica {
  const valor = useContext(ContextoMusica);
  if (!valor) throw new Error('useMusica debe usarse dentro de ProveedorMusica');
  return valor;
}
