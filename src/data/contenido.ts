export const NOMBRES = { el: 'Diego', ella: 'Sofía' } as const;

export const TEXTOS_CARTA: readonly string[] = [
  'Mi amor... No soy el mejor haciendo páginas web, pero sí sé que te amo con todo mi corazón ❤️. Cada día contigo es un regalo que valoro profundamente, y aunque esto pueda sonar un poco cursi, es exactamente lo que siento y quería expresarlo de una manera especial para ti. Eres mi cometa Halley ☄️, algo único, brillante y difícil de explicar con palabras. Me gusta pensar en ti así, porque cada vez que te veo, siento que algo increíble pasa por mi vida, iluminando todo a su paso. Eres esa luz que aparece y transforma todo, la que me inspira, la que me hace querer ser mejor. Y aunque a veces tenga miedo o no sepa cómo demostrar todo lo que siento, lo que hay en mi corazón es completamente real. Brillas más que cualquier estrella en el cielo, y cada momento contigo se queda grabado en mí como algo que no quiero perder jamás. No importa lo que pase, siempre voy a elegirte a ti, porque eres la persona que hace que mi vida tenga sentido y alegría. Eres tu, solo tu y siempre voy a elegirte a ti 💖',
  'Desde que observe tus ojos y tu mirada supe que eras la persona que quería a mi lado, y cada día que pasa me doy cuenta de lo afortunado que soy por tenerte en mi vida, ver tu mirada y tu sonrisa juro que me re motiva a seguir adelante aunque no puedo explicarte de manera logica todo lo que siento por ti solo ten en cuenta que te amo con mi vida llegaste a ser mucho en tan poco tiempo y de verdad me quitaste las ganas de que exista alguien mas que no seas tu a mi lado <3',
  'Con todo mi amor',
  'La persona que mas te ama en el mundo - Diego ❤️',
];

export const RAZONES: readonly string[] = [
  'Tu sonrisa que ilumina todo mi día.',
  'La forma tan hermosa en la que me miras.',
  'Porque hasta un simple viaje en el Metro de Quito es increíble si voy agarrado de tu mano.',
  'Lo inteligente y capaz que eres para todo lo que te propones.',
  'Porque haces que cualquier momento normal se vuelva especial.',
  'Tu sentido del humor, me haces reír como nadie más.',
  'Porque me inspiras a esforzarme más en la U y ser mejor cada día.',
  'Por la paz que siento cuando te abrazo fuerte.',
  'Porque prefiero mil veces estar contigo que jugar cualquier partida en la PC.',
  'Por cómo me apoyas y me escuchas siempre.',
  'Porque eres mi persona favorita en el mundo entero.',
  'Porque cada vez que te veo, siento mariposas en el estómago.',
  'Porque me haces sentir amado y valorado por quien soy.',
  'Porque eres mi cometa Halley, algo único y brillante en mi vida.',
  'Podría seguir y seguir, pero lo importante es que sepas que te amo con todo mi corazón y cada día a tu lado es un regalo que valoro profundamente. Eres la razón por la que sonrío sin motivo, la razón por la que me levanto cada mañana con ganas de ser mejor. Eres mi todo, y siempre voy a elegirte a ti 💖',
];

export const FRASES_CONSUELO: readonly string[] = [
  'Está bien no estar bien, mi amor. Tómate tu tiempo, yo no me voy a ir a ningún lado.',
  'Eres la persona más fuerte que conozco, vas a poder con esto. Y si no puedes hoy, yo te ayudo.',
  'Si quieres llorar, lloro contigo; si quieres silencio, me quedo callado a tu lado.',
  'Todo va a estar bien. Respira profundo, aquí estoy sosteniendo tu mano a la distancia.',
  'No importa qué tan gris se vea todo, tú sigues siendo mi luz. Te amo muchísimo.',
  'Si necesitas desconectar de todo, hazlo. El mundo puede esperar, tu paz es más importante.',
  'Recuerda que no estás sola, yo estoy aquí para lo que necesites, siempre.',
  'A veces la vida nos pone pruebas difíciles, pero sé que tienes la fuerza para superarlas. Y si necesitas ayuda, aquí estoy.',
  'No hay problema tan grande que no podamos enfrentar juntos. Te amo y siempre voy a estar a tu lado, en las buenas y en las malas.',
  'Y COMO TE HE MENCIONADO ANTES YO VOY A CUIDARTE CUANDO ESTES TRISTE YO TE EXTENDERE LA MANO NO PIENSO DEJARTE CAER NUNCA',
  'HACER LAS COSAS BIEN CONTIGO ES ALGO QUE DESEO CON TODO MI CORAZÓN Y NO ME IMPORTA ESPERAR EL TIEMPO QUE SEA NECESARIO PARA VERTE SONREÍR DE NUEVO',
  'Y POR ULTIMO RECUERDA QUE NO HAY NADA DE LO QUE ESTÉS PASANDO QUE PUEDA CAMBIAR LO QUE SIENTO POR TI, TE AMO INCONDICIONALMENTE Y SIEMPRE VOY A ESTAR AQUÍ PARA APOYARTE EN TODO LO QUE NECESITES',
];

export const LINEAS_TERMINAL: readonly string[] = [
  '> Iniciando sistema...',
  '> Accediendo a los servidores de todo Ecuador...',
  '> Bypass de seguridad exitoso.',
  '> Buscando a la niña más hermosa de todo Quito...',
  '> Analizando perfiles...',
  '> ¡MATCH 100% ENCONTRADO!',
  '> Descargando archivo: mi_mundo.jpeg',
];

export const IMAGENES = {
  portada: require('../../assets/images/portada2.jpeg'),
  chiquita: require('../../assets/images/chiquita.jpeg'),
  chiquibebe: require('../../assets/images/chiquibebe.jpeg'),
  soff: require('../../assets/images/soff.jpeg'),
  bbi: require('../../assets/images/bbi.jpeg'),
  besito: require('../../assets/images/besito.jpeg'),
};

export const SONIDOS = {
  cancion: require('../../assets/sounds/halleys-comet.mp3'),
  vozMotivacion: require('../../assets/sounds/audio_motivacion.mp3'),
};


// Fotos y videos


export type Medio = {
  id: string;
  tipo: 'foto' | 'video';
  fuente: number;
};

const foto = (id: string, fuente: number): Medio => ({ id, tipo: 'foto', fuente });
const video = (id: string, fuente: number): Medio => ({ id, tipo: 'video', fuente });

export const RECUERDOS: readonly Medio[] = [
  foto('besito', require('../../assets/images/besito.jpeg')),
  foto('flores', require('../../assets/images/flores.jpeg')),
  video('piscina', require('../../assets/images/piscina.mp4')),
  foto('paz', require('../../assets/images/paz.jpeg')),
  foto('pastel1', require('../../assets/images/pastel1.jpeg')),
  foto('pastel2', require('../../assets/images/pastel2.jpeg')),
  foto('pastel3', require('../../assets/images/pastel3.jpeg')),
  video('pastel4', require('../../assets/images/pastel4.mp4')),
  foto('minichofi', require('../../assets/images/minichofi.jpeg')),
  video('golumpio', require('../../assets/images/golumpio.mp4')),
  foto('payasita', require('../../assets/images/payasita.jpeg')),
  video('payasitabarrial', require('../../assets/images/payasitabarrial.mp4')),
  video('payasitabarrial1', require('../../assets/images/payasitabarrial1.mp4')),
  video('payasitasanta', require('../../assets/images/payasitasanta.mp4')),
  video('video1', require('../../assets/images/video1.mp4')),
  video('video2', require('../../assets/images/video2.mp4')),
];

// ---------------------------------------------------------------------------
// Nosotros
// ---------------------------------------------------------------------------


export const FECHA_INICIO = new Date(2026, 5, 2);

export const FECHA_COMPROMISO = new Date(2026, 10, 10);

export const COMPROMISO = {
  titulo: 'Dijiste que sí :,3',
  texto: 'Un Martes 10 de noviembre de 2026, ambos dijimos que si a nuestra promesa futura, de verdad me haz hecho muy feliz y espero en un futuro poder cumplirla juntos y verte vestida de blanco Te amo <3💍',
} as const;

export const CANCION = {
  titulo: "Halley's Comet",
  artista: 'Billie Eilish',
  frase: 'La canción que suena en mi cabeza cada vez que pienso en ti.',
} as const;

export type Hito = {
  fecha: string;
  titulo: string;
  texto?: string;
  medios: readonly Medio[];
};

/** Línea del tiempo de la pestaña Nosotros, de la más antigua a la más reciente. */
export const HITOS: readonly Hito[] = [
  {
    fecha: '2 de junio de 2026',
    titulo: 'El día que empezamos',
    medios: [video('videito', require('../../assets/images/Videito.mp4'))],
  },
  {
    fecha: 'Junio',
    titulo: 'Nuestra primera foto',
    medios: [
      foto('foto1', require('../../assets/images/foto1.jpeg')),
      foto('foto2', require('../../assets/images/foto2.jpeg')),
    ],
  },
  {
    fecha: 'Julio · primer mes',
    titulo: 'Nuestro primer mes',
    texto: 'Tu sonrisa al verlo fue lo mejor :3 pd el video me hizo chillar',
    medios: [foto('regalo', require('../../assets/images/regalo.jpeg'))],
  },
  {
    fecha: 'Julio',
    titulo: 'Una de mis fotos favoritas :3',
    medios: [foto('sonrisitas', require('../../assets/images/sonrisitas.jpeg'))],
  },
  {
    fecha: '29 de julio',
    titulo: 'Spiderman',
    texto: 'Definitivamente fui a ver Spiderman con la persona correcta',
    medios: [
      foto('spiderman1', require('../../assets/images/spiderman1.jpeg')),
      foto('spiderman2', require('../../assets/images/spiderman2.jpeg')),
      foto('spiderman3', require('../../assets/images/spiderman3.jpeg')),
    ],
  },
  {
    fecha: '10 de noviembre de 2026',
    titulo: 'El anillo 💍',
    texto: 'Te di el anillo de compromiso y empezamos a escribir el "para siempre".',
    medios: [],
  },
];

export type Plan = { id: string; texto: string };

/** Cosas que nos faltan por hacer juntos. Ella puede ir marcándolas. */
export const PLANES: readonly Plan[] = [
  { id: 'fresas', texto: 'Ir a comer fresas con crema' },
  { id: 'peli', texto: 'Ver una peli juntos' },
  { id: 'excursion', texto: 'Tener una excursión' },
  { id: 'fechas', texto: 'Compartir fechas especiales' },
  { id: 'dormir', texto: 'Dormir changados juntos jeje' },
  { id: 'familia', texto: 'Reuniones familiares' },
  { id: 'halley', texto: 'Ver el cometa Halley juntos en 2061' },
];

// ---------------------------------------------------------------------------
// Ábrela cuando…
// ---------------------------------------------------------------------------

export type CartaCuando = {
  id: string;
  /** Lo que se lee en el sobre, después de "Ábrela cuando…" */
  cuando: string;
  titulo: string;
  texto: string;
};

export const CARTAS_CUANDO: readonly CartaCuando[] = [
  {
    id: 'extranes',
    cuando: 'me extrañes',
    titulo: 'Yo también te extraño',
    texto:
      'Yo también te estoy extrañando demasiado, mi niña. Cierra los ojitos y acuérdate de la última vez que nos abrazamos. Pronto te doy otro, y más largo :3 ¿te parece?',
  },
  {
    id: 'dormir',
    cuando: 'no puedas dormir',
    titulo: 'Duerme bonito',
    texto:
      'Respira profundo… Imagina que estoy a tu lado jugando con tu pelo. No pienses en nada más. Mañana va a ser un buen día. Duerme bonito, descansa bastante y no olvides que tu novio te ama demasiadoooo <3',
  },
  {
    id: 'enojada',
    cuando: 'estés enojada conmigo',
    titulo: '¿Me perdonas, chi?',
    texto:
      'Si estás leyendo esto, seguro hice algo tonto. ¿Me perdonas, chi? Aunque estemos enojados y todo, nunca dejaré de amarte. De verdad te amo y no quiero que unas discusiones nos sentencien. Te amo, mi vida, y siempre serás tú. PD: usa el cupón de "Ganas una discusión" jojo.',
  },
  {
    id: 'feliz',
    cuando: 'estés feliz',
    titulo: '¡Qué alegría, amor!',
    texto:
      'Amoooor, ¡qué alegría! Me encanta verte sonreír, es mi cosa favorita del mundo. Cuéntamelo todo apenas puedas, sea en persona o por llamada. Sabes que todo lo que te pasa a ti a mí me interesa bastante. Te amoooo y felicidades, sea cual sea el motivo me alegro demasiadoooo. Cuéntamelo, no te olvides, mi amorrr.',
  },
  {
    id: 'reir',
    cuando: 'necesites reírte',
    titulo: '¿Te acuerdas?',
    texto:
      '¿Te acuerdas de la vez que le llamé a tu ma por primera vez? Jaaja diooooos amor, aún tiemblo demasiado cuando pienso en aquello kjajksjka, además sentía que tu ma sabía que estaba nervioso akjskj. Ahora solo me río, pero gracias a eso pude acercarme a tu ma y todo para que te deje estar conmigo :3',
  },
  {
    id: 'examen',
    cuando: 'tengas un examen',
    titulo: 'Tú puedes, la bestia',
    texto:
      'Amor, tranquila, eres la más inteligente que conozco (la bestia). Vas a hacerlo increíble, yo confío en que sí :3 Cuando termines me avisas, y como sé que te va a ir bien, te invito un papipollooo o unas fresitas con crema, ¿qué dices? Y si sale mal (lo dudo), igual te llevo a comer fresas con crema o el papipollo.',
  },
  {
    id: 'dudes',
    cuando: 'dudes de ti',
    titulo: 'Mira lo que yo veo',
    texto:
      'No sabes lo increíble que eres. Eres fuerte, linda, inteligente y la persona que me hace mejor. Si un día no lo ves, te presto mis ojos.',
  },
  {
    id: 'aniversario',
    cuando: 'sea nuestro aniversario',
    titulo: 'Mil veces te elegiría',
    texto:
      'Mi vida, para mí tú eres la mejor chica del mundo y mil veces te elegiría. Sé que a veces puede que no sea el mejor enamorado, pero créeme que lo intento; de mi parte estoy dispuesto a hacer todo por ti. Te amo tanto tanto y espero de corazón seguir contigo por laaaaaaaaaaaaaaaaaaaaaaaaaaargo tiempo, tal y como dijo tu ma: que si seguimos en 2 años nos va a dejar viajar akjskas. Sé que fue de chiste y podría ser antes askja, pero lo amé. Bueno amor, te amo, ¿sabes? Eres y serás siempre el motivo por el cual me dediqué bastante a salvarme, y de verdad estoy agradecido. Te amo con mi vida, mi niña de lindos ojos.',
  },
  {
    id: 'compromiso',
    cuando: 'quieras recordar el día del anillo',
    titulo: 'Para siempre',
    texto:
      'Mi amor, el 10 de noviembre de 2026 te entregue un anillo y con él te entregue mis sentimientos y mi vida. No fue un impulso: es lo que siento desde que vi tus ojos por primera vez. Quiero despertar contigo, cuidarte cuando estés enferma, celebrar cada logro tuyo y estar a tu lado en los días difíciles. Como hemos hablado quiero estar contigo 4ever mi vida teamo, vivir la vida contigo hasta viejitos y decirte al oido "viste que si eras tú el amor de mi vida". Gracias por decirme que sí. Eres el amor de mi vida. Te ame ayer, te amo hoy y te amare siempre mi niña de lindos ojos <3 💍',
  },
];

/** La carta que se abre el día del mesiversario. */
export const CARTA_MESIVERSARIO = 'aniversario';

/** La carta que se abre el día del "mesiversario" del compromiso (el 10 de cada mes). */
export const CARTA_COMPROMISO = 'compromiso';

// ---------------------------------------------------------------------------
// Mensaje del día (sale uno distinto cada día; al terminar la lista, vuelve a empezar)
// ---------------------------------------------------------------------------

export const FRASES_DIA: readonly string[] = [
  'Hoy te quiero un poquito más que ayer. Mañana, más todavía.',
  'Recordatorio: eres la más linda de todo Quito. Fin del comunicado.',
  '¿Ya tomaste agüita hoy? Hazlo por mí :3',
  'Tus ojitos deberían ser ilegales, mi niña.',
  'Tú puedes con todo lo que te toque hoy. Y si no, aquí estoy yo.',
  'Me debes unas fresas con crema. O yo a ti, ya no sé jeje.',
  'Todavía me acuerdo de cómo me mirabas en el cine de Spiderman.',
  'Si hoy fue un día pesado, acuérdate de que alguien está pensando en ti ahora mismo.',
  'Eres mi cometa Halley: algo que pasa una vez en la vida.',
  'Un viaje en el Metro de Quito contigo vale más que cualquier viaje.',
  'Hoy es un buen día para sonreír. Tu sonrisa es mi favorita.',
  'La bestia de la inteligencia hoy también va a brillar.',
  'Te elegiría mil veces. Hoy también.',
  'Ojalá pudiera darte un abrazo ahora mismo. Cuenta este como uno.',
  'No te olvides de comer bien amoor.',
  'Gracias por existir. En serio.',
  'Prefiero mil veces estar contigo que jugar voli.',
  'Hoy invito yo el papipollo (si te portas bien jeje).',
  'Eres mi persona favorita en el mundo entero.',
  'Respira profundo. Todo va a estar bien. Te amo.',
  'Cada día contigo es un regalo que no pienso desperdiciar.',
  'Si te sientes cansada, descansa. El mundo puede esperar.',
  'Estoy orgulloso de ti, aunque no te lo diga todos los días.',
  'Tu risa es mi canción favorita (después de Halley\'s Comet).',
  'Hoy tienes permiso de ser feliz sin ningún motivo.',
  'Me haces sentir mariposas en el estómago, todavía.',
  'Pase lo que pase hoy, al final del día sigues siendo mía y yo tuyo.',
  'Nunca te olvides de lo increíble que eres.',
  'Me encanta cómo haces especial cualquier momento normal.',
  'Te pienso más de lo que crees. Ahora mismo, por ejemplo.',
  'Eres tú, solo tú, y siempre voy a elegirte a ti 💖',
];

// ---------------------------------------------------------------------------
// Cupones de amor
// ---------------------------------------------------------------------------

/** cuandoQuieras: sin límite · semanal: 1 vez a la semana · mensual: 1 vez al mes · unico: solo una vez */
export type LimiteCupon = 'cuandoQuieras' | 'semanal' | 'mensual' | 'unico';

export type Cupon = {
  id: string;
  titulo: string;
  nota: string;
  limite: LimiteCupon;
  /** Nombre de un ícono de Ionicons */
  icono: string;
};

export const CUPONES: readonly Cupon[] = [
  { id: 'abrazo', titulo: 'Un abrazo de 10 minutos', nota: 'Sin soltarte antes', limite: 'cuandoQuieras', icono: 'heart-outline' },
  { id: 'fresas', titulo: 'Yo invito las fresas con crema', nota: 'Tú solo apareces', limite: 'cuandoQuieras', icono: 'ice-cream-outline' },
  { id: 'papipollo', titulo: 'Un papipollo por mi cuenta', nota: 'Tú solo pides', limite: 'mensual', icono: 'fast-food-outline' },
  { id: 'peli', titulo: 'Tú eliges la peli', nota: 'Y no me quejo', limite: 'mensual', icono: 'film-outline' },
  { id: 'discusion', titulo: 'Ganas una discusión', nota: 'Aunque no tengas la razón jeje', limite: 'semanal', icono: 'trophy-outline' },
  { id: 'llamada', titulo: 'Llamada hasta que te duermas', nota: 'Cualquier noche', limite: 'cuandoQuieras', icono: 'call-outline' },
  { id: 'consentirte', titulo: 'Un día de consentirte', nota: 'Lo que tú quieras', limite: 'unico', icono: 'sparkles-outline' },
  { id: 'cancion', titulo: 'Te canto una canción', nota: 'Aunque cante feo', limite: 'cuandoQuieras', icono: 'musical-notes-outline' },
  { id: 'perdon', titulo: 'Perdón instantáneo', nota: 'Por algo pequeñito', limite: 'mensual', icono: 'happy-outline' },
  { id: 'fotos', titulo: 'Fotos juntos sin quejarme', nota: 'Las que quieras', limite: 'cuandoQuieras', icono: 'camera-outline' },
  { id: 'masajito', titulo: 'Un masajito de 15 minutos', nota: 'En la espalda o donde te duela', limite: 'cuandoQuieras', icono: 'hand-left-outline' },
  { id: 'paseo', titulo: 'Un paseo juntos', nota: 'Tú eliges a dónde', limite: 'cuandoQuieras', icono: 'walk-outline' },
  { id: 'cuidarte', titulo: 'Te cuido cuando estés enferma', nota: 'Con sopita y todo', limite: 'cuandoQuieras', icono: 'medkit-outline' },
  { id: 'cafecito', titulo: 'Un cafecito o heladito juntos', nota: 'Y conversamos de todo', limite: 'cuandoQuieras', icono: 'cafe-outline' },
  { id: 'buzo', titulo: 'Te regalo mi buzo', nota: 'Las veces que quieras jeje', limite: 'cuandoQuieras', icono: 'shirt-outline' },
  { id: 'jugar', titulo: 'Te dejo ganar en un juego', nota: 'Pero solo una vez eh', limite: 'unico', icono: 'game-controller-outline' },
];

// ---------------------------------------------------------------------------
// Novedades (lo que sale cuando la app se actualiza)
// ---------------------------------------------------------------------------

export type Novedad = {
  /** Nombre de un ícono de Ionicons */
  icono: string;
  texto: string;
};

export type Version = {
  /** Igual que "version" en app.json */
  version: string;
  fecha: string;
  titulo: string;
  novedades: readonly Novedad[];
};

/**
 * Historial de versiones, de la más nueva a la más vieja.
 * Para una actualización nueva: agrega una versión ARRIBA de todo y sube "version" en app.json
 * al mismo número. Ella verá la ventana de novedades una sola vez.
 */
export const VERSIONES: readonly Version[] = [
  {
    version: '1.1.0',
    fecha: '11 de noviembre de 2026',
    titulo: 'Edición compromiso 💍',
    novedades: [
      { icono: 'diamond-outline', texto: 'Una tarjeta especial en Nosotros con el día que te di el anillo y los días que llevamos comprometidos.' },
      { icono: 'calendar-outline', texto: 'Cada 10 del mes hay una pantalla sorpresa para celebrar nuestros meses de compromiso.' },
      { icono: 'notifications-outline', texto: 'Ahora te aviso un día antes y el mismo día de cada mes de compromiso.' },
      { icono: 'mail-unread-outline', texto: 'Una carta nueva: "Ábrela cuando quieras recordar el día del anillo".' },
      { icono: 'git-commit-outline', texto: 'El anillo ya es parte de nuestra línea del tiempo.' },
      { icono: 'trophy-outline', texto: 'Cupones mejorados: ganas una discusión cada semana, y mi buzo y las fresas con crema son cuando quieras.' },
    ],
  },
  {
    version: '1.0.0',
    fecha: 'Junio de 2026',
    titulo: 'Mi cometa Halley ☄️',
    novedades: [{ icono: 'heart-outline', texto: 'La primera versión de tu app, hecha con todo mi amor.' }],
  },
];

export const VERSION_ACTUAL = VERSIONES[0];
