import { createElement } from 'react';
import { Asset } from 'expo-asset';

/**
 * Imagen de un video (navegador): el navegador no puede generar miniaturas con expo-video,
 * así que mostramos el propio video quieto en el segundo 0.5 (con "#t=0.5").
 */
export default function MiniaturaVideo({ fuente }: { fuente: number }) {
  const uri = Asset.fromModule(fuente).uri;

  return createElement('video', {
    src: `${uri}#t=0.5`,
    muted: true,
    playsInline: true,
    preload: 'metadata',
    disablePictureInPicture: true,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      pointerEvents: 'none',
    },
  });
}
