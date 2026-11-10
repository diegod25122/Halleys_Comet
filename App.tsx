import { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { setAudioModeAsync, useAudioPlayer } from 'expo-audio';
import { useFonts } from 'expo-font';
import { Fraunces_400Regular } from '@expo-google-fonts/fraunces/400Regular';
import { Fraunces_400Regular_Italic } from '@expo-google-fonts/fraunces/400Regular_Italic';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces/600SemiBold';
import { DMSans_400Regular } from '@expo-google-fonts/dm-sans/400Regular';
import { DMSans_500Medium } from '@expo-google-fonts/dm-sans/500Medium';
import { DMSans_700Bold } from '@expo-google-fonts/dm-sans/700Bold';

import Fondo from './src/components/Fondo';
import { ProveedorMusica } from './src/contexto/Musica';
import { SONIDOS } from './src/data/contenido';
import AppPrincipal from './src/pantallas/AppPrincipal';
import Carta from './src/pantallas/Carta';
import Portada from './src/pantallas/Portada';
import Pregunta from './src/pantallas/Pregunta';
import { ANCHO_MAX, colores } from './src/theme/estilos';

type Etapa = 'portada' | 'carta' | 'pregunta' | 'app';

// En el navegador, el traductor de Chrome cambia los textos de la página y React ya no
// puede actualizarlos (por ejemplo, la carta se queda congelada). Le pedimos que no traduzca.
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const html = document.documentElement;
  html.setAttribute('lang', 'es');
  html.setAttribute('translate', 'no');
  html.classList.add('notranslate');
  if (!document.querySelector('meta[name="google"]')) {
    const meta = document.createElement('meta');
    meta.name = 'google';
    meta.content = 'notranslate';
    document.head.appendChild(meta);
  }
}

export default function App() {
  const [fuentesListas, errorFuentes] = useFonts({
    Fraunces_400Regular,
    Fraunces_400Regular_Italic,
    Fraunces_600SemiBold,
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  const musica = useAudioPlayer(SONIDOS.cancion);
  const [etapa, setEtapa] = useState<Etapa>('portada');

  // Para que suene aunque el iPhone esté en modo silencio
  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
  }, []);

  // Siempre pasa por la carta y la pregunta
  const abrir = useCallback(() => {
    musica.loop = true;
    musica.play();
    setEtapa('carta');
  }, [musica]);

  const entrarALaApp = useCallback(() => setEtapa('app'), []);

  if (!fuentesListas && !errorFuentes) {
    return <View style={styles.raiz} />;
  }

  return (
    <SafeAreaProvider>
      <ProveedorMusica musica={musica}>
        <StatusBar style="light" />
        <View style={styles.raiz}>
          {etapa !== 'portada' && <Fondo />}
          <View style={styles.columna}>
            {etapa === 'portada' && <Portada onAbrir={abrir} />}
            {etapa === 'carta' && <Carta onContinuar={() => setEtapa('pregunta')} />}
            {etapa === 'pregunta' && <Pregunta onEntrar={entrarALaApp} />}
            {etapa === 'app' && <AppPrincipal />}
          </View>
        </View>
      </ProveedorMusica>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  columna: {
    flex: 1,
    width: '100%',
    maxWidth: ANCHO_MAX,
    alignSelf: 'center',
    overflow: 'hidden',
  },
});
