/** Devuelve un índice aleatorio de 0 a longitud-1 que no repite el anterior. */
export function indiceAleatorioDistinto(longitud: number, anterior: number): number {
  if (longitud <= 1) return 0;
  let indice: number;
  do {
    indice = Math.floor(Math.random() * longitud);
  } while (indice === anterior);
  return indice;
}
