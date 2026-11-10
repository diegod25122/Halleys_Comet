import AsyncStorage from '@react-native-async-storage/async-storage';

/** Lee un valor guardado en el celular. Si algo falla, devuelve null. */
export async function leer(clave: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(clave);
  } catch {
    return null;
  }
}

/** Guarda un valor en el celular. Si algo falla, lo ignora. */
export async function guardar(clave: string, valor: string): Promise<void> {
  try {
    await AsyncStorage.setItem(clave, valor);
  } catch {
    // sin almacenamiento la app sigue funcionando, solo no recuerda
  }
}

export const CLAVES = {
  recorridoVisto: 'halley:recorridoVisto',
  planes: 'halley:planesCumplidos',
  cartasLeidas: 'halley:cartasLeidas',
  cupones: 'halley:cuponesCanjeados',
  celebrado: 'halley:mesiversarioCelebrado',
} as const;

/** Lee una lista o un objeto guardado como JSON. Si no hay nada o está dañado, devuelve `vacio`. */
export async function leerJSON<T>(clave: string, vacio: T): Promise<T> {
  const v = await leer(clave);
  if (!v) return vacio;
  try {
    return JSON.parse(v) as T;
  } catch {
    return vacio;
  }
}

export function guardarJSON(clave: string, valor: unknown): Promise<void> {
  return guardar(clave, JSON.stringify(valor));
}
