function entrar() {
    document.getElementById("inicio").style.display = "none";
    document.getElementById("contenido").style.display = "block";

    const musica = document.getElementById("musica");
    musica.play();

    iniciarTyping();
    iniciarCorazones();
}