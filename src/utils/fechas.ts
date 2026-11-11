const MS_DIA = 24 * 60 * 60 * 1000;

const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
];

function medianoche(fecha: Date): number {
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()).getTime();
}

function diasEntre(desde: Date, hasta: Date): number {
  return Math.round((medianoche(hasta) - medianoche(desde)) / MS_DIA);
}

/** Días, semanas y meses completos desde `inicio` hasta `hoy`. */
export function tiempoJuntos(inicio: Date, hoy: Date = new Date()) {
  const dias = Math.max(0, diasEntre(inicio, hoy));
  let meses =
    (hoy.getFullYear() - inicio.getFullYear()) * 12 + (hoy.getMonth() - inicio.getMonth());
  if (hoy.getDate() < inicio.getDate()) meses--;
  return { dias, semanas: Math.floor(dias / 7), meses: Math.max(0, meses) };
}

/** La fecha en que se cumplen `k` meses desde `inicio` (si el mes es más corto, el último día). */
export function sumarMeses(inicio: Date, k: number): Date {
  const año = inicio.getFullYear();
  const mes = inicio.getMonth() + k;
  const ultimoDia = new Date(año, mes + 1, 0).getDate();
  return new Date(año, mes, Math.min(inicio.getDate(), ultimoDia));
}

/** Próximo mesiversario (o el de hoy, si hoy es el día). */
export function proximoMesiversario(inicio: Date, hoy: Date = new Date()) {
  let k = Math.max(1, tiempoJuntos(inicio, hoy).meses);
  let fecha = sumarMeses(inicio, k);
  if (medianoche(fecha) < medianoche(hoy)) {
    k++;
    fecha = sumarMeses(inicio, k);
  }
  const anterior = sumarMeses(inicio, k - 1);
  const faltan = diasEntre(hoy, fecha);
  const largo = Math.max(1, diasEntre(anterior, fecha));
  return {
    fecha,
    meses: k,
    faltan,
    esHoy: faltan === 0,
    /** 0 = recién pasó el anterior, 1 = es hoy */
    progreso: 1 - faltan / largo,
  };
}

/** "6 meses", "1 mes", "1 año", "2 años", "14 meses" */
export function textoMeses(meses: number): string {
  if (meses > 0 && meses % 12 === 0) {
    const años = meses / 12;
    return `${años} ${años === 1 ? 'año' : 'años'}`;
  }
  return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
}

/** "2 de junio de 2026" */
export function fechaLarga(fecha: Date): string {
  return `${fecha.getDate()} de ${MESES[fecha.getMonth()]} de ${fecha.getFullYear()}`;
}

/** "2 de diciembre" */
export function fechaSinAño(fecha: Date): string {
  return `${fecha.getDate()} de ${MESES[fecha.getMonth()]}`;
}

/** "10 nov" */
export function fechaCorta(fecha: Date): string {
  return `${fecha.getDate()} ${MESES[fecha.getMonth()].slice(0, 3)}`;
}

/** "2026-11-10": sirve para guardar fechas y comparar días. */
export function claveDia(fecha: Date = new Date()): string {
  const m = String(fecha.getMonth() + 1).padStart(2, '0');
  const d = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${m}-${d}`;
}

/** "2026-11": para saber si algo ya se usó este mes. */
export function claveMes(fecha: Date = new Date()): string {
  return claveDia(fecha).slice(0, 7);
}

/** El lunes de la semana de `fecha` (a medianoche). */
export function inicioSemana(fecha: Date = new Date()): Date {
  const desdeLunes = (fecha.getDay() + 6) % 7;
  return new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() - desdeLunes);
}

export function desdeClaveDia(clave: string): Date {
  const [a, m, d] = clave.split('-').map(Number);
  return new Date(a, m - 1, d);
}

/** Índice del mensaje de hoy: cambia cada día y da la vuelta al terminar la lista. */
export function indiceDelDia(inicio: Date, total: number, hoy: Date = new Date()): number {
  const n = diasEntre(inicio, hoy);
  return ((n % total) + total) % total;
}
