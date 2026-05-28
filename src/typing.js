const textos = [
    "Querida Sofia... No soy el mejor haciendo páginas web, pero sí sé que te amo con todo mi corazón ❤️. Cada día contigo es un regalo que valoro profundamente, y aunque esto pueda sonar un poco cursi, es exactamente lo que siento y quería expresarlo de una manera especial para ti. Eres mi cometa Halley ☄️, algo único, brillante y difícil de explicar con palabras. Me gusta pensar en ti así, porque cada vez que te veo, siento que algo increíble pasa por mi vida, iluminando todo a su paso. Eres esa luz que aparece y transforma todo, la que me inspira, la que me hace querer ser mejor. Y aunque a veces tenga miedo o no sepa cómo demostrar todo lo que siento, lo que hay en mi corazón es completamente real. Brillas más que cualquier estrella en el cielo, y cada momento contigo se queda grabado en mí como algo que no quiero perder jamás. No importa lo que pase, siempre voy a elegirte a ti, porque eres la persona que hace que mi vida tenga sentido y alegría. Eres mi cometa Halley... y siempre voy a elegirte a ti 💖",
    "Desde que observe tus ojos y tu mirada supe que eras la persona que quería a mi lado, y cada día que pasa me doy cuenta de lo afortunado que soy por tenerte en mi vida, ver tu mirada y tu sonrisa juro que me re motiva a seguir adelante aunque no puedo explicarte de manera logica todo lo que siento por ti solo ten en cuenta que te amo con mi vida llegaste a ser mucho en tan poco tiempo y de verdad me quitaste las ganas de que exista alguien mas que no seas tu a mi lado <3",
    "Con todo mi amor",
    "La persona que mas te ama en el mundo - Diego ❤️"];
let i = 0;
let j = 0;

function escribirTexto() {
    const mensaje = document.getElementById("mensaje");

    if (i < textos.length) {
        let linea = textos[i];

        if (j < linea.length) {
            mensaje.innerHTML += linea.charAt(j);
            j++;

          
            window.scrollTo(0, document.body.scrollHeight);

            setTimeout(escribirTexto, 35);
        } else {
            mensaje.innerHTML += "<br><br>";
            i++;
            j = 0;

            // También hacemos scroll cuando da el salto de párrafo
            window.scrollTo(0, document.body.scrollHeight);

            setTimeout(escribirTexto, 800);
        }
    } else {
        document.getElementById("seccion-pregunta").style.display = "block";

        setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }, 100);
    }
}


function iniciarTyping() {
    setTimeout(() => {
        escribirTexto();
    }, 4000);
}