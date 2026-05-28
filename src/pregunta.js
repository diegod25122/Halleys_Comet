function escapar() {
    const botonNo = document.getElementById("btn-no");
    botonNo.style.position = "absolute";
    const maxX = window.innerWidth - botonNo.offsetWidth;
    const maxY = window.innerHeight - botonNo.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    botonNo.style.left = randomX + "px";
    botonNo.style.top = randomY + "px";
}

function dijoQueSi() {
    document.getElementById("botones-amor").style.display = "none";
    document.getElementById("mensaje-final").style.display = "block";

    document.getElementById("seccion-medidor").style.display = "block";
    document.getElementById("zona-sorpresas").style.display = "block"; 
    document.getElementById("botiquin-emocional").style.display = "block"; // <--- ESTA ES LA LÍNEA QUE TE FALTABA
    
    setInterval(() => {
        const heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.classList.add("floating");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = (20 + Math.random() * 30) + "px";
        heart.style.animationDuration = (2 + Math.random() * 2) + "s";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }, 100); 
    
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 400);
}
const listaRazones = [
    "Tu sonrisa que ilumina todo mi día.",
    "La forma tan hermosa en la que me miras.",
    "Porque hasta un simple viaje en el Metro de Quito es increíble si voy agarrado de tu mano.",
    "Lo inteligente y capaz que eres para todo lo que te propones.",
    "Porque haces que cualquier momento normal se vuelva especial.",
    "Tu sentido del humor, me haces reír como nadie más.",
    "Porque me inspiras a esforzarme más en la U y ser mejor cada día.",
    "Por la paz que siento cuando te abrazo fuerte.",
    "Porque prefiero mil veces estar contigo que jugar cualquier partida en la PC.",
    "Por cómo me apoyas y me escuchas siempre.",
    "Porque eres mi persona favorita en el mundo entero.",
    "Porque cada vez que te veo, siento mariposas en el estómago.",
    "Porque me haces sentir amado y valorado por quien soy.",
    "Porque eres mi cometa Halley, algo único y brillante en mi vida.",
    "Podría seguir y seguir, pero lo importante es que sepas que te amo con todo mi corazón y cada día a tu lado es un regalo que valoro profundamente. Eres la razón por la que sonrío sin motivo, la razón por la que me levanto cada mañana con ganas de ser mejor. Eres mi todo, y siempre voy a elegirte a ti 💖"
];

let razonAnterior = -1;

function mostrarRazon() {
    const textoElemento = document.getElementById("texto-razon");
    let indiceAleatorio;

    do {
        indiceAleatorio = Math.floor(Math.random() * listaRazones.length);
    } while (indiceAleatorio === razonAnterior);

    razonAnterior = indiceAleatorio;

    textoElemento.innerHTML = '"' + listaRazones[indiceAleatorio] + '"';
    document.getElementById("btn-razones").innerText = "Dime otra razón ✨";
}

function iniciarProtocolo() {
    const terminal = document.getElementById("terminal-consola");
    const textoTerminal = document.getElementById("texto-terminal");
    const fotoTerminal = document.getElementById("foto-terminal");
    
    terminal.style.display = "block";
    textoTerminal.innerHTML = "";
    fotoTerminal.style.display = "none";
    
    const lineas = [
        "> Iniciando sistema...",
        "> Accediendo a los servidores de la Politécnica...",
        "> Bypass de seguridad exitoso.",
        "> Buscando a la niña más hermosa de todo Quito...",
        "> Analizando perfiles...",
        "> ¡MATCH 100% ENCONTRADO!",
        "> Descargando archivo: mi_mundo.jpeg"
    ];
    
    let index = 0;
    
    const printLine = setInterval(() => {
        if (index < lineas.length) {
            textoTerminal.innerHTML += lineas[index] + "<br>";
            index++;
           
        } else {
            clearInterval(printLine);
            setTimeout(() => {
                fotoTerminal.style.display = "block";
            }, 500);
        }
    }, 800); 
}

function mostrarCarta() {
    document.getElementById("carta-legendaria").style.display = "block";
}

function mostrarVista() {
    document.getElementById("vista-favorita").style.display = "block";
}

const frasesConsuelo = [
    "Está bien no estar bien, mi amor. Tómate tu tiempo, yo no me voy a ir a ningún lado.",
    "Eres la persona más fuerte que conozco, vas a poder con esto. Y si no puedes hoy, yo te ayudo.",
    "Si quieres llorar, lloro contigo; si quieres silencio, me quedo callado a tu lado.",
    "Todo va a estar bien. Respira profundo, aquí estoy sosteniendo tu mano a la distancia.",
    "No importa qué tan gris se vea todo, tú sigues siendo mi luz. Te amo muchísimo.",
    "Si necesitas desconectar de todo, hazlo. El mundo puede esperar, tu paz es más importante.",
    "Recuerda que no estás sola, yo estoy aquí para lo que necesites, siempre.",
    "A veces la vida nos pone pruebas difíciles, pero sé que tienes la fuerza para superarlas. Y si necesitas ayuda, aquí estoy.",
    "No hay problema tan grande que no podamos enfrentar juntos. Te amo y siempre voy a estar a tu lado, en las buenas y en las malas.",
    "Y COMO TE HE MENCIONADO ANTES YO VOY A CUIDARTE CUANDO ESTES TRISTE YO TE EXTENDERE LA MANO NO PIENSO DEJARTE CAER NUNCA",
    "HACER LAS COSAS BIEN CONTIGO ES ALGO QUE DESEO CON TODO MI CORAZÓN Y NO ME IMPORTA ESPERAR EL TIEMPO QUE SEA NECESARIO PARA VERTE SONREÍR DE NUEVO",
    "Y POR ULTIMO RECUERDA QUE NO HAY NADA DE LO QUE ESTÉS PASANDO QUE PUEDA CAMBIAR LO QUE SIENTO POR TI, TE AMO INCONDICIONALMENTE Y SIEMPRE VOY A ESTAR AQUÍ PARA APOYARTE EN TODO LO QUE NECESITES"
];

let fraseConsueloAnterior = -1;

function fraseEmergencia() {
    const textoElemento = document.getElementById("texto-emergencia");
    let indiceAleatorio;
    
    do {
        indiceAleatorio = Math.floor(Math.random() * frasesConsuelo.length);
    } while (indiceAleatorio === fraseConsueloAnterior);
    
    fraseConsueloAnterior = indiceAleatorio;
    textoElemento.innerHTML = '"' + frasesConsuelo[indiceAleatorio] + '"';
}


let intervaloRespiracion;

function toggleRespiracion() {
    const zona = document.getElementById("zona-respirar");
    const texto = document.getElementById("texto-respiracion");
    
    if (zona.style.display === "none" || zona.style.display === "") {
        zona.style.display = "block";
        texto.innerText = "Inhala...";
        
        // Sincronizamos el texto con la animación CSS que dura 8s
        intervaloRespiracion = setInterval(() => {
            if(texto.innerText === "Inhala...") {
                texto.innerText = "Exhala...";
            } else {
                texto.innerText = "Inhala...";
            }
        }, 4000);
    } else {
        zona.style.display = "none";
        clearInterval(intervaloRespiracion);
    }
}

function reproducirAudioSecreto() {
    const audio = document.getElementById("audio-secreto");
    const mensaje = document.getElementById("mensaje-audio");
    const musicaFondo = document.getElementById("musica");
    

    musicaFondo.volume = 0.14; 
    
    audio.play();
    mensaje.style.display = "block";

    audio.onended = function() {
        mensaje.style.display = "none";
        musicaFondo.volume = 2;
    };
}