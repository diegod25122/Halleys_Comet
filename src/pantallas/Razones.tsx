import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Aparecer from '../components/Aparecer';
import Boton from '../components/Boton';
import Medidor from '../components/Medidor';
import { RAZONES } from '../data/contenido';
import { colores, comunes, fuentes } from '../theme/estilos';

/** Las razones por las que la amo, una por una, y el medidor de amor. */
export default function Razones() {
  const scrollRef = useRef<ScrollView>(null);
  const [indice, setIndice] = useState(-1);

  const siguiente = () => setIndice((i) => (i + 1) % RAZONES.length);
  const colapso = useCallback(() => {
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 0);
  }, []);

  const empezada = indice >= 0;
  const ultima = indice === RAZONES.length - 1;

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={comunes.pantalla}>
      <View style={[comunes.tarjeta, styles.tarjeta]}>
        <Text style={comunes.kicker}>
          {empezada ? `Razón ${indice + 1} de ${RAZONES.length}` : `${RAZONES.length} razones`}
        </Text>
        {empezada ? (
          <Aparecer key={indice}>
            <Text style={[styles.razon, ultima && styles.razonFinal]}>"{RAZONES[indice]}"</Text>
          </Aparecer>
        ) : (
          <Text style={styles.razon}>Algunas de las razones por las que te amo.</Text>
        )}
        <Boton
          titulo={!empezada ? 'Dime una razón' : ultima ? 'Volver a empezar' : 'Dime otra razón'}
          icono={ultima ? 'refresh' : 'sparkles'}
          onPress={siguiente}
          style={styles.boton}
        />
      </View>

      <Medidor onColapso={colapso} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    gap: 18,
    paddingVertical: 24,
    marginTop: 8,
  },
  razon: {
    fontFamily: fuentes.tituloItalica,
    fontSize: 22,
    lineHeight: 31,
    color: colores.texto,
    minHeight: 90,
  },
  razonFinal: {
    fontSize: 18,
    lineHeight: 27,
  },
  boton: {
    alignSelf: 'flex-start',
  },
});
